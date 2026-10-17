-- Supabase Seed: 20261017000001_seed_awards.sql
-- Seed data for AnimeIndian Awards 2025 & 2026 seasons

insert into public.awards_seasons (id, name, year, status, voting_starts_at, voting_ends_at, results_published_at)
values
  ('2025', 'AnimeIndian Awards 2025', 2025, 'closed', '2025-12-01T00:00:00Z', '2025-12-31T23:59:59Z', '2026-01-05T12:00:00Z'),
  ('2026', 'AnimeIndian Awards 2026', 2026, 'active', '2026-10-01T00:00:00Z', '2026-11-30T23:59:59Z', '2026-12-05T12:00:00Z')
on conflict (id) do update set
  name = excluded.name,
  status = excluded.status,
  voting_starts_at = excluded.voting_starts_at,
  voting_ends_at = excluded.voting_ends_at,
  results_published_at = excluded.results_published_at;

-- Categories for 2026
insert into public.awards_categories (id, season_id, name, slug, description, display_order)
values
  ('cat-aoty-2026', '2026', 'Anime of the Year', 'anime-of-the-year', 'Honoring the most impactful, cohesive, and resonant anime of the year.', 1),
  ('cat-anim-2026', '2026', 'Best Animation', 'best-animation', 'Celebrating groundbreaking technical craft, sakuga direction, and visual fluidity.', 2),
  ('cat-story-2026', '2026', 'Best Story', 'best-story', 'Awarding masterclass narrative pacing, character arcs, and thematic depth.', 3),
  ('cat-ost-2026', '2026', 'Best Soundtrack', 'best-soundtrack', 'Recognizing musical compositions that elevated emotion and scene tension.', 4),
  ('cat-action-2026', '2026', 'Best Action', 'best-action', 'Recognizing breathtaking choreography, impact frames, and battle direction.', 5),
  ('cat-comm-2026', '2026', 'Best Community Project', 'best-community-project', 'Saluting grassroots Indian fan translations, fandubs, zines, and events.', 6)
on conflict (id) do nothing;

-- Nominees for 2026 Anime of the Year
insert into public.awards_nominees (id, category_id, title, subtitle, description, image_url, display_order)
values
  ('nom-frieren-2026', 'cat-aoty-2026', 'Frieren: Beyond Journey''s End', 'Madhouse / Keiichiro Saito', 'A contemplative, generational fantasy masterpiece on memory, mortality, and quiet connection.', '/images/nominees/frieren.svg', 1),
  ('nom-apothecary-2026', 'cat-aoty-2026', 'The Apothecary Diaries', 'TOHO animation & OLM', 'Intrigue, medicine, and brilliant courtroom deduction in the inner palace.', '/images/nominees/apothecary.svg', 2),
  ('nom-dungeon-2026', 'cat-aoty-2026', 'Delicious in Dungeon', 'Studio Trigger', 'Ecological dungeon crawling fused with culinary gastronomy and unmatched worldbuilding.', '/images/nominees/dungeon.svg', 3),
  ('nom-solo-2026', 'cat-aoty-2026', 'Solo Leveling', 'A-1 Pictures', 'Kinetic power progression and electrifying action spectacle brought to life.', '/images/nominees/solo.svg', 4)
on conflict (id) do nothing;

-- Nominees for 2026 Best Animation
insert into public.awards_nominees (id, category_id, title, subtitle, description, image_url, display_order)
values
  ('nom-anim-frieren', 'cat-anim-2026', 'Frieren: Beyond Journey''s End', 'Madhouse', 'Unrivaled magical choreography with spellbinding weight and spatial clarity.', '/images/nominees/frieren.svg', 1),
  ('nom-anim-jujutsu', 'cat-anim-2026', 'Jujutsu Kaisen: Shibuya Arc', 'MAPPA', 'Hyper-expressive sakuga that pushed animators and visual spectacle to the brink.', '/images/nominees/shibuya.svg', 2),
  ('nom-anim-demon', 'cat-anim-2026', 'Demon Slayer: Hashira Training', 'ufotable', 'Photorealistic dynamic lighting blended seamlessly with hand-drawn combat sequences.', '/images/nominees/demonslayer.svg', 3),
  ('nom-anim-kaiju', 'cat-anim-2026', 'Kaiju No. 8', 'Production I.G', 'Heavyweight mechanical and biological impact frames with military tactile punch.', '/images/nominees/kaiju.svg', 4)
on conflict (id) do nothing;

-- Nominees for 2026 Best Story
insert into public.awards_nominees (id, category_id, title, subtitle, description, image_url, display_order)
values
  ('nom-story-frieren', 'cat-story-2026', 'Frieren: Beyond Journey''s End', 'Tomohiro Suzuki', 'A lyrical reflection on human impermanence viewed through the lens of an immortal elf.', '/images/nominees/frieren.svg', 1),
  ('nom-story-vinland', 'cat-story-2026', 'Vinland Saga Season 2', 'Hiroshi Seko', 'The definitive pacification arc exploring atonement, trauma, and redemption.', '/images/nominees/vinland.svg', 2),
  ('nom-story-pluto', 'cat-story-2026', 'Pluto', 'Naoki Urasawa & Studio M2', 'A tragic, existential noir dissecting human hatred and artificial consciousness.', '/images/nominees/pluto.svg', 3),
  ('nom-story-apothecary', 'cat-story-2026', 'The Apothecary Diaries', 'Norihiro Naganuma', 'Deft political maneuverings intertwined with forensic herbal pathology.', '/images/nominees/apothecary.svg', 4)
on conflict (id) do nothing;

-- Nominees for 2026 Best Soundtrack
insert into public.awards_nominees (id, category_id, title, subtitle, description, image_url, display_order)
values
  ('nom-ost-frieren', 'cat-ost-2026', 'Evan Call', 'Frieren: Beyond Journey''s End', 'Sweeping Celtic strings and pastoral folk melodies that embody century-long journeys.', '/images/nominees/frieren.svg', 1),
  ('nom-ost-sawano', 'cat-ost-2026', 'Hiroyuki Sawano', 'Solo Leveling', 'Orchestral rock climaxes and choral battle anthems with signature thunder.', '/images/nominees/solo.svg', 2),
  ('nom-ost-apothecary', 'cat-ost-2026', 'Satoru Kosaki & Kevin Penkin', 'The Apothecary Diaries', 'Traditional Asian instrumentation combined with contemporary chamber elegance.', '/images/nominees/apothecary.svg', 3)
on conflict (id) do nothing;

-- Nominees for 2026 Best Action
insert into public.awards_nominees (id, category_id, title, subtitle, description, image_url, display_order)
values
  ('nom-act-fern', 'cat-action-2026', 'Fern vs. Ehre & Frieren vs. Clone', 'Madhouse / Frieren Ep 26', 'Concentrated mana beams and tactical defensive spell arrays with breathtaking sound design.', '/images/nominees/frieren.svg', 1),
  ('nom-act-sukuna', 'cat-action-2026', 'Sukuna vs. Mahoraga', 'MAPPA / JJK S2', 'City-level destruction rendered with experimental perspective distortions and raw speed.', '/images/nominees/shibuya.svg', 2),
  ('nom-act-solo', 'cat-action-2026', 'Jinwoo vs. Blood-Red Commander Igris', 'A-1 Pictures / Solo Leveling', 'Brutal close-quarters thrusts, blade parries, and suffocating throne-room tension.', '/images/nominees/solo.svg', 3)
on conflict (id) do nothing;

-- Nominees for 2026 Best Community Project
insert into public.awards_nominees (id, category_id, title, subtitle, description, image_url, display_order)
values
  ('nom-comm-otaku', 'cat-comm-2026', 'OTAKU Bhaskar Print Zine Vol. 1', 'AnimeIndian Editorial Guild', 'The first community-funded risograph print magazine celebrating Indian anime fandom.', '/images/nominees/zine.svg', 1),
  ('nom-comm-dub', 'cat-comm-2026', 'Project Awaaz: Hindi Audio Drama', 'Voice Guild India', 'Full-cast fan-dubbed audio drama bringing classic light novels to Hindi listeners.', '/images/nominees/dub.svg', 2),
  ('nom-comm-expo', 'cat-comm-2026', 'Chai & Chibi Meetup Series', 'AnimeIndian Regional Chapters', 'Monthly independent manga reading circles and sketch jams across 8 Indian cities.', '/images/nominees/meetup.svg', 3)
on conflict (id) do nothing;
