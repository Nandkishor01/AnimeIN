export type SeasonStatus = 'draft' | 'active' | 'closed' | 'archived'

export interface AwardSeason {
  id: string
  name: string
  year: number
  status: SeasonStatus
  voting_starts_at: string
  voting_ends_at: string
  results_published_at: string
  created_at?: string
}

export interface AwardNominee {
  id: string
  category_id: string
  title: string
  subtitle: string
  description: string
  image_url: string
  display_order: number
}

export interface AwardCategory {
  id: string
  season_id: string
  name: string
  slug: string
  description: string
  display_order: number
  nominees: AwardNominee[]
}

export interface VoteSubmission {
  season_id: string
  category_id: string
  nominee_id: string
}

export interface VoteRecord {
  id: string
  season_id: string
  category_id: string
  nominee_id: string
  user_id: string
  created_at: string
}

export interface NomineeResult {
  nominee_id: string
  nominee_title: string
  nominee_subtitle: string
  nominee_image: string
  vote_count: number
  rank: number
}

export interface CategoryResult {
  category_id: string
  category_name: string
  category_order: number
  nominees: NomineeResult[]
}

export interface SeasonResults {
  season: AwardSeason
  is_published: boolean
  categories: CategoryResult[]
}
