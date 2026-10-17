import React from 'react'
import Image from 'next/image'
import { MagazineArticle, MagazineIssue } from '@/types/magazine'
import { Clock, User, Mic } from 'lucide-react'

interface LayoutProps {
  article: MagazineArticle
  issue: MagazineIssue
}

export function InterviewLayout({ article, issue }: LayoutProps) {
  return (
    <article className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-6">
        <div className="flex items-center gap-3 text-xs font-bold text-riso-yellow">
          <span className="uppercase">Q&amp;A INTERVIEW · {issue.title}</span>
          <span>·</span>
          <span className="flex items-center gap-1 text-ash-light">
            <Clock className="w-3.5 h-3.5" />
            {article.read_time}
          </span>
        </div>

        <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-paper tracking-tight leading-[1.05]">
          {article.title}
        </h1>

        <p className="text-xl sm:text-2xl text-ash-light leading-relaxed">
          {article.subtitle}
        </p>

        {/* Byline */}
        <div className="border-y-2 border-ink-border py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-ink-surface border-2 border-ink-border flex items-center justify-center font-bold text-riso-pink">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-paper">Reported by {article.author.name}</span>
              <span className="text-ash">{article.author.role}</span>
            </div>
          </div>
          <span className="text-ash-light">{article.published_at}</span>
        </div>
      </header>

      {/* Featured Artwork */}
      <div className="space-y-2">
        <div className="relative w-full h-[300px] sm:h-[420px] bg-ink-card border-4 border-ink-border overflow-hidden">
          <Image
            src={article.cover_image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        {article.cover_caption && (
          <p className="text-xs text-ash italic text-center pt-1">
            {article.cover_caption}
          </p>
        )}
      </div>

      {/* Participating Panelists Banner */}
      {article.interviewees && article.interviewees.length > 0 && (
        <div className="bg-ink-surface border-2 border-riso-yellow p-6 space-y-3">
          <span className="text-sm font-black text-riso-yellow block">
            ROUNDTABLE PARTICIPANTS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {article.interviewees.map((person, idx) => (
              <div key={idx} className="bg-ink p-3 border-2 border-ink-border text-xs font-bold text-paper">
                {person}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dialogue Exchanges (Q&A Stream) */}
      <div className="space-y-8 max-w-prose mx-auto">
        {article.qna?.map((exchange, idx) => {
          const isInterviewer = exchange.speaker.includes('Editorial')

          return (
            <div
              key={idx}
              className={`p-6 border-2 transition-colors ${
                isInterviewer
                  ? 'bg-ink border-riso-pink'
                  : 'bg-ink-surface border-ink-border'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-black uppercase ${
                    isInterviewer ? 'text-riso-pink' : 'text-riso-yellow'
                  }`}
                >
                  {exchange.speaker}
                </span>
                {exchange.role && (
                  <span className="text-xs text-ash font-medium">
                    {exchange.role}
                  </span>
                )}
              </div>

              <p className="text-base sm:text-lg text-paper leading-relaxed">
                {exchange.dialogue}
              </p>
            </div>
          )
        })}
      </div>

      {/* Tags */}
      <footer className="border-t-2 border-ink-border pt-8 max-w-prose mx-auto flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 bg-ink-surface border-2 border-ink-border text-xs font-semibold text-paper"
          >
            #{tag}
          </span>
        ))}
      </footer>
    </article>
  )
}
