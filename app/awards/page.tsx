import React from 'react'
import Link from 'next/link'
import { getSeasons, getCategoriesWithNominees } from '@/lib/awards/service'
import { Trophy, CheckCircle2, ShieldCheck, Calendar, ArrowRight, Award } from 'lucide-react'

export const metadata = {
  title: 'AnimeIndian Awards :  Democratic Community Fandom Awards',
  description: 'Cast your vote in the annual AnimeIndian Awards. Explore categories, nominees, and voting rules.',
}

export default async function AwardsOverviewPage() {
  const seasons = await getSeasons()
  const activeSeason = seasons.find((s) => s.status === 'active') || seasons[0]
  const categories = await getCategoriesWithNominees(activeSeason.id)

  return (
    <div className="w-full bg-ink text-paper py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero */}
        <div className="bg-ink-surface border-4 border-riso-pink p-8 sm:p-12 space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 screentone-pink opacity-25 pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-riso-pink text-paper text-xs font-black">
                {activeSeason.name}
              </span>
              <span className="text-xs font-bold text-riso-yellow flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Public Voting Open
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl text-paper tracking-tight leading-tight">
              HONORING THE STORIES THAT DEFINED OUR YEAR.
            </h1>

            <p className="text-ash-light text-base sm:text-lg leading-relaxed">
              The AnimeIndian Awards are the premier community-driven honors in Indian fandom. No algorithmic inflation, no sponsored bias: just pure fan dedication verified through Discord identity.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={`/awards/${activeSeason.year}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-riso-pink text-paper font-bold text-base hover:bg-paper hover:text-ink transition-colors border-2 border-riso-pink"
              >
                <Trophy className="w-5 h-5" />
                <span>Enter Voting Booth ({activeSeason.year})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/awards/2025/results"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-ink text-paper font-bold text-sm hover:bg-ink-card transition-colors border-2 border-ink-border"
              >
                <Award className="w-4 h-4 text-riso-yellow" />
                <span>View 2025 Results</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Voting Rules & Integrity Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-ink-surface p-6 border-2 border-ink-border space-y-3">
            <ShieldCheck className="w-6 h-6 text-riso-pink" />
            <h2 className="font-display font-black text-xl text-paper">One Vote Per Category</h2>
            <p className="text-ash-light text-sm leading-relaxed">
              Every eligible voter can cast exactly one ballot per category. Submissions are cryptographically locked in Postgres with strict uniqueness constraints.
            </p>
          </div>
          <div className="bg-ink-surface p-6 border-2 border-ink-border space-y-3">
            <Trophy className="w-6 h-6 text-riso-yellow" />
            <h2 className="font-display font-black text-xl text-paper">Discord Verification</h2>
            <p className="text-ash-light text-sm leading-relaxed">
              Voter accounts are verified via OAuth to eliminate bots and mass vote manipulation, preserving community trust and legitimacy.
            </p>
          </div>
          <div className="bg-ink-surface p-6 border-2 border-ink-border space-y-3">
            <Calendar className="w-6 h-6 text-paper" />
            <h2 className="font-display font-black text-xl text-paper">Sealed Vote Count</h2>
            <p className="text-ash-light text-sm leading-relaxed">
              Vote tallies remain securely sealed until the official reveal date. Results are computed via automated server-side procedures.
            </p>
          </div>
        </div>

        {/* Active Categories List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-ink-border pb-4">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-paper">
              {activeSeason.year} Official Categories ({categories.length})
            </h2>
            <Link
              href={`/awards/${activeSeason.year}`}
              className="text-sm font-bold text-riso-pink hover:text-paper inline-flex items-center gap-1"
            >
              <span>Cast Votes Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div
                key={cat.id}
                className="bg-ink-surface border-2 border-ink-border p-6 space-y-3 hover:border-riso-yellow transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-riso-yellow">
                    CATEGORY {idx + 1}
                  </span>
                  <span className="text-xs text-ash">
                    {cat.nominees.length} Nominees
                  </span>
                </div>
                <h3 className="font-display font-black text-xl text-paper">
                  {cat.name}
                </h3>
                <p className="text-ash-light text-sm leading-relaxed">
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Historical Campaigns Archive */}
        <div className="bg-ink-surface p-8 border-2 border-ink-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-display font-black text-xl text-paper">
              Explore Past Campaigns
            </h3>
            <p className="text-ash-light text-sm">
              Review certified election records and winners from previous AnimeIndian award seasons.
            </p>
          </div>
          <Link
            href="/awards/2025/results"
            className="px-5 py-2.5 bg-ink border-2 border-ink-border text-paper text-sm font-bold hover:bg-ink-card transition-colors shrink-0"
          >
            <span>View 2025 Archive Results</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
