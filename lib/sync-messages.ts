/**
 * Sync messages from Planning Center Services API + YouTube RSS feed + Beyond Sunday PDFs.
 *
 * Data sources:
 * 1. Planning Center Services → title, date, series, series artwork, speaker
 * 2. YouTube RSS feed → video URLs matched by title
 * 3. wearepcc.com → Beyond Sunday PDFs (checked by URL pattern)
 */

const PC_APP_ID = process.env.PLANNING_CENTER_APP_ID!
const PC_SECRET = process.env.PLANNING_CENTER_SECRET!
const PC_BASE = 'https://api.planningcenteronline.com/services/v2'
const SERVICE_TYPE_ID = '1196940' // "Sunday Services"
const YOUTUBE_CHANNEL_ID = 'UClW28QqJpYnfhv6dJ2JCJbA'

type PCResource = {
  type: string
  id: string
  attributes: Record<string, unknown>
  relationships?: Record<string, { data: { type: string; id: string } | null }>
}

type PCResponse = {
  data: PCResource[]
  included?: PCResource[]
  meta: { total_count: number }
  links: { next?: string }
}

async function pcFetch(path: string): Promise<PCResponse> {
  const res = await fetch(`${PC_BASE}${path}`, {
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${PC_APP_ID}:${PC_SECRET}`).toString('base64'),
      Accept: 'application/json',
    },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`PC API error: ${res.status}`)
  return res.json() as Promise<PCResponse>
}

// --- YouTube RSS feed ---

type YouTubeVideo = {
  title: string
  videoId: string
  published: string
}

async function fetchYouTubeVideos(limit = 30): Promise<YouTubeVideo[]> {
  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`,
    { cache: 'no-store' }
  )
  if (!res.ok) return []
  const xml = await res.text()
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || []
  return entries.slice(0, limit).map((e) => ({
    title: (e.match(/<title>(.*?)<\/title>/)?.[1] || '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"'),
    videoId: e.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] || '',
    published: e.match(/<published>(.*?)<\/published>/)?.[1]?.slice(0, 10) || '',
  }))
}

function matchYouTubeVideo(
  videos: YouTubeVideo[],
  sermonTitle: string,
  sermonDate: string // YYYY-MM-DD
): string | null {
  const dateShort = sermonDate.replace(/^20(\d\d)-0?(\d+)-0?(\d+)$/, '$2.$3.$1') // e.g. "3.15.26" (month.day.year — matches YouTube titles)

  // Try "Message Only" version first (cleaner for website)
  const messageOnly = videos.find(
    (v) => v.title.toLowerCase().includes('message only') && v.title.includes(dateShort)
  )
  if (messageOnly) return `https://www.youtube.com/watch?v=${messageOnly.videoId}`

  // Try matching by date in title
  const byDate = videos.find(
    (v) => v.title.includes(dateShort) && !v.title.toLowerCase().includes('9 am gathering') && !v.title.toLowerCase().includes('4:30 pm') && !v.title.toLowerCase().includes('12:30 pm')
  )
  if (byDate) return `https://www.youtube.com/watch?v=${byDate.videoId}`

  // Try matching by title keywords
  const titleWords = sermonTitle.toLowerCase().split(/\s+/).filter((w) => w.length > 3)
  const byTitle = videos.find((v) => {
    const vLower = v.title.toLowerCase()
    return titleWords.filter((w) => vLower.includes(w)).length >= 2 && !vLower.includes('9 am gathering')
  })
  if (byTitle) return `https://www.youtube.com/watch?v=${byTitle.videoId}`

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
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '').replace(/\s+/g, '')
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

  // Fetch YouTube videos
  const ytVideos = await fetchYouTubeVideos(50)

  const messages: SyncedMessage[] = []

  for (const plan of plansRes.data) {
    const title = (plan.attributes.title as string) || 'Sunday Message'
    const sortDate = plan.attributes.sort_date as string
    if (!sortDate) continue
    const date = sortDate.slice(0, 10)
    const seriesTitle = plan.attributes.series_title as string | null
    const seriesRef = plan.relationships?.series?.data
    const seriesData = seriesRef ? seriesMap.get(seriesRef.id) : null

    // Get speaker from team members
    let speaker = 'PCC Staff'
    try {
      const teamRes = await pcFetch(
        `/service_types/${SERVICE_TYPE_ID}/plans/${plan.id}/team_members?per_page=50`
      )
      const preacher = teamRes.data.find(
        (m) => {
          const pos = (m.attributes.team_position_name as string || '').toLowerCase()
          return pos.includes('teach') || pos.includes('preach') || pos.includes('speaker') || pos.includes('sermon') || pos.includes('message') || pos.includes('pastor')
        }
      )
      if (preacher) speaker = preacher.attributes.name as string
    } catch {
      // keep default
    }

    // Match YouTube video
    const videoUrl = matchYouTubeVideo(ytVideos, title, date)

    // Check for Beyond Sunday PDF
    const seriesSlug = seriesTitle ? slugify(seriesTitle) : null
    const beyondSundayUrl = seriesSlug ? await checkBeyondSundayUrl(date, seriesSlug) : null

    messages.push({
      title,
      speaker,
      date: new Date(sortDate),
      series: seriesTitle,
      seriesArt: seriesData?.art || null,
      videoUrl,
      beyondSundayUrl,
    })
  }

  return messages
}
