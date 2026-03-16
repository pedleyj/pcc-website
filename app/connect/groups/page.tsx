import type { Metadata } from 'next'
import Link from 'next/link'
import {
  UserGroupIcon,
  SparklesIcon,
  HeartIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline'
import { getAllSmallGroups } from '@/lib/db/queries'
import { GroupsBrowser } from '@/components/groups/groups-browser'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Small Groups | Peninsula Covenant Church',
  description:
    'Find a small group at Peninsula Covenant Church. Growth Groups and Life Groups meeting throughout the week.',
}

export default async function GroupsPage() {
  const allGroups = await getAllSmallGroups()

  const serialized = allGroups.map((g) => ({
    ...g,
    createdAt: g.createdAt.toISOString(),
    updatedAt: g.updatedAt.toISOString(),
  }))

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

      {/* Group Type Explainers */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 pt-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-white p-8 shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pcc-teal/15 text-pcc-teal">
                  <SparklesIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-pcc-navy">Growth Groups</h2>
              </div>
              <p className="mt-4 text-sm text-pcc-slate leading-relaxed">
                Focused on studying God&apos;s Word together, encouraging spiritual growth through
                Scripture-based discussion and prayer. Short-term commitments (6–8 weeks) with new
                sessions starting throughout the year.
              </p>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pcc-gold/20 text-pcc-gold-dark">
                  <HeartIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-pcc-navy">Life Groups</h2>
              </div>
              <p className="mt-4 text-sm text-pcc-slate leading-relaxed">
                Community-focused gatherings where people build authentic friendships, share life
                together, and support one another. Ongoing groups for every season of life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Groups Browser */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <GroupsBrowser groups={serialized} />
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
