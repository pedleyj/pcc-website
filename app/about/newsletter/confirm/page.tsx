'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Suspense } from 'react'

function ConfirmContent() {
  const searchParams = useSearchParams()
  const status = searchParams.get('status')

  const isSuccess = status === 'success'

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
        </div>
      </section>

      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-10 text-center shadow-md">
            {isSuccess ? (
              <>
                <CheckCircleIcon className="mx-auto h-12 w-12 text-pcc-teal" aria-hidden="true" />
                <h2 className="mt-6 text-2xl font-bold text-pcc-navy">Subscription Confirmed!</h2>
                <p className="mt-4 text-pcc-slate">
                  You&apos;re all set! You&apos;ll start receiving the PCC newsletter.
                  Thanks for staying connected with us.
                </p>
              </>
            ) : (
              <>
                <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-pcc-gold" aria-hidden="true" />
                <h2 className="mt-6 text-2xl font-bold text-pcc-navy">Invalid or Expired Link</h2>
                <p className="mt-4 text-pcc-slate">
                  This confirmation link is no longer valid. Please try signing up again.
                </p>
                <Link
                  href="/about/newsletter"
                  className="mt-6 inline-block rounded-lg bg-pcc-navy px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-navy/90 transition-colors"
                >
                  Sign Up Again
                </Link>
              </>
            )}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-pcc-navy hover:text-pcc-teal transition-colors"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default function NewsletterConfirmPage() {
  return (
    <Suspense>
      <ConfirmContent />
    </Suspense>
  )
}
