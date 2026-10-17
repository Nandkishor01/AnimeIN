import React from 'react'
import Link from 'next/link'
import { MangaPanelHero } from '@/components/hero/MangaPanelHero'
import { SeasonTicker } from '@/components/home/SeasonTicker'
import { EditorialShelf } from '@/components/home/EditorialShelf'
import { AwardsFeature } from '@/components/home/AwardsFeature'
import { MagazineArchiveFeature } from '@/components/home/MagazineArchiveFeature'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="w-full flex flex-col bg-ink text-paper overflow-x-hidden">
      <MangaPanelHero />
      <SeasonTicker />
      <EditorialShelf />
      <AwardsFeature />
      <MagazineArchiveFeature />

      {/* Closing statement with link to About */}
      <section className="w-full py-20 bg-ink-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-display font-black text-2xl sm:text-4xl text-paper tracking-tight leading-tight">
            Rooted in passion, built on craft.
          </h2>
          <p className="text-ash-light text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            AnimeIndian is an open cultural collective of animators, localizers, critics, and students across India who refuse to treat Japanese animation as disposable digital noise.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-base font-bold text-riso-pink hover:text-paper transition-colors group"
          >
            <span>Read our story</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}
