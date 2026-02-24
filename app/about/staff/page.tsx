import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronRightIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import { getAllStaff } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Our Staff | Peninsula Covenant Church',
  description: 'Get to know the pastors and staff who serve our church family at PCC.',
}

type StaffMember = Awaited<ReturnType<typeof getAllStaff>>[number]

const departmentOrder = [
  'Pastoral',
  'Kids',
  'Youth',
  'Worship',
  'Outreach',
  'Admin',
  'Operations',
  'Community',
]

const departmentLabels: Record<string, string> = {
  Pastoral: 'Pastoral Team',
  Kids: "Children's Ministry",
  Youth: 'Youth & Young Adults',
  Worship: 'Worship & Creative',
  Outreach: 'Global & Local Outreach',
  Admin: 'Administration & Finance',
  Operations: 'Operations & Facilities',
  Community: 'Community Programs',
}

export default async function StaffPage() {
  const allStaff = await getAllStaff()

  // Group by department in defined order
  const grouped = departmentOrder
    .map((dept) => ({
      department: dept,
      label: departmentLabels[dept] || dept,
      members: allStaff.filter((s: StaffMember) => s.department === dept),
    }))
    .filter((g) => g.members.length > 0)

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center justify-center bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center justify-center gap-1 text-sm text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
            <span className="text-white">Our Staff</span>
          </nav>
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Our Staff
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Get to know the team that serves our church family
          </p>
        </div>
      </section>

      {/* Staff Directory */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {grouped.map((group) => (
              <div key={group.department}>
                <h2 className="text-2xl font-bold text-pcc-navy">{group.label}</h2>
                <div className="mt-2 h-1 w-16 rounded-full bg-pcc-teal" />
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.members.map((member: StaffMember) => (
                    <div
                      key={member.id}
                      className="group overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
                    >
                      {/* Photo */}
                      <div className="relative h-56 w-full bg-pcc-cream">
                        {member.photoUrl ? (
                          <Image
                            src={member.photoUrl}
                            alt={member.name}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-4xl font-bold text-pcc-navy/30">
                            {member.name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-pcc-navy">{member.name}</h3>
                        <p className="mt-1 text-sm font-medium text-pcc-teal">{member.role}</p>
                        {member.bio && (
                          <p className="mt-3 text-sm leading-relaxed text-pcc-slate line-clamp-3">
                            {member.bio}
                          </p>
                        )}
                        <div className="mt-4 flex flex-wrap gap-3">
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="inline-flex items-center gap-1 text-xs font-medium text-pcc-slate hover:text-pcc-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2 rounded-sm"
                            >
                              <EnvelopeIcon className="h-3.5 w-3.5" aria-hidden="true" />
                              {member.email}
                            </a>
                          )}
                          {member.phone && (
                            <a
                              href={`tel:${member.phone.replace(/[^\d+]/g, '')}`}
                              className="inline-flex items-center gap-1 text-xs font-medium text-pcc-slate hover:text-pcc-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2 rounded-sm"
                            >
                              <PhoneIcon className="h-3.5 w-3.5" aria-hidden="true" />
                              {member.phone}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Back link */}
          <div className="mt-16 text-center">
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
