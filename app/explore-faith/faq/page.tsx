import type { Metadata } from 'next'
import Link from 'next/link'
import { ChatBubbleLeftRightIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Questions About Christianity | Peninsula Covenant Church',
  description: 'Have questions about faith, God, or Christianity? We would love to talk with you.',
}

export default function FaqPage() {
  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Questions About Christianity
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Have questions? We&apos;d love to talk with you.
          </p>
        </div>
      </section>

      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-10 shadow-md">
            <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-pcc-teal" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-bold text-pcc-navy">We&apos;re Here to Listen</h2>
            <p className="mt-4 text-pcc-slate">
              Whether you&apos;re exploring faith for the first time or have been on the journey for
              years, no question is too big or too small. Reach out and let&apos;s start a conversation.
            </p>
            <a
              href="mailto:info@wearepcc.com"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-pcc-teal px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-teal-light transition-colors"
            >
              <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
              Email Us
            </a>
            <p className="mt-8 text-sm text-pcc-slate/70">
              Coming soon: FAQ section with answers to common questions
            </p>
          </div>
          <Link
            href="/explore-faith"
            className="mt-8 inline-block text-sm font-medium text-pcc-teal hover:text-pcc-teal-dark transition-colors"
          >
            &larr; Back to Explore Faith
          </Link>
        </div>
      </section>
    </>
  )
}
