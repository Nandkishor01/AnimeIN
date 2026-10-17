import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getIssueBySlug, getAdjacentIssues } from '@/lib/magazine/service'
import { BookOpen, Download, ArrowLeft, ArrowRight, User, Clock, FileText } from 'lucide-react'

interface IssuePageProps {
  params: Promise<{ issue: string }>
}

export async function generateMetadata({ params }: IssuePageProps) {
  const { issue: issueSlug } = await params
  const issue = getIssueBySlug(issueSlug)
  if (!issue) return { title: 'Issue Not Found :  OTAKU Bhaskar' }

  return {
    title: `Issue ${issue.issue_number}: ${issue.title} :  OTAKU Bhaskar`,
    description: issue.description,
  }
}

export default async function MagazineIssuePage({ params }: IssuePageProps) {
  const { issue: issueSlug } = await params
  const issue = getIssueBySlug(issueSlug)
  if (!issue) notFound()

  const { prev, next } = getAdjacentIssues(issue.slug)

  return (
    <div className="w-full bg-ink text-paper py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-bold text-ash">
          <Link href="/magazine" className="hover:text-riso-pink transition-colors">
            Magazine Archive
          </Link>
          <span>/</span>
          <span className="text-riso-pink">Issue {issue.issue_number}</span>
        </div>

        {/* Issue Masthead & Cover Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Large Cover Image & PDF action */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative w-full max-w-[380px] mx-auto h-[480px] sm:h-[540px] bg-ink-card border-4 border-ink-border overflow-hidden">
              <Image
                src={issue.cover_image}
                alt={issue.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="max-w-[380px] mx-auto space-y-3">
              <a
                href={issue.pdf_path}
                download
                className="w-full py-3.5 bg-riso-pink text-paper font-bold text-sm flex items-center justify-center gap-2 border-2 border-riso-pink hover:bg-paper hover:text-ink transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Complete Issue PDF ({issue.pdf_size_mb} MB)</span>
              </a>
              <p className="text-xs text-ash text-center">
                Formatted for print in A4 risograph standard. High resolution.
              </p>
            </div>
          </div>

          {/* Right Column: Title, Metadata, Editor's Note */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-riso-yellow text-ink text-xs font-black">
                  ISSUE {issue.issue_number}
                </span>
                <span className="text-xs font-bold text-ash-light">
                  {issue.volume} · {issue.season} ({issue.publication_date})
                </span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-6xl text-paper tracking-tight leading-tight">
                {issue.title}
              </h1>

              <p className="text-ash-light text-lg leading-relaxed">
                {issue.description}
              </p>
            </div>

            {/* Editorial Introduction / Editor's Note */}
            <div className="bg-ink-surface border-2 border-ink-border p-6 sm:p-8 space-y-3">
              <h2 className="font-display font-black text-xl text-riso-yellow">
                EDITORIAL NOTE
              </h2>
              <p className="text-paper text-sm sm:text-base leading-relaxed italic">
                &ldquo;{issue.editors_note}&rdquo;
              </p>
              <div className="pt-2 text-xs font-bold text-ash">
                :  AnimeIndian Editorial Guild
              </div>
            </div>

            {/* Table of Contents & Featured Articles */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between border-b-2 border-ink-border pb-2">
                <h2 className="font-display font-black text-2xl text-paper">
                  TABLE OF CONTENTS
                </h2>
                <span className="text-xs font-bold text-ash">
                  {issue.articles.length} ARTICLES
                </span>
              </div>

              <div className="space-y-4">
                {issue.articles.map((article, idx) => (
                  <div
                    key={article.slug}
                    className="bg-ink-surface border-2 border-ink-border p-5 hover:border-riso-pink transition-colors group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3 text-xs text-ash">
                          <span className="font-bold text-riso-pink uppercase">
                            {article.layout}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {article.read_time}
                          </span>
                          <span>·</span>
                          <span>By {article.author.name}</span>
                        </div>

                        <h3 className="font-display font-black text-xl text-paper group-hover:text-riso-pink transition-colors">
                          <Link href={`/magazine/${issue.slug}/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>

                        <p className="text-xs sm:text-sm text-ash-light line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>

                      <Link
                        href={`/magazine/${issue.slug}/${article.slug}`}
                        className="px-4 py-2 bg-ink border-2 border-ink-border text-paper text-xs font-bold hover:bg-riso-pink hover:text-paper hover:border-riso-pink transition-colors shrink-0 flex items-center gap-1.5 self-start"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Adjacent Issues Navigation */}
        <div className="border-t-2 border-ink-border pt-8 flex items-center justify-between">
          {prev ? (
            <Link
              href={`/magazine/${prev.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-ash-light hover:text-riso-yellow transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Issue: {prev.title}</span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/magazine/${next.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-ash-light hover:text-riso-pink transition-colors"
            >
              <span>Next Issue: {next.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
