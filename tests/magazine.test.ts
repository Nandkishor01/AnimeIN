import { describe, it, expect } from 'vitest'
import {
  getAllIssues,
  getLatestIssue,
  getIssueBySlug,
  getArticleBySlug,
  getAdjacentIssues,
} from '@/lib/magazine/service'

describe('Magazine Service & Publication Archive', () => {
  it('returns all published magazine issues', () => {
    const issues = getAllIssues()
    expect(issues.length).toBeGreaterThanOrEqual(2)
    expect(issues[0].slug).toBe('issue-01')
  })

  it('retrieves the latest issue prominently with articles', () => {
    const latest = getLatestIssue()
    expect(latest.issue_number).toBe('01') // taste-skill-ignore
    expect(latest.articles.length).toBeGreaterThanOrEqual(3)
  })

  it('provides at least three distinct article layouts in Issue 01', () => {
    const issue01 = getIssueBySlug('issue-01')
    expect(issue01).toBeDefined()

    const layouts = issue01?.articles.map((a) => a.layout)
    expect(layouts).toContain('editorial')
    expect(layouts).toContain('interview')
    expect(layouts).toContain('review')
  })

  it('retrieves specific articles with author and layout metadata', () => {
    const essay = getArticleBySlug('issue-01', 'monsoon-and-madhouse')
    expect(essay).toBeDefined()
    expect(essay?.article.layout).toBe('editorial')
    expect(essay?.article.author.name).toBe('Aarav Deshmukh')

    const review = getArticleBySlug('issue-01', 'review-delicious-in-dungeon')
    expect(review).toBeDefined()
    expect(review?.article.layout).toBe('review')
    expect(review?.article.review_score?.overall).toBe(9.3)
  })

  it('correctly navigates adjacent issues', () => {
    const { prev, next } = getAdjacentIssues('issue-01')
    expect(prev?.slug).toBe('issue-00')
    expect(next).toBeNull()

    const navIssue00 = getAdjacentIssues('issue-00')
    expect(navIssue00.next?.slug).toBe('issue-01')
    expect(navIssue00.prev).toBeNull()
  })
})
