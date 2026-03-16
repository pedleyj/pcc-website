import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ChevronRightIcon,
  HeartIcon,
  UsersIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  MapPinIcon,
  EnvelopeIcon,
  ArrowTopRightOnSquareIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Support Groups | Peninsula Covenant Church',
  description:
    'Find support groups for grief, addiction recovery, divorce, cancer, family challenges, and more. Safe, confidential, welcoming.',
}

const groups = [
  {
    name: 'GriefShare',
    description:
      'A safe, welcoming place where people understand the difficult emotions of grief. This 13-week program offers video teaching, group discussion, and a personal workbook to help you process your loss and find hope.',
    schedule: '13-week program',
    location: null,
    contact: null,
    url: 'https://www.griefshare.org',
    urlLabel: 'Find a GriefShare Group Near You',
    icon: HeartIcon,
  },
  {
    name: 'Divorce & Relationship Support',
    description:
      'Support for individuals navigating divorce or a serious breakup. Learn tools for making safe choices and find community with others who understand what you\'re going through. Drop-in attendance is welcome.',
    schedule: 'Mondays at 7:00 PM',
    location: 'Menlo Church, Garden Court',
    contact: 'Monte Fisher — mfisher@menlo.church',
    url: null,
    urlLabel: null,
    icon: UsersIcon,
  },
  {
    name: 'Addiction Recovery — Higher Power Group',
    description:
      'A Christ-centered recovery group for people dealing with various addictions and life challenges. Available in-person and via Zoom. The group also provides referrals to additional recovery resources.',
    schedule: 'Fridays, 7:00–8:30 PM',
    location: 'Central Peninsula Church, 1005 Shell Blvd, Foster City',
    contact: null,
    url: null,
    urlLabel: null,
    icon: ShieldCheckIcon,
  },
  {
    name: 'Women\'s Cancer Support Group',
    description:
      'Women gather to share their cancer journeys and offer each other strength, encouragement, and compassion. Whether you\'re in treatment, in remission, or supporting someone who is — you\'re welcome here.',
    schedule: 'Monthly meetings',
    location: 'San Jose area',
    contact: 'cancersupportgroup@westgatechurch.org',
    url: null,
    urlLabel: null,
    icon: HeartIcon,
  },
  {
    name: 'Parents of LGBTQ+ Kids',
    description:
      'A safe space for parents to learn practical connection strategies and support one another. Led by Pastor David Tieche, this group focuses on maintaining loving relationships with your children.',
    schedule: null,
    location: null,
    contact: 'ParentSupport@westgatechurch.org',
    url: null,
    urlLabel: null,
    icon: UsersIcon,
  },
  {
    name: 'Men\'s Purity Group',
    description:
      'A supportive community for men addressing sexual sin through worship, reflection, and spiritual accountability. Meets online for privacy and convenience.',
    schedule: 'Tuesdays at 7:30 PM (Online)',
    location: 'Zoom',
    contact: 'Wyatt Anderson & Erik Nelson — yvin73@gmail.com',
    url: null,
    urlLabel: null,
    icon: ShieldCheckIcon,
  },
  {
    name: 'Affair Recovery — EMS Online Course',
    description:
      'A structured online course helping couples heal after infidelity. Designed to guide both partners through the recovery process without shame or blame.',
    schedule: 'Self-paced online course',
    location: 'Online',
    contact: null,
    url: 'https://www.affairrecovery.com',
    urlLabel: 'Learn About the EMS Online Course',
    icon: UsersIcon,
  },
  {
    name: 'Families Dealing with Mental Illness',
    description:
      'A faith-based group for parents navigating family mental illness challenges. Informed by best practices and serving multiple Bay Area churches.',
    schedule: '3rd Sunday monthly, 1:30–3:30 PM (Online)',
    location: 'Zoom',
    contact: 'Diane — tallring@cs.com',
    url: null,
    urlLabel: null,
    icon: HeartIcon,
  },
]

export default function SupportGroupsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center justify-center bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center justify-center gap-1 text-sm text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
            <Link href="/support" className="hover:text-white transition-colors">Support</Link>
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
            <span className="text-white">Support Groups</span>
          </nav>
          <h1
            className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Support Groups
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xl text-white/90">
            You&apos;re not alone in what you&apos;re going through
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 pt-20 pb-10 text-center sm:px-6 lg:px-8">
          <p className="text-lg text-pcc-slate leading-relaxed">
            We partner with several Bay Area churches and organizations to offer support groups for a
            wide range of life challenges. All groups provide a safe, confidential space where you can
            connect with others who understand what you&apos;re going through.
          </p>
          <p className="mt-3 text-sm text-pcc-slate/70">
            Some groups meet at PCC; others are hosted by partner churches in the area.
          </p>
        </div>
      </section>

      {/* Groups */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {groups.map((group) => (
              <div
                key={group.name}
                className="rounded-xl bg-white p-6 shadow-md sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pcc-forest/10 text-pcc-forest">
                    <group.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-bold text-pcc-navy">{group.name}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-pcc-slate">
                      {group.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-pcc-charcoal">
                      {group.schedule && (
                        <span className="flex items-center gap-1.5">
                          <ClockIcon className="h-4 w-4 text-pcc-forest/60" aria-hidden="true" />
                          {group.schedule}
                        </span>
                      )}
                      {group.location && group.location !== 'Online' && group.location !== 'Zoom' && (
                        <span className="flex items-center gap-1.5">
                          <MapPinIcon className="h-4 w-4 text-pcc-forest/60" aria-hidden="true" />
                          {group.location}
                        </span>
                      )}
                      {(group.location === 'Online' || group.location === 'Zoom') && (
                        <span className="flex items-center gap-1.5">
                          <CalendarDaysIcon className="h-4 w-4 text-pcc-forest/60" aria-hidden="true" />
                          Online via Zoom
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {group.contact && (
                        <span className="inline-flex items-center gap-1.5 text-sm text-pcc-forest">
                          <EnvelopeIcon className="h-4 w-4" aria-hidden="true" />
                          {group.contact}
                        </span>
                      )}
                      {group.url && (
                        <a
                          href={group.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-pcc-teal hover:text-pcc-teal-dark transition-colors"
                        >
                          {group.urlLabel || 'Learn More'}
                          <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pcc-navy">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">Don&apos;t See What You Need?</h2>
          <p className="mt-4 text-white/80">
            Reach out to our pastoral care team and we&apos;ll help you find the right support — whether
            it&apos;s a group, one-on-one care, or a professional referral.
          </p>
          <a
            href="mailto:care@wearepcc.com"
            className="mt-8 inline-block rounded-lg bg-pcc-gold px-8 py-3 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
          >
            Email care@wearepcc.com
          </a>
          <p className="mt-6 text-sm text-white/60">
            All inquiries are handled with complete confidentiality.
          </p>
        </div>
      </section>

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
