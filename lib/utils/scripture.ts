/**
 * Parse a scripture reference string into individual linked references.
 * E.g. "John 3:16, Romans 8:28" → [{ text: "John 3:16", url: "..." }, ...]
 */
export function parseScriptureLinks(scripture: string): { text: string; url: string }[] {
  return scripture
    .split(/[,;]/)
    .map((ref) => ref.trim())
    .filter(Boolean)
    .map((ref) => ({
      text: ref,
      url: `https://www.biblegateway.com/passage/?search=${encodeURIComponent(ref)}&version=NIV`,
    }))
}
