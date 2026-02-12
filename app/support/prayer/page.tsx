'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HandRaisedIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function PrayerPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log('Prayer request submitted:', {
      name: formData.get('name'),
      email: formData.get('email'),
      request: formData.get('request'),
    })
    setSubmitted(true)
  }

  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center bg-gradient-to-br from-pcc-sage-dark to-pcc-forest">
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Prayer Requests
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            We&apos;re here to pray with you
          </p>
        </div>
      </section>

      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-10 shadow-md">
            {submitted ? (
              <div className="text-center">
                <CheckCircleIcon className="mx-auto h-12 w-12 text-pcc-forest" aria-hidden="true" />
                <h2 className="mt-6 text-2xl font-bold text-pcc-navy">Thank You</h2>
                <p className="mt-4 text-pcc-slate">
                  Your prayer request has been received. Our prayer team will be lifting you up.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-medium text-pcc-forest hover:text-pcc-forest/80 transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <HandRaisedIcon className="mx-auto h-12 w-12 text-pcc-forest" aria-hidden="true" />
                  <h2 className="mt-6 text-2xl font-bold text-pcc-navy">Share Your Request</h2>
                  <p className="mt-2 text-pcc-slate">
                    All requests are treated with care and confidentiality.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-pcc-navy">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-1 block w-full rounded-lg border border-pcc-cream-dark px-4 py-2.5 text-pcc-navy placeholder:text-pcc-slate/50 focus:border-pcc-forest focus:outline-none focus:ring-2 focus:ring-pcc-forest/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-pcc-navy">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 block w-full rounded-lg border border-pcc-cream-dark px-4 py-2.5 text-pcc-navy placeholder:text-pcc-slate/50 focus:border-pcc-forest focus:outline-none focus:ring-2 focus:ring-pcc-forest/30"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="request" className="block text-sm font-medium text-pcc-navy">
                      Prayer Request
                    </label>
                    <textarea
                      id="request"
                      name="request"
                      required
                      rows={5}
                      className="mt-1 block w-full rounded-lg border border-pcc-cream-dark px-4 py-2.5 text-pcc-navy placeholder:text-pcc-slate/50 focus:border-pcc-forest focus:outline-none focus:ring-2 focus:ring-pcc-forest/30"
                      placeholder="Share what's on your heart..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-pcc-forest px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-forest/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-forest focus-visible:ring-offset-2"
                  >
                    Submit Prayer Request
                  </button>
                </form>
              </>
            )}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/support"
              className="text-sm font-medium text-pcc-forest hover:text-pcc-forest/80 transition-colors"
            >
              &larr; Back to Support
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
