'use server'

import { headers } from 'next/headers'
import { validateEmailField, validateTextField } from '@/lib/utils/validation'
import { rateLimit } from '@/lib/utils/rate-limit'
import {
  createNewsletterSubscriber,
  getNewsletterSubscriberByEmail,
} from '@/lib/db/queries'

export type NewsletterFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string>
}

async function sendConfirmationEmail(data: {
  email: string
  firstName?: string
  confirmToken: string
  siteUrl: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[Newsletter] RESEND_API_KEY not set — skipping confirmation email')
    return
  }

  const confirmUrl = `${data.siteUrl}/api/newsletter/confirm?token=${data.confirmToken}`

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const greeting = data.firstName ? `Hi ${data.firstName},` : 'Hi there,'

    await resend.emails.send({
      from: 'PCC Newsletter <onboarding@resend.dev>',
      to: data.email,
      subject: 'Confirm your PCC newsletter subscription',
      text: `${greeting}

Thanks for signing up for the Peninsula Covenant Church newsletter!

Please confirm your subscription by clicking the link below:

${confirmUrl}

If you didn't sign up for this newsletter, you can safely ignore this email.

— Peninsula Covenant Church
3560 Farm Hill Boulevard, Redwood City, CA 94061`,
    })
  } catch (err) {
    console.error('[Newsletter] Failed to send confirmation email:', err instanceof Error ? err.message : err)
  }
}

export async function submitNewsletterSignup(
  _prevState: NewsletterFormState,
  formData: FormData
): Promise<NewsletterFormState> {
  // --- Rate limiting: 2 per hour per IP ---
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headersList.get('x-real-ip') ||
    'unknown'

  // Derive site URL from request so emails always link back to the correct host/port
  const host = headersList.get('host') || 'localhost:3000'
  const proto = headersList.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https')
  const siteUrl = `${proto}://${host}`

  const isDev = process.env.NODE_ENV === 'development'
  const { allowed } = rateLimit(`newsletter:${ip}`, isDev ? 20 : 2, 60 * 60 * 1000)
  if (!allowed) {
    return {
      success: false,
      error: 'Too many signup attempts. Please try again later.',
    }
  }

  // --- Honeypot ---
  const honeypot = formData.get('company')
  if (honeypot) {
    return { success: true }
  }

  // --- Validate ---
  const fieldErrors: Record<string, string> = {}

  const emailResult = validateEmailField(formData.get('email'))
  if (!emailResult.valid) {
    fieldErrors.email = emailResult.error
  } else if (!emailResult.value) {
    fieldErrors.email = 'Email address is required.'
  }

  const nameResult = validateTextField(formData.get('name'), {
    label: 'Name',
    required: false,
    maxLength: 100,
  })
  if (!nameResult.valid) fieldErrors.name = nameResult.error

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, error: 'Please fix the errors below.', fieldErrors }
  }

  const email = (emailResult as { valid: true; value: string }).value!
  const name = (nameResult as { valid: true; value: string }).value

  // --- Rate limit per email: 1 per day ---
  const { allowed: emailAllowed } = rateLimit(`newsletter-email:${email}`, isDev ? 20 : 1, 24 * 60 * 60 * 1000)
  if (!emailAllowed) {
    return {
      success: false,
      error: 'This email was recently submitted. Check your inbox for a confirmation link.',
    }
  }

  // --- Check if already subscribed ---
  try {
    const existing = await getNewsletterSubscriberByEmail(email)

    if (existing) {
      if (existing.status === 'confirmed') {
        return {
          success: false,
          error: "You're already subscribed to our newsletter!",
        }
      }

      // Re-send confirmation for pending or unsubscribed users
      sendConfirmationEmail({
        email,
        firstName: name || existing.firstName || undefined,
        confirmToken: existing.confirmToken,
        siteUrl,
      })

      return { success: true }
    }

    // --- Create new subscriber ---
    const subscriber = await createNewsletterSubscriber({
      email,
      firstName: name || undefined,
    })

    // --- Send confirmation email (fire and forget) ---
    sendConfirmationEmail({
      email,
      firstName: name || undefined,
      confirmToken: subscriber.confirmToken,
      siteUrl,
    })
  } catch (err) {
    console.error('[Newsletter] Signup error:', err instanceof Error ? err.message : err)
    return {
      success: false,
      error: 'Something went wrong. Please try again later.',
    }
  }

  return { success: true }
}
