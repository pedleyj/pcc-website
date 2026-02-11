import type { Metadata } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  LightBulbIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { getCurrentAlphaSession } from '@/lib/db/queries'

export const metadata: Metadata = {
  title: 'Alpha | Peninsula Covenant Church',
  description: 'Explore life, faith, and meaning through Alpha at PCC. Free dinner, great conversation, no pressure.',
}

export default async function AlphaPage() {
  const alphaSession = await getCurrentAlphaSession()

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-br from-pcc-emerald-dark to-pcc-forest">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Discover Jesus Through Alpha
          </h1>
          <p className="mt-6 text-xl text-white/90 sm:text-2xl">
            Explore life&apos;s big questions in a welcoming community
          </p>
          {alphaSession && (
            <a
              href="#register"
              className="mt-8 inline-block rounded-lg bg-pcc-gold px-8 py-3 text-lg font-semibold text-pcc-navy shadow-lg hover:bg-pcc-gold-light transition-colors"
            >
              Register Now
            </a>
          )}
        </div>
      </section>

      {/* What is Alpha */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-pcc-navy sm:text-4xl">What is Alpha?</h2>
            <div className="mx-auto mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-pcc-charcoal">
              <p>
                Alpha is a series of sessions exploring the Christian faith. Each talk looks at a
                different question around faith and is designed to create conversation. It&apos;s a
                safe space to discuss life&apos;s big questions with others who are exploring faith.
              </p>
              <p className="text-xl font-semibold text-pcc-emerald">
                No pressure. No follow-up. No charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="bg-pcc-cream-light">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
            What to Expect
          </h2>
          <p className="mt-4 text-center text-lg text-pcc-slate">
            Each session follows a simple format over 10 weeks
          </p>

          {/* Format cards */}
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-8 text-center shadow-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pcc-gold/20 text-pcc-gold">
                <HeartIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-pcc-navy">Dinner</h3>
              <p className="mt-2 text-pcc-slate">
                Every session starts with a free meal together. It&apos;s a great way to relax and connect.
              </p>
            </div>
            <div className="rounded-xl bg-white p-8 text-center shadow-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pcc-emerald/20 text-pcc-emerald">
                <LightBulbIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-pcc-navy">Video Talk</h3>
              <p className="mt-2 text-pcc-slate">
                Watch a short, engaging video exploring a key question about life and faith.
              </p>
            </div>
            <div className="rounded-xl bg-white p-8 text-center shadow-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pcc-teal/20 text-pcc-teal">
                <ChatBubbleLeftRightIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-pcc-navy">Discussion</h3>
              <p className="mt-2 text-pcc-slate">
                Share your thoughts and hear from others in a small group. Every opinion is welcome.
              </p>
            </div>
          </div>

          {/* Topics */}
          <div className="mt-16">
            <h3 className="text-center text-2xl font-bold text-pcc-navy">Topics We Explore</h3>
            <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
              {[
                'Is there more to life than this?',
                'Who is Jesus?',
                'Why did Jesus die?',
                'How can I have faith?',
                'Why and how do I pray?',
                'Why and how should I read the Bible?',
                'How does God guide us?',
                'Who is the Holy Spirit?',
                'How can I resist evil?',
                'Why and how should I tell others?',
              ].map((topic, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pcc-emerald text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-pcc-charcoal">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-pcc-teal font-semibold">
            Free childcare available for all sessions
          </p>
        </div>
      </section>

      {/* Next Session Details */}
      {alphaSession && (
        <section id="register" className="scroll-mt-16 bg-pcc-emerald/10 border-t-4 border-pcc-emerald">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-pcc-emerald sm:text-4xl">
              Next Session Details
            </h2>

            <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CalendarDaysIcon className="mt-0.5 h-6 w-6 shrink-0 text-pcc-emerald" />
                  <div>
                    <p className="text-sm font-medium text-pcc-slate">Starts</p>
                    <p className="text-lg font-semibold text-pcc-navy">
                      {format(new Date(alphaSession.startDate), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarDaysIcon className="mt-0.5 h-6 w-6 shrink-0 text-pcc-emerald" />
                  <div>
                    <p className="text-sm font-medium text-pcc-slate">Ends</p>
                    <p className="text-lg font-semibold text-pcc-navy">
                      {format(new Date(alphaSession.endDate), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ClockIcon className="mt-0.5 h-6 w-6 shrink-0 text-pcc-emerald" />
                  <div>
                    <p className="text-sm font-medium text-pcc-slate">Meeting</p>
                    <p className="text-lg font-semibold text-pcc-navy">
                      {alphaSession.meetingDay}, {alphaSession.meetingTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPinIcon className="mt-0.5 h-6 w-6 shrink-0 text-pcc-emerald" />
                  <div>
                    <p className="text-sm font-medium text-pcc-slate">Location</p>
                    <p className="text-lg font-semibold text-pcc-navy">{alphaSession.location}</p>
                  </div>
                </div>
              </div>

              {alphaSession.maxCapacity && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <UserGroupIcon className="h-5 w-5 text-pcc-emerald" />
                  <p className="text-lg font-semibold text-pcc-emerald">
                    {alphaSession.maxCapacity - alphaSession.currentCount} spots remaining
                  </p>
                </div>
              )}

              <div className="mt-8 text-center">
                <a
                  href={alphaSession.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-pcc-emerald px-10 py-4 text-lg font-bold text-white shadow-md hover:bg-pcc-emerald-light transition-colors"
                >
                  Register for Alpha
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Who is Alpha For */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
            Who is Alpha For?
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: LightBulbIcon, title: 'The Curious', desc: 'Anyone with questions about life, faith, or meaning' },
              { icon: ChatBubbleLeftRightIcon, title: 'The Skeptic', desc: 'Those who have doubts and want honest conversation' },
              { icon: ArrowPathIcon, title: 'The Returning', desc: 'People reconnecting with faith after time away' },
              { icon: HeartIcon, title: 'The New Believer', desc: 'New Christians wanting a strong foundation' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pcc-teal/15 text-pcc-teal">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-pcc-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-pcc-slate">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-pcc-cream-light">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
            What People Are Saying
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                quote: 'Alpha gave me a safe space to ask questions I\'d been carrying for years. No judgment, just real conversation.',
                name: 'Sarah M.',
              },
              {
                quote: 'I came as a skeptic and left with a deeper understanding of faith. The discussions were incredible.',
                name: 'David L.',
              },
              {
                quote: 'The friendships I made during Alpha have been life-changing. I found a community that truly cares.',
                name: 'Maria R.',
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="rounded-xl bg-white p-6 shadow-md">
                <p className="text-pcc-charcoal italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-4 font-semibold text-pcc-navy">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-6">
            {[
              { q: 'Is there a cost?', a: 'No! Alpha is completely free, including dinner every session.' },
              { q: 'What if I miss a session?', a: 'That\'s okay! Each session covers a different topic, so you can jump back in anytime.' },
              { q: 'Do I need to know anything about Christianity?', a: 'Not at all. Alpha is designed for people at any stage — whether you\'ve never opened a Bible or grew up in church.' },
              { q: 'Will I be pressured to believe anything?', a: 'Absolutely not. Alpha is a pressure-free environment. There\'s no follow-up, no commitment expected. Just come and explore.' },
              { q: 'Can I bring a friend?', a: 'Yes! Alpha is even better with a friend. You\'re welcome to bring anyone who might be interested.' },
              { q: 'Is childcare available?', a: 'Yes, free childcare is provided during every Alpha session.' },
            ].map((faq) => (
              <div key={faq.q} className="rounded-lg border border-pcc-cream-dark p-6">
                <h3 className="text-lg font-bold text-pcc-navy">{faq.q}</h3>
                <p className="mt-2 text-pcc-charcoal">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      {alphaSession && (
        <section className="bg-gradient-to-br from-pcc-emerald-dark to-pcc-forest">
          <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Explore?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Join us for Alpha — the next session starts{' '}
              {format(new Date(alphaSession.startDate), 'MMMM d, yyyy')}.
            </p>
            <a
              href={alphaSession.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-lg bg-pcc-gold px-10 py-4 text-lg font-bold text-pcc-navy shadow-lg hover:bg-pcc-gold-light transition-colors"
            >
              Register for Alpha
            </a>
          </div>
        </section>
      )}
    </>
  )
}
