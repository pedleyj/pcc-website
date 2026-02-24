import type { Metadata } from 'next'
import Link from 'next/link'
import {
  SparklesIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Explore Faith | Peninsula Covenant Church',
  description:
    "Life's big questions deserve thoughtful exploration. Discover Alpha, what we believe, and more at PCC.",
}

const cards = [
  {
    title: 'Alpha Program',
    description:
      'A series of sessions exploring the basics of the Christian faith in a relaxed, friendly setting. Everyone is welcome.',
    href: '/explore-faith/alpha',
    icon: SparklesIcon,
  },
  {
    title: 'What We Believe',
    description:
      'Learn about the core beliefs and values that guide our church community and shape everything we do.',
    href: '/about/beliefs',
    icon: BookOpenIcon,
  },
  {
    title: 'Questions About Christianity',
    description:
      'Have questions? You\'re not alone. Explore honest answers to the questions people ask most.',
    href: '/explore-faith/faq',
    icon: ChatBubbleLeftRightIcon,
  },
]

export default function ExploreFaithPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center justify-center bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Explore Faith
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Life&apos;s big questions deserve thoughtful exploration
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
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pcc-teal/15 text-pcc-teal">
                  <card.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-lg font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-pcc-slate">
                  {card.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-pcc-teal group-hover:gap-2 transition-all">
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
