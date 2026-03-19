import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AcademicCapIcon,
  MapPinIcon,
  CalendarDaysIcon,
  SparklesIcon,
  UserGroupIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'
import { Breadcrumb } from '@/components/layout/breadcrumb'

export const metadata: Metadata = {
  title: 'PCC Preschool | Play-Based Learning for Ages 2–5 | Redwood City',
  description:
    'Christian preschool in Redwood City. Play-based learning since 1965. Ages 2–5. Schedule a tour today!',
}

const programs = [
  {
    name: 'Preschool Classes',
    description: 'Mixed-age classes for children ages 2–5, fostering social skills and early learning through play.',
  },
  {
    name: 'TK After School Care',
    description: 'Extended care for Transitional Kindergarten students after school hours.',
  },
  {
    name: 'Summer Program',
    description: 'Fun, engaging summer activities to keep young learners growing through the break.',
  },
]

const details = [
  { label: 'Ages', value: '2–5 years' },
  { label: 'Philosophy', value: 'Play-based learning' },
  { label: 'Location', value: 'PCC Campus, 3560 Farm Hill Blvd, Redwood City' },
  { label: 'Established', value: '1965' },
]

export default function PreschoolPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-pcc-navy">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'About', href: '/about' }, { label: 'Community', href: '/about/community' }, { label: 'Preschool' }]} />

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pcc-emerald/20">
              <AcademicCapIcon className="h-6 w-6 text-pcc-emerald" aria-hidden="true" />
            </div>
          </div>

          <h1
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            PCC Preschool
          </h1>
          <p className="mt-4 text-xl text-white/90">
            Where curiosity blossoms, friendships grow, and every child is known and loved
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://peninsulacovenantpreschool.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-pcc-gold px-6 py-3 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors"
            >
              Visit Preschool Website
              <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://peninsulacovenantpreschool.com/schedule-a-tour"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Schedule a Tour
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-8 shadow-md sm:p-10">
            <h2 className="text-2xl font-bold text-pcc-navy">About Our Preschool</h2>
            <p className="mt-4 text-pcc-slate leading-relaxed">
              PCC Preschool has been serving families since 1965. We practice play-based learning,
              believing that &ldquo;play is the work of the child.&rdquo; Our experienced teachers create a
              Christ-centered environment where children ages 2&ndash;5 feel known, safe, and loved.
            </p>
            <p className="mt-4 text-pcc-slate leading-relaxed">
              In our mixed-age classrooms, younger children learn from older peers while older children
              develop leadership and empathy. Every day is filled with exploration, creativity, and
              joyful discovery.
            </p>
          </div>

          {/* Programs */}
          <div className="mt-8 rounded-xl bg-white p-8 shadow-md sm:p-10">
            <h2 className="text-2xl font-bold text-pcc-navy">Programs Offered</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {programs.map((program) => (
                <div key={program.name} className="rounded-lg bg-pcc-cream p-5">
                  <SparklesIcon className="h-6 w-6 text-pcc-emerald" aria-hidden="true" />
                  <h3 className="mt-3 font-bold text-pcc-navy">{program.name}</h3>
                  <p className="mt-2 text-sm text-pcc-slate">{program.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Details */}
          <div className="mt-8 rounded-xl bg-white p-8 shadow-md sm:p-10">
            <h2 className="text-2xl font-bold text-pcc-navy">Key Information</h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {details.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  {item.label === 'Location' ? (
                    <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-pcc-teal" aria-hidden="true" />
                  ) : item.label === 'Established' ? (
                    <CalendarDaysIcon className="mt-0.5 h-5 w-5 shrink-0 text-pcc-teal" aria-hidden="true" />
                  ) : item.label === 'Ages' ? (
                    <UserGroupIcon className="mt-0.5 h-5 w-5 shrink-0 text-pcc-teal" aria-hidden="true" />
                  ) : (
                    <SparklesIcon className="mt-0.5 h-5 w-5 shrink-0 text-pcc-teal" aria-hidden="true" />
                  )}
                  <div>
                    <dt className="text-sm font-semibold text-pcc-navy">{item.label}</dt>
                    <dd className="text-sm text-pcc-slate">{item.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Testimonial */}
          <div className="mt-8 rounded-xl bg-pcc-emerald/5 border border-pcc-emerald/20 p-8 sm:p-10">
            <blockquote>
              <p className="text-pcc-slate leading-relaxed italic">
                &ldquo;PCC Preschool has been so instrumental in my timid son breaking out of his shell.
                He feels known, he feels safe, and he feels loved there! It&rsquo;s evident the teachers
                love their jobs and truly delight in the students! PCC preschool is where childhood
                magic happens. It&rsquo;s a treasure to our family!&rdquo;
              </p>
              <footer className="mt-4 text-sm font-semibold text-pcc-navy">
                &mdash; Megan Morey
              </footer>
            </blockquote>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-xl bg-pcc-navy p-8 text-center sm:p-10">
            <h3 className="text-2xl font-bold text-white">Ready to Learn More?</h3>
            <p className="mt-3 text-white/80">
              Visit our website for enrollment information, tuition, and to schedule a campus tour.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://peninsulacovenantpreschool.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-pcc-gold px-6 py-3 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors"
              >
                Learn More &amp; Enroll
                <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://peninsulacovenantpreschool.com/schedule-a-tour"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Schedule a Tour
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
