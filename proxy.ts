import { NextRequest, NextResponse } from 'next/server'

export default function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://placehold.co https://wearepcc.com https://*.googleusercontent.com https://images.planningcenterusercontent.com https://s3.amazonaws.com",
    "font-src 'self'",
    "frame-src https://www.google.com https://www.youtube.com https://*.churchcenter.com",
    "connect-src 'self'",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; ')

  // Pass nonce to layout via request header
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  response.headers.set('Content-Security-Policy', csp)

  return response
}

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    {
      source: '/((?!_next/static|_next/image|favicon.ico|apple-touch-icon.png|images/).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
