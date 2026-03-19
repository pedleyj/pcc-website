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
  SparklesIcon,
} from '@heroicons/react/24/outline'
import { Breadcrumb } from '@/components/layout/breadcrumb'

export const metadata: Metadata = {
  title: 'Get Involved at PCC | Serve & Volunteer | Redwood City',
  description:
    'Find ways to serve and get involved at Peninsula Covenant Church. Explore ministries and volunteer opportunities.',
}

const ministryAreas = [
  {
    name: 'Kids Ministry',
    icon: AcademicCapIcon,
    leader: 'Anjanette Lundell',
    description:
      'Age-appropriate programs that help children know Jesus deeply through engaging lessons, activities, and community. Nursery through elementary.',
    contact: 'kids@wearepcc.com',
    color: 'bg-pcc-gold/15 text-pcc-gold-dark',
  },
  {
    name: 'Youth Ministry',
    icon: UserGroupIcon,
    leader: 'Austin Hochstetler & Jeremiah Campos',
    description:
      'A vibrant community where middle and high school students grow in faith, build friendships, and discover their calling.',
    contact: 'youth@wearepcc.com',
    color: 'bg-pcc-orange/15 text-pcc-orange',
  },
  {
    name: 'Young Adults',
    icon: SparklesIcon,
    leader: 'Summer Levinson',
    description:
      'A community for those in their 20s and 30s navigating faith, careers, and relationships. Regular gatherings, studies, and social events.',
    contact: 'info@wearepcc.com',
    color: 'bg-pcc-teal/15 text-pcc-teal',
  },
  {
    name: 'Adults & Life Groups',
    icon: HeartIcon,
    leader: 'Rachel Taylor',
    description:
      'Grow deeper in faith through small groups, Bible studies, and fellowship opportunities designed for every season of life.',
    contact: 'info@wearepcc.com',
    color: 'bg-pcc-sage/20 text-pcc-sage-dark',
  },
  {
    name: 'Worship & Creative Arts',
    icon: MusicalNoteIcon,
    leader: 'Joseph Krishna',
    description:
      'Lead our congregation in worship through music, media, and the arts. Vocalists, instrumentalists, and tech volunteers welcome.',
    contact: 'worship@wearepcc.com',
    color: 'bg-pcc-navy/10 text-pcc-navy',
  },
  {
    name: 'Community Care',
    icon: HandRaisedIcon,
    leader: 'Ben Pierce',
    description:
      'Show the love of Christ through practical care — meals for families in need, hospital visits, and compassionate support during life\'s hardest seasons.',
    contact: 'care@wearepcc.com',
    color: 'bg-pcc-red/10 text-pcc-red',
  },
  {
    name: 'Outreach & Missions',
    icon: GlobeAltIcon,
    leader: 'Sharon Seeberger',
    description:
      'Serve our local community through partnership projects, or join a short-term mission team to make an impact beyond our walls.',
    contact: 'outreach@wearepcc.com',
    color: 'bg-pcc-emerald/10 text-pcc-emerald',
  },
]

const opportunities = [
  {
    name: 'Sunday Morning Greeter',
    icon: HandRaisedIcon,
    commitment: '1–2 Sundays/month (10:45 service)',
    description:
      'Be the first friendly face people see on Sunday morning. Help create a warm, welcoming environment for everyone who walks through our doors.',
    contact: 'info@wearepcc.com',
  },
  {
    name: 'Coffee Setup Team',
    icon: SunIcon,
    commitment: 'Sundays, 8:30am',
    description:
      'Help set up and serve coffee and refreshments before services. A simple way to serve that makes a big difference in our Sunday morning hospitality.',
    contact: 'info@wearepcc.com',
  },
  {
    name: 'Kids Ministry Volunteer',
    icon: AcademicCapIcon,
    commitment: '2 Sundays/month (rotating schedule)',
    description:
      'Teach, lead small groups, or assist in our nursery through elementary programs. Help kids learn about God\'s love in fun, age-appropriate ways.',
    contact: 'kids@wearepcc.com',
  },
  {
    name: 'Tech & Production Team',
    icon: ComputerDesktopIcon,
    commitment: '1–2 Sundays/month',
    description:
      'Run sound, slides, livestream, or lighting for Sunday services and special events. Training provided — no prior experience required.',
    contact: 'info@wearepcc.com',
  },
  {
    name: 'Community Care Meals',
    icon: HeartIcon,
    commitment: 'Monthly or as available',
    description:
      'Prepare and deliver meals to families going through difficult seasons — new babies, illness, loss, or other life transitions.',
    contact: 'care@wearepcc.com',
  },
]

export default function ServePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 pt-8 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Connect', href: '/connect' }, { label: 'Get Involved' }]} />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-8 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Get Involved at PCC
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Find your place to serve, connect, and grow
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 pt-20 pb-10 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-pcc-navy">Everyone Has Something to Give</h2>
          <p className="mt-4 text-lg text-pcc-slate leading-relaxed">
            Whether you have an hour a month or a few hours a week, there&apos;s a place for you
            at PCC. No special skills required — just a willing heart. Explore our ministries
            or jump right into a specific volunteer opportunity.
          </p>
        </div>
      </section>

      {/* Ministry Areas */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-pcc-navy">Explore Our Ministries</h2>
          <p className="mt-2 text-center text-pcc-slate">
            Find a ministry that fits your passions and gifts
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ministryAreas.map((ministry) => (
              <div key={ministry.name} className="rounded-xl bg-white p-6 shadow-md">
                <div className={`flex h-11 w-11 items-center justify-center rounded-full ${ministry.color}`}>
                  <ministry.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-bold text-pcc-navy">{ministry.name}</h3>
                {ministry.leader && (
                  <p className="mt-1 text-xs font-medium text-pcc-charcoal">Led by {ministry.leader}</p>
                )}
                <p className="mt-2 text-sm leading-relaxed text-pcc-slate">{ministry.description}</p>
                <a
                  href={`mailto:${ministry.contact}?subject=Interested in ${ministry.name}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-pcc-teal hover:text-pcc-teal-dark transition-colors"
                >
                  Email {ministry.contact} &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-pcc-navy">Ways to Serve Right Now</h2>
          <p className="mt-2 text-center text-pcc-slate">
            Current volunteer needs — sign up today
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {opportunities.map((opp) => (
              <div key={opp.name} className="rounded-xl border border-pcc-cream-dark bg-pcc-cream-light p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pcc-teal/15 text-pcc-teal">
                    <opp.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-pcc-navy">{opp.name}</h3>
                    <p className="mt-0.5 text-xs font-medium text-pcc-teal">{opp.commitment}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-pcc-slate">{opp.description}</p>
                <a
                  href={`mailto:${opp.contact}?subject=Interested in: ${opp.name}`}
                  className="mt-4 inline-flex items-center gap-1 rounded-lg bg-pcc-navy px-4 py-2 text-sm font-semibold text-white hover:bg-pcc-navy/90 transition-colors"
                >
                  Express Interest
                </a>
              </div>
            ))}
          </div>
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
            className="mt-8 inline-block rounded-lg bg-pcc-gold px-8 py-3 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors"
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
