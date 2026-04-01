'use server'

import { headers } from 'next/headers'
import { validateEmailField, validateTextField } from '@/lib/utils/validation'
import { rateLimit } from '@/lib/utils/rate-limit'
import { createAlphaInterest, getAlphaInterestByEmail } from '@/lib/db/queries'

export type AlphaInterestFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string>
}

async function sendAcknowledgmentEmail(data: {
  email: string
  firstName?: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[Alpha] RESEND_API_KEY not set — skipping acknowledgment email')
    return
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const greeting = data.firstName ? `Hi ${data.firstName},` : 'Hi there,'

    await resend.emails.send({
      from: 'PCC Alpha <onboarding@resend.dev>',
      to: data.email,
      subject: "You're on the Alpha interest list!",
      text: `${greeting}

Thanks for your interest in Alpha at Peninsula Covenant Church!

We'll send you an email as soon as registration opens for the next session. In the meantime, feel free to learn more about Alpha at https://alphausa.org.

— Peninsula Covenant Church
3560 Farm Hill Boulevard, Redwood City, CA 94061`,
    })
  } catch (err) {
    console.error('[Alpha] Failed to send acknowledgment email:', err instanceof Error ? err.message : err)
  }
}

export async function submitAlphaInterest(
  _prevState: AlphaInterestFormState,
  formData: FormData
): Promise<AlphaInterestFormState> {
  // --- Rate limiting: 2 per hour per IP ---
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headersList.get('x-real-ip') ||
    'unknown'

  const isDev = process.env.NODE_ENV === 'development'
  const { allowed } = rateLimit(`alpha-interest:${ip}`, isDev ? 20 : 2, 60 * 60 * 1000)
  if (!allowed) {
    return {
      success: false,
      error: 'Too many attempts. Please try again later.',
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

  const nameResult = validateTextField(formData.get('firstName'), {
    label: 'Name',
    required: false,
    maxLength: 100,
  })
  if (!nameResult.valid) fieldErrors.name = nameResult.error

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, error: 'Please fix the errors below.', fieldErrors }
  }

  const email = (emailResult as { valid: true; value: string }).value!
  const firstName = (nameResult as { valid: true; value: string }).value || undefined

  // --- Rate limit per email: 1 per day ---
  const { allowed: emailAllowed } = rateLimit(`alpha-email:${email}`, isDev ? 20 : 1, 24 * 60 * 60 * 1000)
  if (!emailAllowed) {
    return {
      success: false,
      error: "You've already expressed interest. We'll email you when registration opens!",
    }
  }

  // --- Session ID (optional, from hidden field) ---
  const sessionId = (formData.get('sessionId') as string) || undefined

  try {
    // Check for existing interest
    const existing = await getAlphaInterestByEmail(email, sessionId)
    if (existing) {
      return {
        success: false,
        error: "You're already on our interest list! We'll email you when registration opens.",
      }
    }

    // Create interest record
    const interest = await createAlphaInterest({ email, firstName, sessionId })

    if (!interest) {
      // Race condition duplicate
      return { success: true }
    }

    // Send acknowledgment (fire and forget)
    sendAcknowledgmentEmail({ email, firstName })
  } catch (err) {
    console.error('[Alpha] Interest signup error:', err instanceof Error ? err.message : err)
    return {
      success: false,
      error: 'Something went wrong. Please try again later.',
    }
  }

  return { success: true }
}
