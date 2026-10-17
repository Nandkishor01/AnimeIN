'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { AwardSeason, AwardCategory } from '@/types/awards'
import { useAuth } from '@/lib/auth/context'
import { Check, CheckCircle2, AlertCircle, Trophy, Disc as DiscordIcon, ArrowRight } from 'lucide-react'

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
    if (isVotedCurrent) return
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
    <div className="w-full space-y-6">
      {/* Top Banner: Voter Status & Campaign Notice */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b border-ink-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-lg text-paper">
              {season.name}
            </span>
            <span className="px-2 py-0.5 bg-riso-pink text-paper text-xs font-bold uppercase tracking-wider">
              {season.status}
            </span>
          </div>
          <p className="text-xs text-ash-light">
            Completed: <strong className="text-paper">{completedCount} of {totalCategories}</strong> categories voted
          </p>
        </div>

        <div>
          {user ? (
            <div className="flex items-center gap-2 text-xs text-paper">
              <span className="w-2 h-2 bg-riso-yellow rounded-full" />
              <span>Voter: <strong>{user.name}</strong></span>
              {user.is_mock && (
                <span className="text-[10px] bg-ink-card px-1 py-0.5 text-ash-light tracking-wider">Demo</span>
              )}
            </div>
          ) : (
            <button
              onClick={() => loginWithDiscord()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-riso-pink text-paper text-xs font-bold hover:bg-paper hover:text-ink transition-colors cursor-pointer"
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
              className={`shrink-0 px-3.5 py-2 text-xs font-bold transition-colors flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-riso-pink text-paper'
                  : isCompleted
                  ? 'text-riso-yellow'
                  : 'text-ash-light'
              }`}
            >
              {isCompleted && <Check className="w-3 h-3" />}
              <span>{cat.name}</span>
            </button>
          )
        })}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Rail: Categories List (Desktop) */}
        <aside className="hidden md:block md:col-span-4 space-y-1" aria-label="Category Navigation">
          <div className="px-1 pb-3 text-xs font-bold text-ash tracking-widest">
            {completedCount}/{totalCategories} COMPLETED
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
                className={`w-full text-left py-3 px-3 border-l-2 transition-colors flex items-center justify-between text-sm font-bold ${
                  isSelected
                    ? 'border-riso-pink text-riso-pink bg-ink-surface'
                    : isCompleted
                    ? 'border-riso-yellow/40 text-riso-yellow/80 hover:text-riso-yellow hover:border-riso-yellow/60'
                    : 'border-ink-border text-ash-light hover:text-paper hover:border-ash'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-xs text-ash w-4">
                    {idx + 1}
                  </span>
                  <span className="truncate">{cat.name}</span>
                </div>
                {isCompleted ? (
                  <Check className="w-4 h-4 text-riso-yellow shrink-0" />
                ) : null}
              </button>
            )
          })}
        </aside>

        {/* Main Area */}
        <div className="md:col-span-8 space-y-6">
          {currentCategory && (
            <>
              {/* Category Info Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-riso-pink tracking-widest">
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
                  className={`p-4 flex items-center gap-3 text-sm font-semibold ${
                    feedback.type === 'success'
                      ? 'bg-ink-surface text-riso-yellow'
                      : 'bg-ink-surface text-riso-pink'
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

              {/* Nominees Grid — artwork dominant, 2-3 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="radiogroup" aria-label={`Nominees for ${currentCategory.name}`}>
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
                      className={`relative bg-ink-card overflow-hidden cursor-pointer transition-all duration-300 group ${
                        isSelected
                          ? 'ring-2 ring-riso-pink ring-offset-2 ring-offset-ink'
                          : 'hover:ring-1 hover:ring-ash-light'
                      } ${isVotedCurrent && !isSelected ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      {/* Artwork — dominant */}
                      <div className="relative w-full aspect-[4/5] bg-ink-card overflow-hidden">
                        <Image
                          src={nominee.image_url}
                          alt={nominee.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-7 h-7 bg-riso-pink flex items-center justify-center">
                            <Check className="w-4 h-4 text-paper" />
                          </div>
                        )}
                      </div>

                      {/* Metadata — compact below artwork */}
                      <div className="p-4 space-y-1.5">
                        <h3 className="font-display font-black text-base text-paper leading-tight">
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
                      <div className="px-4 pb-4 text-xs font-bold">
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
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-ink-border">
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
                      className={`w-full sm:w-auto px-6 py-3 font-bold text-sm transition-colors flex items-center justify-center gap-2 ${
                        selectedNomineeId && !isSubmitting
                          ? 'bg-riso-pink text-paper hover:bg-paper hover:text-ink cursor-pointer'
                          : 'bg-ink-card text-ash cursor-not-allowed'
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
                      className="px-4 py-3 text-paper text-sm font-bold hover:text-riso-yellow transition-colors flex items-center gap-1"
                    >
                      <span>Next</span>
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
