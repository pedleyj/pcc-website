import type { Metadata } from 'next'
import Link from 'next/link'
import {
  MusicalNoteIcon,
  UserGroupIcon,
  HeartIcon,
  AcademicCapIcon,
  HandRaisedIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  SunIcon,
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Serve Opportunities | Peninsula Covenant Church',
  description: 'Use your gifts to serve others at PCC and in the community.',
}

const opportunities = [
  {
    name: 'Worship Team',
    area: 'Sunday Services',
    icon: MusicalNoteIcon,
    commitment: 'Weekly rehearsal + 2 Sundays/month',
    description:
      'Help lead our congregation in worship through music. We welcome vocalists, instrumentalists, and audio/visual technicians of all skill levels.',
    contact: 'worship@wearepcc.com',
  },
  {
    name: 'Welcome Team',
    area: 'Sunday Services',
    icon: HandRaisedIcon,
    commitment: '1-2 Sundays/month',
    description:
      'Be the first friendly face people see on Sunday morning. Greeters, ushers, and parking lot attendants help create a warm, welcoming environment for everyone.',
    contact: 'info@wearepcc.com',
  },
  {
    name: 'Kids Ministry Volunteer',
    area: 'Children & Youth',
    icon: AcademicCapIcon,
    commitment: '2 Sundays/month',
    description:
      'Teach, lead small groups, or assist in our nursery through elementary programs. Help kids learn about God\'s love in fun, age-appropriate ways.',
    contact: 'kids@wearepcc.com',
  },
  {
    name: 'Youth Group Leader',
    area: 'Children & Youth',
    icon: UserGroupIcon,
    commitment: 'Weekly meetings + occasional events',
    description:
      'Walk alongside middle and high school students as a small group leader or activity volunteer. Build relationships and help teens navigate faith and life.',
    contact: 'youth@wearepcc.com',
  },
  {
    name: 'Community Meals',
    area: 'Outreach & Care',
    icon: SunIcon,
    commitment: 'Monthly or as available',
    description:
      'Prepare and serve meals for community events, memorial services, or families in need. A great way to show tangible love to our neighbors.',
    contact: 'care@wearepcc.com',
  },
  {
    name: 'Stephen Ministry',
    area: 'Outreach & Care',
    icon: HeartIcon,
    commitment: '50 hours training + weekly visits',
    description:
      'Provide one-to-one Christian care to people experiencing life challenges like grief, divorce, illness, or job loss. Comprehensive training provided.',
    contact: 'care@wearepcc.com',
  },
  {
    name: 'Tech & Production',
    area: 'Operations',
    icon: ComputerDesktopIcon,
    commitment: '1-2 Sundays/month',
    description:
      'Run sound, slides, livestream, or lighting for Sunday services and special events. Training provided — no prior experience required.',
    contact: 'info@wearepcc.com',
  },
  {
    name: 'Local & Global Outreach',
    area: 'Outreach & Care',
    icon: GlobeAltIcon,
    commitment: 'Varies by project',
    description:
      'Serve our local community through partnership projects, or join a short-term mission team to make an impact beyond our walls. Opportunities range from one-day events to week-long trips.',
    contact: 'outreach@wearepcc.com',
  },
]

const areas = [...new Set(opportunities.map((o) => o.area))]

export default function ServePage() {
  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Serve Opportunities
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Use your gifts to make a difference
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 pt-20 pb-10 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-pcc-navy">Everyone Has Something to Give</h2>
          <p className="mt-4 text-lg text-pcc-slate leading-relaxed">
            Whether you have an hour a month or a few hours a week, there&apos;s a place for you to
            serve at PCC. No special skills required — just a willing heart. We&apos;ll help you find
            the right fit.
          </p>
        </div>
      </section>

      {/* Opportunities by Area */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
          {areas.map((area) => (
            <div key={area} className="mb-12">
              <h3 className="mb-6 text-lg font-bold text-pcc-navy">{area}</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {opportunities
                  .filter((o) => o.area === area)
                  .map((opp) => (
                    <div key={opp.name} className="rounded-xl bg-white p-6 shadow-md">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pcc-teal/15 text-pcc-teal">
                          <opp.icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                          <h4 className="font-bold text-pcc-navy">{opp.name}</h4>
                          <p className="mt-0.5 text-xs font-medium text-pcc-teal">{opp.commitment}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-pcc-slate">{opp.description}</p>
                      <a
                        href={`mailto:${opp.contact}`}
                        className="mt-4 inline-block text-sm font-semibold text-pcc-teal hover:text-pcc-teal-dark transition-colors"
                      >
                        Sign Up &rarr;
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pcc-navy">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">Not Sure Where to Start?</h2>
          <p className="mt-4 text-lg text-white/80">
            We&apos;d love to help you find the right place to serve. Reach out and we&apos;ll
            connect you with a ministry leader who can answer your questions.
          </p>
          <a
            href="mailto:serve@wearepcc.com"
            className="mt-8 inline-block rounded-lg bg-pcc-gold px-8 py-3 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
          >
            Contact Us About Serving
          </a>
        </div>
      </section>

      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <Link
            href="/connect"
            className="text-sm font-medium text-pcc-teal hover:text-pcc-teal-dark transition-colors"
          >
            &larr; Back to Connect
          </Link>
        </div>
      </section>
    </>
  )
}
