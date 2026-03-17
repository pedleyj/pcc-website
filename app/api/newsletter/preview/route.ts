import { NextResponse } from 'next/server'
import { renderNewsletter } from '@/lib/email/newsletter-template'
import { getSampleNewsletter } from '@/lib/email/sample-newsletter'

/**
 * Preview the sample newsletter in the browser.
 *
 * GET /api/newsletter/preview
 */
export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pcc-website-ten.vercel.app'
  const data = getSampleNewsletter(`${siteUrl}/api/newsletter/unsubscribe?token=preview`)
  const html = renderNewsletter(data)

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
