'use client'

import { useState, useCallback } from 'react'
import { LinkIcon, EnvelopeIcon, CheckIcon } from '@heroicons/react/24/outline'
import { FacebookIcon, XIcon } from '@/components/icons/social-icons'

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false)

  const [copyFailed, setCopyFailed] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopyFailed(true)
      setTimeout(() => setCopyFailed(false), 2000)
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
        ) : copyFailed ? (
          <>
            <LinkIcon className="h-3.5 w-3.5 text-red-500" aria-hidden="true" />
            Failed to copy
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
