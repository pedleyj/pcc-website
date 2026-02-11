import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  MapPinIcon,
  ClockIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import { getSiteSettings, getLeadershipTeam, getAllStaff } from '@/lib/db/queries'

export const metadata: Metadata = {
  title: 'About | Peninsula Covenant Church',
  description: 'Learn about PCC — our mission, story, beliefs, and the team that serves our community in Redwood City, CA.',
}

export default async function AboutPage() {
  const [siteSettings, leadership, staff] = await Promise.all([
    getSiteSettings(),
    getLeadershipTeam(),
    getAllStaff(),
  ])

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
      <section className="bg-white">
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
      <section className="bg-pcc-cream-light">
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

      {/* What We Believe */}
      <section className="bg-white">
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

      {/* Leadership */}
      {leadership.length > 0 && (
        <section className="bg-pcc-cream-light">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
              Our Leadership
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {leadership.map((member) => (
                <div key={member.id} className="rounded-xl bg-white p-6 text-center shadow-md">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-pcc-navy text-3xl font-bold text-white">
                    {member.photoUrl ? (
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      member.name.split(' ').map((n) => n[0]).join('')
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-pcc-navy">{member.name}</h3>
                  <p className="text-sm text-pcc-teal">{member.role}</p>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="mt-2 inline-block text-xs text-pcc-slate hover:text-pcc-teal transition-colors"
                    >
                      {member.email}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Staff */}
      {staff.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">Our Staff</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {staff.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-pcc-cream text-xl font-bold text-pcc-navy">
                    {member.photoUrl ? (
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      member.name.split(' ').map((n) => n[0]).join('')
                    )}
                  </div>
                  <h3 className="mt-3 font-bold text-pcc-navy">{member.name}</h3>
                  <p className="text-sm text-pcc-slate">{member.role}</p>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-xs text-pcc-slate hover:text-pcc-teal transition-colors"
                    >
                      {member.email}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
