'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { HandRaisedIcon, CheckCircleIcon, ShieldCheckIcon, HeartIcon, UsersIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { submitPrayerRequest, type PrayerFormState } from '@/app/actions/prayer'

const initialState: PrayerFormState = { success: false }

export default function PrayerPage() {
  const [state, formAction, isPending] = useActionState(submitPrayerRequest, initialState)

  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Prayer Requests
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            You don&apos;t have to carry it alone
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 pt-20 pb-10 text-center sm:px-6 lg:px-8">
          <HeartIcon className="mx-auto h-12 w-12 text-pcc-forest" aria-hidden="true" />
          <h2 className="mt-6 text-2xl font-bold text-pcc-navy">We&apos;d Be Honored to Pray for You</h2>
          <p className="mt-4 text-lg text-pcc-slate leading-relaxed">
            Whatever you&apos;re going through — a health concern, a difficult season, a decision you&apos;re
            facing, gratitude for something good — we believe prayer makes a difference. Share
            what&apos;s on your heart and let our community come alongside you.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <HandRaisedIcon className="mx-auto h-8 w-8 text-pcc-forest" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-bold text-pcc-navy">Share Your Request</h3>
              <p className="mt-2 text-sm text-pcc-slate">
                Use the form below to tell us what you need prayer for. Share as much or as little as you&apos;re comfortable with.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <UsersIcon className="mx-auto h-8 w-8 text-pcc-forest" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-bold text-pcc-navy">Our Team Prays</h3>
              <p className="mt-2 text-sm text-pcc-slate">
                A dedicated prayer team reads every request and lifts each one up in prayer throughout the week.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <ShieldCheckIcon className="mx-auto h-8 w-8 text-pcc-forest" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-bold text-pcc-navy">Confidential & Safe</h3>
              <p className="mt-2 text-sm text-pcc-slate">
                Your request is handled with the utmost care. Confidential requests are seen only by our pastoral prayer team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-10 shadow-md">
            {state.success ? (
              <div className="text-center">
                <CheckCircleIcon className="mx-auto h-12 w-12 text-pcc-forest" aria-hidden="true" />
                <h2 className="mt-6 text-2xl font-bold text-pcc-navy">Thank You</h2>
                <p className="mt-4 text-pcc-slate">
                  Your prayer request has been received. Our prayer team will be lifting you up
                  this week. If you asked to be contacted, a pastor or care team member will reach out soon.
                </p>
                <Link
                  href="/support/prayer"
                  className="mt-6 inline-block text-sm font-medium text-pcc-forest hover:text-pcc-forest/80 transition-colors"
                >
                  Submit Another Request
                </Link>
              </div>
            ) : (
              <>
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
                  {/* Honeypot — hidden from real users, bots fill it */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

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
                      className="mt-1 block w-full rounded-lg border border-pcc-cream-dark px-4 py-2.5 text-pcc-navy placeholder:text-pcc-slate/50 focus:border-pcc-forest focus:outline-none focus:ring-2 focus:ring-pcc-forest/30"
                      placeholder="Your name"
                    />
                    {state.fieldErrors?.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-600">{state.fieldErrors.name}</p>
                    )}
                  </div>
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
                      className="mt-1 block w-full rounded-lg border border-pcc-cream-dark px-4 py-2.5 text-pcc-navy placeholder:text-pcc-slate/50 focus:border-pcc-forest focus:outline-none focus:ring-2 focus:ring-pcc-forest/30"
                      placeholder="your@email.com"
                    />
                    {state.fieldErrors?.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600">{state.fieldErrors.email}</p>
                    )}
                    <p id="email-hint" className="mt-1 text-xs text-pcc-slate/60">
                      Only needed if you&apos;d like someone to follow up with you personally.
                    </p>
                  </div>
                  <div>
                    <label htmlFor="request" className="block text-sm font-medium text-pcc-navy">
                      Prayer Request
                    </label>
                    <textarea
                      id="request"
                      name="request"
                      required
                      rows={5}
                      maxLength={5000}
                      aria-describedby={state.fieldErrors?.request ? 'request-error' : undefined}
                      aria-invalid={state.fieldErrors?.request ? true : undefined}
                      className="mt-1 block w-full rounded-lg border border-pcc-cream-dark px-4 py-2.5 text-pcc-navy placeholder:text-pcc-slate/50 focus:border-pcc-forest focus:outline-none focus:ring-2 focus:ring-pcc-forest/30"
                      placeholder="Share what's on your heart..."
                    />
                    {state.fieldErrors?.request && (
                      <p id="request-error" className="mt-1 text-sm text-red-600">{state.fieldErrors.request}</p>
                    )}
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="confidential"
                      name="confidential"
                      className="mt-1 h-4 w-4 rounded border-pcc-cream-dark text-pcc-forest focus:ring-pcc-forest/30"
                    />
                    <label htmlFor="confidential" className="text-sm text-pcc-slate">
                      Keep this request confidential (pastoral prayer team only)
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full rounded-lg bg-pcc-forest px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-forest/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-forest focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isPending ? 'Submitting...' : 'Submit Prayer Request'}
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="mt-8 rounded-xl border border-pcc-forest/20 bg-pcc-forest/5 p-6 text-center">
            <p className="text-sm text-pcc-slate leading-relaxed">
              <span className="font-semibold text-pcc-navy">Need immediate support?</span>{' '}
              If you&apos;re in crisis or need to talk to someone right away, please call the church
              office at{' '}
              <a href="tel:650-365-8094" className="font-medium text-pcc-forest hover:underline">
                650-365-8094
              </a>{' '}
              or email{' '}
              <a href="mailto:care@wearepcc.com" className="font-medium text-pcc-forest hover:underline">
                care@wearepcc.com
              </a>
              .
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/support"
              className="text-sm font-medium text-pcc-forest hover:text-pcc-forest/80 transition-colors"
            >
              &larr; Back to Support
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
