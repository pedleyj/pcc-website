import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HandRaisedIcon,
  HeartIcon,
  HomeModernIcon,
  AcademicCapIcon,
  UsersIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Support | Peninsula Covenant Church',
  description:
    "Whatever you're facing, you're not alone. PCC offers prayer, care, counseling, and support groups.",
}

const cards = [
  {
    title: 'Prayer Requests',
    description:
      'Share your prayer needs with our caring community. We believe in the power of praying together.',
    href: '/support/prayer',
    icon: HandRaisedIcon,
  },
  {
    title: 'Stephen Ministry',
    description:
      'Trained lay caregivers providing confidential, one-to-one Christian care for those going through difficult times.',
    href: '/support/stephen-ministry',
    icon: HeartIcon,
  },
  {
    title: 'Community Care',
    description:
      'Meals, visits, and practical support for those in need. Our community rallies around one another.',
    href: '/support/community-care',
    icon: HomeModernIcon,
  },
  {
    title: 'Counseling Resources',
    description:
      'Professional Christian counseling referrals and resources for individuals and families.',
    href: '/support/counseling',
    icon: AcademicCapIcon,
  },
  {
    title: 'Marriage Support',
    description:
      'Strengthen your relationship through marriage enrichment programs, retreats, and mentoring.',
    href: '/support/marriage',
    icon: UsersIcon,
  },
  {
    title: 'Support Groups',
    description:
      'Find hope and healing in a supportive group setting. Various groups meet regularly for encouragement.',
    href: '/support/groups',
    icon: UserGroupIcon,
  },
]

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center justify-center bg-gradient-to-br from-pcc-sage-dark to-pcc-forest">
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            You&apos;re Not Alone
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Whatever you&apos;re facing, we&apos;re here to support you
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-xl bg-white p-8 shadow-md transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pcc-sage/20 text-pcc-forest">
                  <card.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-lg font-bold text-pcc-navy group-hover:text-pcc-forest transition-colors">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-pcc-slate">
                  {card.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-pcc-forest group-hover:gap-2 transition-all">
                  Learn More
                  <span aria-hidden="true" className="ml-1">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
