import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSeasonByYear, getCategoriesWithNominees } from '@/lib/awards/service'
import { VotingBoothClient } from '@/components/awards/VotingBoothClient'
import { Trophy, ArrowLeft, Award } from 'lucide-react'

interface PageProps {
  params: Promise<{ year: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { year } = await params
  return {
    title: `Vote :  AnimeIndian Awards ${year}`,
    description: `Cast your official ballot for the AnimeIndian Awards ${year}.`,
  }
}

export default async function AwardVotingPage({ params }: PageProps) {
  const { year } = await params
  const numYear = parseInt(year, 10)
  if (isNaN(numYear)) notFound()

  const season = await getSeasonByYear(numYear)
  if (!season) notFound()

  // If season is closed, point visitor to results
  if (season.status === 'closed' || season.status === 'archived') {
    return (
      <div className="w-full bg-ink text-paper py-20">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <div className="inline-block p-4 bg-ink-surface border-2 border-riso-yellow">
            <Trophy className="w-12 h-12 text-riso-yellow mx-auto" />
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-paper">
            Voting Closed for {season.name}
          </h1>
          <p className="text-ash-light text-base leading-relaxed">
            The voting window for this campaign has concluded. Certified community results are available in the public archive.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href={`/awards/${year}/results`}
              className="px-6 py-3 bg-riso-pink text-paper font-bold text-sm border-2 border-riso-pink hover:bg-paper hover:text-ink transition-colors inline-flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>View Certified Results</span>
            </Link>
            <Link
              href="/awards"
              className="px-6 py-3 bg-ink-surface text-paper font-bold text-sm border-2 border-ink-border hover:bg-ink-card transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Awards Hub</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const categories = await getCategoriesWithNominees(season.id)

  return (
    <div className="w-full bg-ink text-paper py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-2 text-xs font-bold text-ash">
          <Link href="/awards" className="hover:text-riso-pink transition-colors">
            Awards Hub
          </Link>
          <span>/</span>
          <span className="text-riso-pink">{season.year} Voting Booth</span>
        </div>

        <VotingBoothClient
          season={season}
          categories={categories}
        />
      </div>
    </div>
  )
}
