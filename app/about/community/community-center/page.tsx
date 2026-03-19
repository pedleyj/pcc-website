import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BuildingLibraryIcon,
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'
import { Breadcrumb } from '@/components/layout/breadcrumb'

export const metadata: Metadata = {
  title: 'Peninsula Community Center | Fitness, Tennis, Aquatics | Redwood City',
  description:
    'Community fitness center in Redwood City. Tennis, swim lessons, group fitness, and youth programs. Memberships available.',
}

const amenities = [
  {
    name: 'Tennis',
    description: 'Lessons, court reservations, and youth programs for all skill levels.',
  },
  {
    name: 'Aquatics',
    description: 'Swim school, private lessons, Dolphins swim team, and open pool hours.',
  },
  {
    name: 'Fitness',
    description: 'Group classes, personal training, pickup basketball, and weight room.',
  },
  {
    name: 'Youth Programs',
    description: 'PE+, child care, and PCC Summer Camp for entering 1st–5th graders.',
  },
]

export default function CommunityCenterPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-pcc-navy">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'About', href: '/about' }, { label: 'Community', href: '/about/community' }, { label: 'Community Center' }]} />

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pcc-teal/20">
              <BuildingLibraryIcon className="h-6 w-6 text-pcc-teal-light" aria-hidden="true" />
            </div>
          </div>

          <h1
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Peninsula Community Center
          </h1>
          <p className="mt-4 text-xl text-white/90">
            Healthy, Meaningful, Personal Connections
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://peninsulacommunitycenter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-pcc-gold px-6 py-3 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors"
            >
              Visit Center Website
              <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://peninsulacommunitycenter.com/join"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Become a Member
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-8 shadow-md sm:p-10">
            <h2 className="text-2xl font-bold text-pcc-navy">About the Center</h2>
            <p className="mt-4 text-pcc-slate leading-relaxed">
              Building healthy, meaningful, and personal connections through sports and fitness
              so that people thrive as they feel known and valued by name is at the heart of
              everything we do. Whether you are looking for group exercise, tennis, swim,
              or one of our family or youth activities, you&rsquo;ll find a great community where you
              can belong.
            </p>
          </div>

          {/* Programs & Amenities */}
          <div className="mt-8 rounded-xl bg-white p-8 shadow-md sm:p-10">
            <h2 className="text-2xl font-bold text-pcc-navy">Programs &amp; Amenities</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {amenities.map((item) => (
                <div key={item.name} className="rounded-lg bg-pcc-cream p-5">
                  <h3 className="font-bold text-pcc-navy">{item.name}</h3>
                  <p className="mt-2 text-sm text-pcc-slate">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 rounded-xl bg-white p-8 shadow-md sm:p-10">
            <h2 className="text-2xl font-bold text-pcc-navy">Visit Us</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-pcc-teal" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-pcc-navy">Location</p>
                  <p className="text-sm text-pcc-slate">3623 Jefferson Avenue, Redwood City, CA 94062</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-pcc-teal" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-pcc-navy">Admin Hours</p>
                  <p className="text-sm text-pcc-slate">Monday&ndash;Friday 9:00am&ndash;5:00pm</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-pcc-teal" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-pcc-navy">Phone</p>
                  <p className="text-sm text-pcc-slate">
                    <a href="tel:650-364-6272" className="text-pcc-teal hover:underline">650-364-6272</a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <EnvelopeIcon className="mt-0.5 h-5 w-5 shrink-0 text-pcc-teal" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-pcc-navy">Email</p>
                  <p className="text-sm text-pcc-slate">
                    <a href="mailto:membercare@wearepcc.com" className="text-pcc-teal hover:underline">membercare@wearepcc.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-8 rounded-xl bg-pcc-teal/5 border border-pcc-teal/20 p-8 sm:p-10">
            <blockquote>
              <p className="text-pcc-slate leading-relaxed italic">
                &ldquo;An opportunity for fitness and friendship during these tough times AND an upbeat
                and safe environment for employees (which is a very challenging thing to pull off).
                I really appreciate the thought and effort that you put into this. I will never
                forget it!&rdquo;
              </p>
              <footer className="mt-4 text-sm font-semibold text-pcc-navy">
                &mdash; Hilary Stevenson
              </footer>
            </blockquote>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-xl bg-pcc-navy p-8 text-center sm:p-10">
            <h3 className="text-2xl font-bold text-white">Join Our Community</h3>
            <p className="mt-3 text-white/80">
              Become a member to access all our programs, facilities, and a welcoming community.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://peninsulacommunitycenter.com/join"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-pcc-gold px-6 py-3 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors"
              >
                Become a Member
                <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://peninsulacommunitycenter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                View Programs &amp; Classes
              </a>
              <a
                href="https://peninsulacommunitycenter.com/roomrentals"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Room Rentals
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
