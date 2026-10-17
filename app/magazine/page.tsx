import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAllIssues, getLatestIssue } from '@/lib/magazine/service'
import { BookOpen, Download, ArrowRight, Calendar, FileText } from 'lucide-react'

export const metadata = {
  title: 'OTAKU Bhaskar Magazine :  Digital Publication Archive',
  description: 'Independent anime criticism, sakuga analysis, industry interviews, and cultural history from AnimeIndian.',
}

export default function MagazineArchivePage() {
  const issues = getAllIssues()
  const latest = getLatestIssue()
  const archiveIssues = issues.slice(1)

  return (
    <div className="w-full bg-ink text-paper py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Magazine Masthead */}
        <div className="border-b-4 border-ink-border pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-sm font-bold text-riso-pink">
              ANIMEINDIAN DIGITAL PUBLICATION
            </span>
            <h1 className="font-display font-black text-4xl sm:text-7xl text-paper tracking-tight leading-none">
              OTAKU BHASKAR
            </h1>
            <p className="text-ash-light text-base sm:text-lg max-w-xl">
              Art direction, long-form criticism, and localized translation records. Printed in risograph, archived online.
            </p>
          </div>
          <div className="text-xs text-ash space-y-1">
            <p>FREQUENCY: BIANNUAL</p>
            <p>FORMAT: PRINT &amp; DIGITAL MDX</p>
          </div>
        </div>

        {/* Latest Issue Hero Showcase */}
        {latest && (
          <section className="bg-ink-surface border-4 border-riso-pink p-8 sm:p-12 relative overflow-hidden" aria-label="Latest Issue Spotlight">
            <div className="absolute inset-0 screentone-pink opacity-25 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Cover Artwork */}
              <div className="lg:col-span-5 flex justify-center">
                <Link
                  href={`/magazine/${latest.slug}`}
                  className="relative w-[240px] sm:w-[300px] h-[350px] sm:h-[430px] bg-ink-card border-4 border-ink-border shadow-sharp-pink overflow-hidden block group"
                >
                  <Image
                    src={latest.cover_image}
                    alt={latest.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </Link>
              </div>

              {/* Details & Index */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-riso-pink text-paper text-xs font-black">
                    CURRENT ISSUE
                  </span>
                  <span className="text-xs font-bold text-riso-yellow flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {latest.season} ({latest.publication_date})
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-display font-black text-3xl sm:text-5xl text-paper">
                    <Link href={`/magazine/${latest.slug}`} className="hover:text-riso-pink transition-colors">
                      Issue {latest.issue_number}: {latest.title}
                    </Link>
                  </h2>
                  <p className="text-ash-light text-base leading-relaxed">
                    {latest.description}
                  </p>
                </div>

                {/* Article Highlights Preview */}
                <div className="space-y-2 pt-2 border-t-2 border-ink-border">
                  <span className="text-xs font-bold text-ash uppercase">
                    FEATURED IN THIS ISSUE
                  </span>
                  <ul className="space-y-2">
                    {latest.articles.map((art) => (
                      <li key={art.slug}>
                        <Link
                          href={`/magazine/${latest.slug}/${art.slug}`}
                          className="text-sm font-semibold text-paper hover:text-riso-pink transition-colors flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 bg-riso-yellow rounded-full shrink-0" />
                          <span className="group-hover:translate-x-1 transition-transform">{art.title}</span>
                          <span className="text-xs text-ash">({art.layout})</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    href={`/magazine/${latest.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-riso-pink text-paper font-bold text-sm hover:bg-paper hover:text-ink transition-colors border-2 border-riso-pink"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Issue Online</span>
                  </Link>
                  <a
                    href={latest.pdf_path}
                    download
                    className="inline-flex items-center gap-2 px-5 py-3.5 bg-ink text-paper font-bold text-sm hover:bg-ink-card transition-colors border-2 border-ink-border"
                  >
                    <Download className="w-4 h-4 text-riso-yellow" />
                    <span>Download PDF ({latest.pdf_size_mb} MB)</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Previous Editions Archive */}
        {archiveIssues.length > 0 && (
          <section className="space-y-8" aria-label="Previous Magazine Issues">
            <div className="border-b-2 border-ink-border pb-4">
              <h2 className="font-display font-black text-2xl sm:text-4xl text-paper">
                EARLIER EDITIONS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {archiveIssues.map((issue) => (
                <div
                  key={issue.slug}
                  className="bg-ink-surface border-2 border-ink-border p-6 flex flex-col sm:flex-row gap-6 hover:border-riso-yellow transition-colors group"
                >
                  <Link
                    href={`/magazine/${issue.slug}`}
                    className="relative w-full sm:w-[160px] h-[230px] shrink-0 bg-ink-card border-2 border-ink-border overflow-hidden block"
                  >
                    <Image
                      src={issue.cover_image}
                      alt={issue.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-riso-pink">
                        ISSUE {issue.issue_number} · {issue.season}
                      </span>
                      <h3 className="font-display font-black text-xl text-paper group-hover:text-riso-yellow transition-colors">
                        <Link href={`/magazine/${issue.slug}`}>
                          {issue.title}
                        </Link>
                      </h3>
                      <p className="text-ash-light text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {issue.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t-2 border-ink-border flex items-center gap-3">
                      <Link
                        href={`/magazine/${issue.slug}`}
                        className="text-xs font-bold text-riso-pink hover:text-paper inline-flex items-center gap-1"
                      >
                        <span>View Issue Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="text-ash">·</span>
                      <a
                        href={issue.pdf_path}
                        download
                        className="text-xs font-semibold text-ash hover:text-riso-yellow inline-flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>PDF</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
