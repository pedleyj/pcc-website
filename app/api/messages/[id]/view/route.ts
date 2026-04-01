import { NextResponse } from 'next/server'
import { incrementViewCount } from '@/lib/db/queries'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const result = await incrementViewCount(id)
  if (!result) {
    return NextResponse.json({ viewCount: 0 }, { status: 404 })
  }
  return NextResponse.json({ viewCount: result.viewCount })
}
