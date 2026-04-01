'use client'

import { useActionState } from 'react'
import { submitAlphaInterest, type AlphaInterestFormState } from '@/app/actions/alpha-interest'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

const initialState: AlphaInterestFormState = { success: false }

export function AlphaInterestForm({ sessionId }: { sessionId?: string }) {
  const [state, formAction, isPending] = useActionState(submitAlphaInterest, initialState)

  if (state.success) {
    return (
      <div className="rounded-xl bg-pcc-emerald/10 p-8 text-center">
        <CheckCircleIcon className="mx-auto h-12 w-12 text-pcc-emerald" />
        <p className="mt-4 text-lg font-semibold text-pcc-navy">
          You&apos;re on the list!
        </p>
        <p className="mt-2 text-pcc-slate">
          We&apos;ll email you as soon as registration opens for the next Alpha session.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="alpha-company">Company</label>
        <input type="text" id="alpha-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {sessionId && <input type="hidden" name="sessionId" value={sessionId} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="alpha-firstName" className="block text-sm font-medium text-pcc-navy">
            First Name
          </label>
          <input
            type="text"
            id="alpha-firstName"
            name="firstName"
            maxLength={100}
            placeholder="Your first name"
            className="mt-1 w-full rounded-lg border border-pcc-cream-dark px-4 py-3 text-sm text-pcc-navy placeholder:text-pcc-slate/50 focus:border-pcc-teal focus:outline-none focus:ring-2 focus:ring-pcc-teal/30"
          />
          {state.fieldErrors?.name && (
            <p className="mt-1 text-xs text-red-600" role="alert">{state.fieldErrors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="alpha-email" className="block text-sm font-medium text-pcc-navy">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="alpha-email"
            name="email"
            required
            maxLength={254}
            placeholder="you@example.com"
            className="mt-1 w-full rounded-lg border border-pcc-cream-dark px-4 py-3 text-sm text-pcc-navy placeholder:text-pcc-slate/50 focus:border-pcc-teal focus:outline-none focus:ring-2 focus:ring-pcc-teal/30"
          />
          {state.fieldErrors?.email && (
            <p className="mt-1 text-xs text-red-600" role="alert">{state.fieldErrors.email}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-pcc-emerald px-8 py-3 text-lg font-semibold text-white hover:bg-pcc-emerald/90 transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
      >
        {isPending ? 'Submitting...' : 'Notify Me When Registration Opens'}
      </button>

      {state.error && !state.fieldErrors && (
        <p className="text-sm text-red-600 text-center" role="alert">{state.error}</p>
      )}
    </form>
  )
}
