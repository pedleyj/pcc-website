import type { Metadata } from 'next'
import Link from 'next/link'
import { UserGroupIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Our Pastor & Leadership | Peninsula Covenant Church',
  description: 'Meet the pastoral team and leaders who serve at PCC.',
}

export default function LeadershipPage() {
  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center bg-gradient-to-br from-pcc-navy to-pcc-deepBlue">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Our Pastor &amp; Leadership
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Meet the team that shepherds our church family
          </p>
        </div>
      </section>

      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-10 shadow-md">
            <UserGroupIcon className="mx-auto h-12 w-12 text-pcc-navy" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-bold text-pcc-navy">Servant Leaders</h2>
            <p className="mt-4 text-pcc-slate">
              Our pastoral team and church board are dedicated to serving our congregation and
              community with humility, wisdom, and love. We&apos;d love for you to get to know them.
            </p>
            <p className="mt-8 text-sm text-pcc-slate/70">
              Full content coming soon
            </p>
          </div>
          <Link
            href="/about"
            className="mt-8 inline-block text-sm font-medium text-pcc-navy hover:text-pcc-teal transition-colors"
          >
            &larr; Back to About
          </Link>
        </div>
      </section>
    </>
  )
}
