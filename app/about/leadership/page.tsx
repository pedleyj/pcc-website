'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  EnvelopeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Breadcrumb } from '@/components/layout/breadcrumb'

type Leader = {
  name: string
  role: string
  term: string | null
  email?: string
  image: string
  bio: string
}

const officers: Leader[] = [
  {
    name: 'Mark Tumney',
    role: 'Lead Pastor',
    term: null,
    email: 'mark@wearepcc.com',
    image: 'https://wearepcc.com/wp-content/uploads/2024/01/mark-tumney.png',
    bio: 'Mark has served as Lead Pastor of Peninsula Covenant Church since 2024, bringing a passion for community transformation and biblical teaching. He leads with a heart for helping people discover their God-given purpose and building bridges between the church and the broader community.',
  },
  {
    name: 'Jon Pedley',
    role: 'Chair',
    term: '2028',
    email: 'chair@wearepcc.com',
    image: '/images/leadership/jon-pedley.jpg',
    bio: 'Jon serves as Chair of the Leadership Support Team, helping to guide the strategic direction of PCC. A longtime member of the church, he brings professional leadership experience and a deep commitment to the mission and values of the congregation.',
  },
  {
    name: 'Maureen Becker',
    role: 'Vice Chair',
    term: '2026',
    image: '/images/leadership/maureen-becker.jpg',
    bio: 'Maureen serves as Vice Chair, working alongside the Chair and Lead Pastor to support the leadership and governance of PCC. She is known for her thoughtful approach to decision-making and her dedication to fostering a welcoming church community.',
  },
  {
    name: 'Sue Fabbro',
    role: 'Secretary',
    term: '2027',
    image: '/images/leadership/sue-fabbro.jpg',
    bio: 'Sue serves as Secretary of the Leadership Support Team, ensuring clear communication and thorough record-keeping for the governance of PCC. Her attention to detail and organizational gifts help the team operate with transparency and accountability.',
  },
  {
    name: 'Jim Breen',
    role: 'Treasurer',
    term: '2027',
    image: '/images/leadership/jim-breen.jpg',
    bio: 'Jim serves as Treasurer, overseeing the financial stewardship of PCC. With a background in finance and a heart for the church, he ensures that resources are managed wisely and in alignment with the congregation\'s mission and priorities.',
  },
]

const lstMembers: Leader[] = [
  {
    name: 'Jeffrey Sang',
    role: 'Member',
    term: '2028',
    image: 'https://placehold.co/400x400/31825e/ffffff?text=JS',
    bio: 'Jeffrey is a dedicated member of the Leadership Support Team, contributing his experience and perspective to the governance and spiritual health of PCC. He is actively involved in the life of the church and passionate about seeing the community grow and thrive.',
  },
  {
    name: 'Michael Harrison',
    role: 'Member',
    term: '2028',
    image: 'https://placehold.co/400x400/31825e/ffffff?text=MH',
    bio: 'Michael brings a wealth of experience and a servant\'s heart to the Leadership Support Team. He is committed to helping PCC fulfill its mission of reaching the community with the love of Christ through meaningful programs and outreach.',
  },
  {
    name: 'Cathy James',
    role: 'Member',
    term: '2027',
    image: 'https://placehold.co/400x400/31825e/ffffff?text=CJ',
    bio: 'Cathy is a valued member of the Leadership Support Team, known for her compassion and commitment to the families of PCC. She brings a thoughtful perspective to team discussions and a deep love for building intergenerational community.',
  },
  {
    name: 'Jennifer Wong',
    role: 'Member',
    term: '2028',
    image: 'https://placehold.co/400x400/31825e/ffffff?text=JW',
    bio: 'Jennifer serves on the Leadership Support Team with a heart for worship and creative expression. She helps ensure that PCC remains a vibrant, Spirit-led community where people of all backgrounds can encounter God.',
  },
  {
    name: 'Karen Bowman',
    role: 'Member',
    term: '2028',
    image: 'https://placehold.co/400x400/31825e/ffffff?text=KB',
    bio: 'Karen is a long-time member of PCC and brings a deep understanding of the church\'s history and community connections to the Leadership Support Team. Her wisdom and warmth are appreciated by all who work alongside her.',
  },
]

const nominatingTeam = [
  { name: 'Scott Chong', role: 'Chair', term: '2027' },
  { name: 'Clio DeVitis', role: 'Secretary', term: '2028' },
  { name: 'Joseph Chen', role: null, term: '2028' },
  { name: 'Patricia Ortiz', role: null, term: '2026' },
]

function LeaderCard({ leader, onClick }: { leader: Leader; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-md text-left transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2 w-full"
    >
      <Image
        src={leader.image}
        alt={leader.name}
        width={64}
        height={64}
        className="h-16 w-16 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0">
        <p className="font-semibold text-pcc-navy">{leader.name}</p>
        <p className="text-sm text-pcc-teal">{leader.role}</p>
        {leader.term && (
          <p className="text-xs text-pcc-slate/60">Term ends {leader.term}</p>
        )}
      </div>
    </button>
  )
}

function LeaderModal({ leader, onClose }: { leader: Leader; onClose: () => void }) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`About ${leader.name}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-pcc-slate hover:bg-pcc-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal"
          aria-label="Close"
        >
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="text-center">
          <Image
            src={leader.image}
            alt={leader.name}
            width={160}
            height={160}
            className="mx-auto h-32 w-32 rounded-full object-cover shadow-lg sm:h-40 sm:w-40"
          />
          <h3 className="mt-5 text-xl font-bold text-pcc-navy">{leader.name}</h3>
          <p className="text-sm font-medium text-pcc-teal">{leader.role}</p>
          {leader.term && (
            <p className="mt-0.5 text-xs text-pcc-slate/60">Term ends {leader.term}</p>
          )}
        </div>

        <p className="mt-6 text-sm leading-relaxed text-pcc-slate">{leader.bio}</p>

        {leader.email && (
          <a
            href={`mailto:${leader.email}`}
            className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-pcc-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-pcc-navy/90 transition-colors"
          >
            <EnvelopeIcon className="h-4 w-4" aria-hidden="true" />
            {leader.email}
          </a>
        )}
      </div>
    </div>
  )
}

export default function LeadershipPage() {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 pt-8 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'About', href: '/about' }, { label: 'Our Leadership' }]} />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-8 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Our Leadership
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Meet the people who help guide our church community
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 pt-20 pb-10 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-pcc-navy">PCC Leadership Support Team</h2>
          <p className="mt-4 text-lg leading-relaxed text-pcc-slate">
            The Leadership Support Team (LST) oversees the mission and spiritual health
            of PCC. The LST ensures our continued biblical alignment with the direction
            God is calling us, and provides essential operations, administration, and
            implementation of our mission, beliefs, and values.
          </p>
          <p className="mt-4 text-sm text-pcc-slate/70">
            Click on any team member to learn more about them.
          </p>
        </div>
      </section>

      {/* Officers */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
          <h3 className="mb-6 text-lg font-bold text-pcc-navy">Officers</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {officers.map((leader) => (
              <LeaderCard
                key={leader.name}
                leader={leader}
                onClick={() => setSelectedLeader(leader)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* LST Members */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
          <h3 className="mb-6 text-lg font-bold text-pcc-navy">Team Members</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lstMembers.map((leader) => (
              <LeaderCard
                key={leader.name}
                leader={leader}
                onClick={() => setSelectedLeader(leader)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Nominating Team */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-8 shadow-md sm:p-10">
            <h3 className="text-xl font-bold text-pcc-navy">Nominating Team</h3>
            <p className="mt-3 text-sm leading-relaxed text-pcc-slate">
              The Nominating Team seeks and reviews candidates for the Leadership Support Team
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
                Interested in serving on the Leadership Support Team?
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

      {/* Leader Modal */}
      {selectedLeader && (
        <LeaderModal
          leader={selectedLeader}
          onClose={() => setSelectedLeader(null)}
        />
      )}
    </>
  )
}
