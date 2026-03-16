import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpenIcon, HeartIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'What We Believe | Peninsula Covenant Church',
  description: 'The core beliefs and values that guide Peninsula Covenant Church as part of the Evangelical Covenant Church.',
}

const coreBeliefs = [
  {
    title: 'The Centrality of the Word of God',
    description:
      'We believe the Bible is the only perfect rule for faith, doctrine, and conduct. We look to Scripture as our highest authority, trusting that it reveals God\'s character and purpose for our lives.',
  },
  {
    title: 'The Necessity of the New Birth',
    description:
      'We believe each person is invited into a transforming, personal relationship with God through Jesus Christ. This experience of new life — being "born again" — is central to the Christian faith and available to everyone.',
  },
  {
    title: 'A Commitment to the Whole Mission of the Church',
    description:
      'We believe the church is called to share the good news of Jesus and to serve the world through compassion, justice, and mercy. Word and deed go hand in hand.',
  },
  {
    title: 'The Church as a Fellowship of Believers',
    description:
      'We believe the church is not a building but a community of people who follow Jesus together. We are called to encourage, support, and grow alongside one another in faith.',
  },
  {
    title: 'A Conscious Dependence on the Holy Spirit',
    description:
      'We believe the Holy Spirit empowers believers for service, gifts the church for ministry, and guides us into truth. We depend on the Spirit\'s presence in our worship, decisions, and daily lives.',
  },
  {
    title: 'The Reality of Freedom in Christ',
    description:
      'We believe that in matters where Scripture speaks clearly, we stand united. In areas where sincere Christians disagree, we extend grace and freedom. In all things, we are guided by love.',
  },
]

const affirmations = [
  'We believe in one God — Father, Son, and Holy Spirit.',
  'We believe Jesus Christ is truly God and truly human, born of the Virgin Mary.',
  'We believe in Christ\'s death on the cross for the forgiveness of sins and his bodily resurrection.',
  'We believe the Holy Spirit is present and active in the life of every believer.',
  'We believe the Bible is the inspired, authoritative Word of God.',
  'We believe in the return of Jesus Christ and the hope of eternal life.',
  'We practice the sacraments of baptism and communion as means of grace.',
]

export default function BeliefsPage() {
  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            What We Believe
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            The beliefs and values that shape our community
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 pt-20 pb-10 text-center sm:px-6 lg:px-8">
          <BookOpenIcon className="mx-auto h-12 w-12 text-pcc-navy" aria-hidden="true" />
          <h2 className="mt-6 text-2xl font-bold text-pcc-navy">Rooted in Scripture, United in Love</h2>
          <p className="mt-4 text-lg text-pcc-slate leading-relaxed">
            Peninsula Covenant Church is part of the{' '}
            <a
              href="https://covchurch.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-pcc-navy underline decoration-pcc-navy/30 hover:text-pcc-teal hover:decoration-pcc-teal transition-colors"
            >
              Evangelical Covenant Church
            </a>
            , a growing multiethnic denomination of over 900 congregations across North America. Our
            tradition is marked by a deep commitment to the Bible, an openness to the work of the
            Holy Spirit, and a passion for justice and mercy.
          </p>
          <p className="mt-4 text-pcc-slate italic">
            &ldquo;In essentials, unity. In non-essentials, liberty. In all things, love.&rdquo;
          </p>
        </div>
      </section>

      {/* Six Affirmations */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="text-center">
            <HeartIcon className="mx-auto h-10 w-10 text-pcc-teal" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-pcc-navy">Six Covenant Affirmations</h2>
            <p className="mt-2 text-pcc-slate">
              These six affirmations describe the values that have shaped the Evangelical Covenant Church
              since its founding.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreBeliefs.map((belief) => (
              <div key={belief.title} className="rounded-xl bg-white p-6 shadow-md">
                <h3 className="text-base font-bold text-pcc-navy">{belief.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pcc-slate">{belief.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Affirm */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-8 shadow-md sm:p-10">
            <div className="text-center">
              <GlobeAltIcon className="mx-auto h-10 w-10 text-pcc-emerald" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-bold text-pcc-navy">What We Affirm</h2>
              <p className="mt-2 text-pcc-slate">
                Together with Christians around the world and throughout history, we affirm:
              </p>
            </div>
            <ul className="mt-8 space-y-4">
              {affirmations.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-pcc-emerald" aria-hidden="true" />
                  <span className="text-pcc-slate leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-pcc-slate/70">
              Exploring faith for the first time?{' '}
              <Link
                href="/explore-faith/faith-questions"
                className="font-medium text-pcc-navy hover:text-pcc-teal transition-colors"
              >
                See our Faith Questions page
              </Link>
              {' '}for a more conversational introduction.
            </p>
            <p className="mt-2 text-sm text-pcc-slate/70">
              Want to learn more about the Evangelical Covenant Church?{' '}
              <a
                href="https://covchurch.org/who-we-are/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-pcc-navy hover:text-pcc-teal transition-colors"
              >
                Visit covchurch.org
              </a>
            </p>
            <Link
              href="/about"
              className="mt-4 inline-block text-sm font-medium text-pcc-navy hover:text-pcc-teal transition-colors"
            >
              &larr; Back to About
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
