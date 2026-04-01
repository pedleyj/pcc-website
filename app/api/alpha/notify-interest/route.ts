import { NextRequest, NextResponse } from 'next/server'
import { format } from 'date-fns'
import {
  getUnnotifiedAlphaInterests,
  markAlphaInterestsNotified,
} from '@/lib/db/queries'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  // Verify authorization
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json() as { sessionId: string }
  const { sessionId } = body

  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId is required' }, { status: 400 })
  }

  // Fetch session details
  const session = await prisma.alphaSession.findUnique({ where: { id: sessionId } })
  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  // Get all un-notified interests (matching this session + unassigned ones)
  const interests = await getUnnotifiedAlphaInterests(sessionId)
  if (interests.length === 0) {
    return NextResponse.json({ sent: 0, message: 'No un-notified interests found' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 })
  }

  const { Resend } = await import('resend')
  const resend = new Resend(apiKey)

  const startDate = format(new Date(session.startDate), 'MMMM d, yyyy')
  let sentCount = 0

  for (const interest of interests) {
    const greeting = interest.firstName ? `Hi ${interest.firstName},` : 'Hi there,'

    try {
      await resend.emails.send({
        from: 'PCC Alpha <onboarding@resend.dev>',
        to: interest.email,
        subject: 'Alpha Registration is Now Open!',
        text: `${greeting}

Great news! Registration is now open for Alpha at Peninsula Covenant Church.

Session details:
- Starts: ${startDate}
- When: ${session.meetingDay}, ${session.meetingTime}
- Where: ${session.location}

Register now: ${session.registrationUrl}

Alpha is a series of sessions exploring questions of life, faith, and meaning. Each session includes a free dinner, a short video, and honest conversation. No pressure, no charge.

We'd love to have you join us!

— Peninsula Covenant Church
3560 Farm Hill Boulevard, Redwood City, CA 94061`,
      })
      sentCount++
    } catch (err) {
      console.error(`[Alpha] Failed to notify ${interest.email}:`, err instanceof Error ? err.message : err)
    }
  }

  // Mark all as notified
  await markAlphaInterestsNotified(interests.map((i) => i.id))

  return NextResponse.json({ sent: sentCount, total: interests.length })
}
