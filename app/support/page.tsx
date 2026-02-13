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
} from '@heroicons/react/24/outline'
import { getAllSupportResources } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Support | Peninsula Covenant Church',
  description:
    "Whatever you're facing, you're not alone. PCC offers prayer, care, counseling, and support groups.",
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
  support_groups: '/support/support_groups',
}

export default async function SupportPage() {
  const supportResources = await getAllSupportResources()

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

      {/* Prayer Request Card */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 pt-20 sm:px-6 lg:px-8">
          <Link
            href="/support/prayer"
            className="group block rounded-xl bg-white p-8 shadow-md transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pcc-sage/20 text-pcc-forest">
                <HandRaisedIcon className="h-7 w-7" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-pcc-navy group-hover:text-pcc-forest transition-colors">
                  Prayer Requests
                </h2>
                <p className="mt-1 text-sm text-pcc-slate">
                  Share your prayer needs with our caring community. We believe in the power of praying together.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Support Resource Cards */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {supportResources.map((resource) => {
              const Icon = categoryIcons[resource.category] || HeartIcon
              const pagePath = categoryPages[resource.category] || `/support/${resource.category.replace(/_/g, '-')}`

              return (
                <div
                  key={resource.id}
                  className="flex h-full flex-col rounded-xl bg-white p-8 shadow-md transition-shadow hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pcc-sage/20 text-pcc-forest">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 text-lg font-bold text-pcc-navy">
                    {resource.title}
                  </h2>
                  <p className="mt-2 flex-grow text-sm leading-relaxed text-pcc-slate">
                    {resource.description}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={pagePath}
                      className="inline-flex items-center rounded-md bg-pcc-forest px-4 py-2 text-sm font-semibold text-white hover:bg-pcc-forest/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
                    >
                      Learn More
                      <span aria-hidden="true" className="ml-1">&rarr;</span>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
