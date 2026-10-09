# Skill Atlas: native /atlas route

## Goal
Make `/atlas` a first-class page of the portfolio (real Navbar/Footer, Geist, dark minimal theme) while keeping everything the standalone Atlas offers: interactive skill wheel with hover tracing, reading panel, search, domain and stack filters, full-screen wheel, and the expandable skill guide.

## Decisions
- Native React route replaces `public/atlas/index.html` and the `/atlas` rewrite in `next.config.ts` (both deleted). The Navbar link stays.
- Keep the 9 domain colours, muted to suit the dark theme, as CSS variables on `[data-d]`. Everything else uses the site's neutral palette and hairline borders.
- Geist replaces Bricolage Grotesque / IBM Plex; no Google Fonts requests.
- No eyebrow or intro paragraph. Heading plus the stats line only.

## Structure
- `data/atlas.ts`: typed `DOMAINS`, `SKILLS` (incl. long-form guide fields), `LINKS`, `STACKS`, ported verbatim from the standalone page.
- `components/atlas/`: `Wheel.tsx` (SVG, hover trace, selection, full-screen), `Panel.tsx`, `Controls.tsx`, `Guide.tsx` (domain-grouped expandable cards), `AtlasExplorer.tsx` (client wrapper owning selection/filter state; selection persisted in `localStorage`, wrapped in try/catch).
- `app/atlas/page.tsx`: server page inside `PageContainer`; heading, stats, explorer, guide; page metadata.

## Behaviour
Same as the standalone page: hover traces a skill's links, click opens its panel, search/domain/stack filters focus the wheel, Esc exits full-screen, single column under 980px, reduced-motion respected.

## Verification
`tsc`, `lint` and `build` pass; manual browser check at desktop and phone width of hover, click, search, filters, full-screen, guide expand/collapse; `/atlas` has no console errors.

## Out of scope
OG image, new content, light theme.
