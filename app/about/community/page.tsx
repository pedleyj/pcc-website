import type { Metadata } from 'next'
import Link from 'next/link'
import { AcademicCapIcon, BuildingLibraryIcon, UserGroupIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Community Programs | Peninsula Covenant Church',
  description: 'Preschool, community center, and programs serving families at PCC.',
}

const programs = [
  {
    name: 'PCC Preschool',
    href: 'https://www.peninsulacovenantpreschool.com/',
    icon: AcademicCapIcon,
    description:
      'A nurturing, play-based preschool for children ages 2 through 5. Our experienced teachers create a warm, supportive environment where young learners build social skills, confidence, and a love of learning through hands-on exploration and discovery.',
    detail: 'Located on the PCC campus in Redwood City, the preschool has been serving families on the peninsula for decades.',
  },
  {
    name: 'Peninsula Community Center',
    href: 'https://peninsulacommunitycenter.com/',
    icon: BuildingLibraryIcon,
    description:
      'A vibrant community hub offering fitness classes, enrichment programs, and facility rentals for families throughout the peninsula. From youth sports to adult wellness, the Community Center provides affordable, accessible programming for people of all ages.',
    detail: 'Open to the public and located on the PCC campus, the Center hosts classes, camps, and community events year-round.',
  },
  {
    name: 'School Age Child Care (SACC)',
    href: 'https://pccsacc.com/',
    icon: UserGroupIcon,
    description:
      'Before- and after-school care for elementary-age children, providing a safe and engaging environment during the hours when families need it most. Kids enjoy homework help, creative activities, outdoor play, and friendships in a caring, structured setting.',
    detail: 'SACC partners with local schools to offer convenient pickup and drop-off, giving families peace of mind throughout the school year.',
  },
]

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

      {/* Intro */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 pt-20 pb-10 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-pcc-navy">More Than a Church</h2>
          <p className="mt-4 text-lg text-pcc-slate">
            Our campus is home to several programs that serve the broader community.
            Whether you attend PCC or not, these ministries are here for you and your family.
          </p>
        </div>
      </section>

      {/* Program Cards */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {programs.map((program) => (
              <div
                key={program.href}
                className="rounded-xl bg-white p-8 shadow-md sm:p-10"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pcc-navy/10 text-pcc-navy">
                    <program.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-pcc-navy">{program.name}</h3>
                    <p className="mt-2 text-pcc-slate leading-relaxed">{program.description}</p>
                    <p className="mt-2 text-sm text-pcc-slate/70 leading-relaxed">{program.detail}</p>
                    <a
                      href={program.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${program.name} website (opens in new tab)`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-pcc-navy hover:text-pcc-teal transition-colors"
                    >
                      Visit Website
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
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
