import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import {
  ChevronRightIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  UserIcon,
  ArrowDownTrayIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline'
import { getMessageById, getMessagesBySeries } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

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

  return {
    title: `${message.title} | Messages | Peninsula Covenant Church`,
    description: message.description || `${message.title} by ${message.speaker} at PCC.`,
  }
}

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    // Handle youtu.be/ID
    if (parsed.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`
    }
    // Handle youtube.com/watch?v=ID
    if (parsed.hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v')
      if (videoId) return `https://www.youtube.com/embed/${videoId}`
      // Already an embed URL
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

  const relatedMessages = message.series
    ? await getMessagesBySeries(message.series, message.id)
    : []

  const embedUrl = message.videoUrl ? getYouTubeEmbedUrl(message.videoUrl) : null

  return (
    <>
      {/* Hero */}
      <section className="bg-pcc-navy">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1 text-sm text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
            <Link href="/messages" className="hover:text-white transition-colors">Messages</Link>
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
            <span className="text-white truncate max-w-[200px]">{message.title}</span>
          </nav>

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
            {message.scripture && (
              <span className="flex items-center gap-1.5">
                <BookOpenIcon className="h-4 w-4" aria-hidden="true" />
                {message.scripture}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-pcc-cream">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Video Player */}
          {embedUrl && (
            <div className="mb-10 overflow-hidden rounded-2xl shadow-lg">
              <div className="relative aspect-video">
                <iframe
                  src={embedUrl}
                  title={message.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Audio Player (fallback when no video) */}
          {!embedUrl && message.audioUrl && (
            <div className="mb-10 rounded-xl bg-white p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <PlayCircleIcon className="h-6 w-6 text-pcc-teal" aria-hidden="true" />
                <h2 className="text-lg font-bold text-pcc-navy">Listen</h2>
              </div>
              <audio controls className="w-full" preload="metadata">
                <source src={message.audioUrl} />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Description */}
          {message.description && (
            <div className="rounded-xl bg-white p-8 shadow-md">
              <h2 className="text-xl font-bold text-pcc-navy">About This Message</h2>
              <p className="mt-4 leading-relaxed text-pcc-charcoal">{message.description}</p>
            </div>
          )}

          {/* Resource Download */}
          {message.resourceUrl && (
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
                    <h3 className="font-bold text-pcc-navy group-hover:text-pcc-teal transition-colors">
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
