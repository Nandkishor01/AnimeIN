import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trophy, Calendar, CheckCircle2, ArrowRight } from 'lucide-react'

export function AwardsFeature() {
  const activeSeason = {
    year: 2026,
    name: 'AnimeIndian Awards 2026',
    status: 'active',
    deadline: 'November 30, 2026',
    categoriesCount: 6,
    totalNominees: 22,
  }

  const spotlightNominees = [
    {
      title: "Frieren: Beyond Journey's End",
      category: 'Anime of the Year',
      image: '/images/nominees/frieren.svg',
    },
    {
      title: 'Jujutsu Kaisen: Shibuya Arc',
      category: 'Best Animation',
      image: '/images/nominees/shibuya.svg',
    },
    {
      title: 'Vinland Saga Season 2',
      category: 'Best Story',
      image: '/images/nominees/vinland.svg',
    },
  ]

  return (
    <section className="w-full py-20 bg-ink-surface border-b-2 border-ink-border" aria-label="Awards Campaign Feature">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-ink border-4 border-riso-pink p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Subtle Screentone background */}
          <div className="absolute inset-0 screentone-pink opacity-40 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-paper tracking-tight leading-none">
                  2026 AWARDS BALLOT
                </h2>
                <p className="text-ash-light text-base sm:text-lg max-w-xl leading-relaxed">
                  Cast your vote across 6 curated categories. From generational sakuga choreography to groundbreaking fan translations, decide the works that defined Indian anime fandom this year.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-paper pt-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-riso-pink" />
                  <span>Ballot Closes: <strong>{activeSeason.deadline}</strong></span>
                </div>
                <div>
                  <span>Categories: <strong>{activeSeason.categoriesCount} Disciplines</strong></span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/awards/2026"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-riso-pink text-ink font-black text-base hover:bg-paper hover:text-ink transition-colors cursor-pointer border-2 border-riso-pink"
                >
                  <Trophy className="w-5 h-5 text-ink" />
                  <span>Vote in 2026 Awards</span>
                  <ArrowRight className="w-4 h-4 text-ink" />
                </Link>
                <Link
                  href="/awards/2025/results"
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-ink-surface text-paper font-bold text-sm hover:bg-ink-card transition-colors border-2 border-ink-border"
                >
                  <span>2025 Archive Results</span>
                </Link>
              </div>
            </div>

            {/* Right Nominee Spotlight Strip */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {spotlightNominees.map((nom, i) => (
                <div
                  key={i}
                  className="bg-ink-surface border-2 border-ink-border p-3 flex items-center gap-4 hover:border-riso-yellow transition-colors group"
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-ink-card border-2 border-ink-border overflow-hidden">
                    <Image
                      src={nom.image}
                      alt={nom.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-bold text-riso-yellow truncate">
                      {nom.category}
                    </span>
                    <h3 className="font-display font-black text-sm sm:text-base text-paper truncate">
                      {nom.title}
                    </h3>
                    <span className="text-xs text-ash">2026 Nominee</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
