'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { PlayCircleIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline'

const SPEEDS = [1, 1.25, 1.5, 2] as const

export function MediaPlayer({
  videoEmbedUrl,
  audioUrl,
  title,
}: {
  videoEmbedUrl: string | null
  audioUrl: string | null
  title: string
}) {
  const hasVideo = !!videoEmbedUrl
  const hasAudio = !!audioUrl
  const hasBoth = hasVideo && hasAudio

  const [mode, setMode] = useState<'video' | 'audio'>(hasVideo ? 'video' : 'audio')

  // Restore preference from localStorage after hydration
  useEffect(() => {
    if (!hasBoth) return
    const saved = localStorage.getItem('pcc-media-pref') as 'video' | 'audio' | null
    if (saved === 'video' || saved === 'audio') setMode(saved)
  }, [hasBoth])
  const [speed, setSpeed] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleModeChange = useCallback((newMode: 'video' | 'audio') => {
    setMode(newMode)
    localStorage.setItem('pcc-media-pref', newMode)
  }, [])

  const handleSpeed = useCallback((s: number) => {
    setSpeed(s)
    if (audioRef.current) audioRef.current.playbackRate = s
  }, [])

  if (!hasVideo && !hasAudio) return null

  return (
    <div className="mb-10">
      {/* Toggle tabs */}
      {hasBoth && (
        <div className="mb-3 flex gap-2">
          <button
            onClick={() => handleModeChange('video')}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              mode === 'video'
                ? 'bg-pcc-navy text-white'
                : 'bg-white text-pcc-navy border border-pcc-cream-dark hover:bg-pcc-cream'
            }`}
          >
            <PlayCircleIcon className="h-4 w-4" aria-hidden="true" />
            Watch
          </button>
          <button
            onClick={() => handleModeChange('audio')}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              mode === 'audio'
                ? 'bg-pcc-navy text-white'
                : 'bg-white text-pcc-navy border border-pcc-cream-dark hover:bg-pcc-cream'
            }`}
          >
            <SpeakerWaveIcon className="h-4 w-4" aria-hidden="true" />
            Listen
          </button>
        </div>
      )}

      {/* Video */}
      {mode === 'video' && videoEmbedUrl && (
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <div className="relative aspect-video">
            <iframe
              src={videoEmbedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Audio */}
      {mode === 'audio' && audioUrl && (
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <SpeakerWaveIcon className="h-6 w-6 text-pcc-teal" aria-hidden="true" />
            <h2 className="text-lg font-bold text-pcc-navy">Listen to Audio</h2>
          </div>
          <audio
            ref={audioRef}
            controls
            className="w-full"
            preload="metadata"
          >
            <source src={audioUrl} />
            Your browser does not support the audio element.
          </audio>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs font-medium text-pcc-slate">Speed:</span>
            {SPEEDS.map((s) => (
              <button
                key={s}
                onClick={() => handleSpeed(s)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                  speed === s
                    ? 'bg-pcc-teal text-white'
                    : 'bg-pcc-cream text-pcc-navy hover:bg-pcc-cream-dark'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
