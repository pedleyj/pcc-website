'use client'

import { useActionState } from 'react'
import { submitNewsletterSignup, type NewsletterFormState } from '@/app/actions/newsletter'

const initialState: NewsletterFormState = { success: false }

export function FooterNewsletter() {
  const [state, formAction, isPending] = useActionState(submitNewsletterSignup, initialState)

  if (state.success) {
    return (
      <p className="text-sm text-pcc-teal-light">
        Check your email to confirm your subscription!
      </p>
    )
  }

  return (
    <form action={formAction} className="space-y-2">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="footer-company">Company</label>
        <input type="text" id="footer-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          maxLength={254}
          placeholder="Your email"
          aria-label="Email address for newsletter"
          className="min-w-0 flex-1 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-pcc-teal focus:outline-none focus:ring-1 focus:ring-pcc-teal"
        />
        <button
          type="submit"
          disabled={isPending}
          className="shrink-0 rounded-md bg-pcc-gold px-4 py-2 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold/90 transition-colors disabled:opacity-60"
        >
          {isPending ? '...' : 'Subscribe'}
        </button>
      </div>

      {/* Optional name - hidden in footer for compactness */}
      <input type="hidden" name="name" value="" />

      {state.error && (
        <p className="text-xs text-red-300">{state.error}</p>
      )}
    </form>
  )
}
