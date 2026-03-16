/**
 * Planning Center Calendar API client.
 * Uses Personal Access Token (HTTP Basic Auth).
 */

const PC_APP_ID = process.env.PLANNING_CENTER_APP_ID!
const PC_SECRET = process.env.PLANNING_CENTER_SECRET!
const BASE_URL = 'https://api.planningcenteronline.com/calendar/v2'

function authHeader(): string {
  return 'Basic ' + Buffer.from(`${PC_APP_ID}:${PC_SECRET}`).toString('base64')
}

async function pcFetch(path: string): Promise<unknown> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: authHeader(),
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Planning Center API error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

// --- Types for the PC JSON:API response ---

type PCAttributes = Record<string, unknown>

type PCResource = {
  type: string
  id: string
  attributes: PCAttributes
  relationships?: Record<string, { data: { type: string; id: string } | { type: string; id: string }[] | null }>
}

type PCResponse = {
  data: PCResource[]
  included?: PCResource[]
  meta: { total_count: number; next?: { offset: number } }
  links: { next?: string }
}

// --- Tag-to-category mapping ---

// Maps PC Church Center category tag names to our internal categories.
// Tags not listed here default to 'community'.
const TAG_TO_CATEGORY: Record<string, string> = {
  'gatherings': 'worship',
  "children's ministry": 'kids',
  'middle school': 'youth',
  'high school': 'youth',
  'family ministry': 'kids',
  'preschool': 'kids',
  'missions': 'outreach',
  "men's ministry": 'ministry',
  "women's ministry": 'ministry',
  'lamplighters': 'ministry',
  'stephen ministry': 'ministry',
  'encore': 'ministry',
  'front porch - young adults': 'ministry',
  'all church': 'community',
}

function mapTagsToCategory(tags: PCResource[]): string {
  // Find the first church_center_category tag that maps to our system
  for (const tag of tags) {
    const name = (tag.attributes.name as string).toLowerCase().trim()
    if (tag.attributes.church_center_category && TAG_TO_CATEGORY[name]) {
      return TAG_TO_CATEGORY[name]
    }
  }
  return 'community'
}

// --- Exported types ---

export type PCEvent = {
  pcEventId: string
  pcInstanceId: string
  title: string
  description: string | null
  summary: string | null
  startDate: Date
  endDate: Date | null
  location: string | null
  imageUrl: string | null
  registrationUrl: string | null
  featured: boolean
  category: string
  churchCenterUrl: string | null
  recurring: boolean
  recurrenceDescription: string | null
}

// --- Main fetch function ---

/**
 * Fetch all future event instances visible in Church Center,
 * with their parent event data and tags resolved.
 */
export async function fetchPCEvents(): Promise<PCEvent[]> {
  const events: PCEvent[] = []
  let offset = 0
  const perPage = 100
  // Cap at 6 months ahead to limit API calls
  const sixMonthsFromNow = new Date()
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6)

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const res = (await pcFetch(
      `/event_instances?filter=future&per_page=${perPage}&offset=${offset}&order=starts_at&include=event,tags`
    )) as PCResponse

    // Build lookup maps for included resources
    const includedMap = new Map<string, PCResource>()
    for (const inc of res.included || []) {
      includedMap.set(`${inc.type}:${inc.id}`, inc)
    }

    for (const instance of res.data) {
      const attrs = instance.attributes

      // Get parent event
      const eventRef = instance.relationships?.event?.data
      if (!eventRef || Array.isArray(eventRef)) continue
      const parentEvent = includedMap.get(`Event:${eventRef.id}`)
      if (!parentEvent) continue

      // Skip events not visible in Church Center
      if (!parentEvent.attributes.visible_in_church_center) continue

      // Get tags from parent event
      const tagRefs = parentEvent.relationships?.tags?.data
      const tags: PCResource[] = []
      if (Array.isArray(tagRefs)) {
        for (const ref of tagRefs) {
          const tag = includedMap.get(`Tag:${ref.id}`)
          if (tag) tags.push(tag)
        }
      }

      // Get tags from instance too (if any)
      const instanceTagRefs = instance.relationships?.tags?.data
      if (Array.isArray(instanceTagRefs)) {
        for (const ref of instanceTagRefs) {
          const tag = includedMap.get(`Tag:${ref.id}`)
          if (tag && !tags.find((t) => t.id === tag.id)) tags.push(tag)
        }
      }

      const startsAt = attrs.starts_at as string
      const endsAt = attrs.ends_at as string | null

      // Stop if we've gone past 6 months
      if (new Date(startsAt) > sixMonthsFromNow) continue

      events.push({
        pcEventId: eventRef.id,
        pcInstanceId: instance.id,
        title: (attrs.name as string).trim(),
        description: (parentEvent.attributes.description as string | null) || null,
        summary: (parentEvent.attributes.summary as string | null) || null,
        startDate: new Date(startsAt),
        endDate: endsAt ? new Date(endsAt) : null,
        location: (attrs.location as string | null) || null,
        imageUrl: (parentEvent.attributes.image_url as string | null) || null,
        registrationUrl: (parentEvent.attributes.registration_url as string | null) || null,
        featured: (parentEvent.attributes.featured as boolean) || false,
        category: mapTagsToCategory(tags),
        churchCenterUrl: (attrs.church_center_url as string | null) || null,
        recurring: !!(attrs.recurrence as string | null),
        recurrenceDescription: (attrs.compact_recurrence_description as string | null) || null,
      })
    }

    // Stop pagination if last item on page is past our window
    const lastInstance = res.data[res.data.length - 1]
    if (lastInstance && new Date(lastInstance.attributes.starts_at as string) > sixMonthsFromNow) break

    // Pagination
    if (!res.links.next) break
    offset += perPage
  }

  return events
}
