'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, getDay, addMonths, subMonths } from 'date-fns'
import {
  CalendarDaysIcon,
  ListBulletIcon,
  MapPinIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline'

type Event = {
  id: string
  title: string
  description: string
  startDate: string | Date
  endDate: string | Date | null
  startTime: string | null
  endTime: string | null
  location: string | null
  imageUrl: string | null
  registrationUrl: string | null
  registrationOpen: boolean
  category: string
  featured: boolean
  recurring: boolean
  recurrenceRule: string | null
}

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  worship: { bg: 'bg-pcc-navy/10', text: 'text-pcc-navy', dot: 'bg-pcc-navy' },
  alpha: { bg: 'bg-pcc-emerald/10', text: 'text-pcc-emerald', dot: 'bg-pcc-emerald' },
  ministry: { bg: 'bg-pcc-teal/10', text: 'text-pcc-teal', dot: 'bg-pcc-teal' },
  youth: { bg: 'bg-pcc-orange/10', text: 'text-pcc-orange', dot: 'bg-pcc-orange' },
  kids: { bg: 'bg-pcc-gold/10', text: 'text-pcc-gold-dark', dot: 'bg-pcc-gold' },
  outreach: { bg: 'bg-pcc-sage/10', text: 'text-pcc-forest', dot: 'bg-pcc-forest' },
  community: { bg: 'bg-pcc-crimson/10', text: 'text-pcc-crimson', dot: 'bg-pcc-crimson' },
}

function getCategoryStyle(category: string) {
  return categoryColors[category] || { bg: 'bg-pcc-slate/10', text: 'text-pcc-slate', dot: 'bg-pcc-slate' }
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function EventCard({ event }: { event: Event }) {
  const start = new Date(event.startDate)
  const style = getCategoryStyle(event.category)

  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex gap-4 rounded-xl bg-white p-4 shadow-md transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2 sm:p-5"
    >
      {/* Date block */}
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-pcc-cream text-center sm:h-20 sm:w-20">
        <span className="text-xs font-semibold uppercase text-pcc-slate">{format(start, 'MMM')}</span>
        <span className="text-2xl font-bold text-pcc-navy sm:text-3xl">{format(start, 'd')}</span>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.bg} ${style.text}`}>
            {capitalize(event.category)}
          </span>
          {event.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-pcc-gold/15 px-2.5 py-0.5 text-xs font-semibold text-pcc-gold-dark">
              <StarIcon className="h-3 w-3" aria-hidden="true" />
              Featured
            </span>
          )}
          {event.registrationOpen && (
            <span className="inline-block rounded-full bg-pcc-emerald/10 px-2.5 py-0.5 text-xs font-semibold text-pcc-emerald">
              Registration Open
            </span>
          )}
        </div>

        <h3 className="mt-1.5 text-lg font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
          {event.title}
        </h3>

        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-pcc-slate">
          {event.startTime && (
            <span className="flex items-center gap-1">
              <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {event.startTime}{event.endTime && ` – ${event.endTime}`}
            </span>
          )}
          {event.location && (
            <span className="flex items-center gap-1">
              <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {event.location}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-pcc-slate line-clamp-2">
          {event.description.length > 120 ? `${event.description.slice(0, 120)}...` : event.description}
        </p>
      </div>

      {/* Thumbnail (desktop) */}
      {event.imageUrl && (
        <div className="hidden shrink-0 overflow-hidden rounded-lg sm:block sm:h-28 sm:w-40">
          <Image
            src={event.imageUrl}
            alt=""
            width={160}
            height={112}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </Link>
  )
}

function MonthView({ events, currentMonth, onPrev, onNext }: {
  events: Event[]
  currentMonth: Date
  onPrev: () => void
  onNext: () => void
}) {
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startPad = getDay(monthStart)
  const monthLabel = format(currentMonth, 'MMMM yyyy')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onPrev}
          className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-pcc-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal"
          aria-label="Previous month"
        >
          <ChevronLeftIcon className="h-5 w-5 text-pcc-navy" />
        </button>
        <h3 className="text-xl font-bold text-pcc-navy" aria-live="polite">
          {monthLabel}
        </h3>
        <button
          type="button"
          onClick={onNext}
          className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-pcc-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal"
          aria-label="Next month"
        >
          <ChevronRightIcon className="h-5 w-5 text-pcc-navy" />
        </button>
      </div>

      <div role="grid" aria-label={`Calendar for ${monthLabel}`}>
        <div role="row" className="grid grid-cols-7 text-center text-xs font-semibold text-pcc-slate mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} role="columnheader" className="py-2">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-pcc-cream-dark rounded-lg overflow-hidden">
          {Array.from({ length: startPad }).map((_, i) => (
            <div key={`pad-${i}`} role="gridcell" className="min-h-[80px] bg-pcc-cream-light/50 p-1 sm:min-h-[100px]" />
          ))}

          {days.map((day) => {
            const dayEvents = events.filter((e) => {
              const start = new Date(e.startDate)
              const end = e.endDate ? new Date(e.endDate) : start
              return day >= new Date(start.toDateString()) && day <= new Date(end.toDateString())
            })
            const isToday = isSameDay(day, new Date())
            const dayLabel = `${format(day, 'EEEE, MMMM d')}${dayEvents.length > 0 ? `, ${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''}` : ''}`

            return (
              <div
                key={day.toISOString()}
                role="gridcell"
                aria-label={dayLabel}
                className={`min-h-[80px] p-1 sm:min-h-[100px] sm:p-2 ${
                  isSameMonth(day, currentMonth) ? 'bg-white' : 'bg-pcc-cream-light/50'
                }`}
              >
                <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                  isToday ? 'bg-pcc-navy text-white' : 'text-pcc-charcoal'
                }`}>
                  {format(day, 'd')}
                </span>
                <div className="mt-0.5 space-y-0.5">
                  {dayEvents.slice(0, 3).map((event) => {
                    const style = getCategoryStyle(event.category)
                    return (
                      <Link
                        key={event.id}
                        href={`/events/${event.id}`}
                        className={`block truncate rounded px-1 py-0.5 text-[10px] font-medium leading-tight sm:text-xs ${style.bg} ${style.text} hover:opacity-80 transition-opacity`}
                        title={event.title}
                      >
                        <span className="hidden sm:inline">{event.title}</span>
                        <span className={`inline h-1.5 w-1.5 rounded-full sm:hidden ${style.dot}`} />
                      </Link>
                    )
                  })}
                  {dayEvents.length > 3 && (
                    <span className="block text-[10px] text-pcc-slate">+{dayEvents.length - 3} more</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// --- Filter drawer for mobile ---
function FilterDrawer({
  open,
  onClose,
  categories,
  selectedCategories,
  onToggleCategory,
  search,
  onSearch,
  onClearAll,
  activeFilterCount,
}: {
  open: boolean
  onClose: () => void
  categories: string[]
  selectedCategories: Set<string>
  onToggleCategory: (cat: string) => void
  search: string
  onSearch: (v: string) => void
  onClearAll: () => void
  activeFilterCount: number
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Event filters">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-pcc-navy">Filters</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-pcc-cream transition-colors"
            aria-label="Close filters"
          >
            <XMarkIcon className="h-5 w-5 text-pcc-slate" />
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <label htmlFor="mobile-search" className="block text-sm font-medium text-pcc-navy mb-1">Search</label>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pcc-slate/50" aria-hidden="true" />
            <input
              id="mobile-search"
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full rounded-lg border border-pcc-cream-dark pl-9 pr-4 py-2.5 text-sm text-pcc-navy placeholder:text-pcc-slate/50 focus:border-pcc-teal focus:outline-none focus:ring-2 focus:ring-pcc-teal/30"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <p className="text-sm font-medium text-pcc-navy mb-3">Categories</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const style = getCategoryStyle(cat)
              const isActive = selectedCategories.has(cat)
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onToggleCategory(cat)}
                  className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isActive ? 'bg-pcc-navy text-white' : `${style.bg} ${style.text}`
                  }`}
                >
                  {capitalize(cat)}
                </button>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="flex-1 rounded-lg border-2 border-pcc-navy px-4 py-3 text-sm font-semibold text-pcc-navy hover:bg-pcc-navy hover:text-white transition-colors"
            >
              Clear All
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg bg-pcc-navy px-4 py-3 text-sm font-semibold text-white hover:bg-pcc-navy/90 transition-colors"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  )
}

export function CalendarView({
  events,
  categories,
}: {
  events: Event[]
  categories: string[]
}) {
  const [view, setView] = useState<'list' | 'month'>('list')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  const clearAll = () => {
    setSelectedCategories(new Set())
    setSearch('')
  }

  const activeFilterCount =
    selectedCategories.size + (search ? 1 : 0)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()

    return events.filter((e) => {
      // Category filter (multi-select: show all if none selected)
      if (selectedCategories.size > 0 && !selectedCategories.has(e.category)) {
        return false
      }

      // Search filter
      if (q) {
        const haystack = `${e.title} ${e.description} ${e.location || ''}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }

      return true
    })
  }, [events, selectedCategories, search])

  return (
    <div>
      {/* Desktop controls */}
      <div className="mb-6 space-y-4">
        {/* Top row: search + view toggle */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pcc-slate/50" aria-hidden="true" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              aria-label="Search events"
              className="w-full rounded-lg border border-pcc-cream-dark bg-white pl-9 pr-9 py-3 text-sm text-pcc-navy placeholder:text-pcc-slate/50 focus:border-pcc-teal focus:outline-none focus:ring-2 focus:ring-pcc-teal/30"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-pcc-slate/50 hover:text-pcc-navy transition-colors"
                aria-label="Clear search"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile filter button */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-expanded={drawerOpen}
              aria-label={`Filters${activeFilterCount > 0 ? `, ${activeFilterCount} active` : ''}`}
              className="relative flex h-11 items-center gap-1.5 rounded-lg border border-pcc-cream-dark bg-white px-4 text-sm font-medium text-pcc-slate hover:bg-pcc-cream transition-colors md:hidden"
            >
              <AdjustmentsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pcc-navy text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* View toggle */}
            <div className="flex rounded-lg border border-pcc-cream-dark overflow-hidden">
              <button
                type="button"
                onClick={() => setView('list')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                  view === 'list' ? 'bg-pcc-navy text-white' : 'bg-white text-pcc-slate hover:bg-pcc-cream'
                }`}
                aria-label="List view"
                aria-current={view === 'list' ? 'true' : undefined}
              >
                <ListBulletIcon className="h-4 w-4" aria-hidden="true" />
                List
              </button>
              <button
                type="button"
                onClick={() => setView('month')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                  view === 'month' ? 'bg-pcc-navy text-white' : 'bg-white text-pcc-slate hover:bg-pcc-cream'
                }`}
                aria-label="Month view"
                aria-current={view === 'month' ? 'true' : undefined}
              >
                <CalendarDaysIcon className="h-4 w-4" aria-hidden="true" />
                Month
              </button>
            </div>
          </div>
        </div>

        {/* Desktop category pills + past toggle */}
        <div className="hidden md:flex md:items-center md:justify-between md:gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const style = getCategoryStyle(cat)
              const isActive = selectedCategories.has(cat)
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                    isActive ? 'bg-pcc-navy text-white' : `${style.bg} ${style.text} hover:opacity-80`
                  }`}
                >
                  {capitalize(cat)}
                </button>
              )
            })}

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-pcc-slate hover:text-pcc-navy transition-colors"
              >
                <XMarkIcon className="h-3.5 w-3.5" aria-hidden="true" />
                Clear all ({activeFilterCount})
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-pcc-slate" aria-live="polite">
          {filtered.length} event{filtered.length !== 1 ? 's' : ''}
          {activeFilterCount > 0 && ' (filtered)'}
        </p>
      </div>

      {/* Views */}
      {view === 'list' ? (
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="rounded-xl bg-white p-12 text-center shadow-md">
              <CalendarDaysIcon className="mx-auto h-12 w-12 text-pcc-slate/40" aria-hidden="true" />
              <p className="mt-4 text-lg font-semibold text-pcc-navy">No events found</p>
              <p className="mt-2 text-sm text-pcc-slate">
                {activeFilterCount > 0
                  ? 'Try adjusting your filters or search.'
                  : 'Check back soon for upcoming events.'}
              </p>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-4 text-sm font-semibold text-pcc-teal hover:text-pcc-teal-dark transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            filtered.map((event) => <EventCard key={event.id} event={event} />)
          )}
        </div>
      ) : (
        <MonthView
          events={filtered}
          currentMonth={currentMonth}
          onPrev={() => setCurrentMonth((m) => subMonths(m, 1))}
          onNext={() => setCurrentMonth((m) => addMonths(m, 1))}
        />
      )}

      {/* Mobile filter drawer */}
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        search={search}
        onSearch={setSearch}
        onClearAll={clearAll}
        activeFilterCount={activeFilterCount}
      />
    </div>
  )
}
