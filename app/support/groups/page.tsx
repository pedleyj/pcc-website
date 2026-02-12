import type { Metadata } from 'next'
import Link from 'next/link'
import { UserGroupIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Support Groups | Peninsula Covenant Church',
  description: 'Find hope and healing in a supportive group setting at PCC.',
}

export default function SupportGroupsPage() {
  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center bg-gradient-to-br from-pcc-sage-dark to-pcc-forest">
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Support Groups
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Find hope and healing together
          </p>
        </div>
      </section>

      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-10 shadow-md">
            <UserGroupIcon className="mx-auto h-12 w-12 text-pcc-forest" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-bold text-pcc-navy">You&apos;re Not Alone</h2>
            <p className="mt-4 text-pcc-slate">
              Our support groups provide a safe, confidential space for people walking through
              similar challenges — grief, addiction recovery, divorce care, and more.
            </p>
            <a
              href="mailto:care@wearepcc.com"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-pcc-forest px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-forest/90 transition-colors"
            >
              <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
              Find a Group
            </a>
            <p className="mt-8 text-sm text-pcc-slate/70">
              Learn more coming soon
            </p>
          </div>
          <Link
            href="/support"
            className="mt-8 inline-block text-sm font-medium text-pcc-forest hover:text-pcc-forest/80 transition-colors"
          >
            &larr; Back to Support
          </Link>
        </div>
      </section>
    </>
  )
}
