export type ArticleLayoutType = 'editorial' | 'interview' | 'review'

export interface ArticleContributor {
  name: string
  role: string
  handle?: string
}

export interface ReviewScore {
  animation: number
  story: number
  soundtrack: number
  impact: number
  overall: number
  verdict: string
}

export interface InterviewExchange {
  speaker: string
  role?: string
  dialogue: string
}

export interface MagazineArticle {
  slug: string
  title: string
  subtitle: string
  layout: ArticleLayoutType
  read_time: string
  author: ArticleContributor
  published_at: string
  cover_image: string
  cover_caption?: string
  excerpt: string
  lead_paragraph?: string
  content?: string
  // Layout specific fields
  review_score?: ReviewScore
  interviewees?: string[]
  qna?: InterviewExchange[]
  tags: string[]
}

export interface MagazineIssue {
  slug: string
  issue_number: string
  title: string
  volume: string
  publication_date: string
  season: string
  description: string
  cover_image: string
  pdf_path: string
  pdf_size_mb: number
  editors_note: string
  articles: MagazineArticle[]
}
