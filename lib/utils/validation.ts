/**
 * Input validation and sanitization utilities.
 * Used by server actions to validate user input before database operations.
 */

// Strip HTML tags from a string
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '')
}

// Sanitize text input: strip HTML, trim whitespace, collapse multiple spaces
export function sanitizeText(input: string): string {
  return stripHtml(input).replace(/\s+/g, ' ').trim()
}

// Validate email format
export function isValidEmail(email: string): boolean {
  // RFC 5322 simplified — covers 99.9% of real emails
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
}

// Validate a string field with length constraints
export function validateTextField(
  value: unknown,
  opts: { label: string; required?: boolean; minLength?: number; maxLength?: number }
): { valid: true; value: string } | { valid: false; error: string } {
  const { label, required = false, minLength = 1, maxLength = 5000 } = opts

  if (value === null || value === undefined || value === '') {
    if (required) return { valid: false, error: `${label} is required.` }
    return { valid: true, value: '' }
  }

  if (typeof value !== 'string') {
    return { valid: false, error: `${label} must be text.` }
  }

  const sanitized = sanitizeText(value)

  if (required && sanitized.length < minLength) {
    return { valid: false, error: `${label} must be at least ${minLength} characters.` }
  }

  if (sanitized.length > maxLength) {
    return { valid: false, error: `${label} must be ${maxLength} characters or less.` }
  }

  return { valid: true, value: sanitized }
}

// Validate an optional email field
export function validateEmailField(
  value: unknown
): { valid: true; value: string | undefined } | { valid: false; error: string } {
  if (value === null || value === undefined || value === '') {
    return { valid: true, value: undefined }
  }

  if (typeof value !== 'string') {
    return { valid: false, error: 'Email must be text.' }
  }

  const trimmed = value.trim().toLowerCase()

  if (!isValidEmail(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address.' }
  }

  return { valid: true, value: trimmed }
}
