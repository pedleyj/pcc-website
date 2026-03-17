'use client'

import { useState, useCallback } from 'react'
import { LinkIcon, EnvelopeIcon, CheckIcon } from '@heroicons/react/24/outline'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
    }
  }, [url])

  const shareText = `Check out this message from PCC: "${title}"`

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-pcc-slate mr-1">Share:</span>

      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-lg border border-pcc-cream-dark bg-white px-3 py-1.5 text-xs font-medium text-pcc-navy hover:bg-pcc-cream transition-colors"
      >
        {copied ? (
          <>
            <CheckIcon className="h-3.5 w-3.5 text-pcc-teal" aria-hidden="true" />
            Copied!
          </>
        ) : (
          <>
            <LinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Copy Link
          </>
        )}
      </button>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-pcc-cream-dark bg-white px-3 py-1.5 text-xs font-medium text-pcc-navy hover:bg-pcc-cream transition-colors"
        aria-label="Share on Facebook"
      >
        <FacebookIcon className="h-3.5 w-3.5" />
        Facebook
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-pcc-cream-dark bg-white px-3 py-1.5 text-xs font-medium text-pcc-navy hover:bg-pcc-cream transition-colors"
        aria-label="Share on X"
      >
        <XIcon className="h-3.5 w-3.5" />
        X
      </a>

      <a
        href={`mailto:?subject=${encodeURIComponent(title + ' - PCC Message')}&body=${encodeURIComponent(shareText + '\n\n' + url)}`}
        className="inline-flex items-center gap-1.5 rounded-lg border border-pcc-cream-dark bg-white px-3 py-1.5 text-xs font-medium text-pcc-navy hover:bg-pcc-cream transition-colors"
        aria-label="Share via email"
      >
        <EnvelopeIcon className="h-3.5 w-3.5" aria-hidden="true" />
        Email
      </a>
    </div>
  )
}
