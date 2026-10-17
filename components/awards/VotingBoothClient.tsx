'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { AwardSeason, AwardCategory } from '@/types/awards'
import { useAuth } from '@/lib/auth/context'
import { Check, CheckCircle2, AlertCircle, Trophy, Disc as DiscordIcon, ArrowRight, ShieldAlert } from 'lucide-react'

interface VotingBoothClientProps {
  season: AwardSeason
  categories: AwardCategory[]
  initialUserVotes?: Record<string, string>
}

export function VotingBoothClient({
  season,
  categories,
  initialUserVotes = {},
}: VotingBoothClientProps) {
  const { user, loginWithDiscord, isConfigured } = useAuth()
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
  const [selectedNomineeId, setSelectedNomineeId] = useState<string | null>(null)
  const [userVotes, setUserVotes] = useState<Record<string, string>>(initialUserVotes)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const currentCategory = categories[selectedCategoryIndex]
  const isVotedCurrent = currentCategory ? Boolean(userVotes[currentCategory.id]) : false
  const activeNomineeId = isVotedCurrent ? userVotes[currentCategory.id] : selectedNomineeId

  const handleSelectNominee = (nomineeId: string) => {
    if (isVotedCurrent) return // already voted
    setSelectedNomineeId(nomineeId)
    setFeedback(null)
  }

  const handleSubmitVote = async () => {
    if (!currentCategory || !selectedNomineeId) return

    if (!user) {
      setFeedback({
        type: 'error',
        message: 'You must authenticate via Discord before casting a vote.',
      })
      return
    }

    setIsSubmitting(true)
    setFeedback(null)

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          season_id: season.id,
          category_id: currentCategory.id,
          nominee_id: selectedNomineeId,
          dev_user_id: user.id,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        setFeedback({
          type: 'error',
          message: data.message || 'Failed to submit vote.',
        })
        return
      }

      // Backend confirmed vote
      setUserVotes((prev) => ({
        ...prev,
        [currentCategory.id]: selectedNomineeId,
      }))
      setSelectedNomineeId(null)
      setFeedback({
        type: 'success',
        message: 'Vote confirmed and recorded on the database.',
      })
    } catch {
      setFeedback({
        type: 'error',
        message: 'Network error communicating with the voting server.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalCategories = categories.length
  const completedCount = Object.keys(userVotes).length

  return (
    <div className="w-full space-y-8">
      {/* Top Banner: Voter Status & Campaign Notice */}
      <div className="bg-ink-surface border-2 border-ink-border p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-xl text-paper">
              {season.name} Ballot
            </span>
            <span className="px-2 py-0.5 bg-riso-pink text-paper text-xs font-bold uppercase">
              {season.status}
            </span>
          </div>
          <p className="text-xs text-ash-light">
            Completed: <strong>{completedCount} of {totalCategories}</strong> categories voted.
          </p>
        </div>

        <div>
          {user ? (
            <div className="flex items-center gap-2 text-xs bg-ink px-3 py-1.5 border-2 border-ink-border text-paper">
              <span className="w-2 h-2 bg-riso-yellow rounded-full" />
              <span>Voter: <strong>{user.name}</strong></span>
            </div>
          ) : (
            <button
              onClick={() => loginWithDiscord()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-riso-pink text-paper text-xs font-bold hover:bg-paper hover:text-ink transition-colors cursor-pointer border-2 border-riso-pink"
            >
              <DiscordIcon className="w-3.5 h-3.5" />
              <span>{isConfigured ? 'Sign in with Discord to Vote' : 'Simulate Voter Login (Demo)'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Category Chips (Horizontal Scroll) */}
      <div className="md:hidden overflow-x-auto pb-2 flex items-center gap-2 no-scrollbar" aria-label="Category Selection Mobile">
        {categories.map((cat, idx) => {
          const isSelected = idx === selectedCategoryIndex
          const isCompleted = Boolean(userVotes[cat.id])
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategoryIndex(idx)
                setSelectedNomineeId(null)
                setFeedback(null)
              }}
              className={`shrink-0 px-3.5 py-2 text-xs font-bold border-2 transition-colors flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-riso-pink text-paper border-riso-pink'
                  : isCompleted
                  ? 'bg-ink-surface text-riso-yellow border-riso-yellow'
                  : 'bg-ink-surface text-ash-light border-ink-border'
              }`}
            >
              {isCompleted && <Check className="w-3 h-3" />}
              <span>{cat.name}</span>
            </button>
          )
        })}
      </div>

      {/* Main Two-Column Editorial Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Rail: Categories List (Desktop) */}
        <aside className="hidden md:block md:col-span-4 bg-ink-surface border-2 border-ink-border p-4 space-y-2" aria-label="Category Navigation">
          <div className="px-3 py-2 text-xs font-bold text-ash border-b-2 border-ink-border mb-2">
            CATEGORIES ({completedCount}/{totalCategories} COMPLETED)
          </div>
          {categories.map((cat, idx) => {
            const isSelected = idx === selectedCategoryIndex
            const isCompleted = Boolean(userVotes[cat.id])
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategoryIndex(idx)
                  setSelectedNomineeId(null)
                  setFeedback(null)
                }}
                className={`w-full text-left px-4 py-3 border-2 transition-colors flex items-center justify-between text-sm font-bold ${
                  isSelected
                    ? 'bg-ink border-riso-pink text-riso-pink'
                    : isCompleted
                    ? 'bg-ink border-ink-border text-riso-yellow hover:border-riso-yellow'
                    : 'bg-ink-surface border-ink-border text-ash-light hover:text-paper hover:border-ash'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="w-5 text-xs text-ash">
                    {(idx + 1).toString().padStart(2, ' ')}.
                  </span>
                  <span className="truncate">{cat.name}</span>
                </div>
                {isCompleted ? (
                  <span className="px-1.5 py-0.5 text-xs bg-riso-yellow text-ink font-black">
                    VOTED
                  </span>
                ) : isSelected ? (
                  <span className="w-2 h-2 bg-riso-pink rounded-full shrink-0" />
                ) : null}
              </button>
            )
          })}
        </aside>

        {/* Main Area: Category Title, Nominees, Selection State & Actions */}
        <div className="md:col-span-8 space-y-6">
          {currentCategory && (
            <>
              {/* Category Info Header */}
              <div className="bg-ink-surface border-2 border-ink-border p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-riso-pink">
                    CATEGORY {selectedCategoryIndex + 1} OF {totalCategories}
                  </span>
                  {isVotedCurrent && (
                    <span className="text-xs font-bold text-riso-yellow flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Vote Recorded
                    </span>
                  )}
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-paper">
                  {currentCategory.name}
                </h2>
                <p className="text-sm text-ash-light leading-relaxed">
                  {currentCategory.description}
                </p>
              </div>

              {/* Feedback messages */}
              {feedback && (
                <div
                  className={`p-4 border-2 flex items-center gap-3 text-sm font-semibold ${
                    feedback.type === 'success'
                      ? 'bg-ink border-riso-yellow text-riso-yellow'
                      : 'bg-ink border-riso-pink text-riso-pink'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}

              {/* Nominees Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" role="radiogroup" aria-label={`Nominees for ${currentCategory.name}`}>
                {currentCategory.nominees.map((nominee) => {
                  const isSelected = activeNomineeId === nominee.id
                  return (
                    <div
                      key={nominee.id}
                      onClick={() => handleSelectNominee(nominee.id)}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={isVotedCurrent ? -1 : 0}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault()
                          handleSelectNominee(nominee.id)
                        }
                      }}
                      className={`relative bg-ink-surface border-4 transition-colors p-5 flex flex-col justify-between space-y-4 cursor-pointer focus:outline-none ${
                        isSelected
                          ? 'border-riso-pink bg-ink'
                          : 'border-ink-border hover:border-ash-light'
                      } ${isVotedCurrent && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {/* Selection Badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ash">
                          NOMINEE #{nominee.display_order}
                        </span>
                        <div
                          className={`w-6 h-6 border-2 flex items-center justify-center font-bold text-xs ${
                            isSelected
                              ? 'bg-riso-pink border-riso-pink text-paper'
                              : 'border-ink-border bg-ink'
                          }`}
                        >
                          {isSelected && <Check className="w-4 h-4" />}
                        </div>
                      </div>

                      {/* Artwork */}
                      <div className="relative w-full h-44 bg-ink-card border-2 border-ink-border overflow-hidden">
                        <Image
                          src={nominee.image_url}
                          alt={nominee.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Metadata */}
                      <div className="space-y-1">
                        <h3 className="font-display font-black text-lg text-paper leading-tight">
                          {nominee.title}
                        </h3>
                        <p className="text-xs font-bold text-riso-yellow">
                          {nominee.subtitle}
                        </p>
                        <p className="text-xs text-ash-light leading-relaxed pt-1">
                          {nominee.description}
                        </p>
                      </div>

                      {/* Vote state indicator */}
                      <div className="pt-2 text-xs font-bold">
                        {isVotedCurrent && isSelected ? (
                          <span className="text-riso-yellow flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed Choice
                          </span>
                        ) : isSelected ? (
                          <span className="text-riso-pink">
                            Selected · Ready to Submit
                          </span>
                        ) : (
                          <span className="text-ash">Click to Select</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Action Bar */}
              <div className="bg-ink-surface border-2 border-ink-border p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-ash-light">
                  {isVotedCurrent ? (
                    <span className="text-riso-yellow font-bold">
                      Your vote for this category has been submitted and sealed.
                    </span>
                  ) : selectedNomineeId ? (
                    <span>Ready to submit your vote for this category.</span>
                  ) : (
                    <span>Select one nominee above to submit your ballot.</span>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {!isVotedCurrent && (
                    <button
                      onClick={handleSubmitVote}
                      disabled={!selectedNomineeId || isSubmitting}
                      className={`w-full sm:w-auto px-6 py-3 font-bold text-sm border-2 transition-colors flex items-center justify-center gap-2 ${
                        selectedNomineeId && !isSubmitting
                          ? 'bg-riso-pink border-riso-pink text-paper hover:bg-paper hover:text-ink cursor-pointer'
                          : 'bg-ink border-ink-border text-ash cursor-not-allowed'
                      }`}
                    >
                      <Trophy className="w-4 h-4" />
                      <span>{isSubmitting ? 'Recording Vote...' : 'Confirm & Cast Vote'}</span>
                    </button>
                  )}

                  {selectedCategoryIndex < totalCategories - 1 && (
                    <button
                      onClick={() => {
                        setSelectedCategoryIndex((prev) => prev + 1)
                        setSelectedNomineeId(null)
                        setFeedback(null)
                      }}
                      className="px-4 py-3 bg-ink border-2 border-ink-border text-paper text-sm font-bold hover:bg-ink-card transition-colors flex items-center gap-1"
                    >
                      <span>Next Category</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
