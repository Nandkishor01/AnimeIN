import React from 'react'
import Image from 'next/image'
import { MagazineArticle, MagazineIssue } from '@/types/magazine'
import { Clock, User, Award, CheckCircle2 } from 'lucide-react'

interface LayoutProps {
  article: MagazineArticle
  issue: MagazineIssue
}

export function ReviewLayout({ article, issue }: LayoutProps) {
  const score = article.review_score

  return (
    <article className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-6">
        <div className="flex items-center gap-3 text-xs font-bold text-riso-pink">
          <span className="uppercase">CRITIC REVIEW · {issue.title}</span>
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
            <div className="w-9 h-9 bg-ink-surface border-2 border-ink-border flex items-center justify-center font-bold text-riso-yellow">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-paper">Review by {article.author.name}</span>
              <span className="text-ash">{article.author.role}</span>
            </div>
          </div>
          <span className="text-ash-light">{article.published_at}</span>
        </div>
      </header>

      {/* Featured Image */}
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

      {/* Review Scorecard Box */}
      {score && (
        <div className="bg-ink-surface border-4 border-riso-yellow p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-ink-border pb-6">
            <div>
              <span className="text-sm font-black text-riso-yellow block">
                ANIMEINDIAN CRITIC VERDICT
              </span>
              <h2 className="font-display font-black text-2xl text-paper">
                Final Evaluation
              </h2>
            </div>
            <div className="flex items-center gap-3 bg-ink px-5 py-3 border-2 border-riso-pink">
              <span className="font-display font-black text-4xl text-paper">
                {score.overall}
              </span>
              <span className="text-xs font-bold text-riso-pink uppercase">
                OVERALL / 10
              </span>
            </div>
          </div>

          {/* Subscore metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-ink p-4 border-2 border-ink-border text-center space-y-1">
              <span className="text-xs font-bold text-ash block">ANIMATION</span>
              <span className="font-display font-black text-2xl text-paper">
                {score.animation}
              </span>
            </div>
            <div className="bg-ink p-4 border-2 border-ink-border text-center space-y-1">
              <span className="text-xs font-bold text-ash block">STORY &amp; PACING</span>
              <span className="font-display font-black text-2xl text-paper">
                {score.story}
              </span>
            </div>
            <div className="bg-ink p-4 border-2 border-ink-border text-center space-y-1">
              <span className="text-xs font-bold text-ash block">SOUNDTRACK</span>
              <span className="font-display font-black text-2xl text-paper">
                {score.soundtrack}
              </span>
            </div>
            <div className="bg-ink p-4 border-2 border-ink-border text-center space-y-1">
              <span className="text-xs font-bold text-ash block">CULTURAL IMPACT</span>
              <span className="font-display font-black text-2xl text-paper">
                {score.impact}
              </span>
            </div>
          </div>

          {/* Verdict summary statement */}
          <div className="bg-ink p-4 border-2 border-ink-border flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-riso-yellow shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-paper leading-relaxed">
              {score.verdict}
            </p>
          </div>
        </div>
      )}

      {/* Review Prose Body */}
      <div className="space-y-8 text-paper text-base sm:text-lg leading-relaxed font-sans max-w-prose mx-auto">
        {article.content ? (
          article.content
            .trim()
            .split('\n\n')
            .map((block, idx) => {
              if (block.startsWith('### ')) {
                return (
                  <h2
                    key={idx}
                    className="font-display font-black text-2xl sm:text-3xl text-riso-pink pt-6 pb-2"
                  >
                    {block.replace('### ', '')}
                  </h2>
                )
              }
              return (
                <p key={idx} className="text-paper leading-relaxed">
                  {block}
                </p>
              )
            })
        ) : (
          <p>{article.excerpt}</p>
        )}
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
