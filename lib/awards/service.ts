import { AwardSeason, AwardCategory, VoteSubmission, SeasonResults } from '@/types/awards'
import { MOCK_SEASONS, MOCK_CATEGORIES_2026, MOCK_RESULTS_2025 } from './mock-data'
import { isSupabaseConfigured, createClient } from '@/lib/supabase/client'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

// In-memory votes for development mock mode
const localVotes = new Map<string, { season_id: string; category_id: string; nominee_id: string; user_id: string; created_at: string }>()

export async function getSeasons(): Promise<AwardSeason[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_SEASONS
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('awards_seasons')
      .select('*')
      .order('year', { ascending: false })

    if (error || !data || data.length === 0) {
      return MOCK_SEASONS
    }
    return data as AwardSeason[]
  } catch {
    return MOCK_SEASONS
  }
}

export async function getSeasonByYear(year: number): Promise<AwardSeason | null> {
  const seasons = await getSeasons()
  return seasons.find((s) => s.year === year) || null
}

export async function getCategoriesWithNominees(seasonId: string): Promise<AwardCategory[]> {
  if (!isSupabaseConfigured()) {
    if (seasonId === '2026') return MOCK_CATEGORIES_2026
    return []
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data: categories, error: catError } = await supabase
      .from('awards_categories')
      .select(`
        id,
        season_id,
        name,
        slug,
        description,
        display_order,
        awards_nominees (
          id,
          category_id,
          title,
          subtitle,
          description,
          image_url,
          display_order
        )
      `)
      .eq('season_id', seasonId)
      .order('display_order', { ascending: true })

    if (catError || !categories || categories.length === 0) {
      return seasonId === '2026' ? MOCK_CATEGORIES_2026 : []
    }

    return categories.map((cat: any) => ({
      id: cat.id,
      season_id: cat.season_id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      display_order: cat.display_order,
      nominees: (cat.awards_nominees || []).sort((a: any, b: any) => a.display_order - b.display_order),
    }))
  } catch {
    return seasonId === '2026' ? MOCK_CATEGORIES_2026 : []
  }
}

export interface VoteResult {
  success: boolean
  message: string
  code?: 'UNAUTHENTICATED' | 'SEASON_CLOSED' | 'DUPLICATE_VOTE' | 'INVALID_NOMINEE' | 'SERVER_ERROR'
  vote_id?: string
}

export async function submitVote(
  submission: VoteSubmission,
  user: { id: string; email?: string; ip?: string }
): Promise<VoteResult> {
  // 1. Verify user authentication
  if (!user || !user.id) {
    return {
      success: false,
      message: 'You must authenticate via Discord to submit a vote.',
      code: 'UNAUTHENTICATED',
    }
  }

  // 2. Validate Season timing and status
  const season = (await getSeasons()).find((s) => s.id === submission.season_id)
  if (!season) {
    return {
      success: false,
      message: 'Awards campaign not found.',
      code: 'SEASON_CLOSED',
    }
  }

  if (season.status !== 'active') {
    return {
      success: false,
      message: `Voting is closed for ${season.name}.`,
      code: 'SEASON_CLOSED',
    }
  }

  const now = new Date()
  const startsAt = new Date(season.voting_starts_at)
  const endsAt = new Date(season.voting_ends_at)

  if (now < startsAt || now > endsAt) {
    return {
      success: false,
      message: 'Voting is not active at this time.',
      code: 'SEASON_CLOSED',
    }
  }

  // 3. Verify nominee belongs to target category
  const categories = await getCategoriesWithNominees(submission.season_id)
  const category = categories.find((c) => c.id === submission.category_id)
  if (!category) {
    return {
      success: false,
      message: 'Invalid awards category.',
      code: 'INVALID_NOMINEE',
    }
  }

  const nominee = category.nominees.find((n) => n.id === submission.nominee_id)
  if (!nominee) {
    return {
      success: false,
      message: 'Nominee does not belong to this category.',
      code: 'INVALID_NOMINEE',
    }
  }

  // 4. Submit to Database if Supabase is configured
  if (isSupabaseConfigured()) {
    try {
      const adminClient = createAdminClient()
      const client = adminClient || (await createServerSupabaseClient())

      const { data, error } = await client
        .from('awards_votes')
        .insert({
          season_id: submission.season_id,
          category_id: submission.category_id,
          nominee_id: submission.nominee_id,
          user_id: user.id,
          ip_hash: user.ip ? hashString(user.ip) : null,
        })
        .select('id')
        .single()

      if (error) {
        // PostgreSQL unique constraint violation code: 23505
        if (error.code === '23505' || error.message.includes('unique_user_vote_per_category_season')) {
          return {
            success: false,
            message: 'You have already submitted a vote for this category.',
            code: 'DUPLICATE_VOTE',
          }
        }
        return {
          success: false,
          message: error.message || 'Database error while registering vote.',
          code: 'SERVER_ERROR',
        }
      }

      return {
        success: true,
        message: 'Vote confirmed and recorded.',
        vote_id: data?.id,
      }
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Internal error processing vote.',
        code: 'SERVER_ERROR',
      }
    }
  }

  // Fallback in-memory vote storage for test / development fixture mode
  const voteKey = `${submission.season_id}:${submission.category_id}:${user.id}`
  if (localVotes.has(voteKey)) {
    return {
      success: false,
      message: 'You have already submitted a vote for this category.',
      code: 'DUPLICATE_VOTE',
    }
  }

  const voteId = `vote-${Date.now()}`
  localVotes.set(voteKey, {
    season_id: submission.season_id,
    category_id: submission.category_id,
    nominee_id: submission.nominee_id,
    user_id: user.id,
    created_at: new Date().toISOString(),
  })

  return {
    success: true,
    message: 'Vote confirmed and recorded.',
    vote_id: voteId,
  }
}

export async function getUserVotesForSeason(seasonId: string, userId: string): Promise<Record<string, string>> {
  if (!userId) return {}

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerSupabaseClient()
      const { data, error } = await supabase
        .from('awards_votes')
        .select('category_id, nominee_id')
        .eq('season_id', seasonId)
        .eq('user_id', userId)

      if (error || !data) return {}

      const userVotes: Record<string, string> = {}
      for (const row of data) {
        userVotes[row.category_id] = row.nominee_id
      }
      return userVotes
    } catch {
      return {}
    }
  }

  // From local mock store
  const userVotes: Record<string, string> = {}
  for (const [key, vote] of localVotes.entries()) {
    if (vote.season_id === seasonId && vote.user_id === userId) {
      userVotes[vote.category_id] = vote.nominee_id
    }
  }
  return userVotes
}

export async function getSeasonResults(year: number): Promise<SeasonResults | null> {
  const season = await getSeasonByYear(year)
  if (!season) return null

  const now = new Date()
  const publishTime = new Date(season.results_published_at)
  const isPublished = now >= publishTime

  if (!isPublished) {
    return {
      season,
      is_published: false,
      categories: [],
    }
  }

  if (year === 2025) {
    return MOCK_RESULTS_2025
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerSupabaseClient()
      const { data, error } = await supabase.rpc('get_awards_results', { p_season_id: season.id })
      if (!error && data && data.length > 0) {
        // Group by category
        const catMap = new Map<string, any>()
        for (const row of data) {
          if (!catMap.has(row.category_id)) {
            catMap.set(row.category_id, {
              category_id: row.category_id,
              category_name: row.category_name,
              category_order: row.category_order,
              nominees: [],
            })
          }
          catMap.get(row.category_id).nominees.push({
            nominee_id: row.nominee_id,
            nominee_title: row.nominee_title,
            nominee_subtitle: row.nominee_subtitle,
            nominee_image: row.nominee_image,
            vote_count: Number(row.vote_count),
            rank: Number(row.rank),
          })
        }
        return {
          season,
          is_published: true,
          categories: Array.from(catMap.values()),
        }
      }
    } catch {
      // fallback
    }
  }

  return {
    season,
    is_published: true,
    categories: [],
  }
}

function hashString(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return `hash-${Math.abs(hash)}`
}
