import type { Metadata } from 'next'
import Link from 'next/link'
import {
  UserGroupIcon,
  SparklesIcon,
  HeartIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline'
import { getAllSmallGroups } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

type SmallGroup = Awaited<ReturnType<typeof getAllSmallGroups>>[number]

export const metadata: Metadata = {
  title: 'Small Groups | Peninsula Covenant Church',
  description: 'Connect with others in Growth Groups or Life Groups at PCC.',
}

export default async function GroupsPage() {
  const allGroups = await getAllSmallGroups()
  const growthGroups = allGroups.filter((g: SmallGroup) => g.type === 'growth')
  const lifeGroups = allGroups.filter((g: SmallGroup) => g.type === 'life')

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
            Small Groups
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Life is better together. Find your community.
          </p>
        </div>
      </section>

      {/* Group Type Explainers */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 pt-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Growth Groups */}
            <div className="rounded-xl bg-white p-8 shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pcc-teal/15 text-pcc-teal">
                  <SparklesIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-pcc-navy">Growth Groups</h2>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-pcc-slate">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pcc-teal" aria-hidden="true" />
                  Short-term commitments (6&ndash;8 weeks)
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
            </div>

            {/* Life Groups */}
            <div className="rounded-xl bg-white p-8 shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pcc-gold/20 text-pcc-gold-dark">
                  <HeartIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-pcc-navy">Life Groups</h2>
              </div>
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
            </div>
          </div>
        </div>
      </section>

      {/* Growth Groups Section */}
      {growthGroups.length > 0 && (
        <section className="bg-pcc-cream">
          <div className="mx-auto max-w-5xl px-4 pt-16 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-pcc-navy">Growth Groups</h2>
            <p className="mt-2 text-pcc-slate">Short-term studies to help you grow</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {growthGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Life Groups Section */}
      {lifeGroups.length > 0 && (
        <section className="bg-pcc-cream">
          <div className="mx-auto max-w-5xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-pcc-navy">Life Groups</h2>
            <p className="mt-2 text-pcc-slate">Ongoing community for every season of life</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {lifeGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Can't Find the Right Fit? */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <UserGroupIcon className="mx-auto h-12 w-12 text-pcc-teal" aria-hidden="true" />
          <h2 className="mt-6 text-2xl font-bold text-pcc-navy">
            Can&apos;t Find the Right Fit?
          </h2>
          <p className="mt-4 text-pcc-slate">
            We&apos;d love to help you find a group that&apos;s right for you. Reach out
            and we&apos;ll connect you with the perfect community.
          </p>
          <a
            href="mailto:groups@wearepcc.com"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-pcc-teal px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-teal/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
          >
            <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
            groups@wearepcc.com
          </a>
          <div className="mt-8">
            <Link
              href="/connect"
              className="text-sm font-medium text-pcc-teal hover:text-pcc-teal/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2 rounded-sm"
            >
              &larr; Back to Connect
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function GroupCard({ group }: { group: SmallGroup }) {
  const isGrowth = group.type === 'growth'
  const spotsRemaining = group.capacity ? group.capacity - group.currentMembers : null

  return (
    <div className="flex h-full flex-col rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
      {/* Type Badge */}
      <span
        className={`inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
          isGrowth
            ? 'bg-pcc-teal/15 text-pcc-teal'
            : 'bg-pcc-gold/20 text-pcc-gold-dark'
        }`}
      >
        {isGrowth ? (
          <SparklesIcon className="h-3 w-3" aria-hidden="true" />
        ) : (
          <HeartIcon className="h-3 w-3" aria-hidden="true" />
        )}
        {isGrowth ? 'Growth Group' : 'Life Group'}
      </span>

      {/* Name */}
      <h3 className="mt-4 text-lg font-bold text-pcc-navy">{group.name}</h3>

      {/* Description */}
      <p className="mt-2 flex-grow text-sm leading-relaxed text-pcc-slate line-clamp-3">
        {group.description}
      </p>

      {/* Details */}
      <div className="mt-4 space-y-1.5 text-sm text-pcc-slate/80">
        <p className="font-medium text-pcc-navy/80">Led by {group.leader}</p>
        {group.meetingDay && (
          <p className="flex items-center gap-1.5">
            <CalendarDaysIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {group.meetingDay}
            {group.meetingTime && (
              <>
                <ClockIcon className="ml-1 h-4 w-4 shrink-0" aria-hidden="true" />
                {group.meetingTime}
              </>
            )}
          </p>
        )}
        {group.location && (
          <p className="flex items-center gap-1.5">
            <MapPinIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {group.location}
          </p>
        )}
        {spotsRemaining !== null && (
          <p className={`text-xs font-medium ${spotsRemaining <= 3 ? 'text-amber-600' : 'text-pcc-forest'}`}>
            {spotsRemaining > 0
              ? `${spotsRemaining} spot${spotsRemaining === 1 ? '' : 's'} remaining`
              : 'Currently full'}
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="mt-5">
        {group.openForSignup && group.churchCenterUrl ? (
          <a
            href={group.churchCenterUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Join ${group.name} (opens in new tab)`}
            className="inline-flex items-center gap-2 rounded-lg bg-pcc-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-pcc-forest/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
          >
            Join This Group
            <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : !group.openForSignup ? (
          <span className="inline-flex items-center rounded-lg bg-pcc-slate/10 px-4 py-2.5 text-sm font-semibold text-pcc-slate">
            Currently Full
          </span>
        ) : null}
      </div>
    </div>
  )
}
