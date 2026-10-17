import type { Metadata } from 'next'
import { Bricolage_Grotesque, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/navigation/Header'
import { Footer } from '@/components/navigation/Footer'
import { AuthProvider } from '@/lib/auth/context'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const plexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-plex-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AnimeIndian :  India’s Independent Anime Community',
  description: 'Celebrating stories, sakuga animation, and Indian anime fandom. Digital magazine archive, community awards, and independent criticism.',
  metadataBase: new URL('https://animeindian.org'),
  openGraph: {
    title: 'AnimeIndian :  India’s Independent Anime Community',
    description: 'Celebrating stories, sakuga animation, and Indian anime fandom.',
    url: 'https://animeindian.org',
    siteName: 'AnimeIndian',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${plexSans.variable}`}>
      <body className="min-h-[100dvh] flex flex-col bg-ink text-paper antialiased">
        <AuthProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
