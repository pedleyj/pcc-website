import type { Metadata } from 'next'
import Link from 'next/link'
import { getActiveMinistries } from '@/lib/db/queries'
import { MinistryGrid } from '@/components/ministries/ministry-grid'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Ministries | Peninsula Covenant Church',
  description: 'Find your place in community at PCC. Explore our ministries for kids, youth, adults, worship, and outreach.',
}

export default async function MinistriesPage() {
  const ministries = await getActiveMinistries()

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center bg-gradient-to-br from-pcc-teal-dark to-pcc-navy">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Find Your Place in Community
          </h1>
          <p className="mt-6 text-xl text-white/90 sm:text-2xl">
            There&apos;s a place for everyone at PCC
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
            Our Ministries
          </h2>
          <p className="mt-4 text-center text-lg text-pcc-slate">
            Browse by category or explore them all
          </p>

          <div className="mt-10">
            <MinistryGrid ministries={ministries} />
          </div>
        </div>
      </section>

      {/* Featured Highlights */}
      <section className="bg-pcc-cream-light">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
            Featured Ministries
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-8 shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pcc-emerald text-xl font-bold text-white">
                A
              </div>
              <h3 className="mt-4 text-xl font-bold text-pcc-navy">Alpha</h3>
              <p className="mt-2 text-pcc-slate">
                Explore life, faith, and meaning in a welcoming environment with free dinner and
                great conversation.
              </p>
              <Link
                href="/explore-faith/alpha"
                className="mt-4 inline-block text-sm font-semibold text-pcc-emerald hover:text-pcc-emerald-dark transition-colors"
              >
                Learn more about Alpha →
              </Link>
            </div>
            <div className="rounded-xl bg-white p-8 shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pcc-gold text-xl font-bold text-pcc-navy">
                K
              </div>
              <h3 className="mt-4 text-xl font-bold text-pcc-navy">Kids Ministry</h3>
              <p className="mt-2 text-pcc-slate">
                Age-appropriate programs that help children know Jesus deeply through engaging
                lessons, activities, and community.
              </p>
            </div>
            <div className="rounded-xl bg-white p-8 shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pcc-orange text-xl font-bold text-white">
                Y
              </div>
              <h3 className="mt-4 text-xl font-bold text-pcc-navy">Youth Ministry</h3>
              <p className="mt-2 text-pcc-slate">
                A vibrant community where teens can grow in faith, build friendships, and discover
                their calling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="bg-gradient-to-br from-pcc-teal-dark to-pcc-navy">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Get Involved</h2>
          <p className="mt-4 text-lg text-white/80">
            Every ministry needs volunteers. Whether you have an hour a week or a special skill to
            share, there&apos;s a way for you to make a difference.
          </p>
          <a
            href="mailto:info@wearepcc.com"
            className="mt-8 inline-block rounded-lg bg-pcc-gold px-10 py-4 text-lg font-bold text-pcc-navy shadow-lg hover:bg-pcc-gold-light transition-colors"
          >
            Serve with Us
          </a>
        </div>
      </section>
    </>
  )
}
