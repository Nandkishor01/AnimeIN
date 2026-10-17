import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trophy, Calendar, ArrowRight } from 'lucide-react'

export function AwardsFeature() {
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
  }
  ]

  return (
    <section className="w-full py-20 bg-ink-surface" aria-label="Awards Campaign Feature">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden">
          {/* Subtle Screentone background */}
          <div className="absolute inset-0 screentone-pink opacity-20 pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-4">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold text-riso-pink tracking-widest">COMMUNITY AWARDS</span>
                <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-paper tracking-tight leading-[1.05]">
                  2026 Awards<br />Ballot
                </h2>
                <p className="text-ash-light text-base sm:text-lg max-w-lg leading-relaxed">
                  Cast your vote across 6 curated categories. From generational sakuga choreography to groundbreaking fan translations, decide the works that defined Indian anime fandom this year.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-paper pt-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-riso-pink" />
                  <span>Closes: <strong>November 30, 2026</strong></span>
                </div>
                <span className="w-1 h-1 bg-riso-yellow rounded-full" />
                <span>6 Disciplines</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  href="/awards/2026"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-riso-pink text-ink font-black text-base hover:bg-paper hover:text-ink transition-colors cursor-pointer"
                >
                  <Trophy className="w-5 h-5 text-ink" />
                  <span>Vote in 2026 Awards</span>
                  <ArrowRight className="w-4 h-4 text-ink" />
                </Link>
                <Link
                  href="/awards/2025/results"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-paper font-bold text-sm hover:text-riso-yellow transition-colors"
                >
                  <span>2025 Results</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Nominee Spotlight Strip — artwork-dominant */}
            <div className="lg:col-span-6 grid grid-cols-3 gap-3 sm:gap-4">
              {spotlightNominees.map((nom, i) => (
                <Link
                  key={i}
                  href="/awards/2026"
                  className="group relative aspect-[3/4] bg-ink-card overflow-hidden"
                >
                  <Image
                    src={nom.image}
                    alt={nom.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3">
                    <span className="block text-[9px] sm:text-[10px] font-bold text-riso-yellow tracking-wider">
                      {nom.category}
                    </span>
                    <h3 className="font-display font-black text-[10px] sm:text-xs text-paper leading-tight mt-1 line-clamp-2">
                      {nom.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
