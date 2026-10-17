import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

mkdirSync('public/images/nominees', { recursive: true })
mkdirSync('public/images/magazine', { recursive: true })
mkdirSync('public/files/magazine', { recursive: true })

const nominees = [
  {
    file: 'dungeon.svg',
    title: 'DELICIOUS IN DUNGEON',
    sub: 'STUDIO TRIGGER · DUNGEON MESHI',
    bg: '#131219',
    accent: '#FFC93C',
    pink: '#FF3B6B',
    svgBody: `
      <circle cx="400" cy="270" r="140" fill="#0B0A0F" stroke="#FFC93C" stroke-width="8"/>
      <!-- Iron pot silhouette & fire -->
      <path d="M280,290 C280,390 520,390 520,290 Z" fill="#FF3B6B"/>
      <rect x="250" y="275" width="300" height="24" rx="12" fill="#F2EFE8"/>
      <path d="M340,430 L400,380 L460,430 Z" fill="#FFC93C"/>
      <path d="M360,450 L400,390 L440,450 Z" fill="#FF3B6B"/>
    `
  },
  {
    file: 'solo.svg',
    title: 'SOLO LEVELING',
    sub: 'A-1 PICTURES · SUNG JINWOO',
    bg: '#0B0A0F',
    accent: '#00B2FE',
    pink: '#FF3B6B',
    svgBody: `
      <!-- Blue glowing eyes & shadow monarch daggers -->
      <path d="M150,100 L400,500 L650,100 Z" fill="#1A1822" opacity="0.6"/>
      <polygon points="400,80 430,380 400,420 370,380" fill="#00B2FE"/>
      <circle cx="340" cy="240" r="18" fill="#00B2FE"/>
      <circle cx="460" cy="240" r="18" fill="#00B2FE"/>
      <circle cx="340" cy="240" r="32" fill="none" stroke="#FF3B6B" stroke-width="3"/>
      <circle cx="460" cy="240" r="32" fill="none" stroke="#FF3B6B" stroke-width="3"/>
    `
  },
  {
    file: 'shibuya.svg',
    title: 'JUJUTSU KAISEN',
    sub: 'MAPPA · SHIBUYA INCIDENT',
    bg: '#0B0A0F',
    accent: '#FF3B6B',
    pink: '#FFC93C',
    svgBody: `
      <!-- Domain expansion hands & crimson slash cuts -->
      <rect x="180" y="140" width="440" height="280" fill="#131219" stroke="#FF3B6B" stroke-width="4"/>
      <line x1="100" y1="500" x2="700" y2="100" stroke="#FF3B6B" stroke-width="12"/>
      <line x1="200" y1="120" x2="600" y2="480" stroke="#FFC93C" stroke-width="8"/>
      <circle cx="400" cy="280" r="60" fill="#0B0A0F" stroke="#F2EFE8" stroke-width="6"/>
      <circle cx="400" cy="280" r="20" fill="#FF3B6B"/>
    `
  },
  {
    file: 'demonslayer.svg',
    title: 'DEMON SLAYER',
    sub: 'UFOTABLE · HASHIRA TRAINING',
    bg: '#0B0A0F',
    accent: '#FFC93C',
    pink: '#FF3B6B',
    svgBody: `
      <!-- Nichirin katana & flame dragon motif -->
      <circle cx="400" cy="260" r="150" fill="none" stroke="#FFC93C" stroke-width="10"/>
      <path d="M220,380 Q400,100 580,380" fill="none" stroke="#FF3B6B" stroke-width="16" stroke-linecap="round"/>
      <line x1="200" y1="460" x2="600" y2="120" stroke="#F2EFE8" stroke-width="10"/>
    `
  },
  {
    file: 'kaiju.svg',
    title: 'KAIJU NO. 8',
    sub: 'PRODUCTION I.G · DEFENSE FORCE',
    bg: '#0B0A0F',
    accent: '#00B2FE',
    pink: '#FF3B6B',
    svgBody: `
      <!-- Bio-electric skull mask & numbered insignia -->
      <rect x="220" y="120" width="360" height="340" fill="#1A1822" rx="20"/>
      <circle cx="340" cy="250" r="30" fill="#00B2FE"/>
      <circle cx="460" cy="250" r="30" fill="#00B2FE"/>
      <path d="M300,360 L400,430 L500,360 Z" fill="#FF3B6B"/>
      <text x="365" y="210" fill="#F2EFE8" font-family="sans-serif" font-weight="900" font-size="54">08</text>
    `
  },
  {
    file: 'vinland.svg',
    title: 'VINLAND SAGA',
    sub: 'MAPPA · SEASON 2',
    bg: '#0B0A0F',
    accent: '#FFC93C',
    pink: '#FF3B6B',
    svgBody: `
      <!-- Wheat fields & buried daggers of peace -->
      <rect x="100" y="320" width="600" height="180" fill="#1A1822"/>
      <line x1="250" y1="480" x2="250" y2="220" stroke="#FFC93C" stroke-width="8"/>
      <line x1="350" y1="480" x2="350" y2="180" stroke="#FFC93C" stroke-width="8"/>
      <line x1="450" y1="480" x2="450" y2="200" stroke="#FFC93C" stroke-width="8"/>
      <line x1="550" y1="480" x2="550" y2="240" stroke="#FFC93C" stroke-width="8"/>
      <polygon points="400,240 430,420 370,420" fill="#FF3B6B"/>
    `
  },
  {
    file: 'pluto.svg',
    title: 'PLUTO',
    sub: 'STUDIO M2 · NAOKI URASAWA',
    bg: '#0B0A0F',
    accent: '#FF3B6B',
    pink: '#FFC93C',
    svgBody: `
      <!-- Robotic horned silhouette in noir rain -->
      <circle cx="400" cy="250" r="130" fill="#131219" stroke="#272433" stroke-width="6"/>
      <path d="M280,180 L230,80 L320,130 Z" fill="#FF3B6B"/>
      <path d="M520,180 L570,80 L480,130 Z" fill="#FF3B6B"/>
      <line x1="350" y1="260" x2="450" y2="260" stroke="#FFC93C" stroke-width="8"/>
    `
  },
  {
    file: 'zine.svg',
    title: 'OTAKU BHASKAR ZINE',
    sub: 'ANIMEINDIAN EDITORIAL GUILD',
    bg: '#0B0A0F',
    accent: '#FF3B6B',
    pink: '#FFC93C',
    svgBody: `
      <!-- Open printed zine with screentone dots -->
      <rect x="200" y="140" width="400" height="280" fill="#F2EFE8"/>
      <line x1="400" y1="140" x2="400" y2="420" stroke="#0B0A0F" stroke-width="6"/>
      <rect x="230" y="180" width="140" height="180" fill="#FF3B6B"/>
      <circle cx="300" cy="260" r="40" fill="#FFC93C"/>
      <line x1="430" y1="200" x2="570" y2="200" stroke="#0B0A0F" stroke-width="8"/>
      <line x1="430" y1="230" x2="570" y2="230" stroke="#6E6A78" stroke-width="6"/>
      <line x1="430" y1="260" x2="550" y2="260" stroke="#6E6A78" stroke-width="6"/>
    `
  },
  {
    file: 'dub.svg',
    title: 'PROJECT AWAAZ',
    sub: 'VOICE GUILD INDIA · HINDI AUDIO DRAMA',
    bg: '#0B0A0F',
    accent: '#FFC93C',
    pink: '#FF3B6B',
    svgBody: `
      <!-- Studio condenser mic and audio waveforms -->
      <circle cx="400" cy="220" r="60" fill="#1A1822" stroke="#FFC93C" stroke-width="8"/>
      <rect x="385" y="280" width="30" height="120" fill="#F2EFE8"/>
      <path d="M330,220 C330,300 470,300 470,220" fill="none" stroke="#FF3B6B" stroke-width="10"/>
      <line x1="160" y1="440" x2="640" y2="440" stroke="#272433" stroke-width="6"/>
    `
  },
  {
    file: 'meetup.svg',
    title: 'CHAI & CHIBI MEETUP',
    sub: 'REGIONAL CHAPTERS · MANGA CIRCLE',
    bg: '#0B0A0F',
    accent: '#FF3B6B',
    pink: '#FFC93C',
    svgBody: `
      <!-- Steaming clay kulhad cup & open sketch pad -->
      <path d="M340,300 L350,420 L450,420 L460,300 Z" fill="#FFC93C"/>
      <path d="M380,260 Q400,210 390,170" fill="none" stroke="#F2EFE8" stroke-width="6" stroke-linecap="round"/>
      <path d="M420,260 Q440,210 430,170" fill="none" stroke="#F2EFE8" stroke-width="6" stroke-linecap="round"/>
      <circle cx="400" cy="360" r="18" fill="#FF3B6B"/>
    `
  }
]

for (const n of nominees) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <rect width="800" height="600" fill="${n.bg}"/>
  <rect x="24" y="24" width="752" height="552" fill="none" stroke="#272433" stroke-width="3"/>
  ${n.svgBody}
  <rect x="48" y="470" width="450" height="70" fill="#0B0A0F"/>
  <text x="64" y="504" fill="#F2EFE8" font-family="sans-serif" font-weight="900" font-size="24" letter-spacing="1">${n.title}</text>
  <text x="64" y="528" fill="${n.accent}" font-family="sans-serif" font-weight="700" font-size="13" letter-spacing="2">${n.sub}</text>
</svg>`
  writeFileSync(join('public/images/nominees', n.file), svg)
}

// Magazine covers
const cover01 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 850" width="100%" height="100%">
  <defs>
    <pattern id="dot-cover" width="12" height="12" patternUnits="userSpaceOnUse">
      <circle cx="6" cy="6" r="2.2" fill="#FF3B6B" opacity="0.35"/>
    </pattern>
  </defs>
  <rect width="600" height="850" fill="#0B0A0F"/>
  <rect width="600" height="850" fill="url(#dot-cover)"/>
  
  <!-- Masthead -->
  <rect x="30" y="30" width="540" height="120" fill="#FF3B6B"/>
  <text x="50" y="90" fill="#0B0A0F" font-family="sans-serif" font-weight="900" font-size="44" letter-spacing="2">OTAKU BHASKAR</text>
  <text x="52" y="125" fill="#F2EFE8" font-family="sans-serif" font-weight="700" font-size="16" letter-spacing="3">ISSUE 01 · VOL. 1 · AUTUMN 2026</text>

  <!-- Big Central Artwork Motif -->
  <rect x="50" y="180" width="500" height="420" fill="#131219" stroke="#272433" stroke-width="4"/>
  <circle cx="300" cy="380" r="150" fill="#FFC93C" opacity="0.85"/>
  <path d="M180,480 L300,240 L420,480 Z" fill="#F2EFE8"/>
  <circle cx="300" cy="300" r="28" fill="#FF3B6B"/>

  <!-- Headline Band -->
  <rect x="50" y="630" width="500" height="150" fill="#0B0A0F" stroke="#FF3B6B" stroke-width="2"/>
  <text x="70" y="675" fill="#F2EFE8" font-family="sans-serif" font-weight="900" font-size="28">MONSOON &amp; MANGA</text>
  <text x="70" y="710" fill="#FFC93C" font-family="sans-serif" font-weight="600" font-size="16">Temporal Grief in Frieren · The Hindi Voice Guild</text>
  <text x="70" y="740" fill="#6E6A78" font-family="sans-serif" font-weight="500" font-size="14">Delicious in Dungeon Anatomy · 64 Risograph Pages</text>
</svg>`
writeFileSync('public/images/magazine/cover-issue-01.svg', cover01)

const cover00 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 850" width="100%" height="100%">
  <rect width="600" height="850" fill="#F2EFE8"/>
  <rect x="30" y="30" width="540" height="790" fill="none" stroke="#0B0A0F" stroke-width="6"/>
  <rect x="40" y="40" width="520" height="100" fill="#0B0A0F"/>
  <text x="60" y="98" fill="#F2EFE8" font-family="sans-serif" font-weight="900" font-size="40" letter-spacing="2">OTAKU BHASKAR</text>
  <text x="62" y="124" fill="#FFC93C" font-family="sans-serif" font-weight="700" font-size="14" letter-spacing="3">PILOT ISSUE 00 · SPRING 2026</text>

  <!-- Graphic Risograph Stamp -->
  <circle cx="300" cy="400" r="160" fill="#FF3B6B" opacity="0.9"/>
  <text x="210" y="415" fill="#0B0A0F" font-family="sans-serif" font-weight="900" font-size="42">THE INK</text>
  <text x="180" y="460" fill="#F2EFE8" font-family="sans-serif" font-weight="800" font-size="34">UNDERGROUND</text>

  <rect x="60" y="660" width="480" height="110" fill="#0B0A0F"/>
  <text x="80" y="700" fill="#F2EFE8" font-family="sans-serif" font-weight="800" font-size="20">A History of Indian Anime Fandom</text>
  <text x="80" y="730" fill="#FFC93C" font-family="sans-serif" font-weight="600" font-size="15">Burned CDs, IRC Bots, and Midnight Rips</text>
</svg>`
writeFileSync('public/images/magazine/cover-issue-00.svg', cover00)

// Article images
const artFrieren = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" width="100%" height="100%">
  <rect width="1000" height="500" fill="#0B0A0F"/>
  <circle cx="650" cy="220" r="180" fill="#FFC93C" opacity="0.6"/>
  <polygon points="200,450 450,180 700,450" fill="#1A1822"/>
  <polygon points="400,450 550,220 700,450" fill="#FF3B6B" opacity="0.8"/>
  <line x1="80" y1="80" x2="920" y2="80" stroke="#272433" stroke-width="2"/>
  <text x="80" y="440" fill="#F2EFE8" font-family="sans-serif" font-weight="900" font-size="32">TEMPORAL GRIEF AND QUIET SAKUGA</text>
</svg>`
writeFileSync('public/images/magazine/article-frieren.svg', artFrieren)

const artVoice = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" width="100%" height="100%">
  <rect width="1000" height="500" fill="#0B0A0F"/>
  <rect x="80" y="80" width="840" height="340" fill="#131219" stroke="#FF3B6B" stroke-width="3"/>
  <circle cx="300" cy="240" r="80" fill="#FFC93C"/>
  <circle cx="700" cy="240" r="80" fill="#FF3B6B"/>
  <line x1="300" y1="240" x2="700" y2="240" stroke="#F2EFE8" stroke-width="8"/>
  <text x="120" y="460" fill="#F2EFE8" font-family="sans-serif" font-weight="900" font-size="28">VOICING THE SHONEN HORIZON · THE HINDI GUILD</text>
</svg>`
writeFileSync('public/images/magazine/article-voice.svg', artVoice)

const artDungeon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" width="100%" height="100%">
  <rect width="1000" height="500" fill="#0B0A0F"/>
  <rect x="250" y="100" width="500" height="300" fill="#1A1822" stroke="#FFC93C" stroke-width="4"/>
  <path d="M350,280 C350,380 650,380 650,280 Z" fill="#FF3B6B"/>
  <text x="120" y="460" fill="#F2EFE8" font-family="sans-serif" font-weight="900" font-size="28">DELICIOUS IN DUNGEON · GASTRONOMIC ANATOMY</text>
</svg>`
writeFileSync('public/images/magazine/article-dungeon.svg', artDungeon)

// Sample Mock PDF documents
const samplePdf = `%PDF-1.4
1 0 obj
<< /Title (OTAKU Bhaskar - AnimeIndian Magazine)
   /Author (AnimeIndian Editorial Guild)
>>
endobj
2 0 obj
<< /Type /Catalog /Pages 3 0 R >>
endobj
3 0 obj
<< /Type /Pages /Kids [4 0 R] /Count 1 >>
endobj
4 0 obj
<< /Type /Page /Parent 3 0 R /MediaBox [0 0 595 842]
   /Contents 5 0 R
>>
endobj
5 0 obj
<< /Length 120 >>
stream
BT
/F1 24 Tf
100 700 Td
(OTAKU Bhaskar - AnimeIndian Community Magazine) Tj
0 -40 Td
/F1 14 Tf
(Digital Edition Archive - Issue 01) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000098 00000 n 
0000000147 00000 n 
0000000210 00000 n 
0000000305 00000 n 
trailer
<< /Size 6 /Root 2 0 R >>
startxref
478
%%EOF`

writeFileSync('public/files/magazine/otaku-bhaskar-issue-01.pdf', samplePdf)
writeFileSync('public/files/magazine/otaku-bhaskar-issue-00.pdf', samplePdf)

console.log('All SVG and PDF assets successfully created!')
