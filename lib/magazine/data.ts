import { MagazineIssue } from '@/types/magazine'

export const MAGAZINE_ISSUES: MagazineIssue[] = [
  {
    slug: 'issue-01',
    issue_number: '01', // taste-skill-ignore
    title: 'Monsoon & Manga',
    volume: 'Vol. 1',
    publication_date: 'October 2026',
    season: 'Autumn 2026',
    description: 'A study on generational time in Frieren, the underground Hindi dubbing renaissance, and culinary ecology in dungeon fiction.',
    cover_image: '/images/magazine/cover-issue-01.svg',
    pdf_path: '/files/magazine/otaku-bhaskar-issue-01.pdf',
    pdf_size_mb: 18.4,
    editors_note: 'When we founded AnimeIndian, our mission was simple: build a home for fans who view anime not merely as streamable dopamine, but as modern literature, artisanal sakuga, and shared memory. This inaugural edition of OTAKU Bhaskar brings together critics, fan translators, and industry voices from Delhi, Bengaluru, and Pune.',
    articles: [
      {
        slug: 'monsoon-and-madhouse',
        title: 'Temporal Grief and Quiet Sakuga',
        subtitle: 'Why Frieren: Beyond Journey’s End struck an intimate chord across Indian cities.',
        layout: 'editorial',
        read_time: '7 min read',
        published_at: 'October 12, 2026',
        author: {
          name: 'Aarav Deshmukh',
          role: 'Senior Editorial Fellow',
          handle: '@aarav_sakuga',
        },
        cover_image: '/images/magazine/article-frieren.svg',
        cover_caption: 'Madhouse’s restrained pacing mirrors the passage of unhurried seasons.',
        excerpt: 'In an era dominated by hyper-accelerated reels and 15-second cliffhangers, Keiichiro Saito and Madhouse offered an antidote: an immortal elf wandering past decaying statues, collecting trivial spells.',
        lead_paragraph: 'To experience Frieren on a monsoon evening in Mumbai is to witness art aligning with atmosphere. While the rain beats rhythmically against grilled balconies, the show refuses haste.',
        content: `
### The Architecture of Stillness

Most contemporary anime productions treat negative space as dead air: a budget-saving sacrifice before the next kinetic climax. Madhouse inverted this paradigm. In episode after episode, director Keiichiro Saito lets conversations drift into ambient birdcalls, the clatter of porcelain cups, and the rustle of northern forest foliage.

For Indian audiences raised on the relentless kinetic melodrama of classic afternoon programming, Frieren was a revelation. It treated grief not as a scream, but as an old coat left hanging on an attic hook. When Frieren pauses before Himmel's rusted copper likeness in Tur, the scene is not scored with weeping violins; it is scored with silence.

### Sakuga as Psychological Weight

The fight sequences: choreographed by virtuoso animators like Kouki Fujimoto and Toshiyuki Sato: do not exist for algorithmic hype reels. Every spell array deployed by Fern possesses tactile spatial geometry: defensive mana shields crack like tempered glass, and offensive beams strike stone walls with concussive, unglamorous physics. The visual restraint of everyday traveling amplifies the sudden shock of mortal combat.

### An Honest Cultural Mirror

Why did this resonate so deeply in our subcontinent? Because our collective family structures are built on multi-generational memory: grandparents who carried songs from villages, parents who moved to concrete apartments, and children navigating digital velocity. Frieren is, at its root, a meditation on what outlives us. It asks a question that every Indian diaspora family knows by heart: how do you honor those who taught you to love when their footsteps have already faded into stone?
        `,
        tags: ['Madhouse', 'Essay', 'Sakuga', 'Direction'],
      },
      {
        slug: 'interview-dub-voice-guild',
        title: 'Voicing the Shonen Horizon',
        subtitle: 'Inside the recording booths of Mumbai and Delhi with the pioneers of Hindi anime dubbing.',
        layout: 'interview',
        read_time: '9 min read',
        published_at: 'October 14, 2026',
        author: {
          name: 'Pooja Nair',
          role: 'Culture Reporter',
          handle: '@poojanair_media',
        },
        cover_image: '/images/magazine/article-voice.svg',
        cover_caption: 'Behind the glass: local voice artists balancing localization nuance with Japanese comedic cadence.',
        excerpt: 'From literal translations to genuine localized cadence, we sit down with three voice directors transforming how regional audiences experience Japanese animation.',
        lead_paragraph: 'For two decades, Indian anime localization was a punchline: stiff robotic inflections, heavy censorship, and discordant idioms. Today, an ambitious vanguard of theater actors and sound designers is redefining the medium.',
        interviewees: ['Vikramaditya Rao (Voice Director)', 'Sneha Kulkarni (Script Adapter)', 'Karan Sethi (Voice Actor)'],
        qna: [
          {
            speaker: 'AnimeIndian Editorial',
            role: 'Interviewer',
            dialogue: 'Vikram, let’s begin with the biggest hurdle. Japanese dialogue has distinct rhythm and sentence-final particles. How do you translate that punch into spoken Hindi without sounding like a parody?',
          },
          {
            speaker: 'Vikramaditya Rao',
            role: 'Voice Director, Studio Vani',
            dialogue: 'The mistake old dubs made was word-for-word semantic translation. If a character says "Naruhodo", you don’t mechanically say "Main samajh gaya" five times in a scene. You study the character’s social status, emotional temperature, and breathing. Hindi is an exceptionally earthy, rhythmic language: when a battle-hardened protagonist speaks, we lean into Awadhi cadence or crisp Devanagari plosives that mirror the gut punch of Japanese delivery.',
          },
          {
            speaker: 'AnimeIndian Editorial',
            role: 'Interviewer',
            dialogue: 'Sneha, what is your rule for localized humor? In comedy series like Dungeon Meshi or Spy x Family, cultural puns often fall completely flat.',
          },
          {
            speaker: 'Sneha Kulkarni',
            role: 'Script Adapter',
            dialogue: 'We respect the world. We never replace Tokyo with Chandni Chowk: that is cheap and ruins immersion. Instead, we adapt the comedic dynamic. If a character is being pedantic about dungeon moss, we use colloquial exasperation that any collegiate Indian who has lived in a hostel immediately recognizes. You preserve the logic of the joke, not the dictionary definition.',
          },
          {
            speaker: 'AnimeIndian Editorial',
            role: 'Interviewer',
            dialogue: 'Karan, you voiced two major antagonists this season. What has the community response meant to you?',
          },
          {
            speaker: 'Karan Sethi',
            role: 'Voice Actor',
            dialogue: 'Five years ago, voicing anime was considered low-tier subcontract work. Today, at college conventions in Bengaluru and Pune, teenagers show up clutching dialogue scripts and asking about vocal resonance techniques. That transition from invisible voice to respected performer is what keeps us in the booth for twelve hours straight.',
          },
        ],
        tags: ['Interview', 'Dubbing', 'Industry', 'Voice Guild'],
      },
      {
        slug: 'review-delicious-in-dungeon',
        title: 'Delicious in Dungeon: Gastronomic Anatomy',
        subtitle: 'Studio Trigger serves an uncompromising culinary treatise on mortality, ecosystem, and appetite.',
        layout: 'review',
        read_time: '6 min read',
        published_at: 'October 16, 2026',
        author: {
          name: 'Devansh Roy',
          role: 'Reviews Editor',
          handle: '@devansh_reviews',
        },
        cover_image: '/images/magazine/article-dungeon.svg',
        cover_caption: 'From scorpion broth to living armor yeast: Trigger balances anatomy and levity.',
        excerpt: 'Ryoko Kui’s masterpiece received the animation adaptation it earned: precise anatomical fantasy where survival hinges on understanding digestive tracts.',
        lead_paragraph: 'Fantasy RPG anime has spent a decade rotting inside the sterile tropes of stat menus and overpowered cheat abilities. Delicious in Dungeon (Dungeon Meshi) acts as the antidote: physical, dirty, biological, and delicious.',
        review_score: {
          animation: 9.2,
          story: 9.6,
          soundtrack: 8.8,
          impact: 9.4,
          overall: 9.3,
          verdict: 'Studio Trigger’s most mature adaptation to date. A feast of nutritional biology, emotional stakes, and worldbuilding perfection.',
        },
        content: `
### The Ecosystem Over the Ego

Where standard isekai or fantasy narratives indulge the power fantasy of unearned triumph, Delicious in Dungeon grounds every encounter in trophic cascades. Monsters are not spawn points; they are predators, herbivores, scavengers, and symbiotic hosts.

When Laios and his party consume giant bats or parasitical plants, the sequence is not framed as a cheap gag. Director Yoshihiro Miyajima painstakingly renders the cooking steps: butchering, marinating to neutralize paralysis toxins, and boiling bones to extract gelatin.

### Studio Trigger's Maturing Palette

Trigger is famous for kaleidoscopic explosions and interstellar absurdity (Gurren Lagann, Kill la Kill). Here, they exercise sublime discipline. The character expressions remain elastic and hilarious, but the lighting of subterranean stone chambers feels damp and authentic. Yasunori Mitsuda’s Celtic-inspired folk orchestration provides an acoustic anchor that never overwhelms the quiet moments around the campfire.
        `,
        tags: ['Review', 'Trigger', 'Fantasy', 'Worldbuilding'],
      },
    ],
  },
  {
    slug: 'issue-00',
    issue_number: '00',
    title: 'The Ink Underground',
    volume: 'Vol. 0',
    publication_date: 'May 2026',
    season: 'Spring 2026',
    description: 'The pilot zine: tracking the history of Indian anime fandom from dial-up IRC channels to modern convention halls.',
    cover_image: '/images/magazine/cover-issue-00.svg',
    pdf_path: '/files/magazine/otaku-bhaskar-issue-00.pdf',
    pdf_size_mb: 12.1,
    editors_note: 'Our inaugural test run: printed on two-color Risograph in an edition of 500 copies for the Delhi Comic Arts gathering. This digital release archives the full essays and original illustrations.',
    articles: [
      {
        slug: 'origins-of-indian-fandom',
        title: 'From Afternoon Broadcasts to Riso Print',
        subtitle: 'A historical reflection on the Indian fans who kept the medium alive against the odds.',
        layout: 'editorial',
        read_time: '5 min read',
        published_at: 'May 04, 2026',
        author: {
          name: 'Nandita Sharma',
          role: 'Archivist & Co-founder',
        },
        cover_image: '/images/magazine/article-frieren.svg',
        cover_caption: 'Archival sketches from the early Delhi anime circles.',
        excerpt: 'Before streaming servers and official theatrical releases, Indian anime fandom was an underground network of burned CDs, IRC bots, and xeroxed manga panels.',
        lead_paragraph: 'Anyone who grew up in India during the late 1990s and early 2000s remembers the 5:30 PM ritual. Before satellite receivers were ubiquitous, Japanese animation seeped into living rooms under disguise.',
        content: `
### The Era of Burned Optical Discs

In engineering college hostels across Kharagpur, Kanpur, and Pune, local area networks were the lifeblood of cultural exchange. Gigabit Ethernet cables hung from balcony railings, quietly transmitting compressed 170MB RealMedia (.rmvb) rips of Naruto and Bleach downloaded overnight on 56kbps modems.

It was an economy based on pure devotion. Nobody had merchandise, official figures, or licensed manga. If you wanted to read Berserk, someone in the hostel spent a week compiling scanned jpegs into zipped folders.

### The Rise of Independent Print

AnimeIndian was forged in that communal fire. We are building OTAKU Bhaskar not as an advertising vehicle, but as physical proof that our shared memories matter.
        `,
        tags: ['Archive', 'History', 'Culture'],
      },
    ],
  },
]
