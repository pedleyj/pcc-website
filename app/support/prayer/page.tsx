import Link from 'next/link'
import { HeartIcon, ShieldCheckIcon, UsersIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import { getPublicPrayerRequests } from '@/lib/db/queries'
import { PrayerForm } from '@/components/support/prayer-form'
import { formatDistanceToNow } from 'date-fns'

export const revalidate = 60

export default async function PrayerPage() {
  const publicPrayers = await getPublicPrayerRequests()

  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Prayer Requests
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            You don&apos;t have to carry it alone
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 pt-20 pb-10 text-center sm:px-6 lg:px-8">
          <HeartIcon className="mx-auto h-12 w-12 text-pcc-forest" aria-hidden="true" />
          <h2 className="mt-6 text-2xl font-bold text-pcc-navy">We&apos;d Be Honored to Pray for You</h2>
          <p className="mt-4 text-lg text-pcc-slate leading-relaxed">
            Whatever you&apos;re going through — a health concern, a difficult season, a decision you&apos;re
            facing, gratitude for something good — we believe prayer makes a difference. Share
            what&apos;s on your heart and let our community come alongside you.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <HandRaisedIcon className="mx-auto h-8 w-8 text-pcc-forest" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-bold text-pcc-navy">Share Your Request</h3>
              <p className="mt-2 text-sm text-pcc-slate">
                Use the form below to tell us what you need prayer for. Share as much or as little as you&apos;re comfortable with.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <UsersIcon className="mx-auto h-8 w-8 text-pcc-forest" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-bold text-pcc-navy">Our Team Prays</h3>
              <p className="mt-2 text-sm text-pcc-slate">
                A dedicated prayer team reads every request and lifts each one up in prayer throughout the week.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <ShieldCheckIcon className="mx-auto h-8 w-8 text-pcc-forest" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-bold text-pcc-navy">Confidential & Safe</h3>
              <p className="mt-2 text-sm text-pcc-slate">
                Private requests are seen only by our pastoral prayer team. Public requests are shared so others can pray too.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-xl px-4 pb-12 sm:px-6 lg:px-8">
          <PrayerForm />

          <div className="mt-8 rounded-xl border border-pcc-forest/20 bg-pcc-forest/5 p-6 text-center">
            <p className="text-sm text-pcc-slate leading-relaxed">
              <span className="font-semibold text-pcc-navy">Need immediate support?</span>{' '}
              If you&apos;re in crisis or need to talk to someone right away, please call the church
              office at{' '}
              <a href="tel:650-365-8094" className="font-medium text-pcc-forest hover:underline">
                650-365-8094
              </a>{' '}
              or email{' '}
              <a href="mailto:care@wearepcc.com" className="font-medium text-pcc-forest hover:underline">
                care@wearepcc.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Public Prayers */}
      {publicPrayers.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-pcc-navy">Join Others in Prayer</h2>
              <p className="mt-2 text-pcc-slate">
                These requests have been shared publicly. Consider lifting them up in your own prayers.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {publicPrayers.map((prayer) => {
                const firstName = prayer.name.split(' ')[0]
                const timeAgo = formatDistanceToNow(new Date(prayer.createdAt), { addSuffix: true })

                return (
                  <div
                    key={prayer.id}
                    className="rounded-xl border border-pcc-cream-dark bg-pcc-cream-light p-5"
                  >
                    <p className="text-pcc-slate leading-relaxed">{prayer.request}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-sm font-medium text-pcc-navy">{firstName}</p>
                      <p className="text-xs text-pcc-slate/60">{timeAgo}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <Link
            href="/support"
            className="text-sm font-medium text-pcc-forest hover:text-pcc-forest/80 transition-colors"
          >
            &larr; Back to Support
          </Link>
        </div>
      </section>
    </>
  )
}
