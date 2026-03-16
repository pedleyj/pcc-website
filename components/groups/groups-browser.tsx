'use client'

import { useState, useMemo } from 'react'
import {
  SparklesIcon,
  HeartIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

type SmallGroup = {
  id: string
  name: string
  type: string
  description: string
  leader: string
  leaderEmail: string | null
  leaderBio: string | null
  meetingDay: string | null
  meetingTime: string | null
  location: string | null
  locationType: string | null
  ageGroup: string | null
  capacity: number | null
  currentMembers: number
  openForSignup: boolean
  churchCenterUrl: string | null
}

const typeLabels: Record<string, string> = { growth: 'Growth Group', life: 'Life Group' }
const locationLabels: Record<string, string> = { oncampus: 'On Campus', offcampus: 'Off Campus', online: 'Online' }
const ageLabels: Record<string, string> = { adults: 'Adults', young_adults: 'Young Adults', seniors: 'Seniors', mixed: 'All Ages' }
const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function GroupCard({ group, onSelect }: { group: SmallGroup; onSelect: () => void }) {
  const isGrowth = group.type === 'growth'
  const spotsRemaining = group.capacity ? group.capacity - group.currentMembers : null
  const isFull = spotsRemaining !== null && spotsRemaining <= 0

  return (
    <div className="flex h-full flex-col rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="flex items-start justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
            isGrowth ? 'bg-pcc-teal/15 text-pcc-teal' : 'bg-pcc-gold/20 text-pcc-gold-dark'
          }`}
        >
          {isGrowth ? <SparklesIcon className="h-3 w-3" aria-hidden="true" /> : <HeartIcon className="h-3 w-3" aria-hidden="true" />}
          {typeLabels[group.type]}
        </span>
        {isFull ? (
          <span className="rounded-full bg-pcc-slate/10 px-2.5 py-0.5 text-xs font-semibold text-pcc-slate">Full</span>
        ) : group.openForSignup ? (
          <span className="rounded-full bg-pcc-emerald/10 px-2.5 py-0.5 text-xs font-semibold text-pcc-emerald">Open</span>
        ) : null}
      </div>

      <h3 className="mt-3 text-lg font-bold text-pcc-navy">{group.name}</h3>
      <p className="mt-2 flex-grow text-sm leading-relaxed text-pcc-slate line-clamp-3">{group.description}</p>

      <div className="mt-4 space-y-1.5 text-sm text-pcc-slate/80">
        <p className="font-medium text-pcc-navy/80">Led by {group.leader}</p>
        {group.meetingDay && (
          <p className="flex items-center gap-1.5">
            <CalendarDaysIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {group.meetingDay}
            {group.meetingTime && (
              <><ClockIcon className="ml-1 h-4 w-4 shrink-0" aria-hidden="true" />{group.meetingTime}</>
            )}
          </p>
        )}
        {group.location && (
          <p className="flex items-center gap-1.5">
            <MapPinIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {group.location}
          </p>
        )}
        {spotsRemaining !== null && spotsRemaining > 0 && spotsRemaining <= 5 && (
          <p className="text-xs font-medium text-amber-600">
            {spotsRemaining} spot{spotsRemaining === 1 ? '' : 's'} left
          </p>
        )}
      </div>

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={onSelect}
          className="flex-1 rounded-lg border border-pcc-navy/20 px-4 py-2.5 text-sm font-semibold text-pcc-navy hover:bg-pcc-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
        >
          Details
        </button>
        {group.openForSignup && !isFull && group.churchCenterUrl && (
          <a
            href={group.churchCenterUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Join ${group.name} on Church Center`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-pcc-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-pcc-forest/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
          >
            Join Group
            <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  )
}

function GroupDetail({ group, onClose }: { group: SmallGroup; onClose: () => void }) {
  const isGrowth = group.type === 'growth'
  const spotsRemaining = group.capacity ? group.capacity - group.currentMembers : null
  const isFull = spotsRemaining !== null && spotsRemaining <= 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={group.name}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-pcc-slate hover:bg-pcc-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal"
          aria-label="Close"
        >
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
          isGrowth ? 'bg-pcc-teal/15 text-pcc-teal' : 'bg-pcc-gold/20 text-pcc-gold-dark'
        }`}>
          {isGrowth ? <SparklesIcon className="h-3 w-3" aria-hidden="true" /> : <HeartIcon className="h-3 w-3" aria-hidden="true" />}
          {typeLabels[group.type]}
        </span>

        <h3 className="mt-4 text-2xl font-bold text-pcc-navy">{group.name}</h3>
        <p className="mt-3 text-pcc-slate leading-relaxed">{group.description}</p>

        <div className="mt-6 rounded-lg bg-pcc-cream-light p-4 space-y-3">
          <p className="font-semibold text-pcc-navy">Led by {group.leader}</p>
          {group.leaderBio && <p className="text-sm text-pcc-slate">{group.leaderBio}</p>}
          {group.meetingDay && (
            <p className="flex items-center gap-2 text-sm text-pcc-charcoal">
              <CalendarDaysIcon className="h-4 w-4 text-pcc-teal" aria-hidden="true" />
              {group.meetingDay}{group.meetingTime && ` at ${group.meetingTime}`}
            </p>
          )}
          {group.location && (
            <p className="flex items-center gap-2 text-sm text-pcc-charcoal">
              <MapPinIcon className="h-4 w-4 text-pcc-teal" aria-hidden="true" />
              {group.location}
            </p>
          )}
          {group.ageGroup && (
            <p className="flex items-center gap-2 text-sm text-pcc-charcoal">
              <UserGroupIcon className="h-4 w-4 text-pcc-teal" aria-hidden="true" />
              {ageLabels[group.ageGroup] || group.ageGroup}
            </p>
          )}
          {group.capacity && (
            <p className="text-sm text-pcc-charcoal">
              Capacity: {group.currentMembers}/{group.capacity}
              {spotsRemaining !== null && spotsRemaining > 0 && (
                <span className="ml-2 text-pcc-forest font-medium">({spotsRemaining} spots open)</span>
              )}
              {isFull && <span className="ml-2 text-pcc-slate font-medium">(Currently full)</span>}
            </p>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          {group.openForSignup && !isFull && group.churchCenterUrl && (
            <a
              href={group.churchCenterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-pcc-forest px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-forest/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
            >
              Join This Group
              <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {group.leaderEmail && (
            <a
              href={`mailto:${group.leaderEmail}`}
              className="flex-1 inline-flex items-center justify-center rounded-lg border-2 border-pcc-navy px-6 py-3 text-sm font-semibold text-pcc-navy hover:bg-pcc-navy hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
            >
              Contact Leader
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export function GroupsBrowser({ groups }: { groups: SmallGroup[] }) {
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedDay, setSelectedDay] = useState<string>('')
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [search, setSearch] = useState('')
  const [selectedGroup, setSelectedGroup] = useState<SmallGroup | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const availableDays = useMemo(() => {
    const days = new Set(groups.map((g) => g.meetingDay).filter(Boolean) as string[])
    return dayOrder.filter((d) => days.has(d))
  }, [groups])

  const availableLocations = useMemo(() => {
    const types = new Set(groups.map((g) => g.locationType).filter(Boolean) as string[])
    return Array.from(types)
  }, [groups])

  const clearAll = () => {
    setSelectedType('')
    setSelectedDay('')
    setSelectedLocation('')
    setSearch('')
  }

  const activeFilterCount =
    (selectedType ? 1 : 0) + (selectedDay ? 1 : 0) + (selectedLocation ? 1 : 0) + (search ? 1 : 0)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return groups.filter((g) => {
      if (selectedType && g.type !== selectedType) return false
      if (selectedDay && g.meetingDay !== selectedDay) return false
      if (selectedLocation && g.locationType !== selectedLocation) return false
      if (q) {
        const haystack = `${g.name} ${g.description} ${g.leader} ${g.location || ''}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [groups, selectedType, selectedDay, selectedLocation, search])

  return (
    <div>
      {/* Controls */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pcc-slate/50" aria-hidden="true" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search groups..."
              aria-label="Search groups"
              className="w-full rounded-lg border border-pcc-cream-dark bg-white pl-9 pr-9 py-3 text-sm text-pcc-navy placeholder:text-pcc-slate/50 focus:border-pcc-teal focus:outline-none focus:ring-2 focus:ring-pcc-teal/30"
            />
            {search && (
              <button type="button" onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-pcc-slate/50 hover:text-pcc-navy transition-colors" aria-label="Clear search">
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Mobile filter button */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            className="relative flex h-11 items-center gap-1.5 rounded-lg border border-pcc-cream-dark bg-white px-4 text-sm font-medium text-pcc-slate hover:bg-pcc-cream transition-colors md:hidden"
          >
            <AdjustmentsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pcc-navy text-[10px] font-bold text-white">{activeFilterCount}</span>
            )}
          </button>
        </div>

        {/* Desktop filters */}
        <div className="hidden md:flex md:flex-wrap md:items-center md:gap-3">
          {/* Type */}
          <div className="flex gap-1.5">
            {(['growth', 'life'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedType(selectedType === t ? '' : t)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                  selectedType === t ? 'bg-pcc-navy text-white' : t === 'growth' ? 'bg-pcc-teal/15 text-pcc-teal hover:opacity-80' : 'bg-pcc-gold/20 text-pcc-gold-dark hover:opacity-80'
                }`}
              >
                {typeLabels[t]}
              </button>
            ))}
          </div>

          <span className="text-pcc-cream-dark">|</span>

          {/* Day */}
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            aria-label="Filter by meeting day"
            className="rounded-lg border border-pcc-cream-dark bg-white px-3 py-1.5 text-sm text-pcc-navy focus:border-pcc-teal focus:outline-none focus:ring-2 focus:ring-pcc-teal/30"
          >
            <option value="">Any Day</option>
            {availableDays.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Location type */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            aria-label="Filter by location"
            className="rounded-lg border border-pcc-cream-dark bg-white px-3 py-1.5 text-sm text-pcc-navy focus:border-pcc-teal focus:outline-none focus:ring-2 focus:ring-pcc-teal/30"
          >
            <option value="">Any Location</option>
            {availableLocations.map((l) => (
              <option key={l} value={l}>{locationLabels[l] || l}</option>
            ))}
          </select>

          {activeFilterCount > 0 && (
            <button type="button" onClick={clearAll} className="flex items-center gap-1 text-sm font-medium text-pcc-slate hover:text-pcc-navy transition-colors">
              <XMarkIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Clear ({activeFilterCount})
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="mb-4 text-sm text-pcc-slate" aria-live="polite">
        {filtered.length} group{filtered.length !== 1 ? 's' : ''}
        {activeFilterCount > 0 && ' (filtered)'}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl bg-white p-12 text-center shadow-md">
          <UserGroupIcon className="mx-auto h-12 w-12 text-pcc-slate/40" aria-hidden="true" />
          <p className="mt-4 text-lg font-semibold text-pcc-navy">No groups match your filters</p>
          <p className="mt-2 text-sm text-pcc-slate">Try adjusting your search or filters.</p>
          {activeFilterCount > 0 && (
            <button type="button" onClick={clearAll} className="mt-4 text-sm font-semibold text-pcc-teal hover:text-pcc-teal-dark transition-colors">
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((group) => (
            <GroupCard key={group.id} group={group} onSelect={() => setSelectedGroup(group)} />
          ))}
        </div>
      )}

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Group filters">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-pcc-navy">Filters</h3>
              <button type="button" onClick={() => setDrawerOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-pcc-cream transition-colors" aria-label="Close filters">
                <XMarkIcon className="h-5 w-5 text-pcc-slate" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-pcc-navy mb-2">Type</p>
                <div className="flex gap-2">
                  {(['growth', 'life'] as const).map((t) => (
                    <button key={t} type="button" onClick={() => setSelectedType(selectedType === t ? '' : t)} className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${selectedType === t ? 'bg-pcc-navy text-white' : 'bg-pcc-cream text-pcc-charcoal'}`}>
                      {typeLabels[t]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="mobile-day" className="text-sm font-medium text-pcc-navy">Meeting Day</label>
                <select id="mobile-day" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="mt-1 w-full rounded-lg border border-pcc-cream-dark bg-white px-3 py-2.5 text-sm text-pcc-navy">
                  <option value="">Any Day</option>
                  {availableDays.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="mobile-loc" className="text-sm font-medium text-pcc-navy">Location</label>
                <select id="mobile-loc" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="mt-1 w-full rounded-lg border border-pcc-cream-dark bg-white px-3 py-2.5 text-sm text-pcc-navy">
                  <option value="">Any Location</option>
                  {availableLocations.map((l) => <option key={l} value={l}>{locationLabels[l] || l}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {activeFilterCount > 0 && (
                <button type="button" onClick={clearAll} className="flex-1 rounded-lg border-2 border-pcc-navy px-4 py-3 text-sm font-semibold text-pcc-navy hover:bg-pcc-navy hover:text-white transition-colors">Clear All</button>
              )}
              <button type="button" onClick={() => setDrawerOpen(false)} className="flex-1 rounded-lg bg-pcc-navy px-4 py-3 text-sm font-semibold text-white hover:bg-pcc-navy/90 transition-colors">Show Results</button>
            </div>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {selectedGroup && <GroupDetail group={selectedGroup} onClose={() => setSelectedGroup(null)} />}
    </div>
  )
}
