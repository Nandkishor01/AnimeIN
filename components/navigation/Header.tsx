'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth/context'
import { Menu, X, Disc as DiscordIcon, User, LogOut } from 'lucide-react'

export function Header() {
  const pathname = usePathname()
  const { user, loginWithDiscord, logout, isConfigured } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Awards', href: '/awards' },
    { label: 'Magazine', href: '/magazine' },
    { label: 'About', href: '/about' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-ink/95 backdrop-blur-sm border-b border-ink-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="AnimeIndian Home"
        >
          <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-paper group-hover:text-riso-pink transition-colors">
            ANIME<span className="text-riso-pink">INDIAN</span>
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold bg-riso-yellow text-ink tracking-wider">
            IN
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors relative py-1 ${
                  active
                    ? 'text-riso-pink'
                    : 'text-ash-light hover:text-paper'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-riso-pink" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Desktop Auth Status & Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-paper">
                <User className="w-4 h-4 text-riso-yellow" />
                <span className="max-w-[120px] truncate">{user.name}</span>
                {user.is_mock && (
                  <span className="text-[10px] bg-ink-card px-1 py-0.5 text-ash-light tracking-wider">
                    Demo
                  </span>
                )}
              </div>
              <button
                onClick={() => logout()}
                className="p-2 text-ash hover:text-riso-pink transition-colors"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => loginWithDiscord()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-riso-pink text-paper font-bold text-sm hover:bg-paper hover:text-ink transition-colors cursor-pointer"
            >
              <DiscordIcon className="w-4 h-4" />
              <span>{isConfigured ? 'Discord Login' : 'Voter Access'}</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-paper hover:text-riso-pink focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ink-surface px-4 pt-4 pb-6 space-y-4 border-b border-ink-border/60">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-bold py-1.5 ${
                  isActive(link.href) ? 'text-riso-pink' : 'text-paper hover:text-riso-yellow'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-ink-border/60">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-paper font-medium">
                  <User className="w-4 h-4 text-riso-yellow" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                  className="px-3 py-1 bg-ink text-xs text-riso-pink font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  loginWithDiscord()
                  setMobileMenuOpen(false)
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-riso-pink text-paper font-bold text-sm"
              >
                <DiscordIcon className="w-4 h-4" />
                <span>{isConfigured ? 'Sign In with Discord' : 'Voter Access (Demo)'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
