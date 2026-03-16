import type { Metadata } from 'next'
import Link from 'next/link'
import {
  UserGroupIcon,
  SparklesIcon,
  HeartIcon,
  EnvelopeIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Small Groups | Peninsula Covenant Church',
  description:
    'Find a small group at Peninsula Covenant Church. Growth Groups and Life Groups meeting throughout the week.',
}

export default function GroupsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center justify-center bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Find Your People
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Life is better in community. Join a small group to grow in faith and friendship.
          </p>
        </div>
      </section>

      {/* Group Types */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Growth Groups */}
            <div className="flex flex-col rounded-xl bg-white p-8 shadow-md sm:p-10">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pcc-teal/15 text-pcc-teal">
                  <SparklesIcon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-bold text-pcc-navy">Growth Groups</h2>
              </div>
              <p className="mt-5 text-pcc-slate leading-relaxed">
                Short-term groups designed to help you grow closer to Jesus and build deeper
                connections at PCC. Growth Groups run during Lent and fall seasons, typically
                meeting for 6–8 weeks around a specific study or topic.
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-pcc-slate">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pcc-teal" aria-hidden="true" />
                  Short-term commitment (6–8 weeks)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pcc-teal" aria-hidden="true" />
                  Topical studies (Lent, book studies, and more)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pcc-teal" aria-hidden="true" />
                  Great for exploring specific topics
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pcc-teal" aria-hidden="true" />
                  New sessions start throughout the year
                </li>
              </ul>
              <div className="mt-auto pt-8">
                <a
                  href="https://wearepcc.churchcenter.com/groups/growth-groups?enrollment=open_signup%2Crequest_to_join&filter=enrollment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-pcc-teal px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-teal-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
                >
                  Browse Growth Groups
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Life Groups */}
            <div className="flex flex-col rounded-xl bg-white p-8 shadow-md sm:p-10">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pcc-gold/20 text-pcc-gold-dark">
                  <HeartIcon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-bold text-pcc-navy">Life Groups</h2>
              </div>
              <p className="mt-5 text-pcc-slate leading-relaxed">
                Long-term, on-going small groups designed to help you grow closer to Jesus and
                build deeper connections at PCC. Life Groups continue throughout the year, meeting
                weekly to share life, study Scripture, and support one another.
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-pcc-slate">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pcc-gold" aria-hidden="true" />
                  Ongoing community year-round
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pcc-gold" aria-hidden="true" />
                  Build deeper, lasting relationships
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pcc-gold" aria-hidden="true" />
                  Various life stages and interests
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pcc-gold" aria-hidden="true" />
                  Weekly meetings with authentic conversation
                </li>
              </ul>
              <div className="mt-auto pt-8">
                <a
                  href="https://wearepcc.churchcenter.com/groups/life-groups?enrollment=open_signup%2Crequest_to_join&filter=enrollment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-pcc-gold px-6 py-3 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
                >
                  Browse Life Groups
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-pcc-navy">How Small Groups Work</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pcc-navy/10 text-pcc-navy text-xl font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-bold text-pcc-navy">Browse</h3>
              <p className="mt-2 text-sm text-pcc-slate">
                Look through available groups above. Each listing shows the topic, meeting time, and location.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pcc-navy/10 text-pcc-navy text-xl font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-bold text-pcc-navy">Sign Up</h3>
              <p className="mt-2 text-sm text-pcc-slate">
                Found one that interests you? Click the button to sign up through Church Center. It&apos;s quick and easy.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pcc-navy/10 text-pcc-navy text-xl font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-bold text-pcc-navy">Show Up</h3>
              <p className="mt-2 text-sm text-pcc-slate">
                That&apos;s it! Come as you are. Your group leader will welcome you and help you get settled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Can't Find the Right Fit? */}
      <section className="bg-pcc-navy">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <UserGroupIcon className="mx-auto h-10 w-10 text-pcc-gold" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-bold text-white">
            Can&apos;t Find the Right Fit?
          </h2>
          <p className="mt-4 text-white/80">
            We&apos;d love to help you find a group that&apos;s right for you. Reach out
            and we&apos;ll connect you with the perfect community.
          </p>
          <a
            href="mailto:groups@wearepcc.com"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-pcc-gold px-6 py-3 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
          >
            <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
            groups@wearepcc.com
          </a>
        </div>
      </section>

      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <Link
            href="/connect"
            className="text-sm font-medium text-pcc-teal hover:text-pcc-teal/80 transition-colors"
          >
            &larr; Back to Connect
          </Link>
        </div>
      </section>
    </>
  )
}
