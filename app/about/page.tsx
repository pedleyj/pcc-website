import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  MapPinIcon,
  ClockIcon,
  EnvelopeIcon,
  PhoneIcon,
  HeartIcon,
  BookOpenIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline'
import { getSiteSettings } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About | Peninsula Covenant Church',
  description: 'Learn about PCC — our mission, story, beliefs, and the team that serves our community in Redwood City, CA.',
}

export default async function AboutPage() {
  const siteSettings = await getSiteSettings()

  const serviceTimes = siteSettings
    ? (JSON.parse(siteSettings.serviceTimes) as { day: string; times: string[] }[])
    : [{ day: 'Sunday', times: ['9:00 AM', '10:45 AM'] }]
  const sunday = serviceTimes.find((s) => s.day === 'Sunday')

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center bg-gradient-to-br from-pcc-navy to-pcc-deepBlue">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            About Peninsula Covenant Church
          </h1>
          <p className="mt-6 text-xl text-white/90 sm:text-2xl">
            A Christ-centered community in the heart of Redwood City
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section id="mission" className="scroll-mt-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">Our Mission</h2>
          <p className="mx-auto mt-8 max-w-3xl text-center text-2xl font-semibold leading-relaxed text-pcc-teal">
            We exist to know Jesus deeply, follow Him faithfully, and guide the next generation to do
            the same.
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-pcc-charcoal">
            At PCC, we believe that life is found in a growing relationship with Jesus Christ. We are
            a multi-generational community committed to worship, discipleship, and serving one another
            and our neighbors in love.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="scroll-mt-20 bg-pcc-cream-light">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">Our Story</h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-pcc-charcoal">
            <p>
              Peninsula Covenant Church has been a cornerstone of the Redwood City community for
              decades. What began as a small gathering of believers has grown into a vibrant,
              multi-generational church family.
            </p>
            <p>
              We are part of the Evangelical Covenant Church (ECC), a denomination rooted in historic
              Christianity with an emphasis on the centrality of Scripture, the new birth in Christ,
              and the whole mission of the church.
            </p>
            <p>
              Our campus on Farm Hill Boulevard is home not only to our church but also to the PCC
              Preschool, the Peninsula Community Center, and the School Age Child Care program — all
              serving families throughout the peninsula.
            </p>
          </div>
        </div>
      </section>

      {/* Learn More Hub */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
            Learn More
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-pcc-slate">
            Explore everything about our church community
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Our Mission & Story */}
            <Link
              href="#mission"
              className="group flex h-full flex-col rounded-xl bg-pcc-cream-light p-8 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pcc-navy/10 text-pcc-navy">
                <HeartIcon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
                Our Mission &amp; Story
              </h3>
              <p className="mt-2 flex-grow text-sm leading-relaxed text-pcc-slate">
                Discover who we are, where we came from, and the mission that drives everything we do.
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-pcc-teal">
                Read Below <span aria-hidden="true" className="ml-1">&rarr;</span>
              </span>
            </Link>

            {/* What We Believe */}
            <Link
              href="/about/beliefs"
              className="group flex h-full flex-col rounded-xl bg-pcc-cream-light p-8 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pcc-navy/10 text-pcc-navy">
                <BookOpenIcon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
                What We Believe
              </h3>
              <p className="mt-2 flex-grow text-sm leading-relaxed text-pcc-slate">
                The core beliefs and values that guide our church community and shape our faith.
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-pcc-teal">
                Learn More <span aria-hidden="true" className="ml-1">&rarr;</span>
              </span>
            </Link>

            {/* Our Leadership */}
            <Link
              href="/about/leadership"
              className="group flex h-full flex-col rounded-xl bg-pcc-cream-light p-8 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pcc-navy/10 text-pcc-navy">
                <UserGroupIcon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
                Our Leadership
              </h3>
              <p className="mt-2 flex-grow text-sm leading-relaxed text-pcc-slate">
                Meet the Leadership Team who oversee the mission and direction of PCC.
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-pcc-teal">
                Learn More <span aria-hidden="true" className="ml-1">&rarr;</span>
              </span>
            </Link>

            {/* Our Team — featured card with photo */}
            <Link
              href="/about/staff"
              className="group flex h-full flex-col overflow-hidden rounded-xl bg-pcc-cream-light shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
            >
              <div className="relative h-48 w-full bg-pcc-navy/10">
                <Image
                  src="https://wearepcc.com/wp-content/uploads/2024/01/mark-tumney.png"
                  alt="Pastor Mark Tumney"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-grow flex-col p-8 pt-5">
                <h3 className="text-lg font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
                  Our Team
                </h3>
                <p className="mt-2 flex-grow text-sm leading-relaxed text-pcc-slate">
                  Get to know the pastors and staff who serve our church family.
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-pcc-teal">
                  Meet the Team <span aria-hidden="true" className="ml-1">&rarr;</span>
                </span>
              </div>
            </Link>

            {/* Community Programs */}
            <Link
              href="/about/community"
              className="group flex h-full flex-col rounded-xl bg-pcc-cream-light p-8 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pcc-navy/10 text-pcc-navy">
                <BuildingLibraryIcon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
                Community Programs
              </h3>
              <p className="mt-2 flex-grow text-sm leading-relaxed text-pcc-slate">
                Preschool, community center, and other programs serving families throughout the peninsula.
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-pcc-teal">
                Learn More <span aria-hidden="true" className="ml-1">&rarr;</span>
              </span>
            </Link>

            {/* Events Calendar */}
            <Link
              href="/events"
              className="group flex h-full flex-col rounded-xl bg-pcc-cream-light p-8 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pcc-navy/10 text-pcc-navy">
                <CalendarDaysIcon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
                Events Calendar
              </h3>
              <p className="mt-2 flex-grow text-sm leading-relaxed text-pcc-slate">
                Stay up to date with worship services, special events, and community gatherings.
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-pcc-teal">
                Learn More <span aria-hidden="true" className="ml-1">&rarr;</span>
              </span>
            </Link>

            {/* Newsletter */}
            <Link
              href="/about/newsletter"
              className="group flex h-full flex-col rounded-xl bg-pcc-cream-light p-8 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2 sm:col-span-2 lg:col-span-1"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pcc-navy/10 text-pcc-navy">
                <NewspaperIcon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
                Newsletter
              </h3>
              <p className="mt-2 flex-grow text-sm leading-relaxed text-pcc-slate">
                Subscribe to our newsletter for weekly updates, stories, and encouragement.
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-pcc-teal">
                Learn More <span aria-hidden="true" className="ml-1">&rarr;</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section id="beliefs" className="scroll-mt-20 bg-pcc-cream-light">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
            What We Believe
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Christ-Centered', desc: 'Jesus is at the center of everything we do. He is our Lord, Savior, and the model for how we live.' },
              { title: 'Bible-Based', desc: 'We believe the Bible is God\'s Word — our authority for faith and life, relevant to every generation.' },
              { title: 'Spirit-Led', desc: 'We depend on the Holy Spirit to guide, empower, and transform us as individuals and as a community.' },
              { title: 'Community-Oriented', desc: 'We are created for relationship — with God and with each other. Life is better together.' },
              { title: 'Mission-Driven', desc: 'We are called to share God\'s love locally and globally through service, generosity, and justice.' },
              { title: 'Covenant Church', desc: 'As part of the Evangelical Covenant Church, we embrace unity in essentials, liberty in non-essentials, and love in all things.' },
            ].map((belief) => (
              <div key={belief.title} className="rounded-xl border border-pcc-cream-dark p-6">
                <h3 className="text-lg font-bold text-pcc-navy">{belief.title}</h3>
                <p className="mt-2 text-sm text-pcc-slate">{belief.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="bg-gradient-to-br from-pcc-navy to-pcc-deepBlue">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Visit Us</h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-lg text-white/80 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-pcc-gold" />
              Sundays at {sunday ? sunday.times.join(' & ') : '9:00 AM & 10:45 AM'}
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-pcc-gold" />
              {siteSettings?.address || '3560 Farm Hill Blvd, Redwood City'}
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 text-white/60 sm:flex-row sm:gap-8">
            {siteSettings?.phone && (
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4" />
                {siteSettings.phone}
              </div>
            )}
            {siteSettings?.email && (
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-4 w-4" />
                {siteSettings.email}
              </div>
            )}
          </div>
          <Link
            href="/new"
            className="mt-8 inline-block rounded-lg bg-pcc-gold px-10 py-4 text-lg font-bold text-pcc-navy shadow-lg hover:bg-pcc-gold-light transition-colors"
          >
            Plan Your Visit
          </Link>
        </div>
      </section>
    </>
  )
}
