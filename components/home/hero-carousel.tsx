'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Hero images sourced from wearepcc.com.
// Update these when the WordPress site changes or new photos are added.
const heroImages = [
  'https://wearepcc.com/wp-content/uploads/2025/12/20251123-_5290310-scaled.jpg',
  'https://wearepcc.com/wp-content/uploads/2025/12/20251207-_5290620-scaled.jpg',
  'https://wearepcc.com/wp-content/uploads/2025/12/20251205-_5290436-scaled.jpg',
  'https://wearepcc.com/wp-content/uploads/2025/12/20251123-_5290025-scaled.jpg',
  'https://wearepcc.com/wp-content/uploads/slider21/20250817-ReconnectSunday2.jpeg',
  'https://wearepcc.com/wp-content/uploads/slider21/Coffeetable1.jpeg',
  'https://wearepcc.com/wp-content/uploads/slider21/Rachelpreaching.jpeg',
  'https://wearepcc.com/wp-content/uploads/slider21/3girls.jpeg',
  'https://wearepcc.com/wp-content/uploads/slider21/AlphaFall2025.jpeg',
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroImages.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(advance, 5000)
    return () => clearInterval(timer)
  }, [paused, advance])

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="PCC community photos"
    >
      {/* Carousel Images */}
      {heroImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`PCC community photo ${index + 1}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Subtle vignette — hidden on mobile, visible on larger screens */}
      <div className="absolute inset-0 hidden sm:block bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.1)_60%,transparent_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 hidden sm:block bg-gradient-to-t from-black/30 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)' }}
        >
          Peninsula Covenant Church
        </h1>
        <p
          className="mt-6 text-xl text-white sm:text-2xl md:text-3xl"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)' }}
        >
          Know Jesus deeply. Follow Him faithfully.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#services"
            className="w-full rounded-lg bg-pcc-gold px-8 py-3 text-lg font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2 sm:w-auto"
          >
            Plan Your Visit
          </a>
          <Link
            href="/explore-faith/alpha"
            className="w-full rounded-lg bg-pcc-teal px-8 py-3 text-lg font-semibold text-white hover:bg-pcc-teal-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2 sm:w-auto"
          >
            Join Alpha
          </Link>
          <a
            href="#messages"
            className="w-full rounded-lg border-2 border-white px-8 py-3 text-lg font-semibold text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:w-auto"
          >
            Watch Latest
          </a>
        </div>
      </div>

      {/* Live region for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {current + 1} of {heroImages.length}
      </div>

      {/* Navigation Dots + Pause */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        <button
          onClick={() => setPaused((p) => !p)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={paused ? 'Play carousel' : 'Pause carousel'}
        >
          {paused ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          ) : (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zm8 0h4v16h-4z" /></svg>
          )}
        </button>
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === current ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
