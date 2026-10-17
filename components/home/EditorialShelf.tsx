import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, User } from 'lucide-react'

export function EditorialShelf() {
  return (
    <section className="w-full py-20 bg-ink border-b-2 border-ink-border" aria-label="Featured Editorial Stories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-paper tracking-tight">
              CRITICISM &amp; STORIES
            </h2>
          </div>
          <Link
            href="/magazine"
            className="inline-flex items-center gap-2 text-base font-bold text-riso-yellow hover:text-riso-pink transition-colors group"
          >
            <span>View Full Archive</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Shelf Grid: 7 cols primary feature, 5 cols supporting stories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Prominent Lead Feature (7 cols) */}
          <div className="lg:col-span-7 bg-ink-surface border-2 border-ink-border flex flex-col justify-between group hover:border-riso-pink transition-colors">
            <div className="relative w-full h-[280px] sm:h-[340px] bg-ink-card overflow-hidden">
              <Image
                src="/images/assets/vehicles-on-the-streets-of-tokyo-tokyo.jpg"
                alt="Vehicles on the Streets of Tokyo woodblock print, Utagawa Yoshitora 1870"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-ink px-3 py-1 text-sm font-bold text-riso-pink border-2 border-ink-border">
                FEATURE ESSAY
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-paper group-hover:text-riso-pink transition-colors leading-tight">
                  <Link href="/magazine/issue-01/monsoon-and-madhouse">
                    Temporal Grief and Quiet Sakuga
                  </Link>
                </h3>

                <div className="flex items-center gap-4 text-sm text-paper font-semibold">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-riso-yellow" />
                    Aarav Deshmukh
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5 text-ash-light">
                    <Clock className="w-4 h-4" />
                    7 min read
                  </span>
                </div>

                <p className="text-paper text-base leading-relaxed">
                  Why Frieren: Beyond Journey’s End struck an intimate chord across Indian cities during the monsoon. An essay on pacing, negative space, and mortality.
                </p>
              </div>

              <div className="pt-4 border-t-2 border-ink-border flex items-center justify-between">
                <span className="text-sm font-semibold text-ash-light">
                  OTAKU BHASKAR · ISSUE 1
                </span>
                <Link
                  href="/magazine/issue-01/monsoon-and-madhouse"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-paper hover:text-riso-pink transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Supporting Stories Stack (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Supporting Story 1: Interview Layout with Tokyo Tower Night Photo */}
            <div className="bg-ink-surface border-2 border-ink-border p-6 flex flex-col justify-between hover:border-riso-yellow transition-colors group">
              <div className="space-y-3">
                <div className="relative w-full h-36 bg-ink-card border-2 border-ink-border overflow-hidden mb-3">
                  <Image
                    src="/images/assets/tokyo-tower-minato-city.jpg"
                    alt="Tokyo Tower Minato City at night by David Kernan"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-ink text-riso-yellow font-bold text-xs border-2 border-ink-border">
                    Q&amp;A INTERVIEW
                  </div>
                </div>

                <h3 className="font-display font-black text-xl text-paper group-hover:text-riso-yellow transition-colors leading-snug">
                  <Link href="/magazine/issue-01/interview-dub-voice-guild">
                    Voicing the Shonen Horizon
                  </Link>
                </h3>

                <p className="text-paper text-sm leading-relaxed">
                  Inside the Mumbai and Delhi recording studios with three voice directors transforming how regional audiences experience Japanese animation.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t-2 border-ink-border flex items-center justify-between text-sm">
                <span className="text-paper font-semibold">By Pooja Nair</span>
                <Link
                  href="/magazine/issue-01/interview-dub-voice-guild"
                  className="font-bold text-riso-yellow hover:text-paper inline-flex items-center gap-1"
                >
                  <span>Read Interview</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Supporting Story 2: Review Layout */}
            <div className="bg-ink-surface border-2 border-ink-border p-6 flex flex-col justify-between hover:border-riso-pink transition-colors group">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="px-2.5 py-1 bg-ink text-riso-pink font-bold border-2 border-ink-border">
                    CRITIC REVIEW
                  </span>
                  <span className="font-bold text-riso-yellow">Score: 9.3/10</span>
                </div>

                <h3 className="font-display font-black text-xl text-paper group-hover:text-riso-pink transition-colors leading-snug">
                  <Link href="/magazine/issue-01/review-delicious-in-dungeon">
                    Delicious in Dungeon: Gastronomic Anatomy
                  </Link>
                </h3>

                <p className="text-paper text-sm leading-relaxed">
                  Studio Trigger serves an uncompromising culinary treatise on mortality, ecosystem, and appetite.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t-2 border-ink-border flex items-center justify-between text-sm">
                <span className="text-paper font-semibold">By Devansh Roy</span>
                <Link
                  href="/magazine/issue-01/review-delicious-in-dungeon"
                  className="font-bold text-riso-pink hover:text-paper inline-flex items-center gap-1"
                >
                  <span>Read Review</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
