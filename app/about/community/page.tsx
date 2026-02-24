import type { Metadata } from 'next'
import Link from 'next/link'
import { BuildingLibraryIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Community Programs | Peninsula Covenant Church',
  description: 'Preschool, community center, and programs serving families at PCC.',
}

export default function CommunityPage() {
  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Community Programs
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Serving families throughout the peninsula
          </p>
        </div>
      </section>

      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-10 shadow-md">
            <BuildingLibraryIcon className="mx-auto h-12 w-12 text-pcc-navy" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-bold text-pcc-navy">More Than a Church</h2>
            <p className="mt-4 text-pcc-slate">
              Our campus is home to several programs that serve the broader community — the PCC
              Preschool, Peninsula Community Center, and School Age Child Care program.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              {[
                { name: 'PCC Preschool', href: 'https://www.peninsulacovenantpreschool.com/' },
                { name: 'Peninsula Community Center', href: 'https://peninsulacommunitycenter.com/' },
                { name: 'School Age Child Care', href: 'https://pccsacc.com/' },
              ].map((program) => (
                <a
                  key={program.href}
                  href={program.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${program.name} (opens in new tab)`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-pcc-navy hover:text-pcc-teal transition-colors"
                >
                  {program.name}
                  <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 text-pcc-navy/40" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="mt-8 text-sm text-pcc-slate/70">
              Full content coming soon
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
