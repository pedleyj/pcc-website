import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { Breadcrumb } from '@/components/layout/breadcrumb'

export const metadata: Metadata = {
  title: 'Community Programs | Peninsula Covenant Church',
  description:
    'PCC serves the broader community through three ministry programs: Preschool, Peninsula Community Center, and School Age Child Care (SACC).',
}

const programs = [
  {
    name: 'PCC Preschool',
    href: '/about/community/preschool',
    icon: AcademicCapIcon,
    tagline: 'Where curiosity blossoms, friendships grow, and every child is known and loved',
    detail: 'Ages 2–5 | Est. 1965',
    color: 'bg-pcc-emerald/10 text-pcc-emerald',
  },
  {
    name: 'Peninsula Community Center',
    href: '/about/community/community-center',
    icon: BuildingLibraryIcon,
    tagline: 'Fitness, aquatics, tennis & community programs',
    detail: 'Memberships available',
    color: 'bg-pcc-teal/10 text-pcc-teal',
  },
  {
    name: 'PCC School Age Child Care',
    href: '/about/community/sacc',
    icon: UserGroupIcon,
    tagline: 'After-school care shaped by love, inclusion, and integrity',
    detail: 'Elementary ages (K–5th)',
    color: 'bg-pcc-gold/15 text-pcc-gold-dark',
  },
]

export default function CommunityPage() {
  return (
    <>
      <section className="relative bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 pt-8 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'About', href: '/about' }, { label: 'Community Programs' }]} />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-8 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Serving Our Community
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Beyond Sunday mornings, PCC serves the community through three ministry programs
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 pt-20 pb-10 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-pcc-navy">More Than a Church</h2>
          <p className="mt-4 text-lg text-pcc-slate">
            Our campus is home to programs that serve the broader community. Whether you attend
            PCC or not, these ministries are here for you and your family.
          </p>
        </div>
      </section>

      {/* Program Cards */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {programs.map((program) => (
              <Link
                key={program.href}
                href={program.href}
                className="group rounded-xl bg-white p-8 shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-full ${program.color}`}>
                  <program.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
                  {program.name}
                </h3>
                <p className="mt-2 text-sm text-pcc-slate leading-relaxed">
                  {program.tagline}
                </p>
                <p className="mt-3 text-xs font-medium text-pcc-slate/60">
                  {program.detail}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-pcc-teal group-hover:text-pcc-teal-dark transition-colors">
                  Learn More &rarr;
                </span>
              </Link>
            ))}
          </div>

          {/* Connection to PCC */}
          <div className="mt-16 rounded-xl bg-white p-8 text-center shadow-md sm:p-10">
            <h3 className="text-xl font-bold text-pcc-navy">A Ministry of Peninsula Covenant Church</h3>
            <p className="mx-auto mt-4 max-w-2xl text-pcc-slate leading-relaxed">
              Each of these programs is a ministry of PCC, extending our mission of love and service
              to the broader Redwood City community. We&apos;re committed to providing excellence and care
              in everything we do &mdash; from early childhood education to fitness and after-school programs.
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/about"
              className="text-sm font-medium text-pcc-navy hover:text-pcc-teal transition-colors"
            >
              &larr; Back to About
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
