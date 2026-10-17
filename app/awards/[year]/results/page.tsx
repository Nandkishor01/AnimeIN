import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getSeasonResults } from '@/lib/awards/service'
import { Trophy, Clock, Award, ArrowLeft, CheckCircle2 } from 'lucide-react'

interface ResultsPageProps {
  params: Promise<{ year: string }>
}

export async function generateMetadata({ params }: ResultsPageProps) {
  const { year } = await params
  return {
    title: `Official Results :  AnimeIndian Awards ${year}`,
    description: `Certified election results and winners for the AnimeIndian Awards ${year}.`,
  }
}

export default async function AwardsResultsPage({ params }: ResultsPageProps) {
  const { year } = await params
  const numYear = parseInt(year, 10)
  if (isNaN(numYear)) notFound()

  const data = await getSeasonResults(numYear)
  if (!data) notFound()

  const { season, is_published, categories } = data

  // Before Reveal Time / Sealed State
  if (!is_published) {
    const revealDate = new Date(season.results_published_at).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

    return (
      <div className="w-full bg-ink text-paper py-20">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <Clock className="w-10 h-10 text-riso-pink mx-auto" />
          <span className="inline-block text-xs font-bold px-3 py-1 bg-ink-surface text-riso-yellow tracking-widest">
            RESULTS SEALED
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-paper">
            {season.name} Reveal
          </h1>
          <p className="text-ash-light text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            The ballots are currently locked. Certified election results and community category winners will be revealed publicly on <strong className="text-paper">{revealDate}</strong>.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href={`/awards/${season.year}`}
              className="px-6 py-3 bg-riso-pink text-paper font-bold text-sm hover:bg-paper hover:text-ink transition-colors"
            >
              Go to Active Voting Booth
            </Link>
            <Link
              href="/awards"
              className="px-6 py-3 text-paper font-bold text-sm hover:text-riso-yellow transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Awards Hub
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Published Results Event State
  return (
    <div className="w-full bg-ink text-paper py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Results Banner Header — editorial, no heavy box */}
        <section className="relative overflow-hidden py-8">
          <div className="absolute inset-0 screentone-yellow opacity-15 pointer-events-none" />
          <div className="relative max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold bg-riso-yellow text-ink px-2.5 py-1 tracking-widest">
                CERTIFIED RESULTS
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-riso-pink">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Community Results
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl text-paper tracking-tight leading-[1.05]">
              {season.name.toUpperCase()}<br />Winners
            </h1>

            <p className="text-ash-light text-base leading-relaxed">
              Official tally of votes cast by verified Indian anime community members. Results computed and certified via database audit.
            </p>
          </div>
        </section>

        {/* Categories Results Breakdown */}
        <div className="space-y-20">
          {categories.map((category) => {
            const winner = category.nominees[0]
            const runnersUp = category.nominees.slice(1)
            const totalCategoryVotes = category.nominees.reduce(
              (acc, curr) => acc + curr.vote_count,
              0
            )

            return (
              <section key={category.category_id} className="space-y-8">
                {/* Category Header */}
                <div className="border-b border-ink-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-riso-yellow tracking-widest">
                      CATEGORY {category.category_order}
                    </span>
                    <h2 className="font-display font-black text-2xl sm:text-4xl text-paper mt-1">
                      {category.category_name}
                    </h2>
                  </div>
                  <div className="text-xs font-bold text-ash">
                    {totalCategoryVotes.toLocaleString()} ballots audited
                  </div>
                </div>

                {/* 1st Place Winner — large artwork */}
                {winner && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="relative aspect-[4/3] bg-ink-card overflow-hidden">
                      <Image
                        src={winner.nominee_image}
                        alt={winner.nominee_title}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute top-4 left-4 bg-riso-pink text-paper text-xs font-black px-3 py-1.5 flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5" />
                        WINNER
                      </div>
                    </div>

                    <div className="space-y-4">
                      <span className="text-sm font-bold text-riso-yellow">
                        {winner.nominee_subtitle}
                      </span>
                      <h3 className="font-display font-black text-2xl sm:text-4xl text-paper leading-tight">
                        {winner.nominee_title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm font-bold pt-2">
                        <span className="text-paper">
                          {winner.vote_count.toLocaleString()} certified votes
                        </span>
                        <span className="text-riso-pink">
                          {totalCategoryVotes > 0
                            ? Math.round((winner.vote_count / totalCategoryVotes) * 100)
                            : 0}% share
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Runners Up List — editorial, no heavy boxes */}
                {runnersUp.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-ash tracking-widest">
                      RUNNERS UP
                    </h4>
                    <div className="space-y-2">
                      {runnersUp.map((runner) => (
                        <div
                          key={runner.nominee_id}
                          className="flex items-center gap-4 py-3 border-b border-ink-border/40"
                        >
                          <span className="font-display font-black text-lg text-ink-border w-8 shrink-0">
                            #{runner.rank}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-display font-black text-base text-paper">
                              {runner.nominee_title}
                            </h5>
                            <span className="text-xs text-ash">{runner.nominee_subtitle}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm shrink-0">
                            <span className="text-paper font-bold">{runner.vote_count.toLocaleString()}</span>
                            <span className="text-riso-yellow text-xs">
                              {totalCategoryVotes > 0
                                ? Math.round((runner.vote_count / totalCategoryVotes) * 100)
                                : 0}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )
          })}
        </div>

        {/* Back link */}
        <div className="pt-8 border-t border-ink-border">
          <Link
            href="/awards"
            className="inline-flex items-center gap-2 text-sm font-bold text-ash-light hover:text-riso-yellow transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Awards Hub</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
