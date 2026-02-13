import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  HeartIcon,
  HomeModernIcon,
  AcademicCapIcon,
  UsersIcon,
  UserGroupIcon,
  BanknotesIcon,
  EnvelopeIcon,
  PhoneIcon,
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { getSupportResourcesByCategory, getAllSupportResources } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

type SupportResource = Awaited<ReturnType<typeof getAllSupportResources>>[number]

const categoryIcons: Record<string, typeof HeartIcon> = {
  stephen_ministry: HeartIcon,
  community_care: HomeModernIcon,
  financial: BanknotesIcon,
  counseling: AcademicCapIcon,
  marriage: UsersIcon,
  support_groups: UserGroupIcon,
}

const categoryMeta: Record<string, { subtitle: string; helpItems: string[]; whatToExpect: string }> = {
  stephen_ministry: {
    subtitle: 'Confidential, one-to-one Christian care',
    helpItems: [
      'Grieving the loss of a loved one',
      'Going through a divorce or separation',
      'Facing a serious illness or health crisis',
      'Dealing with job loss or major life transitions',
    ],
    whatToExpect:
      'After reaching out, you\'ll be matched with a trained Stephen Minister who will meet with you regularly in a private, confidential setting. Your Stephen Minister will listen, care, encourage, and pray with you. The relationship continues for as long as you need support.',
  },
  community_care: {
    subtitle: 'Practical assistance when you need it most',
    helpItems: [
      'Recovering from surgery or illness and need meals',
      'Facing a financial hardship or unexpected expense',
      'Need help with errands or transportation',
      'Looking for practical support during a difficult season',
    ],
    whatToExpect:
      'When you reach out, a member of our care team will connect with you to understand your situation and coordinate the right kind of support. This may include meal delivery, help with errands, short-term financial assistance, or connecting you with additional resources.',
  },
  financial: {
    subtitle: 'Guidance for financial peace of mind',
    helpItems: [
      'Working through debt and looking for a path forward',
      'Wanting to build a budget that works for your family',
      'Planning for future financial goals',
      'Seeking biblically-grounded financial principles',
    ],
    whatToExpect:
      'You\'ll be paired with a trained financial coach for a series of confidential meetings. Together you\'ll review your financial situation, set goals, create a personalized plan, and work through practical steps toward financial health. All coaching is free and confidential.',
  },
  counseling: {
    subtitle: 'Professional support for life\'s challenges',
    helpItems: [
      'Navigating anxiety, depression, or emotional struggles',
      'Working through relationship difficulties',
      'Processing trauma or past experiences',
      'Adjusting to major life transitions',
    ],
    whatToExpect:
      'We maintain a curated list of recommended licensed counselors in our area who share our values. Contact us and we\'ll help connect you with a counselor who\'s the right fit for your needs. Some counselors offer sliding-scale fees, and limited financial assistance may be available.',
  },
  marriage: {
    subtitle: 'Strengthening the foundation of your relationship',
    helpItems: [
      'Preparing for marriage through premarital counseling',
      'Looking to strengthen and enrich your marriage',
      'Navigating a difficult season in your relationship',
      'Seeking mentoring from experienced couples',
    ],
    whatToExpect:
      'Depending on your needs, we offer premarital counseling, marriage mentoring with experienced couples, marriage enrichment events, and connections to professional marriage counselors. Reach out and we\'ll help you find the right resource for where you are.',
  },
  support_groups: {
    subtitle: 'You\'re not alone in what you\'re going through',
    helpItems: [
      'Processing grief or loss in a caring community',
      'Working through addiction recovery',
      'Navigating divorce or separation',
      'Living with chronic illness or ongoing challenges',
    ],
    whatToExpect:
      'Support groups typically meet weekly or biweekly in a small group setting. Each group focuses on a specific area such as grief, addiction recovery, divorce care, or chronic illness. Groups are confidential and welcoming — you can participate at whatever level feels comfortable.',
  },
}

const externalLinkText: Record<string, string> = {
  stephen_ministry: 'Learn About Stephen Ministry International',
  community_care: 'Apply for Community Care Assistance',
  counseling: 'View Recommended Counselors',
  marriage: 'Explore Marriage Resources',
  support_groups: 'Find Support Groups',
  financial: 'Schedule Financial Coaching',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const resources = await getSupportResourcesByCategory(category)

  if (!resources || resources.length === 0) {
    return { title: 'Support | Peninsula Covenant Church' }
  }

  return {
    title: `${resources[0].title} | Support | Peninsula Covenant Church`,
    description: resources[0].description,
  }
}

export default async function SupportResourcePage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const resources = await getSupportResourcesByCategory(category)

  if (!resources || resources.length === 0) {
    notFound()
  }

  const resource = resources[0]
  const Icon = categoryIcons[resource.category] || HeartIcon
  const meta = categoryMeta[resource.category]
  const linkText = externalLinkText[resource.category] || 'Visit External Resource'

  // Fetch other resources for the "related" section
  const allResources = await getAllSupportResources()
  const otherResources = allResources
    .filter((r: SupportResource) => r.category !== resource.category)
    .slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center justify-center bg-gradient-to-br from-pcc-sage-dark to-pcc-forest">
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center justify-center gap-1 text-sm text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
            <Link href="/support" className="hover:text-white transition-colors">
              Support
            </Link>
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
            <span className="text-white">{resource.title}</span>
          </nav>

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <Icon className="h-8 w-8 text-white" aria-hidden="true" />
          </div>
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            {resource.title}
          </h1>
          {meta && (
            <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
              {meta.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          {/* Description */}
          <div className="rounded-xl bg-white p-8 shadow-md sm:p-10">
            <p className="text-lg leading-relaxed text-pcc-slate">
              {resource.description}
            </p>
          </div>

          {/* How This Can Help */}
          {meta && (
            <div className="mt-8 rounded-xl bg-white p-8 shadow-md sm:p-10">
              <h2 className="text-2xl font-bold text-pcc-navy">How This Can Help</h2>
              <p className="mt-4 text-pcc-slate">
                This resource can help if you&apos;re experiencing:
              </p>
              <ul className="mt-4 space-y-3">
                {meta.helpItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-pcc-slate">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-pcc-sage" aria-hidden="true" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What to Expect */}
          {meta && (
            <div className="mt-8 rounded-xl bg-white p-8 shadow-md sm:p-10">
              <h2 className="text-2xl font-bold text-pcc-navy">What to Expect</h2>
              <p className="mt-4 leading-relaxed text-pcc-slate">
                {meta.whatToExpect}
              </p>
            </div>
          )}

          {/* Next Steps */}
          {(resource.contactEmail || resource.contactPhone || resource.externalUrl) && (
            <div className="mt-8 rounded-xl bg-white p-8 shadow-md sm:p-10">
              <h2 className="text-2xl font-bold text-pcc-navy">Next Steps</h2>
              <p className="mt-2 text-pcc-slate">
                Ready to reach out? We&apos;re here for you.
              </p>
              <div className="mt-6 space-y-4">
                {resource.contactName && (
                  <p className="text-sm font-medium text-pcc-navy">
                    Your contact: {resource.contactName}
                  </p>
                )}
                {resource.contactEmail && (
                  <a
                    href={`mailto:${resource.contactEmail}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-pcc-forest px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-forest/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
                  >
                    <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
                    {resource.contactEmail}
                  </a>
                )}
                {resource.contactPhone && (
                  <a
                    href={`tel:${resource.contactPhone.replace(/[^\d+]/g, '')}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-pcc-forest px-6 py-3 text-sm font-semibold text-pcc-forest hover:bg-pcc-forest/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
                  >
                    <PhoneIcon className="h-5 w-5" aria-hidden="true" />
                    {resource.contactPhone}
                  </a>
                )}
                {resource.externalUrl && (
                  <div className="pt-2">
                    <a
                      href={resource.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${linkText} (opens in new tab)`}
                      className="inline-flex items-center gap-2 rounded-lg bg-pcc-teal px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-teal/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
                    >
                      {linkText}
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="mt-10 text-center">
            <Link
              href="/support"
              className="text-sm font-medium text-pcc-forest hover:text-pcc-forest/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2 rounded-sm"
            >
              &larr; Back to Support
            </Link>
          </div>
        </div>
      </section>

      {/* Related Support Resources */}
      {otherResources.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold text-pcc-navy">
              Other Ways We Can Support You
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherResources.map((r: SupportResource) => {
                const OtherIcon = categoryIcons[r.category] || HeartIcon
                return (
                  <Link
                    key={r.id}
                    href={`/support/${r.category}`}
                    className="group flex flex-col rounded-xl border border-pcc-cream bg-pcc-cream/30 p-6 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pcc-sage/20 text-pcc-forest">
                      <OtherIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-bold text-pcc-navy group-hover:text-pcc-forest transition-colors">
                      {r.title}
                    </h3>
                    <p className="mt-2 flex-grow text-sm text-pcc-slate line-clamp-2">
                      {r.description}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-pcc-forest">
                      Learn More &rarr;
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
