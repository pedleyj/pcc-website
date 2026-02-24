import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prayer Requests | Peninsula Covenant Church',
  description: 'Share your prayer needs with our caring community. We believe in the power of praying together.',
}

export default function PrayerLayout({ children }: { children: React.ReactNode }) {
  return children
}
