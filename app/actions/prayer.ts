'use server'

import { headers } from 'next/headers'
import { validateTextField, validateEmailField } from '@/lib/utils/validation'
import { rateLimit } from '@/lib/utils/rate-limit'
import { createPrayerRequest } from '@/lib/db/queries'

export type PrayerFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string>
  hasEmail?: boolean
}

async function sendPrayerNotification(data: {
  name: string
  email?: string
  phone?: string
  request: string
  visibility: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[Prayer Email] RESEND_API_KEY not set — skipping email notification')
    return
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const timestamp = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    })

    await resend.emails.send({
      from: 'PCC Prayer <onboarding@resend.dev>',
      to: 'pedleyj@gmail.com',
      subject: `[PCC PRAYER REQUEST] ${data.name}`,
      text: `New Prayer Request Submitted

Name: ${data.name}
Contact Email: ${data.email || 'Not provided'}
Contact Phone: ${data.phone || 'Not provided'}
Visibility: ${data.visibility}

Prayer Request:
${data.request}

Submitted: ${timestamp}

Note: This request was submitted as ${data.visibility}.
Please handle with appropriate confidentiality.`,
    })
  } catch (err) {
    // Email failure should NOT prevent the prayer from being saved
    console.error('[Prayer Email] Failed to send notification:', err instanceof Error ? err.message : err)
  }
}

export async function submitPrayerRequest(
  _prevState: PrayerFormState,
  formData: FormData
): Promise<PrayerFormState> {
  // --- Rate limiting ---
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headersList.get('x-real-ip') ||
    'unknown'

  const { allowed } = rateLimit(`prayer:${ip}`, 5, 60 * 60 * 1000)
  if (!allowed) {
    return {
      success: false,
      error: 'Too many submissions. Please try again later.',
    }
  }

  // --- Honeypot ---
  const honeypot = formData.get('website')
  if (honeypot) {
    return { success: true }
  }

  // --- Validate fields ---
  const fieldErrors: Record<string, string> = {}

  const nameResult = validateTextField(formData.get('name'), {
    label: 'Name',
    required: true,
    minLength: 2,
    maxLength: 100,
  })
  if (!nameResult.valid) fieldErrors.name = nameResult.error

  const emailResult = validateEmailField(formData.get('email'))
  if (!emailResult.valid) fieldErrors.email = emailResult.error

  const phoneResult = validateTextField(formData.get('phone'), {
    label: 'Phone',
    required: false,
    maxLength: 20,
  })
  if (!phoneResult.valid) fieldErrors.phone = phoneResult.error

  const requestResult = validateTextField(formData.get('request'), {
    label: 'Prayer request',
    required: true,
    minLength: 10,
    maxLength: 5000,
  })
  if (!requestResult.valid) fieldErrors.request = requestResult.error

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, error: 'Please fix the errors below.', fieldErrors }
  }

  // --- Extract validated values ---
  const name = (nameResult as { valid: true; value: string }).value
  const email = (emailResult as { valid: true; value: string | undefined }).value
  const phone = (phoneResult as { valid: true; value: string }).value || undefined
  const request = (requestResult as { valid: true; value: string }).value
  const visibility = formData.get('visibility') as string
  const isPublic = visibility === 'public'

  // --- Save to database (always, even if email fails) ---
  try {
    await createPrayerRequest({
      name,
      email: email || undefined,
      phone,
      request,
      isPublic,
    })
  } catch {
    return {
      success: false,
      error: 'Something went wrong. Please try again later.',
    }
  }

  // --- Send email notification (fire and forget — don't block success) ---
  sendPrayerNotification({
    name,
    email,
    phone,
    request,
    visibility: isPublic ? 'Public' : 'Private (prayer team only)',
  })

  return { success: true, hasEmail: !!email }
}
