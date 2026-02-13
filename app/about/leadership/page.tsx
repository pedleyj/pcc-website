import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ChevronRightIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Our Leadership | Peninsula Covenant Church',
  description: 'Meet the Leadership Team who oversee the mission and direction of PCC.',
}

const officers = [
  { name: 'Mark Tumney', role: 'Lead Pastor', term: null },
  { name: 'Jon Pedley', role: 'Chair', term: '2028' },
  { name: 'Maureen Becker', role: 'Vice Chair', term: '2026' },
  { name: 'Sue Fabbro', role: 'Secretary', term: '2027' },
  { name: 'Jim Breen', role: 'Treasurer', term: '2027' },
]

const representatives = [
  { name: 'Jeffrey Sang', area: 'Adult Ministries', term: '2028' },
  { name: 'Michael Harrison', area: 'Global & Local Outreach', term: '2028' },
  { name: 'Cathy James', area: 'Students & Families', term: '2027' },
  { name: 'Jennifer Wong', area: 'Worship', term: '2028' },
  { name: null, area: 'Community Center', term: null, open: true },
  { name: 'Karen Bowman', area: 'Preschool-School Age Child Care', term: '2028' },
]

const nominatingTeam = [
  { name: 'Scott Chong', role: 'Chair', term: '2027' },
  { name: 'Clio DeVitis', role: 'Secretary', term: '2028' },
  { name: 'Joseph Chen', role: null, term: '2028' },
  { name: 'Patricia Ortiz', role: null, term: '2026' },
]

export default function LeadershipPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center justify-center bg-gradient-to-br from-pcc-navy to-pcc-deepBlue">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center justify-center gap-1 text-sm text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
            <span className="text-white">Our Leadership</span>
          </nav>
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Our Leadership
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 pt-20 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-8 shadow-md sm:p-10">
            <h2 className="text-2xl font-bold text-pcc-navy">PCC Leadership Team</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-pcc-slate">
              <p>
                The Peninsula Covenant Church Leadership Team (LST) oversees the mission and
                spiritual health of PCC. The LST ensures our continued biblical alignment with
                the direction God is calling us, and provides essential operations, administration,
                and implementation of our mission, beliefs, and values.
              </p>
              <p>
                Leadership Team members are church members in good standing who demonstrate the
                Christian maturity and leadership described in 1&nbsp;Timothy&nbsp;3:1&#8209;7,
                Titus&nbsp;1:5&#8209;9, and Romans&nbsp;12:3&#8209;8.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Officers */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-8 shadow-md sm:p-10">
            <h2 className="text-2xl font-bold text-pcc-navy">Officers</h2>
            <ul className="mt-6 divide-y divide-pcc-cream">
              {officers.map((person) => (
                <li key={person.name} className="flex items-baseline justify-between py-4 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-semibold text-pcc-navy">{person.name}</p>
                    <p className="text-sm text-pcc-slate">{person.role}</p>
                  </div>
                  {person.term && (
                    <span className="shrink-0 text-xs text-pcc-slate/60">Term ends {person.term}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Representatives */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-8 shadow-md sm:p-10">
            <h2 className="text-2xl font-bold text-pcc-navy">Representatives</h2>
            <ul className="mt-6 divide-y divide-pcc-cream">
              {representatives.map((person) => (
                <li
                  key={person.area}
                  className="flex items-baseline justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    {person.open ? (
                      <p className="font-semibold italic text-pcc-slate/60">Open Position</p>
                    ) : (
                      <p className="font-semibold text-pcc-navy">{person.name}</p>
                    )}
                    <p className="text-sm text-pcc-slate">{person.area}</p>
                  </div>
                  {person.term && (
                    <span className="shrink-0 text-xs text-pcc-slate/60">Term ends {person.term}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Nominating Team */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-8 shadow-md sm:p-10">
            <h2 className="text-2xl font-bold text-pcc-navy">Nominating Team</h2>
            <p className="mt-3 text-sm leading-relaxed text-pcc-slate">
              The Nominating Team seeks and reviews candidates for the Leadership Team
              when positions become available.
            </p>
            <ul className="mt-6 divide-y divide-pcc-cream">
              {nominatingTeam.map((person) => (
                <li key={person.name} className="flex items-baseline justify-between py-4 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-semibold text-pcc-navy">{person.name}</p>
                    {person.role && <p className="text-sm text-pcc-slate">{person.role}</p>}
                  </div>
                  {person.term && (
                    <span className="shrink-0 text-xs text-pcc-slate/60">Term ends {person.term}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-lg bg-pcc-cream/50 p-5">
              <p className="text-sm text-pcc-slate">
                Interested in serving on the Leadership Team?
              </p>
              <a
                href="mailto:nominating@wearepcc.com"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-pcc-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-pcc-navy/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
              >
                <EnvelopeIcon className="h-4 w-4" aria-hidden="true" />
                Email the Nominating Team
              </a>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-10 text-center">
            <Link
              href="/about"
              className="text-sm font-medium text-pcc-navy hover:text-pcc-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2 rounded-sm"
            >
              &larr; Back to About
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
