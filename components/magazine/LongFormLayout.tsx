import React from 'react'
import Image from 'next/image'
import { MagazineArticle, MagazineIssue } from '@/types/magazine'
import { Clock, User, Share2, Printer } from 'lucide-react'

interface LayoutProps {
  article: MagazineArticle
  issue: MagazineIssue
}

export function LongFormLayout({ article, issue }: LayoutProps) {
  return (
    <article className="max-w-4xl mx-auto space-y-12">
      {/* Article Header */}
      <header className="space-y-6">
        <div className="flex items-center gap-3 text-xs font-bold text-riso-pink">
          <span className="uppercase">ESSAY · {issue.title}</span>
          <span>·</span>
          <span className="flex items-center gap-1 text-ash-light">
            <Clock className="w-3.5 h-3.5" />
            {article.read_time}
          </span>
        </div>

        <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-paper tracking-tight leading-[1.05]">
          {article.title}
        </h1>

        <p className="text-xl sm:text-2xl text-ash-light font-medium leading-relaxed">
          {article.subtitle}
        </p>

        {/* Byline & Print Controls */}
        <div className="border-y-2 border-ink-border py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-ink-surface border-2 border-ink-border flex items-center justify-center font-bold text-riso-yellow">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-paper">{article.author.name}</span>
              <span className="text-ash">{article.author.role} {article.author.handle && `· ${article.author.handle}`}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-ash-light no-print">
            <span>{article.published_at}</span>
          </div>
        </div>
      </header>

      {/* Featured Header Artwork & Caption */}
      <div className="space-y-2">
        <div className="relative w-full h-[320px] sm:h-[460px] bg-ink-card border-4 border-ink-border overflow-hidden">
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

      {/* Lead Paragraph Statement */}
      {article.lead_paragraph && (
        <p className="text-xl sm:text-2xl font-serif text-paper leading-relaxed border-l-4 border-riso-pink pl-6 py-2 italic bg-ink-surface">
          &ldquo;{article.lead_paragraph}&rdquo;
        </p>
      )}

      {/* Body Content */}
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
                    className="font-display font-black text-2xl sm:text-3xl text-riso-yellow pt-6 pb-2"
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

      {/* Tags & Credits */}
      <footer className="border-t-2 border-ink-border pt-8 space-y-4 max-w-prose mx-auto">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-ash mr-2">TOPICS:</span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-ink-surface border-2 border-ink-border text-xs font-semibold text-paper"
            >
              #{tag}
            </span>
          ))}
        </div>
      </footer>
    </article>
  )
}
