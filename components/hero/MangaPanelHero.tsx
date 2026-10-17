'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Trophy } from 'lucide-react'

export function MangaPanelHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelStackRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Pointer movement tilt calculation
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    // Restrained tilt angles (max 6 deg X, 8 deg Y)
    setTilt({
      x: -y * 8,
      y: x * 10,
    })
  }

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full overflow-hidden bg-ink py-16 lg:py-24 border-b-2 border-ink-border"
      aria-label="AnimeIndian Hero Introduction"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-8 z-10">
            <div className="space-y-4">
              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-paper leading-[1.02]">
                ANIME IS BETTER WHEN WE SHARE IT.
              </h1>
              <p className="text-lg sm:text-xl text-paper max-w-xl leading-relaxed pt-2">
                India&apos;s anime community, celebrating stories, creativity, and the fans behind them.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/awards"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-riso-pink text-ink font-black text-base hover:bg-paper hover:text-ink transition-colors cursor-pointer border-2 border-riso-pink"
              >
                <Trophy className="w-5 h-5 text-ink" />
                <span>Explore the Awards</span>
                <ArrowRight className="w-4 h-4 ml-1 text-ink" />
              </Link>
              <Link
                href="/magazine"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-ink-surface text-paper font-bold text-base hover:bg-ink-card transition-colors cursor-pointer border-2 border-ink-border"
              >
                <BookOpen className="w-5 h-5 text-riso-yellow" />
                <span>Read the Magazine</span>
              </Link>
            </div>

            {/* Community Live Metric Bar */}
            <div className="pt-6 border-t-2 border-ink-border flex flex-wrap items-center gap-6 text-sm text-paper">
              <div>
                <span className="font-display font-black text-xl text-paper mr-1.5">
                  2026
                </span>
                <span>Active Season</span>
              </div>
              <div className="w-2 h-2 bg-riso-pink rounded-full" />
              <div>
                <span className="font-display font-black text-xl text-paper mr-1.5">
                  Vol. 1
                </span>
                <span>OTAKU Bhaskar</span>
              </div>
              <div className="w-2 h-2 bg-riso-yellow rounded-full" />
              <div>
                <span className="font-display font-black text-xl text-paper mr-1.5">
                  8
                </span>
                <span>Regional Chapters</span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered CSS 3D Manga Panels */}
          <div className="lg:col-span-5 relative flex items-center justify-center perspective-1000 min-h-[420px] sm:min-h-[500px]">
            <div
              ref={panelStackRef}
              className="relative w-full max-w-[380px] sm:max-w-[440px] h-[400px] sm:h-[480px] transform-style-3d transition-transform duration-300 ease-out"
              style={{
                transform: prefersReducedMotion
                  ? 'none'
                  : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              {/* Back Layer Panel: Real Shinjuku Night Photograph */}
              <div
                className="absolute top-0 right-0 w-[240px] sm:w-[280px] h-[340px] sm:h-[390px] bg-ink-surface border-4 border-ink-border overflow-hidden transition-transform duration-500"
                style={{
                  transform: prefersReducedMotion
                    ? 'translate(20px, 0)'
                    : 'translate3d(30px, -10px, -60px)',
                }}
              >
                <Image
                  src="/images/assets/colorful-neon-street-signs-in-kabukicho-shinjuku.jpg"
                  alt="Colorful neon street signs in Kabukicho, Shinjuku, Tokyo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Middle Layer Panel: Magazine Cover */}
              <div
                className="absolute bottom-4 left-0 w-[220px] sm:w-[260px] h-[300px] sm:h-[350px] bg-ink-card border-4 border-ink-border overflow-hidden transition-transform duration-500"
                style={{
                  transform: prefersReducedMotion
                    ? 'translate(-10px, 20px)'
                    : 'translate3d(-20px, 40px, -20px)',
                }}
              >
                <Image
                  src="/images/magazine/cover-issue-01.svg"
                  alt="OTAKU Bhaskar Magazine Cover Issue 01"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Front Main Layer Panel: Anime of the Year Nominee */}
              <div
                className="absolute top-8 left-8 sm:left-12 w-[240px] sm:w-[280px] h-[320px] sm:h-[370px] bg-ink border-4 border-riso-pink overflow-hidden transition-transform duration-500"
                style={{
                  transform: prefersReducedMotion
                    ? 'none'
                    : 'translate3d(10px, 10px, 40px)',
                }}
              >
                <Image
                  src="/images/nominees/frieren.svg"
                  alt="Frieren: Beyond Journey's End - Anime of the Year Nominee"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-0 inset-x-0 bg-ink p-3 border-t-2 border-riso-pink">
                  <span className="block text-sm font-bold text-riso-pink">
                    AWARDS NOMINEE 2026
                  </span>
                  <span className="block font-display font-black text-base text-paper">
                    Frieren: Beyond Journey&apos;s End
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
