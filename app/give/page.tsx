import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HeartIcon,
  GlobeAltIcon,
  HomeModernIcon,
  CreditCardIcon,
  EnvelopeIcon,
  BuildingLibraryIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'
import { getSiteSettings } from '@/lib/db/queries'

export const metadata: Metadata = {
  title: 'Give | Peninsula Covenant Church',
  description: 'Support the mission of PCC through generous giving. Give online, by check, or through stock donations.',
}

export default async function GivePage() {
  const siteSettings = await getSiteSettings()

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center bg-gradient-to-br from-pcc-gold-dark to-pcc-orange">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
          >
            Generosity Changes Lives
          </h1>
          <p className="mt-6 text-xl text-white/90 sm:text-2xl">
            Every gift makes an eternal impact
          </p>
          {siteSettings?.donationUrl && (
            <a
              href={siteSettings.donationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-lg bg-white px-8 py-3 text-lg font-semibold text-pcc-navy shadow-lg hover:bg-pcc-cream transition-colors"
            >
              Give Online
            </a>
          )}
        </div>
      </section>

      {/* Why We Give */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
            Why We Give
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-6 text-center text-lg leading-relaxed text-pcc-charcoal">
            <p>
              We give because God first gave to us. Generosity is an act of worship — a joyful response
              to God&apos;s faithfulness in our lives.
            </p>
            <blockquote className="rounded-xl bg-pcc-cream-light p-6 italic text-pcc-navy">
              &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly
              or under compulsion, for God loves a cheerful giver.&rdquo;
              <span className="mt-2 block text-sm font-semibold not-italic text-pcc-teal">
                — 2 Corinthians 9:7
              </span>
            </blockquote>
            <p>
              Your generosity helps us serve our community, support missions around the world, and guide
              the next generation to know Jesus.
            </p>
          </div>
        </div>
      </section>

      {/* Where Your Giving Goes */}
      <section className="bg-pcc-cream-light">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
            Where Your Giving Goes
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-8 text-center shadow-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pcc-teal/20 text-pcc-teal">
                <HeartIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-pcc-navy">Local Ministry</h3>
              <p className="mt-2 text-pcc-slate">
                Sunday worship, kids and youth programs, pastoral care, small groups, and staff who
                serve our church family.
              </p>
            </div>
            <div className="rounded-xl bg-white p-8 text-center shadow-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pcc-emerald/20 text-pcc-emerald">
                <GlobeAltIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-pcc-navy">Missions &amp; Outreach</h3>
              <p className="mt-2 text-pcc-slate">
                Alpha, Juntos, global mission partners, and community outreach that shares
                God&apos;s love beyond our walls.
              </p>
            </div>
            <div className="rounded-xl bg-white p-8 text-center shadow-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pcc-gold/20 text-pcc-gold">
                <HomeModernIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-pcc-navy">Facilities &amp; Operations</h3>
              <p className="mt-2 text-pcc-slate">
                Maintaining our campus, community center, and preschool facilities so we can continue
                serving for generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Give */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
            Ways to Give
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-pcc-cream-dark p-6 text-center transition-all hover:shadow-lg">
              <CreditCardIcon className="mx-auto h-10 w-10 text-pcc-gold" />
              <h3 className="mt-4 text-lg font-bold text-pcc-navy">Online</h3>
              <p className="mt-2 text-sm text-pcc-slate">
                Quick, secure, and easy. Set up one-time or recurring gifts.
              </p>
              {siteSettings?.donationUrl && (
                <a
                  href={siteSettings.donationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block rounded-lg bg-pcc-gold px-6 py-2 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors"
                >
                  Give Now
                </a>
              )}
            </div>
            <div className="rounded-xl border border-pcc-cream-dark p-6 text-center transition-all hover:shadow-lg">
              <EnvelopeIcon className="mx-auto h-10 w-10 text-pcc-teal" />
              <h3 className="mt-4 text-lg font-bold text-pcc-navy">By Check</h3>
              <p className="mt-2 text-sm text-pcc-slate">
                Mail to: Peninsula Covenant Church, {siteSettings?.address || '3560 Farm Hill Blvd, Redwood City, CA 94061'}
              </p>
            </div>
            <div className="rounded-xl border border-pcc-cream-dark p-6 text-center transition-all hover:shadow-lg">
              <BuildingLibraryIcon className="mx-auto h-10 w-10 text-pcc-emerald" />
              <h3 className="mt-4 text-lg font-bold text-pcc-navy">Stock &amp; Securities</h3>
              <p className="mt-2 text-sm text-pcc-slate">
                Donate appreciated stock for potential tax benefits. Contact the office for details.
              </p>
            </div>
            <div className="rounded-xl border border-pcc-cream-dark p-6 text-center transition-all hover:shadow-lg">
              <DocumentTextIcon className="mx-auto h-10 w-10 text-pcc-navy" />
              <h3 className="mt-4 text-lg font-bold text-pcc-navy">Planned Giving</h3>
              <p className="mt-2 text-sm text-pcc-slate">
                Include PCC in your estate plan to leave a lasting legacy of generosity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-pcc-cream-light">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-pcc-navy sm:text-4xl">
            Questions About Giving
          </h2>
          <div className="mt-12 space-y-6">
            {[
              {
                q: 'Is my gift tax-deductible?',
                a: 'Yes. PCC is a registered 501(c)(3) nonprofit. You will receive a giving statement for your records at the end of each year.',
              },
              {
                q: 'How do I set up recurring giving?',
                a: 'You can set up automatic recurring gifts through our online giving platform. Choose weekly, bi-weekly, or monthly options.',
              },
              {
                q: 'What about tithing?',
                a: 'We believe in the biblical principle of generosity. Whether you tithe (give 10%) or give in other ways, we encourage joyful, Spirit-led giving at whatever level feels right for you.',
              },
              {
                q: 'Can I designate my gift to a specific fund?',
                a: 'Yes. When giving online or by check, you can designate your gift to the general fund, missions, building fund, or specific ministry needs.',
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-lg border border-pcc-cream-dark bg-white p-6">
                <h3 className="text-lg font-bold text-pcc-navy">{faq.q}</h3>
                <p className="mt-2 text-pcc-charcoal">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-pcc-gold-dark to-pcc-orange">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Make a Difference?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Your generosity fuels everything we do as a church family.
          </p>
          {siteSettings?.donationUrl && (
            <a
              href={siteSettings.donationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-lg bg-white px-10 py-4 text-lg font-bold text-pcc-navy shadow-lg hover:bg-pcc-cream transition-colors"
            >
              Give Online
            </a>
          )}
        </div>
      </section>
    </>
  )
}
