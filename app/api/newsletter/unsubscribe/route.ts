import { NextRequest, NextResponse } from 'next/server'
import { unsubscribeNewsletter, getNewsletterSubscriberByUnsubToken } from '@/lib/db/queries'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(
      new URL('/about/newsletter/unsubscribe?status=invalid', request.url)
    )
  }

  try {
    const subscriber = await getNewsletterSubscriberByUnsubToken(token)

    if (!subscriber || subscriber.status === 'unsubscribed') {
      return NextResponse.redirect(
        new URL('/about/newsletter/unsubscribe?status=already', request.url)
      )
    }

    await unsubscribeNewsletter(token)
    return NextResponse.redirect(
      new URL('/about/newsletter/unsubscribe?status=success', request.url)
    )
  } catch {
    return NextResponse.redirect(
      new URL('/about/newsletter/unsubscribe?status=invalid', request.url)
    )
  }
}
