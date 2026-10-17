import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getSeasons, getCategoriesWithNominees } from '@/lib/awards/service'
import { Trophy, CheckCircle2, Calendar, ArrowRight, ShieldCheck, Users } from 'lucide-react'

export const metadata = {
  title: 'AnimeIndian Awards :  Democratic Community Fandom Awards',
  description: 'Cast your vote in the annual AnimeIndian Awards. Explore categories, nominees, and voting rules.',
}

export default async function AwardsOverviewPage() {
  const seasons = await getSeasons()
  const activeSeason = seasons.find((s) => s.status === 'active') || seasons[0]
  const categories = await getCategoriesWithNominees(activeSeason.id)

  // Collect a few spotlight nominees across categories for the artwork strip
  const spotlightNominees = categories
    .flatMap((cat) => cat.nominees.map((n) => ({ ...n, category: cat.name })))
    .filter((n, i, arr) => arr.findIndex((x) => x.image_url === n.image_url) === i)
    .slice(0, 5)

  return (
    <div className="w-full bg-ink text-paper">
      {/* Header Hero — editorial, no heavy box */}
      <section className="relative w-full pt-12 pb-16 overflow-hidden">
        <div className="absolute inset-0 screentone-pink opacity-15 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-riso-pink tracking-widest">
                  {activeSeason.name}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-riso-yellow">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Voting Open
                </span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-paper tracking-tight leading-[1.05]">
                Honoring the stories<br />that defined our year.
              </h1>

              <p className="text-ash-light text-base sm:text-lg leading-relaxed max-w-xl">
                The premier community-driven honors in Indian fandom. No algorithmic inflation, no sponsored bias: just pure fan dedication verified through Discord identity.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`/awards/${activeSeason.year}`}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-riso-pink text-ink font-black text-base hover:bg-paper hover:text-ink transition-colors"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Enter Voting Booth</span>
                  <ArrowRight className="w-4 h-4" />
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

            {/* Nominee artwork strip — art-directed */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-3">
              {spotlightNominees.slice(0, 3).map((nom, i) => (
                <Link
                  key={nom.id}
                  href={`/awards/${activeSeason.year}`}
                  className={`group relative overflow-hidden bg-ink-card ${i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-[3/4]'}`}
                >
                  <Image
                    src={nom.image_url}
                    alt={nom.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-2.5">
                    <span className="block text-[10px] font-bold text-riso-yellow tracking-wider line-clamp-1">
                      {nom.category}
                    </span>
                    <span className="block text-[10px] sm:text-xs text-paper font-bold line-clamp-1">
                      {nom.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrity principles — editorial, no boxed cards */}
      <section className="w-full py-16 bg-ink-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            <div className="space-y-3">
              <ShieldCheck className="w-6 h-6 text-riso-pink" />
              <h2 className="font-display font-black text-lg text-paper">One Vote Per Category</h2>
              <p className="text-ash-light text-sm leading-relaxed">
                Every eligible voter casts exactly one ballot per category. Submissions are locked in Postgres with strict uniqueness constraints.
              </p>
            </div>
            <div className="space-y-3">
              <Users className="w-6 h-6 text-riso-yellow" />
              <h2 className="font-display font-black text-lg text-paper">Discord Verification</h2>
              <p className="text-ash-light text-sm leading-relaxed">
                Voter accounts are verified via OAuth to eliminate bots and mass vote manipulation, preserving community trust.
              </p>
            </div>
            <div className="space-y-3">
              <Calendar className="w-6 h-6 text-paper" />
              <h2 className="font-display font-black text-lg text-paper">Sealed Vote Count</h2>
              <p className="text-ash-light text-sm leading-relaxed">
                Vote tallies remain sealed until the official reveal date. Results are computed via automated server-side procedures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Categories — editorial list, not uniform grid */}
      <section className="w-full py-16 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-end justify-between border-b border-ink-border pb-4">
            <div>
              <span className="text-xs font-bold text-riso-pink tracking-widest">CATEGORIES</span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-paper mt-2">
                {activeSeason.year} Official Selection
              </h2>
            </div>
            <Link
              href={`/awards/${activeSeason.year}`}
              className="text-sm font-bold text-riso-pink hover:text-paper inline-flex items-center gap-1 shrink-0"
            >
              <span>Cast Votes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {categories.map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/awards/${activeSeason.year}`}
                className="group space-y-3"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display font-black text-3xl text-ink-border group-hover:text-riso-pink transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display font-black text-xl text-paper group-hover:text-riso-pink transition-colors leading-tight">
                      {cat.name}
                    </h3>
                  </div>
                </div>
                <p className="text-ash-light text-sm leading-relaxed pl-10">
                  {cat.description}
                </p>
                <div className="flex items-center gap-1 text-xs font-bold text-riso-pink pl-10 pt-1">
                  <span>{cat.nominees.length} nominees</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Past campaigns — subtle, not competing with active season */}
      <section className="w-full py-14 bg-ink-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-ash-light">
            Review certified results from previous award seasons.
          </span>
          <Link
            href="/awards/2025/results"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-paper text-sm font-bold hover:text-riso-yellow transition-colors"
          >
            <span>2025 Archive Results</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
