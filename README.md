# AnimeIndian — Community Website, Awards Platform & Digital Magazine

AnimeIndian is the official digital headquarters of India's independent anime community, combining:
1. **Cinematic Community Landing Page (`/`)**: Layered CSS 3D manga panels with pointer tilt, seasonal dispatch ticker, asymmetric editorial shelf, awards teaser, and magazine archive.
2. **Annual Awards & Secure Voting Platform (`/awards`, `/awards/[year]`, `/awards/[year]/results`)**: Verified voting booth with Discord authentication, strict duplicate vote prevention via Postgres database constraints, sealed ballot tallies, and certified election results reveal.
3. **OTAKU Bhaskar Digital Magazine (`/magazine`, `/magazine/[issue]`, `/magazine/[issue]/[article]`)**: Editorial archive featuring three distinct layouts (Long-form Essay, Q&A Roundtable Interview, Critic Scorecard Review), complete table of contents, and risograph print PDF downloads.

---

## 1. Art Direction: "Screentone Night"

The design system implements a dark, tactile, print-inspired visual aesthetic derived from Japanese manga screentones, printed comic gutters, and two-color Risograph publications.

### Design Tokens
- **Ink (`#0B0A0F`)**: Primary background and dark structural surfaces.
- **Paper (`#F2EFE8`)**: Primary editorial text and light publication panels.
- **Riso Pink (`#FF3B6B`)**: Primary actions, active navigation states, and selected nominee highlights.
- **Riso Yellow (`#FFC93C`)**: Secondary accents, issue volume indicators, and verified ballot marks.
- **Ash (`#6E6A78` / `#9E9AA8`)**: Secondary captions, timestamps, and subdued UI borders.

### Typography
- **Bricolage Grotesque**: Display headlines, wordmark, issue titles, and election numbers.
- **IBM Plex Sans**: Body prose, metadata, forms, and interface controls.
- **IBM Plex Sans Devanagari**: Fallback regional rendering for Hindi and Devanagari content.

---

## 2. Technical Architecture

- **Framework**: Next.js 15 (App Router with Server & Client Components)
- **Language**: TypeScript with strict type checking enabled
- **Styling**: Tailwind CSS & CSS custom properties
- **Animation**: CSS 3D transforms, perspective tilt calculations, and `prefers-reduced-motion` fallbacks
- **Database**: Supabase Postgres with version-controlled migrations (`supabase/migrations/20261017000000_init_awards_schema.sql`), Row Level Security (RLS) policies, and aggregated results SQL function
- **Auth**: Supabase Auth with Discord OAuth integration + development mode simulation
- **Storage**: Cloudflare R2 / Local PDF fixture delivery
- **Testing**: Vitest automated test suite for voting security, duplicate prevention, and magazine queries

---

## 3. Database Schema & Security Policies

The schema is defined in `supabase/migrations/20261017000000_init_awards_schema.sql`:

1. `awards_seasons`: Campaign definitions (`draft`, `active`, `closed`, `archived`) with explicit voting start/end and results publication timestamps.
2. `awards_categories`: Categories ordered by display priority.
3. `awards_nominees`: Curated works, studios, and staff nominations.
4. `awards_votes`: Individual secret ballots with unique constraint:
   ```sql
   constraint unique_user_vote_per_category_season unique (season_id, category_id, user_id)
   ```
   Ensures that no voter can submit multiple votes in the same category even under race conditions.
5. `awards_admins`: Privileged administrator accounts.
6. `get_awards_results(p_season_id)`: A PostgreSQL `security definer` procedure that locks vote tallies until `now() >= results_published_at`.

---

## 4. Quick Start & Local Development

### Prerequisites
- Node.js 20+ (tested on Node.js v24)
- npm 10+

### Installation
```bash
git clone https://github.com/animeindian/animeindian-web.git
cd animeindian-web
npm install
```

### Running Locally (Zero External Dependency Mode)
The application includes bundled mock fixtures and dev authentication mode. You can start developing immediately without Supabase or Discord credentials:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Automated Tests
Run the Vitest test suite testing vote eligibility, duplicate vote rejection, closed season guards, and results sealing:
```bash
npm test
```

### Building for Production
```bash
npm run build
npm start
```

---

## 5. Environment Configuration

Copy `.env.example` to `.env.local` to configure live external integrations:
```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous Supabase key |
| `SUPABASE_SERVICE_ROLE_KEY` | Privileged secret key for server-side vote aggregation |
| `DISCORD_CLIENT_ID` | Discord Developer Portal Application Client ID |
| `DISCORD_CLIENT_SECRET` | Discord Developer Portal Client Secret |
| `CLOUDFLARE_R2_ACCOUNT_ID` | Cloudflare account identifier for media storage |
| `CLOUDFLARE_R2_BUCKET_NAME` | R2 bucket name for magazine PDFs |

---

## 6. Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/callback/route.ts   # Supabase Discord OAuth callback
│   │   └── vote/route.ts            # Server-side trusted vote submission
│   ├── awards/
│   │   ├── [year]/
│   │   │   ├── page.tsx             # Voting booth (desktop & mobile)
│   │   │   └── results/page.tsx     # Certified election results / reveal
│   │   └── page.tsx                 # Awards overview and campaign status
│   ├── magazine/
│   │   ├── [issue]/
│   │   │   ├── [article]/page.tsx   # 3 dynamic article layouts
│   │   │   └── page.tsx             # Issue detail, TOC & PDF download
│   │   └── page.tsx                 # Magazine archive & latest issue hero
│   ├── globals.css                  # Screentone tokens & halftone patterns
│   ├── layout.tsx                   # Brand shell layout with Google fonts
│   └── page.tsx                     # Cinematic landing page
├── components/
│   ├── awards/VotingBoothClient.tsx # Client-side voting booth interface
│   ├── hero/MangaPanelHero.tsx      # CSS 3D layered manga panel hero
│   ├── home/                        # Ticker, Editorial Shelf, Awards Feature
│   ├── magazine/                    # LongForm, Interview, Review layouts
│   └── navigation/Header.tsx        # Wordmark, links & Discord auth status
├── lib/
│   ├── awards/service.ts            # Voting logic & database access
│   ├── magazine/service.ts          # Magazine archive & article queries
│   └── supabase/                    # Browser, server, and admin clients
├── public/images/                   # Nominee SVGs, magazine covers, patterns
├── supabase/migrations/             # Version-controlled SQL migration
└── tests/                           # Vitest automated test suite
```
