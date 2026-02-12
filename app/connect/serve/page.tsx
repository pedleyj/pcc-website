import type { Metadata } from 'next'
import Link from 'next/link'
import { HandRaisedIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Serve Opportunities | Peninsula Covenant Church',
  description: 'Use your gifts to serve others at PCC and in the community.',
}

export default function ServePage() {
  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center bg-gradient-to-br from-pcc-teal-dark to-pcc-navy">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Serve Opportunities
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Use your gifts to serve others
          </p>
        </div>
      </section>

      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-10 shadow-md">
            <HandRaisedIcon className="mx-auto h-12 w-12 text-pcc-teal" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-bold text-pcc-navy">Make a Difference</h2>
            <p className="mt-4 text-pcc-slate">
              There are many ways to serve at PCC — from Sunday morning teams to community outreach.
              Whatever your gifts, there&apos;s a place for you.
            </p>
            <a
              href="mailto:serve@wearepcc.com"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-pcc-teal px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-teal-light transition-colors"
            >
              <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
              Contact Us About Serving
            </a>
            <p className="mt-8 text-sm text-pcc-slate/70">
              Coming soon: Browse serve opportunities online
            </p>
          </div>
          <Link
            href="/connect"
            className="mt-8 inline-block text-sm font-medium text-pcc-teal hover:text-pcc-teal-dark transition-colors"
          >
            &larr; Back to Connect
          </Link>
        </div>
      </section>
    </>
  )
}
