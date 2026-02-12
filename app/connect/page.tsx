import type { Metadata } from 'next'
import Link from 'next/link'
import {
  UserGroupIcon,
  HeartIcon,
  HandRaisedIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Connect | Peninsula Covenant Church',
  description:
    'Find your place in community at PCC. Join a small group, serve, or explore our ministries.',
}

const cards = [
  {
    title: 'Small Groups',
    description:
      'Life is better together. Find a small group where you can build genuine friendships and grow in faith.',
    href: '/connect/groups',
    icon: UserGroupIcon,
    external: false,
  },
  {
    title: 'Ministries',
    description:
      'From kids to seniors, we have vibrant ministries for every age and stage of life.',
    href: '/connect/ministries',
    icon: HeartIcon,
    external: false,
  },
  {
    title: 'Serve Opportunities',
    description:
      'Use your gifts to make a difference. There are many ways to serve at PCC and in our community.',
    href: '/connect/serve',
    icon: HandRaisedIcon,
    external: false,
  },
  {
    title: 'Member Login',
    description:
      'Access Church Center to manage your profile, register for events, and stay connected.',
    href: 'https://pcc.churchcenter.com',
    icon: ArrowTopRightOnSquareIcon,
    external: true,
  },
]

export default function ConnectPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center justify-center bg-gradient-to-br from-pcc-teal-dark to-pcc-navy">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Connect
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Find your place in community
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {cards.map((card) => {
              const Tag = card.external ? 'a' : Link
              const externalProps = card.external
                ? { target: '_blank' as const, rel: 'noopener noreferrer' }
                : {}
              return (
                <Tag
                  key={card.href}
                  href={card.href}
                  {...externalProps}
                  aria-label={card.external ? `${card.title} (opens in new tab)` : undefined}
                  className="group rounded-xl bg-white p-8 shadow-md transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pcc-teal/15 text-pcc-teal">
                    <card.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 text-lg font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
                    {card.title}
                    {card.external && (
                      <ArrowTopRightOnSquareIcon className="ml-1.5 inline h-4 w-4 text-pcc-navy/40" aria-hidden="true" />
                    )}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-pcc-slate">
                    {card.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-pcc-teal group-hover:gap-2 transition-all">
                    {card.external ? 'Open Church Center' : 'Learn More'}
                    <span aria-hidden="true" className="ml-1">&rarr;</span>
                  </span>
                </Tag>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
