import type { NextConfig } from "next";

const securityHeaders = [
  {
    // Content Security Policy
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
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
    ].join('; '),
  },
  {
    // Prevent clickjacking (fallback for older browsers that don't support frame-ancestors CSP)
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    // Prevent MIME type sniffing
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    // Control referrer information
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    // Cross-Origin Opener Policy — isolate browsing context
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    // Cross-Origin Resource Policy
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
  {
    // Permissions Policy — disable unnecessary browser features
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // Long-term cache for static assets in /public (images, logos)
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/alpha',
        destination: '/explore-faith/alpha',
        permanent: true,
      },
      {
        source: '/ministries',
        destination: '/connect/ministries',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "wearepcc.com",
      },
      {
        protocol: "https",
        hostname: "images.planningcenterusercontent.com",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
