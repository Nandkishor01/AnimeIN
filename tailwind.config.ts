import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B0A0F',
          surface: '#131219',
          card: '#1A1822',
          border: '#272433',
          muted: '#3D394C',
        },
        paper: {
          DEFAULT: '#F2EFE8',
          card: '#E9E5DB',
          border: '#D8D3C4',
          muted: '#8A8578',
        },
        riso: {
          pink: '#FF3B6B',
          yellow: '#FFC93C',
          cyan: '#00B2FE',
        },
        ash: {
          DEFAULT: '#6E6A78',
          light: '#9E9AA8',
          dark: '#45424D',
        },
      },
      fontFamily: {
        display: ['var(--font-bricolage)', 'Bricolage Grotesque', 'sans-serif'],
        sans: ['var(--font-plex-sans)', 'IBM Plex Sans', 'sans-serif'],
        devanagari: ['var(--font-plex-devanagari)', 'IBM Plex Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        'panel': '0 12px 30px -10px rgba(0, 0, 0, 0.7)',
        'panel-hover': '0 20px 40px -10px rgba(255, 59, 107, 0.25)',
        'sharp': '4px 4px 0px 0px #0B0A0F',
        'sharp-pink': '4px 4px 0px 0px #FF3B6B',
        'sharp-yellow': '4px 4px 0px 0px #FFC93C',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
