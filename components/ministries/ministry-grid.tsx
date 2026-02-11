'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

interface Ministry {
  id: string
  name: string
  category: string
  description: string
  leader: string | null
  meetingInfo: string | null
}

const categoryColors: Record<string, string> = {
  outreach: 'bg-pcc-emerald',
  kids: 'bg-pcc-gold text-pcc-navy',
  youth: 'bg-pcc-orange',
  adults: 'bg-pcc-teal',
  worship: 'bg-pcc-navy',
}

const categoryLabels: Record<string, string> = {
  all: 'All',
  outreach: 'Outreach',
  kids: 'Kids',
  youth: 'Youth',
  adults: 'Adults',
  worship: 'Worship',
}

export function MinistryGrid({ ministries }: { ministries: Ministry[] }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', ...Array.from(new Set(ministries.map((m) => m.category)))]
  const filtered = activeCategory === 'all'
    ? ministries
    : ministries.filter((m) => m.category === activeCategory)

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              activeCategory === cat
                ? 'bg-pcc-navy text-white'
                : 'bg-pcc-cream text-pcc-charcoal hover:bg-pcc-cream-dark'
            }`}
          >
            {categoryLabels[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Ministry Cards */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ministry) => {
          const badgeClass = categoryColors[ministry.category] || 'bg-pcc-teal'
          const circleClass = categoryColors[ministry.category]?.split(' ')[0] || 'bg-pcc-teal'

          return (
            <div
              key={ministry.id}
              className="group rounded-xl border border-pcc-cream-dark bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white ${circleClass}`}>
                  {ministry.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
                      {ministry.name}
                    </h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold text-white ${badgeClass}`}>
                      {categoryLabels[ministry.category] || ministry.category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-pcc-slate">
                    {ministry.description}
                  </p>
                  {ministry.leader && (
                    <p className="mt-2 text-xs text-pcc-charcoal">Led by {ministry.leader}</p>
                  )}
                  {ministry.meetingInfo && (
                    <p className="mt-1 text-xs text-pcc-slate">{ministry.meetingInfo}</p>
                  )}
                  <Link
                    href={`/ministries#${ministry.category}`}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-pcc-teal hover:text-pcc-teal-dark transition-colors"
                  >
                    Learn More
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
