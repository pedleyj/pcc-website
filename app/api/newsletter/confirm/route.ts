import { NextRequest, NextResponse } from 'next/server'
import { confirmNewsletterSubscriber } from '@/lib/db/queries'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(
      new URL('/about/newsletter/confirm?status=invalid', request.url)
    )
  }

  const result = await confirmNewsletterSubscriber(token)
  if (!result) {
    return NextResponse.redirect(
      new URL('/about/newsletter/confirm?status=invalid', request.url)
    )
  }
  return NextResponse.redirect(
    new URL('/about/newsletter/confirm?status=success', request.url)
  )
}
