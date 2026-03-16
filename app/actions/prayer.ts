'use server'

import { headers } from 'next/headers'
import { validateTextField, validateEmailField } from '@/lib/utils/validation'
import { rateLimit } from '@/lib/utils/rate-limit'
import { createPrayerRequest } from '@/lib/db/queries'

export type PrayerFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string>
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

  const { allowed } = rateLimit(`prayer:${ip}`, 5, 60 * 60 * 1000) // 5 per hour
  if (!allowed) {
    return {
      success: false,
      error: 'Too many submissions. Please try again later.',
    }
  }

  // --- Honeypot check (bot detection) ---
  const honeypot = formData.get('website')
  if (honeypot) {
    // Bots fill hidden fields — silently accept to avoid revealing detection
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

  // --- TypeScript narrowing (all validated above) ---
  const name = (nameResult as { valid: true; value: string }).value
  const email = (emailResult as { valid: true; value: string | undefined }).value
  const request = (requestResult as { valid: true; value: string }).value
  const isConfidential = formData.get('confidential') === 'on'

  // --- Save to database ---
  try {
    await createPrayerRequest({
      name,
      email: email || undefined,
      request,
      isPublic: !isConfidential,
    })
  } catch {
    return {
      success: false,
      error: 'Something went wrong. Please try again later.',
    }
  }

  return { success: true }
}
