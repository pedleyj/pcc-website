import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HandRaisedIcon,
  HeartIcon,
  HomeModernIcon,
  AcademicCapIcon,
  UsersIcon,
  UserGroupIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline'
import { getAllSupportResources } from '@/lib/db/queries'

export const revalidate = 60

type SupportResource = Awaited<ReturnType<typeof getAllSupportResources>>[number]

export const metadata: Metadata = {
  title: 'Support & Care | Peninsula Covenant Church',
  description:
    "You don't have to walk through this alone. PCC offers confidential care, counseling referrals, financial coaching, support groups, and prayer.",
}

const categoryIcons: Record<string, typeof HeartIcon> = {
  stephen_ministry: HeartIcon,
  community_care: HomeModernIcon,
  financial: BanknotesIcon,
  counseling: AcademicCapIcon,
  marriage: UsersIcon,
  support_groups: UserGroupIcon,
}

const categoryPages: Record<string, string> = {
  stephen_ministry: '/support/stephen_ministry',
  community_care: '/support/community_care',
  financial: '/support/financial',
  counseling: '/support/counseling',
  marriage: '/support/marriage',
  support_groups: '/support/groups',
}

const categoryWhoFor: Record<string, string[]> = {
  stephen_ministry: ['Grief or loss', 'Illness or health crisis', 'Divorce or separation', 'Job loss or major transitions'],
  community_care: ['Financial hardship', 'Emergency needs', 'Meals during illness or recovery', 'Practical help during difficult seasons'],
  financial: ['Budgeting help', 'Debt management', 'Investment guidance', 'Tax planning support'],
  counseling: ['Anxiety or depression', 'Relationship struggles', 'Family conflict', 'Life transitions'],
  marriage: ['Strengthening your relationship', 'Navigating conflict', 'Pre-marriage preparation', 'Marriage enrichment'],
  support_groups: ['Grief recovery', 'Divorce care', 'Addiction recovery', 'Life challenges'],
}

const categoryActions: Record<string, string> = {
  stephen_ministry: 'Request a Stephen Minister',
  community_care: 'Request Assistance',
  financial: 'Contact a Coach',
  counseling: 'Get a Referral',
  marriage: 'Learn More',
  support_groups: 'Find a Group',
}

export default async function SupportPage() {
  const supportResources = await getAllSupportResources()

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center justify-center bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            You Don&apos;t Have to Walk Through This Alone
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            We&apos;re here to support you through life&apos;s challenges with care, confidentiality, and compassion.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 pt-20 pb-6 text-center sm:px-6 lg:px-8">
          <ShieldCheckIcon className="mx-auto h-10 w-10 text-pcc-forest" aria-hidden="true" />
          <p className="mt-4 text-lg text-pcc-slate leading-relaxed">
            Whatever you&apos;re going through — a health concern, a family struggle, financial pressure,
            grief, or simply a season that feels overwhelming — you don&apos;t need to face it on your own.
            Our care team and trained volunteers are here to help, and{' '}
            <strong className="text-pcc-navy">every request is handled with complete confidentiality</strong>.
          </p>
          <p className="mt-3 text-sm text-pcc-slate/70">
            You don&apos;t need to be a church member to receive support.
          </p>
        </div>
      </section>

      {/* Prayer Request — featured card */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 pt-6 pb-4 sm:px-6 lg:px-8">
          <Link
            href="/support/prayer"
            className="group flex items-center gap-5 rounded-xl bg-pcc-forest p-6 text-white shadow-md transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2 sm:p-8"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20">
              <HandRaisedIcon className="h-7 w-7" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-bold group-hover:text-white/90 transition-colors">
                Prayer Requests
              </h2>
              <p className="mt-1 text-sm text-white/80">
                Share what&apos;s on your heart. Our prayer team reads every request and lifts each one
                up throughout the week.
              </p>
            </div>
            <span className="ml-auto hidden shrink-0 text-sm font-semibold sm:block" aria-hidden="true">
              Submit a Request &rarr;
            </span>
          </Link>
        </div>
      </section>

      {/* Support Resource Cards */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-pcc-navy">How We Can Help</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {supportResources.map((resource: SupportResource) => {
              const Icon = categoryIcons[resource.category] || HeartIcon
              const pagePath = categoryPages[resource.category] || `/support/${resource.category}`
              const whoFor = categoryWhoFor[resource.category] || []
              const actionLabel = categoryActions[resource.category] || 'Learn More'

              return (
                <div
                  key={resource.id}
                  className="flex flex-col rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg sm:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pcc-forest/10 text-pcc-forest">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-pcc-navy">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-pcc-slate">
                    {resource.description}
                  </p>

                  {whoFor.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-pcc-slate/60">
                        This may be for you if you&apos;re experiencing
                      </p>
                      <ul className="mt-2 space-y-1">
                        {whoFor.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-pcc-slate">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pcc-forest/40" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-auto pt-6">
                    {resource.contactEmail ? (
                      <div className="flex flex-col gap-2">
                        <Link
                          href={pagePath}
                          className="inline-flex w-full items-center justify-center rounded-lg bg-pcc-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-pcc-forest/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
                        >
                          {actionLabel} &rarr;
                        </Link>
                        <a
                          href={`mailto:${resource.contactEmail}`}
                          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-pcc-forest/30 px-4 py-2.5 text-sm font-medium text-pcc-forest hover:bg-pcc-forest/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
                        >
                          <EnvelopeIcon className="h-4 w-4" aria-hidden="true" />
                          Email Directly
                        </a>
                      </div>
                    ) : (
                      <Link
                        href={pagePath}
                        className="inline-flex w-full items-center justify-center rounded-lg bg-pcc-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-pcc-forest/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
                      >
                        {actionLabel} &rarr;
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Confidentiality footer + contact */}
      <section className="bg-pcc-navy">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <ShieldCheckIcon className="mx-auto h-10 w-10 text-pcc-gold" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-bold text-white">
            Not Sure Where to Start?
          </h2>
          <p className="mt-4 text-white/80">
            You don&apos;t need to know exactly what you need. Reach out to our pastoral care team
            and we&apos;ll help you find the right support.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:care@wearepcc.com"
              className="w-full rounded-lg bg-pcc-gold px-8 py-3 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2 sm:w-auto"
            >
              Email care@wearepcc.com
            </a>
            <a
              href="tel:650-365-8094"
              className="w-full rounded-lg border-2 border-white px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:w-auto"
            >
              Call 650-365-8094
            </a>
          </div>
          <p className="mt-8 text-sm text-white/60">
            All support requests are handled with complete confidentiality and care.
          </p>
        </div>
      </section>
    </>
  )
}
