'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import {
  NewspaperIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { submitNewsletterSignup, type NewsletterFormState } from '@/app/actions/newsletter'

const initialState: NewsletterFormState = { success: false }

export default function NewsletterPage() {
  const [state, formAction, isPending] = useActionState(submitNewsletterSignup, initialState)

  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Newsletter
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Stay connected with what&apos;s happening at PCC
          </p>
        </div>
      </section>

      {/* What You'll Receive */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-4xl px-4 pt-20 pb-10 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-pcc-navy">What You&apos;ll Receive</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <CalendarDaysIcon className="mx-auto h-8 w-8 text-pcc-navy" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-bold text-pcc-navy">Upcoming Events</h3>
              <p className="mt-2 text-sm text-pcc-slate">
                Be the first to know about services, gatherings, and community events.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <ChatBubbleLeftRightIcon className="mx-auto h-8 w-8 text-pcc-navy" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-bold text-pcc-navy">Sermon Highlights</h3>
              <p className="mt-2 text-sm text-pcc-slate">
                Catch up on recent messages and resources to help you go deeper.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <HeartIcon className="mx-auto h-8 w-8 text-pcc-navy" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-bold text-pcc-navy">Community Stories</h3>
              <p className="mt-2 text-sm text-pcc-slate">
                Read about how God is at work in our church and in the lives of our members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-10 shadow-md">
            {state.success ? (
              <div className="text-center">
                <CheckCircleIcon className="mx-auto h-12 w-12 text-pcc-teal" aria-hidden="true" />
                <h2 className="mt-6 text-2xl font-bold text-pcc-navy">You&apos;re Signed Up!</h2>
                <p className="mt-4 text-pcc-slate">
                  Thank you for subscribing. You&apos;ll start receiving our newsletter soon.
                  Keep an eye on your inbox!
                </p>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <NewspaperIcon className="mx-auto h-12 w-12 text-pcc-navy" aria-hidden="true" />
                  <h2 className="mt-6 text-2xl font-bold text-pcc-navy">Subscribe to Our Newsletter</h2>
                  <p className="mt-2 text-sm text-pcc-slate">
                    A weekly email with updates, encouragement, and ways to stay connected.
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
                    <label htmlFor="company">Company</label>
                    <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-pcc-navy">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      maxLength={254}
                      aria-describedby={state.fieldErrors?.email ? 'nl-email-error' : undefined}
                      aria-invalid={state.fieldErrors?.email ? true : undefined}
                      className="mt-1 block w-full rounded-lg border border-pcc-cream-dark px-4 py-2.5 text-pcc-navy placeholder:text-pcc-slate/50 focus:border-pcc-teal focus:outline-none focus:ring-2 focus:ring-pcc-teal/30"
                      placeholder="your@email.com"
                    />
                    {state.fieldErrors?.email && (
                      <p id="nl-email-error" className="mt-1 text-sm text-red-600">{state.fieldErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-pcc-navy">
                      Name <span className="font-normal text-pcc-slate/60">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      maxLength={100}
                      aria-describedby={state.fieldErrors?.name ? 'nl-name-error' : undefined}
                      aria-invalid={state.fieldErrors?.name ? true : undefined}
                      className="mt-1 block w-full rounded-lg border border-pcc-cream-dark px-4 py-2.5 text-pcc-navy placeholder:text-pcc-slate/50 focus:border-pcc-teal focus:outline-none focus:ring-2 focus:ring-pcc-teal/30"
                      placeholder="Your name"
                    />
                    {state.fieldErrors?.name && (
                      <p id="nl-name-error" className="mt-1 text-sm text-red-600">{state.fieldErrors.name}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full rounded-lg bg-pcc-navy px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-navy/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isPending ? 'Subscribing...' : 'Subscribe'}
                  </button>
                  <p className="text-center text-xs text-pcc-slate/60">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              </>
            )}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/about"
              className="text-sm font-medium text-pcc-navy hover:text-pcc-teal transition-colors"
            >
              &larr; Back to About
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
