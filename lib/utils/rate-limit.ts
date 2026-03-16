/**
 * Simple in-memory rate limiter for server actions.
 *
 * Limits are per-key (typically IP address). Entries are cleaned up
 * automatically when checked. On Vercel serverless, each cold start
 * resets the store — this is acceptable for basic spam prevention.
 * For stricter enforcement, use Upstash Redis or Vercel KV.
 */

type RateLimitEntry = {
  count: number
  resetAt: number // Unix ms
}

const store = new Map<string, RateLimitEntry>()

/**
 * Check and consume a rate limit token.
 * @param key   Unique key (e.g. "prayer:<ip>")
 * @param limit Max requests allowed in the window
 * @param windowMs Window duration in milliseconds
 * @returns { allowed, remaining, resetAt }
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()

  // Clean expired entries periodically (every 100 checks)
  if (Math.random() < 0.01) {
    for (const [k, v] of store) {
      if (v.resetAt <= now) store.delete(k)
    }
  }

  const entry = store.get(key)

  // No entry or expired → start fresh window
  if (!entry || entry.resetAt <= now) {
    const resetAt = now + windowMs
    store.set(key, { count: 1, resetAt })
    return { allowed: true, remaining: limit - 1, resetAt }
  }

  // Within window — check count
  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt }
}
