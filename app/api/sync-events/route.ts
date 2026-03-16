import { NextResponse } from 'next/server'
import { format } from 'date-fns'
import { prisma } from '@/lib/db'
import { fetchPCEvents } from '@/lib/planning-center'

// Protect with a shared secret so only cron/admin can trigger
const SYNC_SECRET = process.env.SYNC_SECRET || ''

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function formatTime(date: Date): string {
  return format(date, 'h:mm a')
}

export async function GET(request: Request) {
  // Auth check — require secret in query param or Authorization header
  const url = new URL(request.url)
  const token = url.searchParams.get('secret') || request.headers.get('authorization')?.replace('Bearer ', '')

  if (SYNC_SECRET && token !== SYNC_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const pcEvents = await fetchPCEvents()

    let created = 0
    let updated = 0
    let skipped = 0

    for (const pe of pcEvents) {
      const description = pe.description ? stripHtml(pe.description) : (pe.summary || pe.title)
      const startTime = formatTime(pe.startDate)
      const endTime = pe.endDate ? formatTime(pe.endDate) : null

      // Check if same-day event (start and end on same calendar day)
      const sameDay = pe.endDate
        ? pe.startDate.toDateString() === pe.endDate.toDateString()
        : true

      try {
        const existing = await prisma.event.findUnique({
          where: { pcInstanceId: pe.pcInstanceId },
        })

        if (existing) {
          await prisma.event.update({
            where: { pcInstanceId: pe.pcInstanceId },
            data: {
              title: pe.title,
              description,
              startDate: pe.startDate,
              endDate: sameDay ? null : pe.endDate,
              startTime,
              endTime: sameDay ? endTime : null,
              location: pe.location,
              imageUrl: pe.imageUrl,
              registrationUrl: pe.registrationUrl,
              registrationOpen: !!pe.registrationUrl,
              category: pe.category,
              featured: pe.featured,
              recurring: pe.recurring,
              recurrenceRule: pe.recurrenceDescription,
              churchCenterUrl: pe.churchCenterUrl,
            },
          })
          updated++
        } else {
          await prisma.event.create({
            data: {
              pcInstanceId: pe.pcInstanceId,
              title: pe.title,
              description,
              startDate: pe.startDate,
              endDate: sameDay ? null : pe.endDate,
              startTime,
              endTime: sameDay ? endTime : null,
              location: pe.location,
              imageUrl: pe.imageUrl,
              registrationUrl: pe.registrationUrl,
              registrationOpen: !!pe.registrationUrl,
              category: pe.category,
              featured: pe.featured,
              recurring: pe.recurring,
              recurrenceRule: pe.recurrenceDescription,
              churchCenterUrl: pe.churchCenterUrl,
            },
          })
          created++
        }
      } catch (err) {
        if (skipped < 3) console.error('[Sync skip]', pe.title, pe.pcInstanceId, err instanceof Error ? err.message : err)
        skipped++
      }
    }

    // Remove synced events that are no longer in Planning Center
    const syncedIds = new Set(pcEvents.map((e) => e.pcInstanceId))
    const staleEvents = await prisma.event.findMany({
      where: { pcInstanceId: { not: null } },
      select: { id: true, pcInstanceId: true },
    })
    let removed = 0
    for (const stale of staleEvents) {
      if (stale.pcInstanceId && !syncedIds.has(stale.pcInstanceId)) {
        await prisma.event.delete({ where: { id: stale.id } })
        removed++
      }
    }

    return NextResponse.json({
      success: true,
      synced: { created, updated, skipped, removed },
      total: pcEvents.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[Event Sync Error]', message)
    return NextResponse.json(
      { error: 'Sync failed', detail: message },
      { status: 500 }
    )
  }
}
