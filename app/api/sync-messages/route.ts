import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { fetchMessagesFromPC } from '@/lib/sync-messages'

const SYNC_SECRET = process.env.SYNC_SECRET || ''

export async function GET(request: Request) {
  const url = new URL(request.url)
  const querySecret = url.searchParams.get('secret')
  const limit = parseInt(url.searchParams.get('limit') || '20', 10)

  if (SYNC_SECRET && querySecret !== SYNC_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const pcMessages = await fetchMessagesFromPC(limit)

    let created = 0
    let updated = 0
    let resourcesCreated = 0
    let skipped = 0

    for (const msg of pcMessages) {
      // Use title + date as a natural key for matching
      const dateOnly = new Date(msg.date.toISOString().slice(0, 10))

      try {
        const existing = await prisma.message.findFirst({
          where: {
            title: msg.title,
            date: {
              gte: dateOnly,
              lt: new Date(dateOnly.getTime() + 86400000),
            },
          },
          include: { resources: true },
        })

        if (existing) {
          // Update with new data (video URL, thumbnail, speaker)
          await prisma.message.update({
            where: { id: existing.id },
            data: {
              speaker: msg.speaker,
              series: msg.series,
              videoUrl: msg.videoUrl || existing.videoUrl,
              thumbnail: msg.seriesArt || existing.thumbnail,
            },
          })

          // Add Beyond Sunday resource if found and not already present
          if (msg.beyondSundayUrl && !existing.resources.some((r) => r.type === 'beyond_sunday')) {
            await prisma.messageResource.create({
              data: {
                messageId: existing.id,
                type: 'beyond_sunday',
                title: `Beyond Sunday: ${msg.title}`,
                description: 'Reflection questions for personal study or small group discussion',
                fileUrl: msg.beyondSundayUrl,
                order: 1,
              },
            })
            resourcesCreated++
          }

          updated++
        } else {
          // Create new message
          const newMsg = await prisma.message.create({
            data: {
              title: msg.title,
              speaker: msg.speaker,
              date: msg.date,
              series: msg.series,
              description: `${msg.series ? `Part of the "${msg.series}" series. ` : ''}A message from ${msg.speaker} at Peninsula Covenant Church.`,
              videoUrl: msg.videoUrl,
              thumbnail: msg.seriesArt,
              tags: msg.series ? [msg.series.toLowerCase().replace(/\s+/g, '-')] : [],
            },
          })

          // Add Beyond Sunday resource if found
          if (msg.beyondSundayUrl) {
            await prisma.messageResource.create({
              data: {
                messageId: newMsg.id,
                type: 'beyond_sunday',
                title: `Beyond Sunday: ${msg.title}`,
                description: 'Reflection questions for personal study or small group discussion',
                fileUrl: msg.beyondSundayUrl,
                order: 1,
              },
            })
            resourcesCreated++
          }

          created++
        }
      } catch (err) {
        if (skipped < 3) console.error('[Message Sync skip]', msg.title, err instanceof Error ? err.message : err)
        skipped++
      }
    }

    return NextResponse.json({
      success: true,
      synced: { created, updated, skipped, resourcesCreated },
      total: pcMessages.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[Message Sync Error]', message)
    return NextResponse.json({ error: 'Sync failed', detail: message }, { status: 500 })
  }
}
