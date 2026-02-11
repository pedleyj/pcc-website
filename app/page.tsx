import Link from 'next/link'
import { format } from 'date-fns'
import Image from 'next/image'
import { CalendarDaysIcon, ClockIcon, MapPinIcon, UserGroupIcon, PlayCircleIcon, BookOpenIcon, ArrowRightIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeroCarousel } from '@/components/home/hero-carousel'
import { getSiteSettings, getLatestMessages, getUpcomingEvents, getCurrentAlphaSession, getActiveMinistries } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [siteSettings, messages, events, alphaSession, ministries] = await Promise.all([
    getSiteSettings(),
    getLatestMessages(),
    getUpcomingEvents(),
    getCurrentAlphaSession(),
    getActiveMinistries(),
  ])

  return (
    <>
      {/* Hero Section */}
      <HeroCarousel />

      {/* Alpha Feature Section */}
      {alphaSession && (
        <section id="alpha" className="border-t-4 border-pcc-emerald bg-pcc-emerald/10 scroll-mt-16">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-pcc-emerald sm:text-4xl md:text-5xl">
                Discover Jesus Through Alpha
              </h2>
              <p className="mt-4 text-lg text-pcc-slate sm:text-xl">
                Explore life&apos;s big questions in a welcoming community
              </p>
            </div>

            <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-relaxed text-pcc-charcoal">
              {alphaSession.description}
            </p>

            <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CalendarDaysIcon className="mt-0.5 h-6 w-6 shrink-0 text-pcc-emerald" />
                  <div>
                    <p className="text-sm font-medium text-pcc-slate">Next session starts</p>
                    <p className="text-lg font-semibold text-pcc-navy">
                      {format(new Date(alphaSession.startDate), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ClockIcon className="mt-0.5 h-6 w-6 shrink-0 text-pcc-emerald" />
                  <div>
                    <p className="text-sm font-medium text-pcc-slate">Meeting</p>
                    <p className="text-lg font-semibold text-pcc-navy">
                      {alphaSession.meetingDay}, {alphaSession.meetingTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPinIcon className="mt-0.5 h-6 w-6 shrink-0 text-pcc-emerald" />
                  <div>
                    <p className="text-sm font-medium text-pcc-slate">Location</p>
                    <p className="text-lg font-semibold text-pcc-navy">
                      {alphaSession.location}
                    </p>
                  </div>
                </div>

                {alphaSession.maxCapacity && (
                  <div className="flex items-start gap-3">
                    <UserGroupIcon className="mt-0.5 h-6 w-6 shrink-0 text-pcc-emerald" />
                    <div>
                      <p className="text-sm font-medium text-pcc-slate">Availability</p>
                      <p className="text-lg font-semibold text-pcc-emerald">
                        {alphaSession.maxCapacity - alphaSession.currentCount} spots remaining
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 text-center">
                <a
                  href={alphaSession.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-pcc-emerald px-10 py-4 text-lg font-bold text-white shadow-md hover:bg-pcc-emerald-light transition-colors"
                >
                  Register for Alpha
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sunday Services Section */}
      {siteSettings && (
        <section id="services" className="bg-pcc-cream-light scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 md:grid-cols-2">
              {/* Left Column: Service Info */}
              <div>
                <h2 className="text-3xl font-bold text-pcc-navy sm:text-4xl">
                  Join Us This Sunday
                </h2>

                <div className="mt-6 flex items-center gap-3">
                  <ClockIcon className="h-6 w-6 shrink-0 text-pcc-gold" />
                  <p className="text-xl text-pcc-charcoal">
                    Sundays at{' '}
                    {(() => {
                      const parsed = JSON.parse(siteSettings.serviceTimes) as { day: string; times: string[] }[]
                      const sunday = parsed.find((s) => s.day === 'Sunday')
                      return sunday ? sunday.times.join(' & ') : '9:00 AM & 10:45 AM'
                    })()}
                  </p>
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <MapPinIcon className="mt-0.5 h-6 w-6 shrink-0 text-pcc-gold" />
                  <p className="text-lg text-pcc-charcoal">{siteSettings.address}</p>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteSettings.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-pcc-gold px-6 py-3 text-lg font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors"
                  >
                    <MapPinIcon className="h-5 w-5" />
                    Get Directions
                  </a>

                  {siteSettings.liveStreamUrl && (
                    <a
                      href={siteSettings.liveStreamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-pcc-navy px-6 py-3 text-lg font-semibold text-pcc-navy hover:bg-pcc-navy hover:text-white transition-colors"
                    >
                      <PlayCircleIcon className="h-5 w-5" />
                      Watch Live
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Map */}
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.123456789!2d-122.2234!3d37.4852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fa236e4f0fe03%3A0x8e79aborning!2s3560+Farm+Hill+Blvd%2C+Redwood+City%2C+CA+94061!5e0!3m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peninsula Covenant Church Location"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Messages Section */}
      {messages.length > 0 && (
        <section id="messages" className="bg-white scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-pcc-navy sm:text-4xl">
                Latest Messages
              </h2>
              <p className="mt-3 text-lg text-pcc-slate">
                Catch up on recent teachings from our community
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {messages.map((message) => (
                <Link
                  key={message.id}
                  href={`/messages/${message.id}`}
                  className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Thumbnail */}
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

                  {/* Card Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
                      {message.title}
                    </h3>
                    <p className="mt-1 text-sm text-pcc-charcoal">
                      {message.speaker}
                    </p>
                    <p className="mt-1 text-sm text-pcc-slate">
                      {format(new Date(message.date), 'MMMM d, yyyy')}
                    </p>
                    {message.scripture && (
                      <div className="mt-2 flex items-center gap-1 text-sm text-pcc-teal">
                        <BookOpenIcon className="h-4 w-4" />
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

      {/* Upcoming Events Section */}
      {events.length > 0 && (
        <section className="bg-pcc-cream-light">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-pcc-navy sm:text-4xl">
                Upcoming Events
              </h2>
              <p className="mt-3 text-lg text-pcc-slate">
                Get involved and connect with our community
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => {
                const categoryColors: Record<string, string> = {
                  alpha: 'bg-pcc-emerald',
                  kids: 'bg-pcc-gold text-pcc-navy',
                  youth: 'bg-pcc-orange',
                }
                const badgeClass = categoryColors[event.category] || 'bg-pcc-teal'

                return (
                  <div
                    key={event.id}
                    className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Event Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-pcc-navy">
                      <Image
                        src={event.imageUrl || 'https://placehold.co/800x600/254b5a/white?text=Event'}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute left-3 top-3 flex items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${badgeClass}`}>
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </span>
                        {event.featured && (
                          <span className="flex items-center gap-1 rounded-full bg-pcc-gold px-3 py-1 text-xs font-semibold text-pcc-navy">
                            <StarIcon className="h-3 w-3" />
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-xl font-bold text-pcc-navy">
                        {event.title}
                      </h3>

                      <div className="mt-3 flex items-center gap-2 text-sm text-pcc-charcoal">
                        <CalendarDaysIcon className="h-4 w-4 shrink-0 text-pcc-teal" />
                        <span>
                          {format(new Date(event.startDate), 'MMM d')}
                          {event.endDate && ` - ${format(new Date(event.endDate), 'MMM d, yyyy')}`}
                          {!event.endDate && `, ${format(new Date(event.startDate), 'yyyy')}`}
                        </span>
                      </div>

                      {event.location && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-pcc-charcoal">
                          <MapPinIcon className="h-4 w-4 shrink-0 text-pcc-teal" />
                          <span>{event.location}</span>
                        </div>
                      )}

                      <p className="mt-3 flex-1 text-sm leading-relaxed text-pcc-slate">
                        {event.description.length > 100
                          ? `${event.description.slice(0, 100)}...`
                          : event.description}
                      </p>

                      <div className="mt-4">
                        {event.registrationOpen && event.registrationUrl ? (
                          <a
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-full rounded-lg bg-pcc-emerald px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-pcc-emerald-light transition-colors"
                          >
                            Register
                          </a>
                        ) : (
                          <Link
                            href={`/events/${event.id}`}
                            className="inline-block w-full rounded-lg border-2 border-pcc-navy px-5 py-2.5 text-center text-sm font-semibold text-pcc-navy hover:bg-pcc-navy hover:text-white transition-colors"
                          >
                            Learn More
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-lg font-semibold text-pcc-navy hover:text-pcc-teal transition-colors"
              >
                See All Events
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Ministries Section */}
      {ministries.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-pcc-navy sm:text-4xl">
                Connect &amp; Grow
              </h2>
              <p className="mt-3 text-lg text-pcc-slate">
                Find your place in community
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {ministries.slice(0, 6).map((ministry) => {
                const categoryColors: Record<string, string> = {
                  outreach: 'bg-pcc-emerald',
                  kids: 'bg-pcc-gold',
                  youth: 'bg-pcc-orange',
                  adults: 'bg-pcc-teal',
                  worship: 'bg-pcc-navy',
                }
                const circleClass = categoryColors[ministry.category] || 'bg-pcc-teal'

                return (
                  <div
                    key={ministry.id}
                    className="group rounded-xl border border-pcc-cream-dark p-6 transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white ${circleClass}`}>
                        {ministry.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
                          {ministry.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-pcc-slate">
                          {ministry.description}
                        </p>
                        {ministry.leader && (
                          <p className="mt-2 text-xs text-pcc-charcoal">
                            Led by {ministry.leader}
                          </p>
                        )}
                        <Link
                          href={`/ministries#${ministry.category}`}
                          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-pcc-teal hover:text-pcc-teal-dark transition-colors"
                        >
                          Learn More
                          <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/ministries"
                className="inline-block rounded-lg bg-pcc-teal px-8 py-3 text-lg font-semibold text-white hover:bg-pcc-teal-light transition-colors"
              >
                Explore All Ministries
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Giving Section */}
      <section className="bg-pcc-sage/15">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-pcc-navy sm:text-4xl">
            Generosity Changes Lives
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-pcc-charcoal">
            Your generosity helps us serve our community, support missions, and guide the next generation to know Jesus.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {siteSettings?.donationUrl && (
              <a
                href={siteSettings.donationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-lg bg-pcc-gold px-8 py-3 text-lg font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors sm:w-auto"
              >
                Give Online
              </a>
            )}
            <Link
              href="/give"
              className="w-full rounded-lg border-2 border-pcc-navy px-8 py-3 text-lg font-semibold text-pcc-navy hover:bg-pcc-navy hover:text-white transition-colors sm:w-auto"
            >
              Learn About Giving
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
