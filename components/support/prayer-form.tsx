'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { submitPrayerRequest, type PrayerFormState } from '@/app/actions/prayer'

const initialState: PrayerFormState = { success: false }

const inputClass =
  'mt-1 block w-full rounded-lg border border-pcc-cream-dark px-4 py-2.5 text-pcc-navy placeholder:text-pcc-slate/50 focus:border-pcc-forest focus:outline-none focus:ring-2 focus:ring-pcc-forest/30'

export function PrayerForm() {
  const [state, formAction, isPending] = useActionState(submitPrayerRequest, initialState)

  if (state.success) {
    return (
      <div className="rounded-xl bg-white p-10 shadow-md text-center">
        <CheckCircleIcon className="mx-auto h-12 w-12 text-pcc-forest" aria-hidden="true" />
        <h2 className="mt-6 text-2xl font-bold text-pcc-navy">Thank You</h2>
        <p className="mt-4 text-pcc-slate">
          Your prayer request has been received. Our prayer team will be lifting you up this week.
        </p>
        {state.hasEmail && (
          <p className="mt-2 text-sm text-pcc-forest">
            You&apos;ll receive a confirmation at the email you provided.
          </p>
        )}
        <Link
          href="/support/prayer"
          className="mt-6 inline-block text-sm font-medium text-pcc-forest hover:text-pcc-forest/80 transition-colors"
        >
          Submit Another Request
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-white p-10 shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-pcc-navy">Share Your Request</h2>
        <p className="mt-2 text-sm text-pcc-slate">
          You don&apos;t need to attend PCC to submit a prayer request. Everyone is welcome.
        </p>
      </div>

      {state.error && !state.fieldErrors && (
        <div role="alert" className="mt-6 flex items-start gap-3 rounded-lg bg-red-50 p-4">
          <ExclamationCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
          <p className="text-sm text-red-700">{state.error}</p>
        </div>
      )}

      {state.fieldErrors && (
        <div role="alert" className="sr-only">
          Please fix the following errors: {Object.values(state.fieldErrors).join('. ')}
        </div>
      )}

      <form action={formAction} className="mt-8 space-y-5">
        {/* Honeypot */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-pcc-navy">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            maxLength={100}
            aria-describedby={state.fieldErrors?.name ? 'name-error' : undefined}
            aria-invalid={state.fieldErrors?.name ? true : undefined}
            className={inputClass}
            placeholder="Your name"
          />
          {state.fieldErrors?.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">{state.fieldErrors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-pcc-navy">
            Email <span className="font-normal text-pcc-slate/60">(optional)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            maxLength={254}
            aria-describedby={state.fieldErrors?.email ? 'email-error' : 'email-hint'}
            aria-invalid={state.fieldErrors?.email ? true : undefined}
            className={inputClass}
            placeholder="your@email.com"
          />
          {state.fieldErrors?.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">{state.fieldErrors.email}</p>
          )}
          <p id="email-hint" className="mt-1 text-xs text-pcc-slate/60">
            Only needed if you&apos;d like someone to follow up with you personally.
          </p>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-pcc-navy">
            Phone <span className="font-normal text-pcc-slate/60">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            maxLength={20}
            aria-describedby={state.fieldErrors?.phone ? 'phone-error' : undefined}
            aria-invalid={state.fieldErrors?.phone ? true : undefined}
            className={inputClass}
            placeholder="(650) 555-1234"
          />
          {state.fieldErrors?.phone && (
            <p id="phone-error" className="mt-1 text-sm text-red-600">{state.fieldErrors.phone}</p>
          )}
        </div>

        {/* Prayer Request */}
        <div>
          <label htmlFor="request" className="block text-sm font-medium text-pcc-navy">
            Prayer Request
          </label>
          <textarea
            id="request"
            name="request"
            required
            rows={6}
            maxLength={5000}
            aria-describedby={state.fieldErrors?.request ? 'request-error' : undefined}
            aria-invalid={state.fieldErrors?.request ? true : undefined}
            className={inputClass}
            placeholder="Share what's on your heart..."
          />
          {state.fieldErrors?.request && (
            <p id="request-error" className="mt-1 text-sm text-red-600">{state.fieldErrors.request}</p>
          )}
        </div>

        {/* Visibility */}
        <fieldset>
          <legend className="block text-sm font-medium text-pcc-navy">Who can see this request?</legend>
          <div className="mt-3 space-y-3">
            <label className="flex min-h-[44px] items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="private"
                defaultChecked
                className="mt-0.5 h-4 w-4 border-pcc-cream-dark text-pcc-forest focus:ring-pcc-forest/30"
              />
              <div>
                <span className="text-sm font-medium text-pcc-navy">Share with prayer team only</span>
                <span className="block text-xs text-pcc-slate/70">Your request stays confidential with our pastoral prayer team.</span>
              </div>
            </label>
            <label className="flex min-h-[44px] items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="public"
                className="mt-0.5 h-4 w-4 border-pcc-cream-dark text-pcc-forest focus:ring-pcc-forest/30"
              />
              <div>
                <span className="text-sm font-medium text-pcc-navy">Share publicly on website</span>
                <span className="block text-xs text-pcc-slate/70">Your first name and request will be visible so others can pray for you too.</span>
              </div>
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-pcc-forest px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-forest/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-forest focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? 'Submitting...' : 'Submit Prayer Request'}
        </button>
      </form>
    </div>
  )
}
