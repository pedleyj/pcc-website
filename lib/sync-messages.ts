/**
 * Sync messages from Planning Center Services API + YouTube RSS feed + Beyond Sunday PDFs.
 *
 * Data sources:
 * 1. Planning Center Services → title, date, series, series artwork, speaker
 * 2. YouTube RSS feed → video URLs matched by title
 * 3. wearepcc.com → Beyond Sunday PDFs (checked by URL pattern)
 */

import { pcFetch as pcFetchBase, type PCResponse } from './planning-center-auth'

const PC_BASE = 'https://api.planningcenteronline.com/services/v2'
const SERVICE_TYPE_ID = '1196940' // "Sunday Services"
const YOUTUBE_CHANNEL_ID = 'UClW28QqJpYnfhv6dJ2JCJbA'

async function pcFetch(path: string): Promise<PCResponse> {
  return pcFetchBase(PC_BASE, path)
}

// --- YouTube search via Data API ---

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || ''

async function searchYouTubeVideo(sermonTitle: string, sermonDate: string): Promise<string | null> {
  if (!YOUTUBE_API_KEY) return fallbackRssMatch(sermonTitle, sermonDate)

  // Convert "2026-03-15" → "3.15.26" (format used in YouTube video titles)
  const dateShort = sermonDate.replace(/^20(\d\d)-0?(\d+)-0?(\d+)$/, '$2.$3.$1')

  // Search for "Message Only" version first (cleaner cut)
  const queries = [
    `${sermonTitle} ${dateShort} message only`,
    `${sermonTitle} ${dateShort}`,
  ]

  for (const q of queries) {
    try {
      const params = new URLSearchParams({
        part: 'snippet',
        channelId: YOUTUBE_CHANNEL_ID,
        q,
        type: 'video',
        maxResults: '3',
        key: YOUTUBE_API_KEY,
      })
      const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`, { cache: 'no-store' })
      if (!res.ok) continue

      const data = await res.json() as { items?: { id: { videoId: string }; snippet: { title: string } }[] }
      const items = data.items || []

      // Filter out gatherings/livestreams — prefer "message only" or titled videos
      const match = items.find((i) => {
        const t = i.snippet.title.toLowerCase()
        return !t.includes('9 am gathering') && !t.includes('4:30 pm') && !t.includes('12:30 pm') && !t.includes('pcc gathering')
      })

      if (match) return `https://www.youtube.com/watch?v=${match.id.videoId}`
    } catch {
      // continue to next query
    }
  }

  return null
}

// Fallback: RSS feed for recent videos (no API key needed)
async function fallbackRssMatch(sermonTitle: string, sermonDate: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`,
      { cache: 'no-store' }
    )
    if (!res.ok) return null
    const xml = await res.text()
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || []
    // Convert "2026-03-15" → "3.15.26" (format used in YouTube video titles)
  const dateShort = sermonDate.replace(/^20(\d\d)-0?(\d+)-0?(\d+)$/, '$2.$3.$1')

    for (const e of entries) {
      const title = (e.match(/<title>(.*?)<\/title>/)?.[1] || '').replace(/&amp;/g, '&').replace(/&#39;/g, "'")
      const videoId = e.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1]
      if (videoId && title.includes(dateShort) && !title.toLowerCase().includes('9 am gathering')) {
        return `https://www.youtube.com/watch?v=${videoId}`
      }
    }
  } catch {
    // ignore
  }
  return null
}

// --- Beyond Sunday PDF ---

async function checkBeyondSundayUrl(date: string, seriesSlug: string): Promise<string | null> {
  // Pattern: /wp-content/uploads/{year}/{month}/{series}-beyondsunday-{m}-{d}-{yy}.pdf
  // Use date string directly to avoid timezone issues
  const [yearStr, monthStr, dayStr] = date.slice(0, 10).split('-')
  const year = yearStr
  const month = monthStr
  const shortDate = `${parseInt(monthStr)}-${parseInt(dayStr)}-${yearStr.slice(2)}`

  const url = `https://wearepcc.com/wp-content/uploads/${year}/${month}/${seriesSlug}-beyondsunday-${shortDate}.pdf`

  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' })
    if (res.ok) return url
  } catch {
    // ignore
  }
  return null
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// --- Main export ---

export type SyncedMessage = {
  title: string
  speaker: string
  date: Date
  series: string | null
  seriesArt: string | null
  videoUrl: string | null
  beyondSundayUrl: string | null
}

export async function fetchMessagesFromPC(limit = 20): Promise<SyncedMessage[]> {
  const plansRes = await pcFetch(
    `/service_types/${SERVICE_TYPE_ID}/plans?per_page=${limit}&order=-sort_date&filter=past&include=series`
  )

  const seriesMap = new Map<string, { title: string; art: string | null }>()
  for (const inc of plansRes.included || []) {
    if (inc.type === 'Series') {
      seriesMap.set(inc.id, {
        title: inc.attributes.title as string,
        art: (inc.attributes.artwork_for_dashboard as string) || null,
      })
    }
  }

  // Process all plans in parallel (speaker, YouTube, PDF lookups concurrently per plan)
  const messages = await Promise.all(
    plansRes.data
      .filter((plan) => plan.attributes.sort_date)
      .map(async (plan): Promise<SyncedMessage> => {
        const title = (plan.attributes.title as string) || 'Sunday Message'
        const sortDate = plan.attributes.sort_date as string
        const date = sortDate.slice(0, 10)
        const seriesTitle = plan.attributes.series_title as string | null
        const seriesRef = plan.relationships?.series?.data
        const seriesData = seriesRef && !Array.isArray(seriesRef) ? seriesMap.get(seriesRef.id) : null
        const seriesSlug = seriesTitle ? slugify(seriesTitle) : null

        // Run speaker lookup, YouTube match, and PDF check in parallel
        const [speaker, videoUrl, beyondSundayUrl] = await Promise.all([
          // Speaker from team members
          pcFetch(`/service_types/${SERVICE_TYPE_ID}/plans/${plan.id}/team_members?per_page=50`)
            .then((teamRes) => {
              const speakerPositions = ['teach', 'preach', 'speaker', 'sermon', 'message', 'pastor']
              const preacher = teamRes.data.find((m) => {
                const pos = (m.attributes.team_position_name as string || '').toLowerCase()
                return speakerPositions.some((kw) => pos.includes(kw))
              })
              return preacher ? (preacher.attributes.name as string) : 'PCC Staff'
            })
            .catch(() => 'PCC Staff'),
          // YouTube video
          searchYouTubeVideo(title, date),
          // Beyond Sunday PDF
          seriesSlug ? checkBeyondSundayUrl(date, seriesSlug) : Promise.resolve(null),
        ])

        return {
          title,
          speaker,
          date: new Date(sortDate),
          series: seriesTitle,
          seriesArt: seriesData?.art || null,
          videoUrl,
          beyondSundayUrl,
        }
      })
  )

  return messages
}
