'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Bell, Pause, Play } from 'lucide-react'

export function SeasonTicker() {
  const [isPaused, setIsPaused] = useState(false)

  const tickerItems = [
    { text: 'Awards 2026: Official Ballot Now Open across 6 Categories', href: '/awards' },
    { text: 'OTAKU BHASKAR: Issue 01 Digital Edition Available to Read & Download', href: '/magazine/issue-01' },
    { text: 'VOICE GUILD: Inside the Mumbai Recording Booths Localizing Modern Anime', href: '/magazine/issue-01/interview-dub-voice-guild' },
    { text: 'CRITICISM: Why Frieren Resonated with Indian Audiences in Mumbai Monsoon', href: '/magazine/issue-01/monsoon-and-madhouse' },
  ]

  return (
    <div
      className="w-full bg-ink-surface py-2.5 overflow-hidden text-sm border-b border-ink-border/60"
      aria-label="Community Announcements Ticker"
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 overflow-hidden">
        {/* Label and control */}
        <div className="flex items-center gap-2 shrink-0 text-xs font-bold text-riso-yellow tracking-wider">
          <Bell className="w-3.5 h-3.5 text-riso-pink" />
          <span className="hidden sm:inline">DISPATCH</span>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="text-ash-light hover:text-paper ml-0.5 focus:outline-none"
            aria-label={isPaused ? 'Resume ticker' : 'Pause ticker'}
          >
            {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>
        </div>

        {/* Ticker marquee */}
        <div
          className="relative flex-1 overflow-hidden whitespace-nowrap"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`inline-flex items-center gap-10 font-medium ${
              isPaused ? '' : 'animate-marquee'
            }`}
          >
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="inline-flex items-center gap-2.5 text-ash-light hover:text-riso-pink transition-colors text-xs sm:text-sm"
              >
                <span className="w-1.5 h-1.5 bg-riso-pink rounded-full shrink-0" />
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
