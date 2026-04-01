import 'server-only'

/**
 * Shared Planning Center API authentication.
 * Used by both the Calendar API client and the Services/Messages sync.
 */

export const PC_APP_ID = process.env.PLANNING_CENTER_APP_ID
export const PC_SECRET = process.env.PLANNING_CENTER_SECRET

if (!PC_APP_ID || !PC_SECRET) {
  throw new Error('Missing PLANNING_CENTER_APP_ID or PLANNING_CENTER_SECRET environment variables')
}

export type PCResource = {
  type: string
  id: string
  attributes: Record<string, unknown>
  relationships?: Record<string, { data: { type: string; id: string } | { type: string; id: string }[] | null }>
}

export type PCResponse = {
  data: PCResource[]
  included?: PCResource[]
  meta: { total_count: number; next?: { offset: number } }
  links: { next?: string }
}

export function pcAuthHeader(): string {
  return 'Basic ' + Buffer.from(`${PC_APP_ID}:${PC_SECRET}`).toString('base64')
}

export async function pcFetch(baseUrl: string, path: string): Promise<PCResponse> {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      Authorization: pcAuthHeader(),
      Accept: 'application/json',
    },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`PC API error: ${res.status} ${res.statusText}`)
  return res.json() as Promise<PCResponse>
}
