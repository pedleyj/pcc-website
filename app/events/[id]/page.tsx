import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import {
  ChevronRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
  ArrowDownTrayIcon,
  StarIcon,
} from '@heroicons/react/24/outline'
import { getEventById } from '@/lib/db/queries'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const event = await getEventById(id)
  if (!event) return { title: 'Event Not Found' }
  return {
    title: `${event.title} | PCC Events`,
    description: event.description.slice(0, 160),
  }
}

function formatIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function generateIcs(event: {
  title: string
  description: string
  startDate: Date
  endDate: Date | null
  startTime: string | null
  location: string | null
}): string {
  const start = formatIcsDate(event.startDate)
  const end = event.endDate ? formatIcsDate(event.endDate) : start
  const desc = event.description.replace(/\n/g, '\\n').slice(0, 500)

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PCC//Events//EN',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${desc}`,
    event.location ? `LOCATION:${event.location}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).join('\r\n')
}

const categoryLabels: Record<string, string> = {
  worship: 'Worship',
  alpha: 'Alpha',
  ministry: 'Ministry',
  youth: 'Youth',
  kids: 'Kids',
  outreach: 'Outreach',
  community: 'Community',
}

const categoryColors: Record<string, string> = {
  worship: 'bg-pcc-navy/10 text-pcc-navy',
  alpha: 'bg-pcc-emerald/10 text-pcc-emerald',
  ministry: 'bg-pcc-teal/10 text-pcc-teal',
  youth: 'bg-pcc-orange/10 text-pcc-orange',
  kids: 'bg-pcc-gold/10 text-pcc-gold-dark',
  outreach: 'bg-pcc-sage/10 text-pcc-forest',
  community: 'bg-pcc-crimson/10 text-pcc-crimson',
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const event = await getEventById(id)

  if (!event) notFound()

  const icsContent = generateIcs(event)
  const icsDataUri = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`

  const catLabel = categoryLabels[event.category] || event.category.charAt(0).toUpperCase() + event.category.slice(1)
  const catColor = categoryColors[event.category] || 'bg-pcc-slate/10 text-pcc-slate'

  return (
    <>
      {/* Hero */}
      <section className="relative bg-pcc-navy">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-1 text-sm text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
            <Link href="/events" className="hover:text-white transition-colors">Events</Link>
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
            <span className="text-white truncate">{event.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${catColor}`}>
              {catLabel}
            </span>
            {event.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-pcc-gold/20 px-3 py-1 text-xs font-semibold text-pcc-gold">
                <StarIcon className="h-3 w-3" aria-hidden="true" />
                Featured
              </span>
            )}
            {event.registrationOpen && (
              <span className="rounded-full bg-pcc-emerald/20 px-3 py-1 text-xs font-semibold text-pcc-emerald-light">
                Registration Open
              </span>
            )}
          </div>

          <h1
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            {event.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event image */}
              {event.imageUrl && (
                <div className="overflow-hidden rounded-xl shadow-md">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    width={800}
                    height={450}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              )}

              {/* Description */}
              <div className="rounded-xl bg-white p-6 shadow-md sm:p-8">
                <h2 className="text-xl font-bold text-pcc-navy">About This Event</h2>
                <div className="mt-4 space-y-4 text-pcc-slate leading-relaxed whitespace-pre-line">
                  {event.description}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Details card */}
              <div className="rounded-xl bg-white p-6 shadow-md">
                <h2 className="text-lg font-bold text-pcc-navy">Event Details</h2>

                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <CalendarDaysIcon className="mt-0.5 h-5 w-5 shrink-0 text-pcc-teal" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-pcc-navy">Date</p>
                      <p className="text-sm text-pcc-slate">
                        {format(new Date(event.startDate), 'EEEE, MMMM d, yyyy')}
                        {event.endDate && (
                          <> – {format(new Date(event.endDate), 'MMMM d, yyyy')}</>
                        )}
                      </p>
                    </div>
                  </div>

                  {(event.startTime || event.endTime) && (
                    <div className="flex items-start gap-3">
                      <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-pcc-teal" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-medium text-pcc-navy">Time</p>
                        <p className="text-sm text-pcc-slate">
                          {event.startTime}{event.endTime && ` – ${event.endTime}`}
                        </p>
                      </div>
                    </div>
                  )}

                  {event.location && (
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-pcc-teal" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-medium text-pcc-navy">Location</p>
                        <p className="text-sm text-pcc-slate">{event.location}</p>
                      </div>
                    </div>
                  )}

                  {event.recurring && event.recurrenceRule && (
                    <div className="flex items-start gap-3">
                      <CalendarDaysIcon className="mt-0.5 h-5 w-5 shrink-0 text-pcc-teal" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-medium text-pcc-navy">Recurring</p>
                        <p className="text-sm text-pcc-slate capitalize">{event.recurrenceRule}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {event.registrationOpen && event.registrationUrl && (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-pcc-emerald px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-emerald-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
                  >
                    Register on Church Center
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}

                <a
                  href={icsDataUri}
                  download={`${event.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.ics`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-pcc-navy px-6 py-3 text-sm font-semibold text-pcc-navy hover:bg-pcc-navy hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
                  Add to Calendar
                </a>
              </div>

              {/* Back link */}
              <Link
                href="/events"
                className="inline-block text-sm font-medium text-pcc-teal hover:text-pcc-teal-dark transition-colors"
              >
                &larr; Back to Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
