import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShieldCheck, BookOpen, Users, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'About :  AnimeIndian',
  description: 'AnimeIndian is an open cultural collective of animators, localizers, critics, and students across India celebrating Japanese animation as craft.',
}

export default function AboutPage() {
  return (
    <div className="w-full bg-ink text-paper">
      {/* Hero statement */}
      <section className="relative w-full pt-16 pb-20 lg:pt-20 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 screentone-pattern opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-riso-pink tracking-widest">ABOUT</span>
              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-paper leading-[1.05]">
                We treat anime as<br />modern literature.
              </h1>
              <p className="text-lg text-ash-light max-w-xl leading-relaxed">
                AnimeIndian is an open cultural collective. We are animators, localizers, critics, and students across India who refuse to treat Japanese animation as disposable digital noise.
              </p>
            </div>

            {/* Editorial artwork composition */}
            <div className="lg:col-span-5 relative h-[340px] sm:h-[420px]">
              <div className="absolute top-0 right-4 w-[200px] sm:w-[240px] h-[280px] sm:h-[330px] bg-ink-card overflow-hidden shadow-panel">
                <Image
                  src="/images/assets/colorful-neon-street-signs-in-kabukicho-shinjuku.jpg"
                  alt="Colorful neon street signs in Kabukicho, Shinjuku, Tokyo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-4 w-[180px] sm:w-[220px] h-[240px] sm:h-[290px] bg-ink overflow-hidden shadow-sharp-pink">
                <Image
                  src="/images/magazine/cover-issue-01.svg"
                  alt="OTAKU Bhaskar Issue 01 cover"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="w-full py-16 bg-ink-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div className="space-y-4">
              <ShieldCheck className="w-7 h-7 text-riso-pink" />
              <h2 className="font-display font-black text-xl text-paper">Democratic Balloting</h2>
              <p className="text-ash-light text-sm leading-relaxed">
                One verified ballot per person. Tamper-proof Postgres constraints and sealed tallies ensure every vote is legitimate.
              </p>
            </div>
            <div className="space-y-4">
              <BookOpen className="w-7 h-7 text-riso-yellow" />
              <h2 className="font-display font-black text-xl text-paper">Risograph Publication</h2>
              <p className="text-ash-light text-sm leading-relaxed">
                OTAKU Bhaskar print and digital archive with zero algorithmic spam or clickbait. Independent criticism, sakuga analysis, and cultural history.
              </p>
            </div>
            <div className="space-y-4">
              <Users className="w-7 h-7 text-paper" />
              <h2 className="font-display font-black text-xl text-paper">Regional Circles</h2>
              <p className="text-ash-light text-sm leading-relaxed">
                Grassroots meetups, sketch jams, and manga reading circles connecting fans across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial imagery section */}
      <section className="w-full py-16 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative aspect-[4/3] bg-ink-card overflow-hidden">
              <Image
                src="/images/assets/vehicles-on-the-streets-of-tokyo-tokyo.jpg"
                alt="Vehicles on the Streets of Tokyo woodblock print, Utagawa Yoshitora 1870"
                fill
                className="object-cover"
              />
              <p className="absolute bottom-3 left-3 text-xs text-paper/70 italic bg-ink/80 px-2 py-1">
                Utagawa Yoshitora, c. 1870. Public domain via Wikimedia Commons.
              </p>
            </div>
            <div className="space-y-5">
              <span className="text-xs font-bold text-riso-yellow tracking-widest">OUR PERSPECTIVE</span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-paper tracking-tight leading-tight">
                Not streamable dopamine. Shared memory.
              </h2>
              <p className="text-ash-light text-base leading-relaxed">
                We build OTAKU Bhaskar not as an advertising vehicle, but as physical proof that our shared memories matter. From the era of burned optical discs and IRC bots to today&apos;s convention halls, Indian anime fandom has always been an underground network of devotion.
              </p>
              <p className="text-ash-light text-base leading-relaxed">
                AnimeIndian exists to give that community a home: a place for criticism that takes the medium seriously, for awards that reflect real fan passion, and for a publication that treats Japanese animation as the art form it is.
              </p>
              <div className="pt-3">
                <Link
                  href="/magazine"
                  className="inline-flex items-center gap-2 text-base font-bold text-riso-pink hover:text-paper transition-colors group"
                >
                  <span>Read the magazine</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="w-full py-16 bg-ink-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-display font-black text-2xl sm:text-4xl text-paper tracking-tight">
            Join the community.
          </h2>
          <p className="text-ash-light text-base leading-relaxed max-w-xl mx-auto">
            Vote in the 2026 awards, read the latest issue, or join the Discord guild.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/awards"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-riso-pink text-ink font-black text-base hover:bg-paper hover:text-ink transition-colors"
            >
              <span>Explore Awards</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/magazine"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-paper font-bold text-base hover:text-riso-yellow transition-colors"
            >
              <span>Read Magazine</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
