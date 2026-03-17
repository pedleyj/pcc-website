'use client'

import { useEffect, useRef, useState } from 'react'
import { EyeIcon } from '@heroicons/react/24/outline'

export function ViewCounter({
  messageId,
  initialCount,
}: {
  messageId: string
  initialCount: number
}) {
  const [count, setCount] = useState(initialCount)
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true

    fetch(`/api/messages/${messageId}/view`, { method: 'POST' })
      .then((r) => r.json())
      .then((data: { viewCount: number }) => {
        if (data.viewCount) setCount(data.viewCount)
      })
      .catch(() => {
        // Silent fail — view count is not critical
      })
  }, [messageId])

  if (count < 1) return null

  return (
    <span className="flex items-center gap-1.5">
      <EyeIcon className="h-4 w-4" aria-hidden="true" />
      {count.toLocaleString()} view{count !== 1 ? 's' : ''}
    </span>
  )
}
