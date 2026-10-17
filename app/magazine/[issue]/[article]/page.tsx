import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleBySlug } from '@/lib/magazine/service'
import { LongFormLayout } from '@/components/magazine/LongFormLayout'
import { InterviewLayout } from '@/components/magazine/InterviewLayout'
import { ReviewLayout } from '@/components/magazine/ReviewLayout'
import { ArrowLeft } from 'lucide-react'

interface ArticlePageProps {
  params: Promise<{
    issue: string
    article: string
  }>
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { issue: issueSlug, article: articleSlug } = await params
  const res = getArticleBySlug(issueSlug, articleSlug)
  if (!res) return { title: 'Article Not Found :  OTAKU Bhaskar' }

  return {
    title: `${res.article.title} :  OTAKU Bhaskar`,
    description: res.article.excerpt,
    openGraph: {
      title: res.article.title,
      description: res.article.excerpt,
      type: 'article',
      publishedTime: res.article.published_at,
    },
  }
}

export default async function MagazineArticlePage({ params }: ArticlePageProps) {
  const { issue: issueSlug, article: articleSlug } = await params
  const res = getArticleBySlug(issueSlug, articleSlug)
  if (!res) notFound()

  const { issue, article } = res

  return (
    <div className="w-full bg-ink text-paper py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-between text-xs font-bold text-ash no-print">
          <div className="flex items-center gap-2">
            <Link href="/magazine" className="hover:text-riso-pink transition-colors">
              Magazine Archive
            </Link>
            <span>/</span>
            <Link href={`/magazine/${issue.slug}`} className="hover:text-riso-yellow transition-colors">
              Issue {issue.issue_number}
            </Link>
            <span>/</span>
            <span className="text-paper truncate max-w-[200px] sm:max-w-none">
              {article.title}
            </span>
          </div>

          <Link
            href={`/magazine/${issue.slug}`}
            className="inline-flex items-center gap-1.5 text-riso-pink hover:text-paper transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Issue</span>
          </Link>
        </div>

        {/* Dynamic Article Layout Selection */}
        {article.layout === 'editorial' && (
          <LongFormLayout article={article} issue={issue} />
        )}
        {article.layout === 'interview' && (
          <InterviewLayout article={article} issue={issue} />
        )}
        {article.layout === 'review' && (
          <ReviewLayout article={article} issue={issue} />
        )}

        {/* Article Footer Navigation */}
        <div className="border-t-2 border-ink-border pt-12 text-center no-print">
          <Link
            href={`/magazine/${issue.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-ink-surface border-2 border-ink-border text-paper font-bold text-sm hover:bg-ink-card transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-riso-pink" />
            <span>Return to Issue {issue.issue_number}: {issue.title} Contents</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
