import type { Metadata } from 'next'
import Link from 'next/link'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Events Calendar | Peninsula Covenant Church',
  description: 'Stay up to date with worship services, special events, and community gatherings at PCC.',
}

export default function EventsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[30vh] items-center justify-center bg-gradient-to-br from-pcc-navy to-pcc-deepBlue">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <CalendarDaysIcon className="mx-auto h-12 w-12 text-pcc-gold" aria-hidden="true" />
          <h1
            className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Events Calendar
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Find upcoming services, events, and gatherings at PCC
          </p>
        </div>
      </section>

      {/* Calendar Embed */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <iframe
            src="https://wearepcc.churchcenter.com/calendar?embed=true&view=list"
            width="100%"
            style={{ border: 0, minHeight: '800px' }}
            title="PCC Events Calendar"
            loading="lazy"
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-pcc-navy">Want to Stay Connected?</h2>
          <p className="mt-3 text-pcc-slate">
            Subscribe to our newsletter for weekly updates, event announcements, and encouragement.
          </p>
          <Link
            href="/about/newsletter"
            className="mt-6 inline-block rounded-lg bg-pcc-navy px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-navy/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </section>
    </>
  )
}
