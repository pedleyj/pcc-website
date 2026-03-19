import type { Metadata } from 'next'
import Link from 'next/link'
import {
  UserGroupIcon,
  HeartIcon,
  SparklesIcon,
  SunIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'
import { Breadcrumb } from '@/components/layout/breadcrumb'

export const metadata: Metadata = {
  title: 'PCC SACC | After School Child Care | Redwood City',
  description:
    'Quality after-school care for elementary students in Redwood City. Nurturing, faith-based environment with indoor/outdoor play.',
}

const features = [
  {
    name: 'Indoor & Outdoor Play',
    description: 'Active play in safe, supervised spaces that let kids be kids.',
    icon: SunIcon,
  },
  {
    name: 'Social-Emotional Learning',
    description: 'Activities that build empathy, teamwork, and interpersonal skills.',
    icon: HeartIcon,
  },
  {
    name: 'Faith-Based Exploration',
    description: 'Values of love, inclusion, and integrity woven into everyday care.',
    icon: SparklesIcon,
  },
]

export default function SaccPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-pcc-navy">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'About', href: '/about' }, { label: 'Community', href: '/about/community' }, { label: 'SACC' }]} />

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pcc-gold/20">
              <UserGroupIcon className="h-6 w-6 text-pcc-gold" aria-hidden="true" />
            </div>
          </div>

          <h1
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            PCC School Age Child Care
          </h1>
          <p className="mt-2 text-lg text-white/60">(SACC)</p>
          <p className="mt-4 text-xl text-white/90">
            A nurturing, learning environment shaped by love, inclusion, and integrity
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://pccsacc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-pcc-gold px-6 py-3 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors"
            >
              Visit SACC Website
              <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-8 shadow-md sm:p-10">
            <h2 className="text-2xl font-bold text-pcc-navy">About SACC</h2>
            <p className="mt-4 text-pcc-slate leading-relaxed">
              PCC SACC provides a nurturing, learning environment for elementary-age children
              shaped by the values of love, inclusion, and integrity. Our faith-based program
              promotes exploration and curiosity through indoor and outdoor play activities,
              social-emotional learning, and an emphasis on belonging and care.
            </p>
          </div>

          {/* Program */}
          <div className="mt-8 rounded-xl bg-white p-8 shadow-md sm:p-10">
            <h2 className="text-2xl font-bold text-pcc-navy">After School Camp</h2>
            <p className="mt-4 text-pcc-slate leading-relaxed">
              Our After School Camp provides before- and after-school care for elementary students
              (approximately K&ndash;5th grade). Children enjoy a structured yet flexible environment
              with homework time, creative activities, outdoor play, and friendships &mdash; all in a
              caring, supervised setting.
            </p>
          </div>

          {/* Features */}
          <div className="mt-8 rounded-xl bg-white p-8 shadow-md sm:p-10">
            <h2 className="text-2xl font-bold text-pcc-navy">What Makes SACC Special</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="rounded-lg bg-pcc-cream p-5 text-center">
                  <feature.icon className="mx-auto h-8 w-8 text-pcc-gold-dark" aria-hidden="true" />
                  <h3 className="mt-3 font-bold text-pcc-navy">{feature.name}</h3>
                  <p className="mt-2 text-sm text-pcc-slate">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Info */}
          <div className="mt-8 rounded-xl bg-white p-8 shadow-md sm:p-10">
            <h2 className="text-2xl font-bold text-pcc-navy">Key Information</h2>
            <dl className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <UserGroupIcon className="mt-0.5 h-5 w-5 shrink-0 text-pcc-teal" aria-hidden="true" />
                <div>
                  <dt className="text-sm font-semibold text-pcc-navy">Ages</dt>
                  <dd className="text-sm text-pcc-slate">Elementary school age (K&ndash;5th grade approximately)</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HeartIcon className="mt-0.5 h-5 w-5 shrink-0 text-pcc-teal" aria-hidden="true" />
                <div>
                  <dt className="text-sm font-semibold text-pcc-navy">Focus</dt>
                  <dd className="text-sm text-pcc-slate">Faith-based, nurturing care</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <SparklesIcon className="mt-0.5 h-5 w-5 shrink-0 text-pcc-teal" aria-hidden="true" />
                <div>
                  <dt className="text-sm font-semibold text-pcc-navy">Summer</dt>
                  <dd className="text-sm text-pcc-slate">
                    PCC SACC counselors also staff PCC Summer Camp through Peninsula Community Center
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-xl bg-pcc-navy p-8 text-center sm:p-10">
            <h3 className="text-2xl font-bold text-white">Interested in SACC?</h3>
            <p className="mt-3 text-white/80">
              Visit our website to learn about enrollment, schedules, and tuition.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://pccsacc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-pcc-gold px-6 py-3 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors"
              >
                Inquire About Enrollment
                <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://pccsacc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/about/community"
              className="text-sm font-medium text-pcc-navy hover:text-pcc-teal transition-colors"
            >
              &larr; Back to Community Programs
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
