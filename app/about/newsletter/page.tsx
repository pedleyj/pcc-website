import type { Metadata } from 'next'
import Link from 'next/link'
import { NewspaperIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Newsletter | Peninsula Covenant Church',
  description: 'Subscribe to the PCC newsletter for weekly updates and encouragement.',
}

export default function NewsletterPage() {
  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Newsletter
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Stay connected with what&apos;s happening at PCC
          </p>
        </div>
      </section>

      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-10 shadow-md">
            <NewspaperIcon className="mx-auto h-12 w-12 text-pcc-navy" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-bold text-pcc-navy">Weekly Updates</h2>
            <p className="mt-4 text-pcc-slate">
              Our newsletter keeps you up to date with sermon highlights, upcoming events,
              community stories, and prayer requests. Subscribe to stay in the loop.
            </p>
            <p className="mt-8 text-sm text-pcc-slate/70">
              Full content coming soon — newsletter signup will be available here
            </p>
          </div>
          <Link
            href="/about"
            className="mt-8 inline-block text-sm font-medium text-pcc-navy hover:text-pcc-teal transition-colors"
          >
            &larr; Back to About
          </Link>
        </div>
      </section>
    </>
  )
}
