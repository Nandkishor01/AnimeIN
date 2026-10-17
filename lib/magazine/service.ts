import { MagazineIssue, MagazineArticle } from '@/types/magazine'
import { MAGAZINE_ISSUES } from './data'

export function getAllIssues(): MagazineIssue[] {
  return MAGAZINE_ISSUES
}

export function getLatestIssue(): MagazineIssue {
  return MAGAZINE_ISSUES[0]
}

export function getIssueBySlug(slug: string): MagazineIssue | null {
  return MAGAZINE_ISSUES.find((issue) => issue.slug === slug) || null
}

export function getArticleBySlug(issueSlug: string, articleSlug: string): { issue: MagazineIssue; article: MagazineArticle } | null {
  const issue = getIssueBySlug(issueSlug)
  if (!issue) return null

  const article = issue.articles.find((art) => art.slug === articleSlug)
  if (!article) return null

  return { issue, article }
}

export function getAdjacentIssues(currentSlug: string): { prev: MagazineIssue | null; next: MagazineIssue | null } {
  const index = MAGAZINE_ISSUES.findIndex((i) => i.slug === currentSlug)
  if (index === -1) return { prev: null, next: null }

  return {
    next: index > 0 ? MAGAZINE_ISSUES[index - 1] : null,
    prev: index < MAGAZINE_ISSUES.length - 1 ? MAGAZINE_ISSUES[index + 1] : null,
  }
}
