'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Trophy } from 'lucide-react'

export function MangaPanelHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelStackRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, -rect.top / rect.height))
        setScrollY(progress)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReducedMotion])

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setTilt({
      x: -y * 6,
      y: x * 8,
    })
  }

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const scrollDepth = prefersReducedMotion ? 0 : scrollY * 30

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full overflow-hidden bg-ink pt-12 pb-16 lg:pt-16 lg:pb-24"
      aria-label="AnimeIndian Hero Introduction"
    >
      {/* Ambient screentone backdrop */}
      <div className="absolute inset-0 screentone-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-8 z-10 order-2 lg:order-1">
            <div className="space-y-5">
              <span className="inline-block text-xs font-bold text-riso-pink tracking-widest">
                INDIA&apos;S INDEPENDENT ANIME COMMUNITY
              </span>
              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-paper leading-[1.02]">
                Anime is better<br />when we share it.
              </h1>
              <p className="text-lg sm:text-xl text-ash-light max-w-xl leading-relaxed pt-1">
                Celebrating stories, creativity, and the fans behind them. A community magazine, democratic awards, and grassroots fandom across India.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/awards"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-riso-pink text-ink font-black text-base hover:bg-paper hover:text-ink transition-colors cursor-pointer"
              >
                <Trophy className="w-5 h-5 text-ink" />
                <span>Explore the Awards</span>
                <ArrowRight className="w-4 h-4 ml-1 text-ink" />
              </Link>
              <Link
                href="/magazine"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-paper font-bold text-base hover:text-riso-yellow transition-colors cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-riso-yellow" />
                <span>Read the Magazine</span>
              </Link>
            </div>

            {/* Real data only: active season and current volume */}
            <div className="pt-6 border-t border-ink-border flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg text-paper">
                  2026
                </span>
                <span className="text-ash-light">Active Season</span>
              </div>
              <span className="w-1 h-1 bg-riso-pink rounded-full" />
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg text-paper">
                  Vol. 1
                </span>
                <span className="text-ash-light">OTAKU Bhaskar</span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered CSS 3D Manga Panels */}
          <div className="lg:col-span-5 relative flex items-center justify-center perspective-1200 min-h-[380px] sm:min-h-[460px] order-1 lg:order-2">
            <div
              ref={panelStackRef}
              className="relative w-full max-w-[360px] sm:max-w-[420px] h-[380px] sm:h-[440px] transform-style-3d transition-transform duration-300 ease-out"
              style={{
                transform: prefersReducedMotion
                  ? 'none'
                  : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${scrollDepth}px)`,
              }}
            >
              {/* Back Layer Panel: Real Shinjuku Night Photograph */}
              <div
                className={`absolute top-0 right-0 w-[220px] sm:w-[260px] h-[310px] sm:h-[360px] bg-ink-surface overflow-hidden shadow-panel ${prefersReducedMotion ? '' : 'animate-panel-back'}`}
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
                  className="object-cover opacity-70"
                  priority
                />
              </div>

              {/* Middle Layer Panel: Magazine Cover */}
              <div
                className={`absolute bottom-2 left-0 w-[200px] sm:w-[240px] h-[270px] sm:h-[320px] bg-ink-card overflow-hidden shadow-panel ${prefersReducedMotion ? '' : 'animate-panel-middle'}`}
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
                className={`absolute top-6 left-6 sm:left-10 w-[230px] sm:w-[270px] h-[300px] sm:h-[350px] bg-ink overflow-hidden shadow-sharp-pink ${prefersReducedMotion ? '' : 'animate-panel-front'}`}
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
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink via-ink/90 to-transparent p-4 pt-10">
                  <span className="block text-[10px] font-bold text-riso-pink tracking-widest">
                    AWARDS NOMINEE 2026
                  </span>
                  <span className="block font-display font-black text-sm text-paper leading-tight mt-1">
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
