import type { Metadata } from 'next'
import Link from 'next/link'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { getAllEvents, getDistinctEventCategories } from '@/lib/db/queries'
import { CalendarView } from '@/components/events/calendar-view'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Events Calendar | Peninsula Covenant Church',
  description: 'Stay up to date with worship services, special events, and community gatherings at PCC.',
}

export default async function EventsPage() {
  const [events, categories] = await Promise.all([
    getAllEvents(),
    getDistinctEventCategories(),
  ])

  // Serialize dates for client component
  const serialized = events.map((e) => ({
    ...e,
    startDate: e.startDate.toISOString(),
    endDate: e.endDate?.toISOString() ?? null,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }))

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[30vh] items-center justify-center bg-pcc-navy">
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

      {/* Calendar */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <CalendarView events={serialized} categories={categories} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-pcc-navy">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">Want to Stay Connected?</h2>
          <p className="mt-3 text-white/80">
            Subscribe to our newsletter for weekly updates, event announcements, and encouragement.
          </p>
          <Link
            href="/about/newsletter"
            className="mt-6 inline-block rounded-lg bg-pcc-gold px-6 py-3 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </section>
    </>
  )
}
