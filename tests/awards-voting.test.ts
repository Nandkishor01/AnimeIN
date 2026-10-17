import { describe, it, expect } from 'vitest'
import {
  submitVote,
  getSeasons,
  getSeasonByYear,
  getCategoriesWithNominees,
  getSeasonResults,
} from '@/lib/awards/service'

describe('Awards & Voting Service — Security & Business Logic', () => {
  it('rejects vote submissions from unauthenticated users', async () => {
    const result = await submitVote(
      {
        season_id: '2026',
        category_id: 'cat-aoty-2026',
        nominee_id: 'nom-frieren-2026',
      },
      null as any
    )

    expect(result.success).toBe(false)
    expect(result.code).toBe('UNAUTHENTICATED')
  })

  it('allows an eligible user to cast a valid vote in an active season', async () => {
    const testUser = { id: `test-voter-${Date.now()}` }

    const result = await submitVote(
      {
        season_id: '2026',
        category_id: 'cat-aoty-2026',
        nominee_id: 'nom-frieren-2026',
      },
      testUser
    )

    expect(result.success).toBe(true)
    expect(result.message).toContain('confirmed and recorded')
    expect(result.vote_id).toBeDefined()
  })

  it('rejects duplicate votes from the same user in the same category', async () => {
    const testUser = { id: `test-dup-voter-${Date.now()}` }

    // First vote - should succeed
    const firstVote = await submitVote(
      {
        season_id: '2026',
        category_id: 'cat-anim-2026',
        nominee_id: 'nom-anim-frieren',
      },
      testUser
    )
    expect(firstVote.success).toBe(true)

    // Second vote in same category - must be rejected
    const secondVote = await submitVote(
      {
        season_id: '2026',
        category_id: 'cat-anim-2026',
        nominee_id: 'nom-anim-jujutsu',
      },
      testUser
    )
    expect(secondVote.success).toBe(false)
    expect(secondVote.code).toBe('DUPLICATE_VOTE')
  })

  it('rejects votes for closed awards seasons', async () => {
    const testUser = { id: `test-voter-closed-${Date.now()}` }

    const result = await submitVote(
      {
        season_id: '2025',
        category_id: 'cat-aoty-2025',
        nominee_id: 'nom-vinland-2',
      },
      testUser
    )

    expect(result.success).toBe(false)
    expect(result.code).toBe('SEASON_CLOSED')
  })

  it('rejects votes for invalid nominees that do not belong to the category', async () => {
    const testUser = { id: `test-voter-invalid-${Date.now()}` }

    const result = await submitVote(
      {
        season_id: '2026',
        category_id: 'cat-aoty-2026',
        nominee_id: 'non-existent-nominee-id',
      },
      testUser
    )

    expect(result.success).toBe(false)
    expect(result.code).toBe('INVALID_NOMINEE')
  })

  it('seals results before the official publication time', async () => {
    // 2026 season results are published in December 2026 (future)
    const results2026 = await getSeasonResults(2026)
    expect(results2026).toBeDefined()
    expect(results2026?.is_published).toBe(false)
    expect(results2026?.categories.length).toBe(0)
  })

  it('exposes certified results for published historical seasons', async () => {
    // 2025 season results are already published
    const results2025 = await getSeasonResults(2025)
    expect(results2025).toBeDefined()
    expect(results2025?.is_published).toBe(true)
    expect(results2025?.categories.length).toBeGreaterThan(0)

    const aotyCategory = results2025?.categories.find(
      (c) => c.category_name === 'Anime of the Year'
    )
    expect(aotyCategory).toBeDefined()
    expect(aotyCategory?.nominees[0].rank).toBe(1)
  })
})
