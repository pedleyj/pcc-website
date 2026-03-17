import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { renderNewsletter } from '@/lib/email/newsletter-template'
import { getSampleNewsletter } from '@/lib/email/sample-newsletter'

/**
 * Send the sample newsletter to confirmed subscribers (or a specific email for testing).
 *
 * Usage:
 *   GET /api/newsletter/send-test?secret=<SYNC_SECRET>
 *   GET /api/newsletter/send-test?secret=<SYNC_SECRET>&to=someone@example.com
 *
 * - Without `to`: sends to all confirmed subscribers
 * - With `to`: sends only to that address (does not need to be a subscriber)
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  if (secret !== process.env.SYNC_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pcc-website-ten.vercel.app'
  const targetEmail = request.nextUrl.searchParams.get('to')

  let recipients: { email: string; unsubToken: string }[]

  if (targetEmail) {
    // Send to a specific test address — use a dummy unsub token
    recipients = [{ email: targetEmail, unsubToken: 'test' }]
  } else {
    // Send to all confirmed subscribers
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { status: 'confirmed' },
      select: { email: true, unsubToken: true },
    })
    recipients = subscribers
  }

  if (recipients.length === 0) {
    return NextResponse.json({ error: 'No recipients found' }, { status: 404 })
  }

  const { Resend } = await import('resend')
  const resend = new Resend(apiKey)

  const results: { email: string; status: string }[] = []

  for (const recipient of recipients) {
    const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?token=${recipient.unsubToken}`
    const data = getSampleNewsletter(unsubscribeUrl)
    const html = renderNewsletter(data)

    try {
      await resend.emails.send({
        from: 'PCC Newsletter <onboarding@resend.dev>',
        to: recipient.email,
        subject: `PCC Newsletter — ${data.date}`,
        html,
      })
      results.push({ email: recipient.email, status: 'sent' })
    } catch (err) {
      results.push({
        email: recipient.email,
        status: `failed: ${err instanceof Error ? err.message : 'unknown error'}`,
      })
    }
  }

  return NextResponse.json({
    sent: results.filter(r => r.status === 'sent').length,
    failed: results.filter(r => r.status !== 'sent').length,
    results,
  })
}
