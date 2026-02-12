import type { Metadata } from 'next'
import Link from 'next/link'
import { HeartIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Stephen Ministry | Peninsula Covenant Church',
  description: 'Trained lay caregivers providing confidential, one-to-one Christian care at PCC.',
}

export default function StephenMinistryPage() {
  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center bg-gradient-to-br from-pcc-sage-dark to-pcc-forest">
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Stephen Ministry
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Confidential, one-to-one Christian care
          </p>
        </div>
      </section>

      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-10 shadow-md">
            <HeartIcon className="mx-auto h-12 w-12 text-pcc-forest" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-bold text-pcc-navy">You Don&apos;t Have to Walk Alone</h2>
            <p className="mt-4 text-pcc-slate">
              Stephen Ministers are trained lay caregivers who provide confidential, Christ-centered
              support during difficult times — grief, divorce, illness, job loss, or any life challenge.
            </p>
            <a
              href="mailto:care@wearepcc.com"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-pcc-forest px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-forest/90 transition-colors"
            >
              <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
              Request a Stephen Minister
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
