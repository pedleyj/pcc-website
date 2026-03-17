'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Suspense } from 'react'

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const status = searchParams.get('status')

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
            {status === 'success' ? (
              <>
                <CheckCircleIcon className="mx-auto h-12 w-12 text-pcc-teal" aria-hidden="true" />
                <h2 className="mt-6 text-2xl font-bold text-pcc-navy">Unsubscribed</h2>
                <p className="mt-4 text-pcc-slate">
                  You&apos;ve been unsubscribed from the PCC newsletter. Sorry to see you go!
                </p>
                <p className="mt-2 text-sm text-pcc-slate/70">
                  Changed your mind? You can always{' '}
                  <Link href="/about/newsletter" className="text-pcc-teal hover:underline">
                    sign up again
                  </Link>.
                </p>
              </>
            ) : status === 'already' ? (
              <>
                <CheckCircleIcon className="mx-auto h-12 w-12 text-pcc-teal" aria-hidden="true" />
                <h2 className="mt-6 text-2xl font-bold text-pcc-navy">Already Unsubscribed</h2>
                <p className="mt-4 text-pcc-slate">
                  This email has already been unsubscribed from our newsletter.
                </p>
              </>
            ) : (
              <>
                <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-pcc-gold" aria-hidden="true" />
                <h2 className="mt-6 text-2xl font-bold text-pcc-navy">Invalid Link</h2>
                <p className="mt-4 text-pcc-slate">
                  This unsubscribe link is not valid. If you need help, please contact us at{' '}
                  <a href="mailto:info@wearepcc.com" className="text-pcc-teal hover:underline">
                    info@wearepcc.com
                  </a>.
                </p>
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

export default function NewsletterUnsubscribePage() {
  return (
    <Suspense>
      <UnsubscribeContent />
    </Suspense>
  )
}
