import React from 'react'
import { MangaPanelHero } from '@/components/hero/MangaPanelHero'
import { SeasonTicker } from '@/components/home/SeasonTicker'
import { EditorialShelf } from '@/components/home/EditorialShelf'
import { AwardsFeature } from '@/components/home/AwardsFeature'
import { MagazineArchiveFeature } from '@/components/home/MagazineArchiveFeature'

export default function HomePage() {
  return (
    <div className="w-full flex flex-col bg-ink text-paper overflow-x-hidden">
      {/* Section A: Hero with 3D manga panels */}
      <MangaPanelHero />

      {/* Section B: Seasonal Ticker */}
      <SeasonTicker />

      {/* Section C: Community Editorial Shelf */}
      <EditorialShelf />

      {/* Section D: Awards Feature */}
      <AwardsFeature />

      {/* Section E: Magazine Archive Feature */}
      <MagazineArchiveFeature />

      {/* Section F: Community Manifesto & Moving Footage Feature */}
      <section id="about" className="w-full py-24 bg-ink-surface border-b-2 border-ink-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Moving Night City Footage */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative w-full h-[320px] sm:h-[420px] bg-ink-card border-4 border-ink-border overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/images/assets/ocean-moon-glint-and-city-night-lights-poster.jpg"
                  className="w-full h-full object-cover"
                  aria-hidden="true"
                >
                  <source
                    src="/images/assets/ocean-moon-glint-and-city-night-lights.webm"
                    type="video/webm"
                  />
                </video>
                <div className="absolute bottom-3 left-3 bg-ink px-3 py-1 text-xs font-bold text-paper border-2 border-ink-border">
                  NIGHT OBSERVATION ARCHIVE · NASA CREW TIMELAPSE
                </div>
              </div>
              <p className="text-xs text-ash-light italic">
                &ldquo;Ocean Moon Glint and City Night Lights in 4K&rdquo; by NASA, public domain, via Wikimedia Commons.
              </p>
            </div>

            {/* Right Column: Editorial Manifesto in Bold Typography */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-display font-black text-3xl sm:text-5xl text-paper tracking-tight leading-tight">
                ROOTED IN PASSION, BUILT ON CRAFT.
              </h2>
              <p className="text-paper text-base sm:text-lg leading-relaxed">
                AnimeIndian is an open cultural collective. We are animators, localizers, critics, and students across India who refuse to treat Japanese animation as disposable digital noise.
              </p>

              {/* Three foundational pillars in large typography list */}
              <div className="space-y-4 pt-4 border-t-2 border-ink-border">
                <div className="space-y-1">
                  <h3 className="font-display font-black text-lg text-riso-pink">
                    DEMOCRATIC BALLOTING
                  </h3>
                  <p className="text-sm text-ash-light leading-relaxed">
                    One verified ballot per person. Tamper-proof Postgres constraints and sealed tallies.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-black text-lg text-riso-yellow">
                    RISOGRAPH PUBLICATION
                  </h3>
                  <p className="text-sm text-ash-light leading-relaxed">
                    OTAKU Bhaskar print and digital archive with zero algorithmic spam or clickbait.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-black text-lg text-paper">
                    REGIONAL CIRCLES
                  </h3>
                  <p className="text-sm text-ash-light leading-relaxed">
                    Grassroots meetups, sketch jams, and manga reading circles in Delhi, Mumbai, and Bengaluru.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
