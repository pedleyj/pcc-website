import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import {
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Questions About Faith | Peninsula Covenant Church',
  description:
    "Common questions about God, faith, suffering, and meaning. Honest answers in a welcoming, non-judgmental space. Explore at your own pace.",
}

const questions = [
  {
    question: 'Who is God?',
    answer: [
      "That's one of the biggest questions anyone can ask — and it's okay if you're not sure where you land. At PCC, we believe God is the creator of everything, a being of infinite love who is deeply personal and wants to be known. Christians understand God as a Trinity — Father, Son, and Holy Spirit — three persons, one God.",
      "But we also know that's a lot to take in. Many people start by simply noticing something bigger at work in the world — in nature, in love, in moments that feel sacred. If you're curious, that curiosity itself might be the beginning of something worth exploring.",
      "You don't need to have it all figured out. God isn't threatened by your questions.",
    ],
  },
  {
    question: 'Why does suffering exist?',
    answer: [
      "This might be the hardest question on the list — and the most honest one. If God is good, why do people suffer? Why do children get sick? Why do natural disasters happen? These aren't questions Christians can wave away with easy answers.",
      "What we can say is this: the Bible doesn't shy away from suffering. It's full of people who cried out to God in pain, anger, and confusion. The book of Psalms is filled with raw, unfiltered grief. And at the center of the Christian story is a God who chose to enter into human suffering himself — in the person of Jesus.",
      "We may not always understand why suffering happens, but we believe we're never alone in it. And sometimes, it's in the darkest seasons that people experience the most profound sense of being held by something — or someone — greater than themselves.",
    ],
  },
  {
    question: 'What is the Bible?',
    answer: [
      "The Bible is a collection of 66 books written over about 1,500 years by many different authors — poets, historians, prophets, fishermen, and kings. It includes history, poetry, letters, law, and prophecy. It's not one book so much as a library.",
      "Christians believe the Bible is inspired by God — that through these very human authors, God communicated truth about himself, about us, and about how to live. It's the most widely read and translated book in human history, and billions of people have found wisdom, comfort, and direction in its pages.",
      "If you've never read it, a great place to start is one of the Gospels — Matthew, Mark, Luke, or John — which tell the story of Jesus' life, teachings, death, and resurrection. You might be surprised by what you find there.",
    ],
  },
  {
    question: 'Who is Jesus?',
    answer: [
      "Jesus of Nazareth was a real historical person who lived in first-century Palestine. That much is widely agreed upon by historians of all backgrounds. But who he really was — that's where the conversation gets interesting.",
      "Christians believe Jesus is the Son of God — fully human and fully divine. He taught about love, justice, and forgiveness. He healed the sick, welcomed outsiders, and challenged the powerful. And then he was executed by crucifixion, only to rise from the dead three days later.",
      "That resurrection is the hinge point of the entire Christian faith. If it happened, it changes everything. If it didn't, as the apostle Paul himself said, the whole thing falls apart. It's worth investigating — and that's exactly what Alpha is designed to help you do.",
    ],
  },
  {
    question: 'What happens after we die?',
    answer: [
      "Every human culture throughout history has wrestled with this question. Christians believe that death is not the end — that each person has an eternal soul, and that how we relate to God in this life has implications for the next.",
      "The Bible speaks of heaven as being in the presence of God forever — not floating on clouds, but a renewed creation where there is no more suffering, injustice, or separation. It also speaks of the reality of being apart from God. These are weighty ideas that deserve more than a quick summary.",
      "What's most important to us is this: the Christian hope is not about earning your way somewhere. It's about a relationship with a God who loves you and has made a way for you through Jesus. If that sounds worth exploring, we'd love to have that conversation with you.",
    ],
  },
  {
    question: "Isn't religion just a crutch?",
    answer: [
      "That's a fair question, and it's one that deserves an honest answer. Sure, some people use religion to avoid hard questions or uncomfortable realities. But that's true of almost anything — work, money, relationships, even science can be used as a way to avoid deeper questions about meaning and purpose.",
      "For many people, though, faith isn't an escape — it's an encounter. It's what happens when you honestly face the biggest questions of life and find something — someone — on the other side. C.S. Lewis, a former atheist, once wrote that he didn't come to faith because he wanted comfort. He came because he found it to be true.",
      "We'd never ask you to check your brain at the door. In fact, we think honest questioning is one of the most faithful things you can do.",
    ],
  },
  {
    question: 'How do I start exploring?',
    answer: [
      <>The best way to explore faith is in community — with real people, real food, and real conversation. That&apos;s exactly what our <Link href="/explore-faith/alpha" className="font-medium text-pcc-teal hover:text-pcc-teal-dark underline decoration-pcc-teal/30 hover:decoration-pcc-teal transition-colors">Alpha program</Link> is designed for. It&apos;s a series of sessions where you can ask any question, share any doubt, and explore at your own pace.</>,
      "There's no pressure, no commitment required, and no judgment. You'll share a meal together, watch a short talk, and then discuss in a small group. Many people who come to Alpha are skeptics, and that's not just okay — it's welcomed.",
      "If you're not ready for that yet, that's fine too. You could try visiting on a Sunday, picking up a Bible, or simply sitting with the questions for a while. There's no rush. But if you're reading this page, something in you is curious — and we think that's worth paying attention to.",
    ],
  },
]

export default function FaithQuestionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center justify-center bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Questions About Faith
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            It&apos;s okay to have questions. We all do.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 pt-20 pb-10 text-center sm:px-6 lg:px-8">
          <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-pcc-teal" aria-hidden="true" />
          <h2 className="mt-6 text-2xl font-bold text-pcc-navy">Honest Questions Deserve Honest Answers</h2>
          <p className="mt-4 text-lg text-pcc-slate leading-relaxed">
            Whether you&apos;re a lifelong skeptic, recently curious, or somewhere in between —
            these are some of the questions people ask most often about faith, God, and the meaning
            of life. We don&apos;t claim to have all the answers, but we believe the questions are
            worth asking.
          </p>
        </div>
      </section>

      {/* Q&A Sections */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {questions.map((item, index) => (
              <details
                key={index}
                className="group rounded-xl border border-pcc-cream-dark bg-pcc-cream-light open:bg-white open:shadow-md transition-all"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-lg font-bold text-pcc-navy hover:text-pcc-teal transition-colors [&::-webkit-details-marker]:hidden list-none">
                  <span>{item.question}</span>
                  <ChevronDownIcon
                    className="h-5 w-5 shrink-0 text-pcc-slate transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-6 pb-6 space-y-4">
                  {item.answer.map((paragraph, i) => (
                    <p key={i} className="text-pcc-slate leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Alpha CTA */}
      <section className="bg-pcc-navy">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Want to Explore These Questions in Community?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Alpha is a series of conversations about life, faith, and meaning — with free
            dinner, great people, and zero pressure. Everyone is welcome.
          </p>
          <Link
            href="/explore-faith/alpha"
            className="mt-8 inline-block rounded-lg bg-pcc-gold px-10 py-4 text-lg font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
          >
            Learn About Alpha
          </Link>
        </div>
      </section>

      {/* Cross-link to official beliefs */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-3xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-pcc-slate">
            Looking for our official statement of faith?{' '}
            <Link href="/about/beliefs" className="font-medium text-pcc-navy hover:text-pcc-teal transition-colors">
              See What We Believe
            </Link>
          </p>
          <Link
            href="/explore-faith"
            className="mt-4 inline-block text-sm font-medium text-pcc-teal hover:text-pcc-teal-dark transition-colors"
          >
            &larr; Back to Explore Faith
          </Link>
        </div>
      </section>
    </>
  )
}
