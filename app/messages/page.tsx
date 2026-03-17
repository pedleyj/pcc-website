import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { BookOpenIcon, FunnelIcon, DocumentTextIcon, ChevronLeftIcon, ChevronRightIcon, TagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { getAllMessages, getDistinctSeries, getDistinctSpeakers } from '@/lib/db/queries'
import { FilterSelect } from '@/components/messages/filter-select'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Messages | Peninsula Covenant Church',
  description: 'Browse the full archive of sermons and messages from PCC. Filter by series, speaker, or date.',
}

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ series?: string; speaker?: string; tag?: string; page?: string }>
}) {
  const { series, speaker, tag, page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam || '1', 10) || 1)

  const [result, allSeries, allSpeakers] = await Promise.all([
    getAllMessages({ series, speaker, tag, page, pageSize: 12 }),
    getDistinctSeries(),
    getDistinctSpeakers(),
  ])

  const { messages, total, totalPages } = result
  const hasFilters = series || speaker || tag

  // Build pagination URL helper
  function pageUrl(p: number) {
    const params = new URLSearchParams()
    if (series) params.set('series', series)
    if (speaker) params.set('speaker', speaker)
    if (tag) params.set('tag', tag)
    if (p > 1) params.set('page', String(p))
    const qs = params.toString()
    return `/messages${qs ? `?${qs}` : ''}`
  }

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
              {total} message{total !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Active tag filter */}
          {tag && (
            <div className="mb-6 flex items-center gap-2">
              <TagIcon className="h-4 w-4 text-pcc-teal" aria-hidden="true" />
              <span className="text-sm text-pcc-slate">Tagged:</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-pcc-teal/10 px-3 py-1 text-sm font-medium text-pcc-teal">
                {tag}
                <Link href="/messages" aria-label={`Remove ${tag} filter`}>
                  <XMarkIcon className="h-3.5 w-3.5 hover:text-pcc-teal-dark" />
                </Link>
              </span>
            </div>
          )}

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
                    <h3 className="text-lg font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
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
                    {message._count.resources > 0 && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-pcc-forest">
                        <DocumentTextIcon className="h-3.5 w-3.5" />
                        <span>{message._count.resources} resource{message._count.resources !== 1 ? 's' : ''} available</span>
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

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Message archive pagination">
              {/* Previous */}
              {page > 1 ? (
                <Link
                  href={pageUrl(page - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-pcc-cream-dark bg-white text-pcc-navy hover:bg-pcc-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal"
                  aria-label="Previous page"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Link>
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-pcc-cream-dark bg-pcc-cream-light text-pcc-slate/40" aria-hidden="true">
                  <ChevronLeftIcon className="h-4 w-4" />
                </span>
              )}

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => {
                  // Show first, last, and pages near current
                  if (p === 1 || p === totalPages) return true
                  if (Math.abs(p - page) <= 1) return true
                  return false
                })
                .reduce<(number | 'ellipsis')[]>((acc, p, i, arr) => {
                  if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('ellipsis')
                  acc.push(p)
                  return acc
                }, [])
                .map((item, i) =>
                  item === 'ellipsis' ? (
                    <span key={`e${i}`} className="px-1 text-pcc-slate/40">...</span>
                  ) : (
                    <Link
                      key={item}
                      href={pageUrl(item)}
                      className={`flex h-10 min-w-[40px] items-center justify-center rounded-lg px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal ${
                        item === page
                          ? 'bg-pcc-navy text-white'
                          : 'border border-pcc-cream-dark bg-white text-pcc-navy hover:bg-pcc-cream'
                      }`}
                      aria-label={`Page ${item}`}
                      aria-current={item === page ? 'page' : undefined}
                    >
                      {item}
                    </Link>
                  )
                )}

              {/* Next */}
              {page < totalPages ? (
                <Link
                  href={pageUrl(page + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-pcc-cream-dark bg-white text-pcc-navy hover:bg-pcc-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal"
                  aria-label="Next page"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Link>
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-pcc-cream-dark bg-pcc-cream-light text-pcc-slate/40" aria-hidden="true">
                  <ChevronRightIcon className="h-4 w-4" />
                </span>
              )}
            </nav>
          )}
        </div>
      </section>
    </>
  )
}
