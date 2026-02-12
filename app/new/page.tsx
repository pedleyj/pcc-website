import type { Metadata } from 'next'
import Link from 'next/link'
import {
  MapPinIcon,
  ClockIcon,
  MusicalNoteIcon,
  UserGroupIcon,
  HeartIcon,
  SparklesIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import { getSiteSettings } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "I'm New | Peninsula Covenant Church",
  description: 'Plan your first visit to PCC. Discover what to expect on Sunday, service times, directions, and how to get connected.',
}

export default async function NewVisitorPage() {
  const siteSettings = await getSiteSettings()

  const serviceTimes = siteSettings
    ? (JSON.parse(siteSettings.serviceTimes) as { day: string; times: string[] }[])
    : [{ day: 'Sunday', times: ['9:00 AM', '10:45 AM'] }]
  const sunday = serviceTimes.find((s) => s.day === 'Sunday')

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center bg-gradient-to-br from-pcc-navy to-pcc-deepBlue">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Welcome to PCC!
          </h1>
          <p className="mt-6 text-xl text-white/90 sm:text-2xl">
            We&apos;re so glad you&apos;re here. Come as you are — you belong.
          </p>
          <a
            href="#plan"
            className="mt-8 inline-block rounded-lg bg-pcc-gold px-8 py-3 text-lg font-semibold text-pcc-navy shadow-lg hover:bg-pcc-gold-light transition-colors"
          >
            Plan Your Visit
          </a>
        </div>
      </section>

      {/* What to Expect */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
            What to Expect on Sunday
          </h2>
          <p className="mt-4 text-center text-lg text-pcc-slate">
            Here&apos;s what a typical Sunday looks like at PCC
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: HeartIcon,
                title: 'Warm Welcome',
                desc: 'Our greeters will help you find your way. Grab a coffee and feel at home.',
              },
              {
                icon: MusicalNoteIcon,
                title: 'Worship',
                desc: 'We sing together — a mix of contemporary and classic songs led by our worship team.',
              },
              {
                icon: SparklesIcon,
                title: 'Message',
                desc: 'A relevant, Bible-based talk that connects Scripture to everyday life.',
              },
              {
                icon: UserGroupIcon,
                title: 'Community',
                desc: 'After service, stick around! Meet people, ask questions, and connect.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pcc-gold/20 text-pcc-gold">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-pcc-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-pcc-slate">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl bg-pcc-cream-light p-6 text-center">
            <ClockIcon className="mx-auto h-8 w-8 text-pcc-gold" />
            <p className="mt-3 text-xl font-semibold text-pcc-navy">
              Sundays at {sunday ? sunday.times.join(' & ') : '9:00 AM & 10:45 AM'}
            </p>
            <p className="mt-1 text-pcc-slate">Services are about 75 minutes</p>
          </div>
        </div>
      </section>

      {/* Plan Your Visit */}
      <section id="plan" className="scroll-mt-16 bg-pcc-cream-light">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
            Plan Your Visit
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Info cards */}
            <div className="space-y-6">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <h3 className="flex items-center gap-2 text-lg font-bold text-pcc-navy">
                  <MapPinIcon className="h-5 w-5 text-pcc-gold" />
                  Location &amp; Parking
                </h3>
                <p className="mt-2 text-pcc-charcoal">
                  {siteSettings?.address || '3560 Farm Hill Boulevard, Redwood City, CA 94061'}
                </p>
                <p className="mt-2 text-sm text-pcc-slate">
                  Free parking is available in our lot. Overflow parking is available on Farm Hill Boulevard.
                </p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteSettings?.address || '3560 Farm Hill Boulevard, Redwood City, CA 94061')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-pcc-teal hover:text-pcc-teal-dark transition-colors"
                >
                  Get Directions →
                </a>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-md">
                <h3 className="text-lg font-bold text-pcc-navy">What Should I Wear?</h3>
                <p className="mt-2 text-pcc-charcoal">
                  Come as you are! Most people dress casually — jeans are perfectly fine. We want you
                  to be comfortable.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-md">
                <h3 className="text-lg font-bold text-pcc-navy">Kids &amp; Youth</h3>
                <p className="mt-2 text-pcc-charcoal">
                  We have programs for all ages during both services. Check in your kids at the
                  welcome desk in the lobby — our team will help you get settled.
                </p>
                <ul className="mt-2 space-y-1 text-sm text-pcc-slate">
                  <li>• Nursery (0-2 years)</li>
                  <li>• Kids Ministry (PreK - 5th grade)</li>
                  <li>• Youth Ministry (6th - 12th grade)</li>
                </ul>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.123456789!2d-122.2234!3d37.4852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fa236e4f0fe03%3A0x8e79aborning!2s3560+Farm+Hill+Blvd%2C+Redwood+City%2C+CA+94061!5e0!3m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 400 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peninsula Covenant Church Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
            Your Next Steps
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl border border-pcc-cream-dark p-8 text-center transition-all hover:shadow-lg">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pcc-gold/20 text-3xl font-bold text-pcc-gold">
                1
              </div>
              <h3 className="mt-4 text-xl font-bold text-pcc-navy">Visit on Sunday</h3>
              <p className="mt-2 text-pcc-slate">
                Join us for a service. Our greeters will make sure you feel welcome.
              </p>
            </div>
            <div className="rounded-xl border border-pcc-cream-dark p-8 text-center transition-all hover:shadow-lg">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pcc-emerald/20 text-3xl font-bold text-pcc-emerald">
                2
              </div>
              <h3 className="mt-4 text-xl font-bold text-pcc-navy">Join Alpha</h3>
              <p className="mt-2 text-pcc-slate">
                Explore faith at your own pace with good food and great conversation.
              </p>
              <Link
                href="/explore-faith/alpha"
                className="mt-3 inline-block text-sm font-semibold text-pcc-emerald hover:text-pcc-emerald-dark transition-colors"
              >
                Learn about Alpha →
              </Link>
            </div>
            <div className="rounded-xl border border-pcc-cream-dark p-8 text-center transition-all hover:shadow-lg">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pcc-teal/20 text-3xl font-bold text-pcc-teal">
                3
              </div>
              <h3 className="mt-4 text-xl font-bold text-pcc-navy">Connect in a Group</h3>
              <p className="mt-2 text-pcc-slate">
                Find community in a small group where you can grow and belong.
              </p>
              <Link
                href="/ministries"
                className="mt-3 inline-block text-sm font-semibold text-pcc-teal hover:text-pcc-teal-dark transition-colors"
              >
                Browse ministries →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-pcc-navy to-pcc-deepBlue">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            We Can&apos;t Wait to Meet You!
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Sundays at {sunday ? sunday.times.join(' & ') : '9:00 AM & 10:45 AM'} •{' '}
            {siteSettings?.address || '3560 Farm Hill Blvd, Redwood City'}
          </p>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteSettings?.address || '3560 Farm Hill Boulevard, Redwood City, CA 94061')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-lg bg-pcc-gold px-10 py-4 text-lg font-bold text-pcc-navy shadow-lg hover:bg-pcc-gold-light transition-colors"
          >
            Get Directions
          </a>
        </div>
      </section>
    </>
  )
}
