'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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

      {/* Subtle vignette — darker only at center/bottom, edges stay vivid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.1)_60%,transparent_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />

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
            className="w-full rounded-lg bg-pcc-gold px-8 py-3 text-lg font-semibold text-pcc-navy shadow-lg hover:bg-pcc-gold-light transition-colors sm:w-auto"
          >
            Plan Your Visit
          </a>
          <a
            href="#alpha"
            className="w-full rounded-lg bg-pcc-teal px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-pcc-teal-light transition-colors sm:w-auto"
          >
            Join Alpha
          </a>
          <a
            href="#messages"
            className="w-full rounded-lg border-2 border-white px-8 py-3 text-lg font-semibold text-white shadow-lg backdrop-blur-sm hover:bg-white/10 transition-colors sm:w-auto"
          >
            Watch Latest
          </a>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
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
