import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  UserIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  DocumentArrowDownIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  TagIcon,
} from '@heroicons/react/24/outline'
import {
  getMessageById,
  getMessagesBySeries,
  getSeriesNavigation,
} from '@/lib/db/queries'
import { parseScriptureLinks } from '@/lib/utils/scripture'
import { MediaPlayer } from '@/components/messages/media-player'
import { ShareButtons } from '@/components/messages/share-buttons'
import { ViewCounter } from '@/components/messages/view-counter'
import { Breadcrumb } from '@/components/layout/breadcrumb'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const message = await getMessageById(id)

  if (!message) {
    return { title: 'Message Not Found | Peninsula Covenant Church' }
  }

  const description = message.description || `${message.title} by ${message.speaker} at PCC.`

  return {
    title: `${message.title} | Messages | Peninsula Covenant Church`,
    description,
    openGraph: {
      title: message.title,
      description,
      url: `https://pcc-website-ten.vercel.app/messages/${message.id}`,
      siteName: 'Peninsula Covenant Church',
      images: message.thumbnail ? [{ url: message.thumbnail, width: 1280, height: 720 }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: message.title,
      description,
      images: message.thumbnail ? [message.thumbnail] : [],
    },
  }
}

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`
    }
    if (parsed.hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v')
      if (videoId) return `https://www.youtube.com/embed/${videoId}`
      if (parsed.pathname.startsWith('/embed/')) return url
    }
  } catch {
    // Not a valid URL
  }
  return null
}

export default async function MessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const message = await getMessageById(id)

  if (!message) {
    notFound()
  }

  const [relatedMessages, seriesNav] = await Promise.all([
    message.series
      ? getMessagesBySeries(message.series, message.id)
      : Promise.resolve([]),
    message.series
      ? getSeriesNavigation(message.series, message.date, message.id)
      : Promise.resolve({ prev: null, next: null }),
  ])

  const embedUrl = message.videoUrl ? getYouTubeEmbedUrl(message.videoUrl) : null
  const scriptureLinks = message.scripture ? parseScriptureLinks(message.scripture) : []
  const shareUrl = `https://pcc-website-ten.vercel.app/messages/${message.id}`

  return (
    <>
      {/* Hero */}
      <section className="bg-pcc-navy">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb items={[{ label: 'Messages', href: '/messages' }, { label: message.title }]} />

          {message.series && (
            <Link
              href={`/messages?series=${encodeURIComponent(message.series)}`}
              className="inline-flex items-center rounded-full bg-pcc-teal/20 px-3 py-1 text-xs font-semibold text-pcc-teal-light hover:bg-pcc-teal/30 transition-colors"
            >
              {message.series}
            </Link>
          )}

          <h1
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            {message.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-white/80">
            <span className="flex items-center gap-1.5">
              <UserIcon className="h-4 w-4" aria-hidden="true" />
              {message.speaker}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDaysIcon className="h-4 w-4" aria-hidden="true" />
              {format(new Date(message.date), 'MMMM d, yyyy')}
            </span>
            {scriptureLinks.length > 0 && (
              <span className="flex items-center gap-1.5">
                <BookOpenIcon className="h-4 w-4" aria-hidden="true" />
                {scriptureLinks.map((ref, i) => (
                  <span key={ref.text}>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-white/40 underline-offset-2 hover:text-white hover:decoration-white transition-colors"
                    >
                      {ref.text}
                    </a>
                    {i < scriptureLinks.length - 1 && ', '}
                  </span>
                ))}
              </span>
            )}
            <ViewCounter messageId={message.id} initialCount={message.viewCount} />
          </div>

          {/* Tags */}
          {message.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <TagIcon className="h-4 w-4 text-white/50" aria-hidden="true" />
              {message.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/messages?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/90 hover:bg-white/20 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Media Player */}
          <MediaPlayer
            videoEmbedUrl={embedUrl}
            audioUrl={message.audioUrl}
            title={message.title}
          />

          {/* Share Buttons */}
          <ShareButtons title={message.title} url={shareUrl} />

          {/* Description */}
          {message.description && (
            <div className="rounded-xl bg-white p-8 shadow-md">
              <h2 className="text-xl font-bold text-pcc-navy">About This Message</h2>
              <p className="mt-4 leading-relaxed text-pcc-charcoal">{message.description}</p>
            </div>
          )}

          {/* Study Resources */}
          {message.resources && message.resources.length > 0 && (
            <div className="mt-6 rounded-xl bg-white p-6 shadow-md sm:p-8">
              <h2 className="text-xl font-bold text-pcc-navy">Study Resources</h2>
              <p className="mt-1 text-sm text-pcc-slate">
                Continue learning with these resources for personal reflection or group discussion.
              </p>
              <div className="mt-6 space-y-3">
                {message.resources.map((resource) => {
                  const typeConfig: Record<string, { label: string; icon: typeof DocumentTextIcon; color: string }> = {
                    beyond_sunday: { label: 'Beyond Sunday', icon: SparklesIcon, color: 'bg-pcc-emerald/10 text-pcc-emerald' },
                    discussion_guide: { label: 'Discussion Guide', icon: ChatBubbleLeftRightIcon, color: 'bg-pcc-teal/10 text-pcc-teal' },
                    sermon_notes: { label: 'Sermon Notes', icon: DocumentTextIcon, color: 'bg-pcc-navy/10 text-pcc-navy' },
                    scripture_ref: { label: 'Scripture', icon: BookOpenIcon, color: 'bg-pcc-gold/15 text-pcc-gold-dark' },
                    other: { label: 'Resource', icon: DocumentArrowDownIcon, color: 'bg-pcc-slate/10 text-pcc-slate' },
                  }
                  const config = typeConfig[resource.type] || typeConfig.other
                  const TypeIcon = config.icon

                  return (
                    <a
                      key={resource.id}
                      href={resource.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-lg border border-pcc-cream-dark p-4 transition-colors hover:bg-pcc-cream-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.color}`}>
                        <TypeIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-pcc-navy group-hover:text-pcc-teal transition-colors">
                          {resource.title}
                        </p>
                        {resource.description && (
                          <p className="mt-0.5 text-sm text-pcc-slate truncate">{resource.description}</p>
                        )}
                        <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      <ArrowDownTrayIcon className="h-5 w-5 shrink-0 text-pcc-slate group-hover:text-pcc-teal transition-colors" aria-hidden="true" />
                    </a>
                  )
                })}
              </div>
            </div>
          )}

          {/* Legacy single resource (for messages with only resourceUrl) */}
          {message.resourceUrl && (!message.resources || message.resources.length === 0) && (
            <div className="mt-6 rounded-xl bg-white p-6 shadow-md">
              <a
                href={message.resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-pcc-navy px-6 py-3 text-sm font-semibold text-white hover:bg-pcc-navy/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2"
              >
                <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" />
                Download Study Guide
              </a>
              <p className="mt-2 text-sm text-pcc-slate">
                Resources for personal reflection or group discussion
              </p>
            </div>
          )}

          {/* Series Navigation (Prev/Next) */}
          {message.series && (seriesNav.prev || seriesNav.next) && (
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-pcc-slate uppercase tracking-wider mb-4">
                More from &ldquo;{message.series}&rdquo;
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {seriesNav.prev ? (
                  <Link
                    href={`/messages/${seriesNav.prev.id}`}
                    className="group flex items-center gap-4 rounded-xl bg-white p-5 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <ChevronLeftIcon className="h-5 w-5 shrink-0 text-pcc-slate group-hover:text-pcc-teal transition-colors" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-pcc-slate">Previous</p>
                      <p className="mt-0.5 font-semibold text-pcc-navy group-hover:text-pcc-teal transition-colors truncate">
                        {seriesNav.prev.title}
                      </p>
                      <p className="mt-0.5 text-xs text-pcc-slate">
                        {format(new Date(seriesNav.prev.date), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {seriesNav.next ? (
                  <Link
                    href={`/messages/${seriesNav.next.id}`}
                    className="group flex items-center justify-end gap-4 rounded-xl bg-white p-5 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 text-right"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-pcc-slate">Next</p>
                      <p className="mt-0.5 font-semibold text-pcc-navy group-hover:text-pcc-teal transition-colors truncate">
                        {seriesNav.next.title}
                      </p>
                      <p className="mt-0.5 text-xs text-pcc-slate">
                        {format(new Date(seriesNav.next.date), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 shrink-0 text-pcc-slate group-hover:text-pcc-teal transition-colors" aria-hidden="true" />
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="mt-10">
            <Link
              href="/messages"
              className="text-sm font-medium text-pcc-navy hover:text-pcc-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-2 rounded-sm"
            >
              &larr; Back to Messages
            </Link>
          </div>
        </div>
      </section>

      {/* Related Messages */}
      {relatedMessages.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold text-pcc-navy">
              More from &ldquo;{message.series}&rdquo;
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedMessages.slice(0, 4).map((related) => (
                <Link
                  key={related.id}
                  href={`/messages/${related.id}`}
                  className="group overflow-hidden rounded-xl bg-pcc-cream-light shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden bg-pcc-navy">
                    <Image
                      src={related.thumbnail || 'https://placehold.co/1280x720/254b5a/white?text=PCC'}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
                      {related.title}
                    </h3>
                    <p className="mt-1 text-sm text-pcc-charcoal">{related.speaker}</p>
                    <p className="mt-1 text-sm text-pcc-slate">
                      {format(new Date(related.date), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
