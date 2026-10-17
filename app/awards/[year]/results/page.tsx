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
          <div className="inline-block p-4 bg-ink-surface border-2 border-riso-pink">
            <Clock className="w-12 h-12 text-riso-pink mx-auto" />
          </div>
          <span className="inline-block text-xs font-bold px-3 py-1 bg-ink-surface text-riso-yellow border-2 border-ink-border uppercase">
            RESULTS SEALED
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-paper">
            {season.name} Reveal
          </h1>
          <p className="text-ash-light text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            The ballots are currently locked. Certified election results and community category winners will be revealed publicly on <strong>{revealDate}</strong>.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href={`/awards/${season.year}`}
              className="px-6 py-3 bg-riso-pink text-paper font-bold text-sm border-2 border-riso-pink hover:bg-paper hover:text-ink transition-colors"
            >
              <span>Go to Active Voting Booth</span>
            </Link>
            <Link
              href="/awards"
              className="px-6 py-3 bg-ink-surface text-paper font-bold text-sm border-2 border-ink-border hover:bg-ink-card transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Awards Hub</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Published Results Event State
  return (
    <div className="w-full bg-ink text-paper py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Results Banner Header */}
        <div className="bg-ink-surface border-4 border-riso-yellow p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 screentone-yellow opacity-25 pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-riso-yellow text-ink text-xs font-black">
                CERTIFIED ELECTION RECORDS
              </span>
              <span className="text-xs font-bold text-riso-pink flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Community Results
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl text-paper tracking-tight leading-tight">
              {season.name.toUpperCase()} WINNERS
            </h1>

            <p className="text-ash-light text-base leading-relaxed">
              Official tally of votes cast by verified Indian anime community members. Results computed and certified via database audit.
            </p>
          </div>
        </div>

        {/* Categories Results Breakdown */}
        <div className="space-y-16">
          {categories.map((category) => {
            const winner = category.nominees[0]
            const runnersUp = category.nominees.slice(1)
            const totalCategoryVotes = category.nominees.reduce(
              (acc, curr) => acc + curr.vote_count,
              0
            )

            return (
              <section
                key={category.category_id}
                className="bg-ink-surface border-2 border-ink-border p-6 sm:p-10 space-y-8"
              >
                {/* Category Header */}
                <div className="border-b-2 border-ink-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-riso-yellow uppercase">
                      CATEGORY {category.category_order}
                    </span>
                    <h2 className="font-display font-black text-2xl sm:text-4xl text-paper">
                      {category.category_name}
                    </h2>
                  </div>
                  <div className="text-xs font-bold text-ash">
                    Total Ballots Audited: <strong>{totalCategoryVotes.toLocaleString()}</strong>
                  </div>
                </div>

                {/* 1st Place Winner Highlight Card */}
                {winner && (
                  <div className="bg-ink border-4 border-riso-pink p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden">
                    <div className="relative w-full lg:w-[320px] h-[220px] bg-ink-card border-2 border-ink-border overflow-hidden shrink-0">
                      <Image
                        src={winner.nominee_image}
                        alt={winner.nominee_title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-riso-pink text-paper text-xs font-black px-2.5 py-1 flex items-center gap-1.5 border-2 border-ink">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>WINNER · 1ST PLACE</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-3 text-center lg:text-left">
                      <span className="text-xs font-bold text-riso-yellow">
                        {winner.nominee_subtitle}
                      </span>
                      <h3 className="font-display font-black text-2xl sm:text-4xl text-paper">
                        {winner.nominee_title}
                      </h3>
                      <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm font-bold text-ash-light">
                        <span className="px-3 py-1 bg-ink-surface border-2 border-ink-border text-paper">
                          {winner.vote_count.toLocaleString()} Certified Votes
                        </span>
                        <span className="text-riso-pink">
                          {totalCategoryVotes > 0
                            ? Math.round((winner.vote_count / totalCategoryVotes) * 100)
                            : 0}
                          % Share of Vote
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Runners Up List */}
                {runnersUp.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-ash uppercase">
                      RUNNERS UP
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {runnersUp.map((runner) => (
                        <div
                          key={runner.nominee_id}
                          className="bg-ink border-2 border-ink-border p-4 flex items-center gap-4"
                        >
                          <div className="w-8 h-8 bg-ink-surface border-2 border-ink-border flex items-center justify-center font-display font-black text-sm text-ash shrink-0">
                            #{runner.rank}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-display font-black text-sm text-paper truncate">
                              {runner.nominee_title}
                            </h5>
                            <div className="flex items-center gap-2 text-xs text-ash">
                              <span>{runner.vote_count.toLocaleString()} votes</span>
                              <span>·</span>
                              <span className="text-riso-yellow">
                                {totalCategoryVotes > 0
                                  ? Math.round((runner.vote_count / totalCategoryVotes) * 100)
                                  : 0}
                                %
                              </span>
                            </div>
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
      </div>
    </div>
  )
}
