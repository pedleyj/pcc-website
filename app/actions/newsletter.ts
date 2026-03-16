'use server'

import { headers } from 'next/headers'
import { validateEmailField, validateTextField } from '@/lib/utils/validation'
import { rateLimit } from '@/lib/utils/rate-limit'

export type NewsletterFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string>
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

  const { allowed } = rateLimit(`newsletter:${ip}`, 2, 60 * 60 * 1000)
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
  const { allowed: emailAllowed } = rateLimit(`newsletter-email:${email}`, 1, 24 * 60 * 60 * 1000)
  if (!emailAllowed) {
    return {
      success: false,
      error: 'This email is already signed up. Check your inbox for a confirmation.',
    }
  }

  // TODO: Connect to email service (Mailchimp, ConvertKit, etc.)
  // For now, log server-side only (not visible to browser)
  console.info('[Newsletter Signup]', { email, name: name || '(not provided)' })

  return { success: true }
}
