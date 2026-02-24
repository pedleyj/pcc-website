import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { BookOpenIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { getAllMessages, getDistinctSeries, getDistinctSpeakers } from '@/lib/db/queries'
import { FilterSelect } from '@/components/messages/filter-select'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Messages | Peninsula Covenant Church',
  description: 'Browse the full archive of sermons and messages from PCC. Filter by series, speaker, or date.',
}

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ series?: string; speaker?: string }>
}) {
  const { series, speaker } = await searchParams

  const [messages, allSeries, allSpeakers] = await Promise.all([
    getAllMessages({ series, speaker }),
    getDistinctSeries(),
    getDistinctSpeakers(),
  ])

  const hasFilters = series || speaker

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[30vh] items-center justify-center bg-pcc-navy">
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Messages
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Browse our full sermon archive
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-sm font-medium text-pcc-navy">
              <FunnelIcon className="h-4 w-4" aria-hidden="true" />
              Filter by:
            </div>
            <form className="flex flex-1 flex-col gap-3 sm:flex-row">
              <FilterSelect
                name="series"
                defaultValue={series || ''}
                label="Filter by series"
                options={allSeries}
                placeholder="All Series"
              />
              <FilterSelect
                name="speaker"
                defaultValue={speaker || ''}
                label="Filter by speaker"
                options={allSpeakers}
                placeholder="All Speakers"
              />
              {hasFilters && (
                <Link
                  href="/messages"
                  className="inline-flex items-center rounded-lg border border-pcc-cream-dark bg-white px-4 py-2 text-sm font-medium text-pcc-slate hover:text-pcc-navy transition-colors"
                >
                  Clear Filters
                </Link>
              )}
            </form>
            <p className="text-sm text-pcc-slate">
              {messages.length} message{messages.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Message Grid */}
          {messages.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {messages.map((message) => (
                <Link
                  key={message.id}
                  href={`/messages/${message.id}`}
                  className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden bg-pcc-navy">
                    <Image
                      src={message.thumbnail || 'https://placehold.co/1280x720/254b5a/white?text=PCC'}
                      alt={message.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {message.series && (
                      <span className="absolute left-3 top-3 rounded-full bg-pcc-teal px-3 py-1 text-xs font-semibold text-white">
                        {message.series}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
                      {message.title}
                    </h3>
                    <p className="mt-1 text-sm text-pcc-charcoal">{message.speaker}</p>
                    <p className="mt-1 text-sm text-pcc-slate">
                      {format(new Date(message.date), 'MMMM d, yyyy')}
                    </p>
                    {message.scripture && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-pcc-teal">
                        <BookOpenIcon className="h-3.5 w-3.5" />
                        <span>{message.scripture}</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white p-12 text-center shadow-md">
              <p className="text-lg text-pcc-slate">No messages found matching your filters.</p>
              <Link
                href="/messages"
                className="mt-4 inline-block text-sm font-semibold text-pcc-teal hover:text-pcc-teal-dark transition-colors"
              >
                Clear Filters
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
