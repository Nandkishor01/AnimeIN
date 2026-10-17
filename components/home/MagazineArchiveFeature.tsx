import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAllIssues } from '@/lib/magazine/service'
import { BookOpen, Download, ArrowRight } from 'lucide-react'

export function MagazineArchiveFeature() {
  const issues = getAllIssues()
  const [latest, ...rest] = issues

  return (
    <section className="w-full py-20 bg-ink" aria-label="Magazine Archive Preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold text-riso-yellow tracking-widest">PUBLICATION</span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-paper tracking-tight mt-2">
              OTAKU Bhaskar
            </h2>
          </div>
          <Link
            href="/magazine"
            className="inline-flex items-center gap-2 text-sm font-bold text-riso-pink hover:text-paper transition-colors group"
          >
            <span>Explore Publication Library</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Latest issue large + older issues as a strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Latest Issue — large cover with overlay info */}
          {latest && (
            <Link
              href={`/magazine/${latest.slug}`}
              className="lg:col-span-7 group relative aspect-[4/3] sm:aspect-[16/10] bg-ink-card overflow-hidden"
            >
              <Image
                src={latest.cover_image}
                alt={latest.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="text-riso-pink tracking-wider">CURRENT ISSUE</span>
                  <span className="text-ash-light">{latest.season}</span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-paper group-hover:text-riso-yellow transition-colors leading-tight">
                  Issue {latest.issue_number}: {latest.title}
                </h3>
                <p className="text-ash-light text-sm leading-relaxed max-w-md line-clamp-2">
                  {latest.description}
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-riso-pink">
                    <BookOpen className="w-4 h-4" />
                    Read Online
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-ash-light">
                    <Download className="w-3.5 h-3.5" />
                    PDF ({latest.pdf_size_mb} MB)
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Older issues — vertical list */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {rest.map((issue) => (
              <Link
                key={issue.slug}
                href={`/magazine/${issue.slug}`}
                className="group flex gap-4 items-center"
              >
                <div className="relative w-20 h-28 sm:w-24 sm:h-32 shrink-0 bg-ink-card overflow-hidden">
                  <Image
                    src={issue.cover_image}
                    alt={issue.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <span className="text-xs font-bold text-riso-pink tracking-wider">
                    ISSUE {issue.issue_number} · {issue.season}
                  </span>
                  <h3 className="font-display font-black text-base sm:text-lg text-paper group-hover:text-riso-yellow transition-colors leading-snug">
                    {issue.title}
                  </h3>
                  <p className="text-ash-light text-xs leading-relaxed line-clamp-2">
                    {issue.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-ash group-hover:text-riso-pink group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
