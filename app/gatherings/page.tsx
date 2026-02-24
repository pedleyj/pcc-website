import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import {
  ClockIcon,
  MapPinIcon,
  PlayCircleIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import { getSiteSettings, getLatestMessages, getUpcomingEvents } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Gatherings | Peninsula Covenant Church',
  description: 'Join us for Sunday services, watch recent messages, and see upcoming events at PCC.',
}

export default async function GatheringsPage() {
  const [siteSettings, messages, events] = await Promise.all([
    getSiteSettings(),
    getLatestMessages(4),
    getUpcomingEvents(6),
  ])

  const serviceTimes = siteSettings
    ? (JSON.parse(siteSettings.serviceTimes) as { day: string; times: string[] }[])
    : [{ day: 'Sunday', times: ['9:00 AM', '10:45 AM'] }]
  const sunday = serviceTimes.find((s) => s.day === 'Sunday')

  // Group messages by series
  const currentSeries = messages.length > 0 ? messages[0].series : null

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center bg-pcc-navy">
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Gather with Us
          </h1>
          <p className="mt-6 text-xl text-white/90 sm:text-2xl">
            Worship, learn, and grow together every Sunday
          </p>
        </div>
      </section>

      {/* Sunday Services */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
            Sunday Services
          </h2>

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-pcc-cream-light p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <ClockIcon className="mt-0.5 h-6 w-6 shrink-0 text-pcc-gold" />
                <div>
                  <p className="text-sm font-medium text-pcc-slate">Service Times</p>
                  <p className="text-lg font-semibold text-pcc-navy">
                    Sundays at {sunday ? sunday.times.join(' & ') : '9:00 AM & 10:45 AM'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 h-6 w-6 shrink-0 text-pcc-gold" />
                <div>
                  <p className="text-sm font-medium text-pcc-slate">Location</p>
                  <p className="text-lg font-semibold text-pcc-navy">
                    {siteSettings?.address || '3560 Farm Hill Blvd, Redwood City'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-pcc-charcoal">
              <p>
                Our services are about 75 minutes and include worship through music, a relevant
                Bible-based message, and time for prayer and community.
              </p>
              <p>
                Kids programs are available during both services for nursery through 5th grade.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/new"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-pcc-gold px-6 py-2.5 font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors"
              >
                Plan Your Visit
              </Link>
              {siteSettings?.liveStreamUrl && (
                <a
                  href={siteSettings.liveStreamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-pcc-navy px-6 py-2.5 font-semibold text-pcc-navy hover:bg-pcc-navy hover:text-white transition-colors"
                >
                  <PlayCircleIcon className="h-5 w-5" />
                  Watch Live
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Current Series */}
      {currentSeries && (
        <section className="bg-pcc-navy">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-pcc-gold">
                Current Series
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{currentSeries}</h2>
              <p className="mt-4 text-lg text-white/70">
                Follow along with our latest teaching series
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Recent Messages */}
      {messages.length > 0 && (
        <section className="bg-pcc-cream-light">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
              Recent Messages
            </h2>
            <p className="mt-4 text-center text-lg text-pcc-slate">
              Catch up on what you&apos;ve missed
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {messages.map((message) => (
                <Link
                  key={message.id}
                  href={`/messages/${message.id}`}
                  className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden bg-pcc-navy">
                    <Image
                      src={message.thumbnail || 'https://placehold.co/1280x720/254b5a/white?text=PCC'}
                      alt={message.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {message.series && (
                      <span className="absolute left-3 top-3 rounded-full bg-pcc-teal px-3 py-1 text-xs font-semibold text-white">
                        {message.series}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
                      {message.title}
                    </h3>
                    <p className="mt-1 text-sm text-pcc-charcoal">{message.speaker}</p>
                    <p className="mt-1 text-sm text-pcc-slate">
                      {format(new Date(message.date), 'MMMM d, yyyy')}
                    </p>
                    {message.scripture && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-pcc-teal">
                        <BookOpenIcon className="h-3.5 w-3.5" />
                        <span>{message.scripture}</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/messages"
                className="inline-flex items-center gap-2 text-lg font-semibold text-pcc-navy hover:text-pcc-teal transition-colors"
              >
                View All Messages
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {events.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
              Upcoming Events
            </h2>
            <div className="mt-12 space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col gap-4 rounded-xl border border-pcc-cream-dark p-6 transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-pcc-navy">{event.title}</h3>
                      {event.featured && (
                        <span className="rounded-full bg-pcc-gold px-2 py-0.5 text-xs font-semibold text-pcc-navy">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-pcc-slate">
                      <span className="flex items-center gap-1">
                        <CalendarDaysIcon className="h-4 w-4" />
                        {format(new Date(event.startDate), 'MMM d')}
                        {event.endDate && ` – ${format(new Date(event.endDate), 'MMM d, yyyy')}`}
                        {!event.endDate && `, ${format(new Date(event.startDate), 'yyyy')}`}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="h-4 w-4" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                  {event.registrationOpen && event.registrationUrl ? (
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-lg bg-pcc-emerald px-5 py-2 text-center text-sm font-semibold text-white hover:bg-pcc-emerald-light transition-colors"
                    >
                      Register
                    </a>
                  ) : (
                    <Link
                      href={`/events/${event.id}`}
                      className="shrink-0 rounded-lg border-2 border-pcc-navy px-5 py-2 text-center text-sm font-semibold text-pcc-navy hover:bg-pcc-navy hover:text-white transition-colors"
                    >
                      Learn More
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
