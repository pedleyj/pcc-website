import type { Metadata } from 'next'
import Link from 'next/link'
import { UserGroupIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Small Groups | Peninsula Covenant Church',
  description: 'Connect with others in Growth Groups or Life Groups at PCC.',
}

export default function GroupsPage() {
  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center bg-gradient-to-br from-pcc-teal-dark to-pcc-navy">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Small Groups
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Connect with others in Growth Groups or Life Groups
          </p>
        </div>
      </section>

      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-10 shadow-md">
            <UserGroupIcon className="mx-auto h-12 w-12 text-pcc-teal" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-bold text-pcc-navy">Life Is Better Together</h2>
            <p className="mt-4 text-pcc-slate">
              Small groups are the heartbeat of our community. Whether you&apos;re looking for Bible
              study, fellowship, or support, there&apos;s a group for you.
            </p>
            <a
              href="https://wearepcc.churchcenter.com/groups"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-pcc-teal px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-teal-light transition-colors"
            >
              Browse Groups on Church Center
              <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="mt-8 text-sm text-pcc-slate/70">
              Coming soon: Browse groups directly on our website
            </p>
          </div>
          <Link
            href="/connect"
            className="mt-8 inline-block text-sm font-medium text-pcc-teal hover:text-pcc-teal-dark transition-colors"
          >
            &larr; Back to Connect
          </Link>
        </div>
      </section>
    </>
  )
}
