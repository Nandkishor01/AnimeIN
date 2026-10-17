import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full bg-ink-surface border-t-2 border-ink-border text-paper mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="font-display font-black text-3xl tracking-tight">
              ANIME<span className="text-riso-pink">INDIAN</span>
            </h2>
            <p className="text-ash-light text-base max-w-sm leading-relaxed">
              India&apos;s independent anime community, celebrating storytelling craft, sakuga animation, and the passionate fans behind them.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-ash">
              <span className="px-2 py-1 bg-ink border-2 border-ink-border font-semibold text-riso-yellow">
                EST. 2024
              </span>
              <span>NEW DELHI · MUMBAI · BENGALURU</span>
            </div>
          </div>

          {/* Navigation Column: Experiences */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-display font-bold text-lg text-paper tracking-wide">
              PLATFORM
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/awards" className="text-ash-light hover:text-riso-pink transition-colors">
                  AnimeIndian Awards 2026
                </Link>
              </li>
              <li>
                <Link href="/awards/2025/results" className="text-ash-light hover:text-riso-pink transition-colors">
                  2025 Archive Results
                </Link>
              </li>
              <li>
                <Link href="/magazine" className="text-ash-light hover:text-riso-pink transition-colors">
                  OTAKU Bhaskar Magazine
                </Link>
              </li>
              <li>
                <Link href="/magazine/issue-01" className="text-ash-light hover:text-riso-pink transition-colors">
                  Issue 01: Monsoon &amp; Manga
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column: Community */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-display font-bold text-lg text-paper tracking-wide">
              COMMUNITY &amp; DISCORD
            </h3>
            <p className="text-ash-light text-sm leading-relaxed">
              Join thousands of Indian anime enthusiasts, animators, and translators on our verified Discord server.
            </p>
            <div className="pt-2">
              <a
                href="https://discord.gg/animeindian"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink border-2 border-riso-pink text-paper text-sm font-bold hover:bg-riso-pink hover:text-paper transition-colors"
              >
                <span>Join Official Discord Guild</span>
              </a>
            </div>
          </div>
        </div>

        {/* Big full-width brand closing statement */}
        <div className="pt-12 border-t-2 border-ink-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display font-black text-2xl sm:text-4xl lg:text-5xl tracking-tighter text-ash-light select-none">
            ANIME IS BETTER WHEN WE SHARE IT.
          </div>
          <div className="text-xs text-paper text-right space-y-1">
            <p>© {new Date().getFullYear()} AnimeIndian Community Guild.</p>
            <p>Designed with Screentone Night art direction.</p>
            <p className="text-ash-light">Archival imagery: Wikimedia Commons, NASA, Art Institute of Chicago, The Metropolitan Museum of Art.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
