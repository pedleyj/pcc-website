import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Questions About Faith | Peninsula Covenant Church',
  description: 'Have questions about faith, God, or Christianity? Alpha is designed for exactly that.',
}

export default function FaqPage() {
  redirect('/explore-faith/faith-questions')
}
