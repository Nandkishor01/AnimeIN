'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Bell, Pause, Play } from 'lucide-react'

export function SeasonTicker() {
  const [isPaused, setIsPaused] = useState(false)

  const tickerItems = [
    { text: 'AWARDS 2026: Official Ballot Now Open across 6 Categories', href: '/awards' },
    { text: 'OTAKU BHASKAR: Issue 01 Digital Edition Available to Read & Download', href: '/magazine/issue-01' },
    { text: 'VOICE GUILD: Inside the Mumbai Recording Booths Localizing Modern Anime', href: '/magazine/issue-01/interview-dub-voice-guild' },
    { text: 'CRITICISM: Why Frieren Resonated with Indian Audiences in Mumbai Monsoon', href: '/magazine/issue-01/monsoon-and-madhouse' },
  ]

  return (
    <div
      className="w-full max-w-full bg-ink-surface border-b-2 border-ink-border py-3 overflow-hidden text-sm"
      aria-label="Community Announcements Ticker"
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 overflow-hidden">
        {/* Label and control */}
        <div className="flex items-center gap-2 shrink-0 bg-ink px-3 py-1 border-2 border-ink-border text-sm font-bold text-riso-yellow">
          <Bell className="w-4 h-4 text-riso-pink" />
          <span>DISPATCH</span>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="text-paper hover:text-riso-pink ml-1 focus:outline-none"
            aria-label={isPaused ? 'Resume ticker' : 'Pause ticker'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Ticker marquee */}
        <div
          className="relative flex-1 overflow-hidden whitespace-nowrap"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`inline-flex items-center gap-12 font-medium ${
              isPaused ? '' : 'animate-marquee'
            }`}
          >
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="inline-flex items-center gap-3 text-paper hover:text-riso-pink transition-colors text-sm"
              >
                <span className="w-2 h-2 bg-riso-pink rounded-full shrink-0" />
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
