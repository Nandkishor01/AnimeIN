import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, User } from 'lucide-react'

export function EditorialShelf() {
  return (
    <section className="w-full py-20 bg-ink" aria-label="Featured Editorial Stories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold text-riso-pink tracking-widest">FROM THE MAGAZINE</span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-paper tracking-tight mt-2">
              Criticism &amp; Stories
            </h2>
          </div>
          <Link
            href="/magazine"
            className="inline-flex items-center gap-2 text-sm font-bold text-riso-yellow hover:text-riso-pink transition-colors group"
          >
            <span>View Full Archive</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Shelf Grid: 7 cols primary feature, 5 cols supporting stories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Prominent Lead Feature (7 cols) */}
          <div className="lg:col-span-7 group">
            <Link href="/magazine/issue-01/monsoon-and-madhouse" className="block">
              <div className="relative w-full h-[280px] sm:h-[380px] bg-ink-card overflow-hidden">
                <Image
                  src="/images/assets/vehicles-on-the-streets-of-tokyo-tokyo.jpg"
                  alt="Vehicles on the Streets of Tokyo woodblock print, Utagawa Yoshitora 1870"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold text-riso-pink tracking-widest">FEATURE ESSAY</span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 space-y-3">
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-paper group-hover:text-riso-pink transition-colors leading-tight">
                    Temporal Grief and Quiet Sakuga
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-paper/80 font-medium">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-riso-yellow" />
                      Aarav Deshmukh
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      7 min read
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <p className="text-ash-light text-base leading-relaxed mt-4 max-w-lg">
              Why Frieren: Beyond Journey&apos;s End struck an intimate chord across Indian cities during the monsoon. An essay on pacing, negative space, and mortality.
            </p>
          </div>

          {/* Supporting Stories Stack (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Supporting Story 1: Interview */}
            <Link href="/magazine/issue-01/interview-dub-voice-guild" className="group flex gap-4">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 bg-ink-card overflow-hidden">
                <Image
                  src="/images/assets/tokyo-tower-minato-city.jpg"
                  alt="Tokyo Tower Minato City at night by David Kernan"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-2">
                <span className="text-xs font-bold text-riso-yellow tracking-wider">Q&amp;A INTERVIEW</span>
                <h3 className="font-display font-black text-lg text-paper group-hover:text-riso-yellow transition-colors leading-snug">
                  Voicing the Shonen Horizon
                </h3>
                <p className="text-ash-light text-sm leading-relaxed line-clamp-2">
                  Inside Mumbai and Delhi recording studios with three voice directors transforming regional anime experiences.
                </p>
                <span className="text-xs text-ash">By Pooja Nair</span>
              </div>
            </Link>

            {/* Divider */}
            <div className="h-px bg-ink-border/60" />

            {/* Supporting Story 2: Review */}
            <Link href="/magazine/issue-01/review-delicious-in-dungeon" className="group flex gap-4">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 bg-ink-card overflow-hidden">
                <Image
                  src="/images/magazine/article-dungeon.svg"
                  alt="Delicious in Dungeon review artwork"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-riso-pink tracking-wider">CRITIC REVIEW</span>
                  <span className="text-xs font-bold text-riso-yellow">9.3/10</span>
                </div>
                <h3 className="font-display font-black text-lg text-paper group-hover:text-riso-pink transition-colors leading-snug">
                  Delicious in Dungeon: Gastronomic Anatomy
                </h3>
                <p className="text-ash-light text-sm leading-relaxed line-clamp-2">
                  Studio Trigger serves an uncompromising culinary treatise on mortality, ecosystem, and appetite.
                </p>
                <span className="text-xs text-ash">By Devansh Roy</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
