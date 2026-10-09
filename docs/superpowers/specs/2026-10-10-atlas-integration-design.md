# Skill Atlas: native /atlas route

## Goal
Make `/atlas` a first-class page of the portfolio (real Navbar/Footer, Geist, dark minimal theme) while keeping everything the standalone Atlas offers: interactive skill wheel with hover tracing, reading panel, search, domain and stack filters, full-screen wheel, and the expandable skill guide.

## Decisions
- Native React route replaces `public/atlas/index.html` and the `/atlas` rewrite in `next.config.ts` (both deleted). The Navbar link stays.
- Keep the 9 domain colours, muted to suit the dark theme, as CSS variables on `[data-d]`. Everything else uses the site's neutral palette and hairline borders.
- Geist replaces Bricolage Grotesque / IBM Plex; no Google Fonts requests.
- No eyebrow or intro paragraph. Heading plus the stats line only.
- Layout: the page stays in the site's 640px column. The column holds the header, stats, skill search and the skill guide (domain sections of expandable cards). The wheel, its reading panel and the domain/stack chips live in a full-screen overlay (native `<dialog>`), opened from an "Open the wheel" button or a card's "Show on the wheel" button. In the overlay the wheel and panel sit side by side from 1024px, stacked below that.

## Structure
- `data/atlas.ts`: typed `DOMAINS`, `SKILLS` (incl. long-form guide fields), `LINKS`, `STACKS`, ported verbatim from the standalone page.
- `lib/atlas.ts`: the model built from the data (skills with links, wheel geometry, focus sets, search, saved-selection validation).
- `components/atlas/`: `Atlas.tsx` (client; search, guide cards, the wheel dialog, selection state persisted in `localStorage` inside try/catch), `Wheel.tsx` (SVG, hover trace, selection), `Panel.tsx` (reading panel), `SkillGuide.tsx` (the guide body shared by cards and panel), `atlas.css` (domain colours and wheel styles).
- `app/atlas/page.tsx`: server page using the site's `PageHeader`; page metadata.

## Behaviour
Hover traces a skill's links, click opens its panel, domain/stack chips focus the wheel, panel links navigate between skills, domains and stacks. Search finds a skill (exact name first, then partial) and opens its guide card; no match says so. Esc or Close shuts the wheel; the page behind does not scroll while it is open. Reduced motion respected.

## Verification
`tsc`, `lint` and `build` pass; manual browser check at desktop and phone width of hover, click, search, filters, full-screen, guide card open/close, search hit and miss; `/atlas` has no console errors.

## Out of scope
OG image, new content, light theme.
