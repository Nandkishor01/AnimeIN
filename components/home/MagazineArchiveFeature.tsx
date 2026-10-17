import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAllIssues } from '@/lib/magazine/service'
import { BookOpen, Download, ArrowRight } from 'lucide-react'

export function MagazineArchiveFeature() {
  const issues = getAllIssues()

  return (
    <section className="w-full py-20 bg-ink border-b-2 border-ink-border" aria-label="Magazine Archive Preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-paper tracking-tight">
              OTAKU BHASKAR ARCHIVE
            </h2>
          </div>
          <Link
            href="/magazine"
            className="inline-flex items-center gap-2 text-base font-bold text-riso-pink hover:text-paper transition-colors group"
          >
            <span>Explore Publication Library</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Horizontal Issue Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {issues.map((issue) => (
            <div
              key={issue.slug}
              className="bg-ink-surface border-2 border-ink-border p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:border-riso-yellow transition-colors group"
            >
              {/* Cover Artwork */}
              <Link
                href={`/magazine/${issue.slug}`}
                className="relative w-full sm:w-[180px] h-[260px] shrink-0 bg-ink-card border-2 border-ink-border overflow-hidden block"
                aria-label={`View ${issue.title} detail`}
              >
                <Image
                  src={issue.cover_image}
                  alt={issue.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Issue Details & Actions */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-riso-pink">
                    <span>ISSUE {issue.issue_number}</span>
                    <span>·</span>
                    <span className="text-ash-light">{issue.season}</span>
                  </div>

                  <h3 className="font-display font-black text-2xl text-paper group-hover:text-riso-yellow transition-colors leading-tight">
                    <Link href={`/magazine/${issue.slug}`}>
                      {issue.title}
                    </Link>
                  </h3>

                  <p className="text-ash-light text-sm leading-relaxed line-clamp-3">
                    {issue.description}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-ink-border flex flex-wrap items-center gap-3">
                  <Link
                    href={`/magazine/${issue.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-riso-pink text-ink text-sm font-black hover:bg-paper hover:text-ink transition-colors border-2 border-riso-pink"
                  >
                    <BookOpen className="w-4 h-4 text-ink" />
                    <span>Read Issue</span>
                  </Link>
                  <a
                    href={issue.pdf_path}
                    download
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-paper text-sm font-bold hover:bg-ink-card transition-colors border-2 border-ink-border"
                  >
                    <Download className="w-4 h-4 text-riso-yellow" />
                    <span>PDF ({issue.pdf_size_mb} MB)</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
