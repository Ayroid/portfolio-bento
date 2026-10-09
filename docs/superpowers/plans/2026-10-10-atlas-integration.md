# Skill Atlas Native Route Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the standalone `public/atlas/index.html` with a native `/atlas` route that lives in the site's layout and keeps the Atlas's wheel, panel, filters, search and skill guide.

**Architecture:** The content moves verbatim into `data/atlas.ts` (generated once from the HTML). `lib/atlas.ts` builds the model from it: skills with their links, wheel geometry, focus sets, search and saved-selection validation; all pure, checked by one assert script. `app/atlas/page.tsx` renders the header in the site's 640px column; the client component `components/atlas/Atlas.tsx` renders search and the guide cards there, plus a full-screen native `<dialog>` holding the wheel, reading panel and chips.

**Tech Stack:** Next.js 16 (app router), React 19, Tailwind CSS 4, TypeScript, `tsx` for the check script.

**Spec:** `docs/superpowers/specs/2026-10-10-atlas-integration-design.md`

## Global Constraints

- Page stays in the site's 640px column (`PageContainer`); the wheel lives in a full-screen `<dialog>`.
- Keep the 9 domain colours, using the original page's dark-mode values; everything else uses the site's neutral palette and `border-white/[0.06]` hairlines.
- Geist only (inherited from the root layout); no Google Fonts.
- No eyebrow or intro paragraph; heading plus stats line only.
- Content (skills, links, stacks, guides) ported verbatim. No copy edits.
- `localStorage` access always inside try/catch; the page must render correctly without it.
- No new dependencies.
- Delete `public/atlas/` and the `/atlas` rewrite in `next.config.ts`; keep the `/atlas` entry in `config/site.ts` `navLinks`.

## Review Focus

1. A saved selection in `localStorage` that names a skill that no longer exists, or an inherited key like `toString`, must fall back to the default selection instead of crashing. Pinned by `isMode` asserts in Task 1.
2. Searching with an empty box, only spaces, or a name that matches nothing must not throw. A miss shows a "No skill matches" note. Pinned by `findSkill` asserts in Task 1 and the miss check in Task 2.
3. A search term that is both an exact name and part of a longer name ("Negotiation" vs "Salary Negotiation") must pick the exact one. Pinned in Task 1.
4. While the wheel dialog is open, the page behind must not scroll, and Esc must close it. Checked in Task 3's browser step.
5. On a phone (375px), the wheel must scroll sideways inside the dialog, and tapping a skill must bring its panel into view. Checked in Task 3's browser step.

---

## File Structure

- Create `data/atlas.ts`: typed content (`DOMAINS`, `SKILL_ROWS`, `LINK_ROWS`, `STACKS`, `GUIDES`). Generated once, then owned as source.
- Create `lib/atlas.ts`: the model and geometry (pure, no React).
- Create `scripts/check-atlas.ts`: assert-based check of data integrity and model logic.
- Create `components/atlas/atlas.css`: domain colour tokens and wheel SVG styles.
- Create `components/atlas/SkillGuide.tsx`: the guide body shared by cards and panel.
- Create `components/atlas/Atlas.tsx`: client root: search, guide cards, wheel dialog, selection state.
- Create `components/atlas/Wheel.tsx`: the SVG wheel.
- Create `components/atlas/Panel.tsx`: the reading panel.
- Create `app/atlas/page.tsx`: route, header, metadata.
- Modify `package.json`: add the `atlas:check` script.
- Modify `next.config.ts`: remove the rewrite.
- Delete `public/atlas/index.html`.

---

### Task 1: Data and model

**Files:**
- Create: `data/atlas.ts` (generated), `lib/atlas.ts`, `scripts/check-atlas.ts`
- Modify: `package.json` (scripts)

**Interfaces:**
- Produces from `data/atlas.ts`: `type DomainId`, `type Domain = { id: DomainId; name: string; full: string; desc: string }`, `DOMAINS: Domain[]`, `SKILL_ROWS: [string, DomainId, string, string, string, string][]`, `LINK_ROWS: [string, string, string][]`, `STACKS: { name: string; desc: string; ids: string[] }[]`, `GUIDES: Record<string, [string, string[], string[], string, string]>`.
- Produces from `lib/atlas.ts`: `type Skill`, `type Mode`, `DEFAULT_MODE`, `LEVELS`, `skills: Record<string, Skill>`, `links: { a: string; b: string; reason: string }[]`, `domainSkills: Record<DomainId, Skill[]>`, `domainById: Record<DomainId, Domain>`, `arcs`, `linkPaths: string[]`, `nodeLayout(s)`, `focusOf(m)`, `stackLinks(i)`, `stacksOf(id)`, `findSkill(q)`, `isMode(x)`, `sameMode(a, b)`.

- [ ] **Step 1: Write the failing check**

Create `scripts/check-atlas.ts`:

```ts
// Run with `npm run atlas:check`. Fails loudly if the Atlas data or model breaks.
import assert from "node:assert/strict";
import { DOMAINS, GUIDES, LINK_ROWS, SKILL_ROWS, STACKS } from "@/data/atlas";
import {
  domainSkills,
  findSkill,
  focusOf,
  isMode,
  links,
  skills,
} from "@/lib/atlas";

// Data integrity: every reference resolves and nothing is silently dropped.
assert.equal(Object.keys(skills).length, SKILL_ROWS.length, "duplicate skill ids");
assert.equal(links.length, LINK_ROWS.length, "links to unknown skills");
for (const s of Object.values(skills)) {
  assert.ok(GUIDES[s.id], `no guide for ${s.id}`);
  assert.equal(s.how.length, 3, `${s.id}: how-to-learn needs 3 items`);
  assert.equal(s.levels.length, 3, `${s.id}: practice plan needs 3 levels`);
}
for (const st of STACKS)
  for (const id of st.ids) assert.ok(skills[id], `${st.name}: unknown ${id}`);
assert.equal(
  DOMAINS.reduce((n, d) => n + domainSkills[d.id].length, 0),
  SKILL_ROWS.length,
  "skill outside every domain",
);

// Focus: a skill lights up itself, its neighbours and the links between them.
const f = focusOf({ type: "skill", id: "prompt" });
assert.ok(f.nodes.has("prompt"));
for (const l of skills.prompt.links) {
  assert.ok(f.nodes.has(l.to));
  assert.ok(f.links.has(l.i));
}
// A stack only lights links whose both ends are in the stack.
for (const i of focusOf({ type: "stack", i: 0 }).links)
  assert.ok(
    STACKS[0].ids.includes(links[i].a) && STACKS[0].ids.includes(links[i].b),
  );

// Search: exact name beats partial, case and spaces ignored, misses are undefined.
assert.equal(findSkill("Negotiation")?.id, "negotiate");
assert.equal(findSkill("  SALES ")?.id, "sales");
assert.equal(findSkill("negoti")?.id !== undefined, true);
assert.equal(findSkill(""), undefined);
assert.equal(findSkill("   "), undefined);
assert.equal(findSkill("zzzz"), undefined);

// Saved selection: only modes pointing at real things are accepted.
assert.ok(isMode({ type: "skill", id: "prompt" }));
assert.ok(isMode({ type: "domain", id: "mind" }));
assert.ok(isMode({ type: "stack", i: 0 }));
assert.ok(!isMode({ type: "skill", id: "gone" }));
assert.ok(!isMode({ type: "skill", id: "toString" }));
assert.ok(!isMode({ type: "domain", id: "nope" }));
assert.ok(!isMode({ type: "stack", i: 99 }));
assert.ok(!isMode({ type: "stack", i: "0" }));
assert.ok(!isMode(null));
assert.ok(!isMode("skill"));

console.log("atlas: ok");
```

Add to `package.json` `scripts`, after `"thought:seed"`:

```json
    "atlas:check": "tsx scripts/check-atlas.ts"
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm run atlas:check`
Expected: FAIL, cannot resolve `@/data/atlas`.

- [ ] **Step 3: Generate `data/atlas.ts` from the standalone page**

This one-off command slices the data literals out of the HTML, evaluates them, and writes them as typed TypeScript. The HTML is our own committed file.

```bash
node -e '
const fs = require("fs");
const h = fs.readFileSync("public/atlas/index.html", "utf8");
const src = h.slice(h.indexOf("const DOMAINS="), h.indexOf("/* ---------- build model"));
const { DOMAINS, S, L, STACKS, D } = new Function(src + ";return {DOMAINS,S,L,STACKS,D}")();
const j = (x) => JSON.stringify(x, null, 2);
const ids = DOMAINS.map((d) => JSON.stringify(d.id)).join(" | ");
fs.writeFileSync("data/atlas.ts", `// The Skill Atlas content, ported verbatim from the original standalone page.

export type DomainId = ${ids};

export type Domain = { id: DomainId; name: string; full: string; desc: string };

export const DOMAINS: Domain[] = ${j(DOMAINS)};

// [id, domain, name, what it is, why it matters now, how to start]
export const SKILL_ROWS: [string, DomainId, string, string, string, string][] = ${j(S)};

// [a, b, how they complement each other]
export const LINK_ROWS: [string, string, string][] = ${j(L)};

export const STACKS: { name: string; desc: string; ids: string[] }[] = ${j(STACKS)};

// id: [in depth, [how to learn x3], [beginner, building, advanced], signs of progress, common trap]
export const GUIDES: Record<string, [string, string[], string[], string, string]> = ${j(D)};
`);
'
npx prettier --write data/atlas.ts
```

Expected: `data/atlas.ts` exists. `grep -c "" data/atlas.ts` reports a few thousand lines.

- [ ] **Step 4: Write `lib/atlas.ts`**

```ts
import {
  DOMAINS,
  GUIDES,
  LINK_ROWS,
  SKILL_ROWS,
  STACKS,
  type Domain,
  type DomainId,
} from "@/data/atlas";

// The Atlas model: skills with their links, plus the wheel's geometry.
// Built once at import; everything here is pure.

export type Skill = {
  id: string;
  d: DomainId;
  name: string;
  desc: string;
  why: string;
  start: string;
  about: string;
  how: string[];
  levels: string[];
  signs: string;
  trap: string;
  links: { to: string; reason: string; i: number }[];
  angle: number;
  x: number;
  y: number;
};

export type Mode =
  | { type: "skill"; id: string }
  | { type: "domain"; id: DomainId }
  | { type: "stack"; i: number };

export const DEFAULT_MODE: Mode = { type: "skill", id: "prompt" };

export const LEVELS = [
  ["Beginner", "weeks 1–4"],
  ["Building", "months 2–6"],
  ["Advanced", "6 months +"],
] as const;

export const skills: Record<string, Skill> = {};
for (const [id, d, name, desc, why, start] of SKILL_ROWS) {
  const [about, how, levels, signs, trap] = GUIDES[id] ?? ["", [], [], "", ""];
  skills[id] = {
    id, d, name, desc, why, start, about, how, levels, signs, trap,
    links: [], angle: 0, x: 0, y: 0,
  };
}

export const links = LINK_ROWS.filter(([a, b]) => skills[a] && skills[b]).map(
  ([a, b, reason]) => ({ a, b, reason }),
);
links.forEach((l, i) => {
  skills[l.a].links.push({ to: l.b, reason: l.reason, i });
  skills[l.b].links.push({ to: l.a, reason: l.reason, i });
});

export const domainById = Object.fromEntries(
  DOMAINS.map((d) => [d.id, d]),
) as Record<DomainId, Domain>;

export const domainSkills = Object.fromEntries(
  DOMAINS.map((d) => [
    d.id,
    SKILL_ROWS.filter((r) => r[1] === d.id).map((r) => skills[r[0]]),
  ]),
) as Record<DomainId, Skill[]>;

// Geometry: skills sit on a circle of radius R, one slot each, with an empty
// GAP of slots between domains. Coordinates are in the SVG's viewBox units.
export const R = 318;
const GAP = 2;
const slots: Record<string, number> = {};
const span = {} as Record<DomainId, [number, number]>;
let slot = 0;
for (const d of DOMAINS) {
  const first = slot;
  for (const s of domainSkills[d.id]) slots[s.id] = slot++;
  span[d.id] = [first, slot - 1];
  slot += GAP;
}
const TOTAL = slot;
const ang = (sl: number) => ((sl + GAP / 2 - 1) / TOTAL) * 360 - 90;
const pt = (a: number, r: number): [number, number] => [
  r * Math.cos((a * Math.PI) / 180),
  r * Math.sin((a * Math.PI) / 180),
];
const f = (n: number) => n.toFixed(1);

for (const s of Object.values(skills)) {
  s.angle = ang(slots[s.id]);
  [s.x, s.y] = pt(s.angle, R);
}

// One coloured arc per domain, with its label on a path that reads upright
// whether the arc is on the top or bottom half.
export const arcs = DOMAINS.map((d) => {
  const a0 = ang(span[d.id][0]) - 1.2;
  const a1 = ang(span[d.id][1]) + 1.2;
  const r = R - 24;
  const [x0, y0] = pt(a0, r);
  const [x1, y1] = pt(a1, r);
  const mid = (((a0 + a1) / 2) % 360 + 360) % 360;
  const bottom = mid > 0 && mid < 180;
  const rl = bottom ? R - 38 : R - 46;
  const [lx0, ly0] = pt(a0, rl);
  const [lx1, ly1] = pt(a1, rl);
  return {
    d: d.id,
    name: d.name,
    arc: `M${f(x0)},${f(y0)} A${r},${r} 0 0 1 ${f(x1)},${f(y1)}`,
    label: bottom
      ? `M${f(lx1)},${f(ly1)} A${rl},${rl} 0 0 0 ${f(lx0)},${f(ly0)}`
      : `M${f(lx0)},${f(ly0)} A${rl},${rl} 0 0 1 ${f(lx1)},${f(ly1)}`,
  };
});

// Links curve through a point pulled most of the way to the centre.
export const linkPaths = links.map((l) => {
  const [ax, ay] = pt(skills[l.a].angle, R - 8);
  const [bx, by] = pt(skills[l.b].angle, R - 8);
  return `M${f(ax)},${f(ay)} Q${f(((ax + bx) / 2) * 0.18)},${f(((ay + by) / 2) * 0.18)} ${f(bx)},${f(by)}`;
});

// Labels on the left half are flipped so they never read upside down.
export function nodeLayout(s: Skill) {
  const norm = ((s.angle % 360) + 360) % 360;
  const left = norm > 90 && norm < 270;
  return {
    r: Math.min(4 + s.links.length * 0.55, 10),
    left,
    transform: `rotate(${s.angle.toFixed(2)}) translate(${R + 14},0)${left ? " rotate(180)" : ""}`,
  };
}

export function focusOf(m: Mode) {
  const nodes = new Set<string>();
  const on = new Set<number>();
  if (m.type === "skill") {
    nodes.add(m.id);
    for (const l of skills[m.id].links) {
      nodes.add(l.to);
      on.add(l.i);
    }
  } else if (m.type === "domain") {
    for (const s of domainSkills[m.id]) {
      nodes.add(s.id);
      for (const l of s.links) on.add(l.i);
    }
  } else {
    const ids = new Set(STACKS[m.i].ids);
    ids.forEach((id) => nodes.add(id));
    links.forEach((l, i) => {
      if (ids.has(l.a) && ids.has(l.b)) on.add(i);
    });
  }
  return { nodes, links: on };
}

export const stackLinks = (i: number) => {
  const ids = new Set(STACKS[i].ids);
  return links.filter((l) => ids.has(l.a) && ids.has(l.b));
};

export const stacksOf = (id: string) =>
  STACKS.map((s, i) => ({ ...s, i })).filter((s) => s.ids.includes(id));

// Exact name first, then the first name containing the query.
export function findSkill(query: string) {
  const v = query.trim().toLowerCase();
  if (!v) return undefined;
  const all = Object.values(skills);
  return (
    all.find((s) => s.name.toLowerCase() === v) ??
    all.find((s) => s.name.toLowerCase().includes(v))
  );
}

// Validates a selection read back from localStorage.
export function isMode(x: unknown): x is Mode {
  if (!x || typeof x !== "object") return false;
  const m = x as Record<string, unknown>;
  if (m.type === "skill")
    return typeof m.id === "string" && Object.hasOwn(skills, m.id);
  if (m.type === "domain") return DOMAINS.some((d) => d.id === m.id);
  if (m.type === "stack")
    return typeof m.i === "number" && Number.isInteger(m.i) && m.i >= 0 && m.i < STACKS.length;
  return false;
}

export const sameMode = (a: Mode, b: Mode) =>
  JSON.stringify(a) === JSON.stringify(b);
```

Run `npx prettier --write lib/atlas.ts` after writing.

- [ ] **Step 5: Run the check to verify it passes**

Run: `npm run atlas:check && npx tsc --noEmit`
Expected: `atlas: ok`, and no type errors.

If `links to unknown skills` fails, the original page silently dropped some link rows (it filtered them the same way). Print them with `node -e` or a temporary `console.log` and report them to the user. Don't edit the content to make the check pass.

- [ ] **Step 6: Commit**

```bash
git add data/atlas.ts lib/atlas.ts scripts/check-atlas.ts package.json
git commit -m "feat(atlas): port the Skill Atlas data and model to TypeScript"
```

---

### Task 2: The page in the column (header, search, guide cards)

**Files:**
- Create: `components/atlas/atlas.css`, `components/atlas/SkillGuide.tsx`, `components/atlas/Atlas.tsx`, `app/atlas/page.tsx`
- Modify: `next.config.ts` (remove the rewrite)
- Delete: `public/atlas/index.html`

**Interfaces:**
- Consumes: everything from `lib/atlas.ts` and `data/atlas.ts` (Task 1).
- Produces: `SkillGuide({ skill }: { skill: Skill })`, `h3` (class string) from `SkillGuide.tsx`; `Atlas()` from `Atlas.tsx`. Task 3 adds the wheel dialog inside `Atlas`.

- [ ] **Step 1: Write `components/atlas/atlas.css`**

```css
/* Domain colours (the original Atlas's dark palette). Anything inside a
   [data-d] element can colour itself with var(--c). */
.atlas {
  --d-mind: #9a8cff;
  --d-self: #d08ae6;
  --d-soft: #f27896;
  --d-comm: #f2a254;
  --d-tech: #4acd86;
  --d-biz: #6b9cfa;
  --d-money: #ddbb45;
  --d-earn: #f76f4f;
  --d-body: #33c6bd;
  --c: #e5e5e5;
}
.atlas [data-d="mind"] { --c: var(--d-mind); }
.atlas [data-d="self"] { --c: var(--d-self); }
.atlas [data-d="soft"] { --c: var(--d-soft); }
.atlas [data-d="comm"] { --c: var(--d-comm); }
.atlas [data-d="tech"] { --c: var(--d-tech); }
.atlas [data-d="biz"] { --c: var(--d-biz); }
.atlas [data-d="money"] { --c: var(--d-money); }
.atlas [data-d="earn"] { --c: var(--d-earn); }
.atlas [data-d="body"] { --c: var(--d-body); }

.atlas .c-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--c); flex: none; }
.atlas .c-text { color: var(--c); }
.atlas .c-border { border-color: var(--c); }
.atlas .c-marker li::marker { color: var(--c); }
```

- [ ] **Step 2: Write `components/atlas/SkillGuide.tsx`**

```tsx
import { LEVELS, type Skill } from "@/lib/atlas";

export const h3 =
  "mt-6 mb-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500";

// The full guide for one skill, shared by the guide cards and the wheel's panel.
export function SkillGuide({ skill: s }: { skill: Skill }) {
  return (
    <div className="leading-relaxed text-neutral-300">
      <h3 className={h3}>Why it matters now</h3>
      <p className="c-border border-l-2 pl-3">{s.why}</p>

      <h3 className={h3}>In depth</h3>
      <p>{s.about}</p>

      <h3 className={h3}>How to learn it</h3>
      <ul className="c-marker list-disc space-y-1.5 pl-5">
        {s.how.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>

      <h3 className={h3}>Practice plan</h3>
      <ol className="c-border space-y-3 border-l-2 pl-4">
        {s.levels.map((x, i) => (
          <li key={LEVELS[i][0]}>
            <span className="block text-neutral-100">
              {LEVELS[i][0]}{" "}
              <span className="font-mono text-[11px] text-neutral-500">
                {LEVELS[i][1]}
              </span>
            </span>
            {x}
          </li>
        ))}
      </ol>

      <h3 className={h3}>Do this today</h3>
      <p>{s.start}</p>

      <div className="grid gap-x-6 sm:grid-cols-2">
        <div>
          <h3 className={h3}>Signs you&apos;re improving</h3>
          <p>{s.signs}</p>
        </div>
        <div>
          <h3 className={h3}>Common trap</h3>
          <p>{s.trap}</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write `components/atlas/Atlas.tsx` (column part only)**

```tsx
"use client";

import { useState } from "react";
import { Section, pill } from "@/components/shared/Section";
import { DOMAINS } from "@/data/atlas";
import { domainSkills, findSkill, skills } from "@/lib/atlas";
import { SkillGuide } from "./SkillGuide";
import "./atlas.css";

export function Atlas() {
  const [query, setQuery] = useState("");
  const [miss, setMiss] = useState(false);

  // Opens the matching skill's guide card and scrolls it into view.
  function search() {
    const s = findSkill(query);
    setMiss(!s && query.trim() !== "");
    if (!s) return;
    const card = document.getElementById(`g-${s.id}`) as HTMLDetailsElement | null;
    if (!card) return;
    card.open = true;
    card.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="atlas">
      <div className="px-5 pb-8">
        <div className="flex flex-wrap gap-2">
          <input
            type="search"
            list="atlas-skills"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setMiss(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="Find a skill, e.g. Negotiation"
            aria-label="Find a skill"
            className="min-w-0 flex-1 rounded-md border border-white/10 bg-transparent px-3 py-1.5 text-neutral-100 placeholder:text-neutral-600 focus:border-white/25 focus:outline-none"
          />
          <datalist id="atlas-skills">
            {Object.values(skills).map((s) => (
              <option key={s.id} value={s.name} />
            ))}
          </datalist>
        </div>
        {miss && (
          <p className="mt-2 text-[13px] text-neutral-500" role="status">
            No skill matches “{query.trim()}”.
          </p>
        )}
      </div>

      {DOMAINS.map((d) => (
        <Section key={d.id} label={d.name.toLowerCase()}>
          <p className="mb-4 text-neutral-500">{d.desc}</p>
          {domainSkills[d.id].map((s) => (
            <details
              key={s.id}
              id={`g-${s.id}`}
              data-d={s.d}
              className="group/card scroll-mt-4 border-t border-white/[0.06]"
            >
              <summary className="grid cursor-pointer list-none gap-1 py-3 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2.5">
                  <span className="c-dot" />
                  <span className="text-neutral-100 decoration-neutral-600 underline-offset-4 group-hover/card:underline">
                    {s.name}
                  </span>
                  <span className="ml-auto font-mono text-[11px] text-neutral-600">
                    {s.links.length} links
                  </span>
                </span>
                <span className="text-neutral-500">{s.desc}</span>
              </summary>
              <div className="pb-8">
                <SkillGuide skill={s} />
              </div>
            </details>
          ))}
        </Section>
      ))}
    </div>
  );
}
```

`pill` is imported now because Task 3 uses it. If lint flags it as unused, drop the import here and add it back in Task 3.

- [ ] **Step 4: Write `app/atlas/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Atlas } from "@/components/atlas/Atlas";
import { PageHeader } from "@/components/shared/Section";
import { DOMAINS } from "@/data/atlas";
import { links, skills } from "@/lib/atlas";

const description =
  "A map of the skills that matter today and how they make each other stronger.";

export const metadata: Metadata = {
  title: "Skill Atlas | Ayroid",
  description,
  openGraph: { title: "Skill Atlas | Ayroid", description },
};

export default function AtlasPage() {
  return (
    <>
      <PageHeader
        title="Skill Atlas"
        description={`${Object.keys(skills).length} skills · ${DOMAINS.length} domains · ${links.length} connections`}
      />
      <Atlas />
    </>
  );
}
```

- [ ] **Step 5: Remove the standalone page and its rewrite**

```bash
git rm public/atlas/index.html
```

In `next.config.ts`, delete these lines:

```ts
  // The Skill Atlas is a self-contained static page in public/atlas.
  async rewrites() {
    return [{ source: "/atlas", destination: "/atlas/index.html" }];
  },
```

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit && npm run lint && npm run atlas:check`
Expected: no errors, `atlas: ok`.

Run `npm run dev`, open `http://localhost:3000/atlas` in a browser, and check:
- The navbar, footer and dot bands are present. The header reads "Skill Atlas" with the counts line.
- There are 9 `/domain` sections. Each card shows a coloured dot, name, link count and one-liner, and opens to the full guide with coloured accents.
- Typing `Negotiation` and pressing Enter opens and scrolls to the Negotiation card, not Salary Negotiation.
- Typing `zzzz` and pressing Enter shows "No skill matches “zzzz”."
- The console has no errors or hydration warnings.

- [ ] **Step 7: Commit**

```bash
git add components/atlas app/atlas next.config.ts
git commit -m "feat(atlas): render the Skill Atlas guide as a native page"
```

---

### Task 3: The wheel dialog (wheel, panel, chips)

**Files:**
- Create: `components/atlas/Wheel.tsx`, `components/atlas/Panel.tsx`
- Modify: `components/atlas/Atlas.tsx`, `components/atlas/atlas.css`

**Interfaces:**
- Consumes: `lib/atlas.ts` (Task 1); `SkillGuide`, `h3` (Task 2); `pill` from `components/shared/Section`.
- Produces: `Wheel({ mode, onSelect }: { mode: Mode; onSelect: (id: string) => void })`; `Panel({ mode, onMode }: { mode: Mode; onMode: (m: Mode) => void })`.

- [ ] **Step 1: Add wheel and dialog styles to `components/atlas/atlas.css`**

Append:

```css
/* Wheel. Everything dims except what the current selection or hover touches. */
.wheel .link { fill: none; stroke: var(--c); stroke-width: 0.9; opacity: 0.035; transition: opacity 0.2s; }
.wheel .link.on { opacity: 0.9; stroke-width: 1.7; }
.wheel .arc { fill: none; stroke: var(--c); stroke-width: 7; stroke-linecap: round; }
.wheel .dlabel { font-family: var(--font-mono); font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; fill: var(--c); }
.wheel .node { cursor: pointer; opacity: 0.22; transition: opacity 0.2s; }
.wheel .node.on { opacity: 1; }
.wheel .node:focus { outline: none; }
.wheel .node circle { fill: var(--c); stroke: var(--surface-page); stroke-width: 1.5; }
.wheel .node:focus-visible circle { stroke: #fafafa; stroke-width: 3; }
.wheel .node text { font-size: 12.5px; fill: #a3a3a3; dominant-baseline: middle; }
.wheel .node:hover text, .wheel .node.on text { fill: #f5f5f5; }
.wheel .node.on text { font-weight: 600; }
.wheel .node.sel circle { stroke: #fafafa; stroke-width: 2.5; }
.wheel .node.sel text { font-weight: 700; fill: var(--c); }
.wheel .center-t { fill: #f5f5f5; text-anchor: middle; font-size: 34px; font-weight: 600; }
.wheel .center-s { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; fill: #737373; text-anchor: middle; }

/* The page behind the open wheel must not scroll. */
html:has(.atlas-dialog[open]) { overflow: hidden; }

@media (prefers-reduced-motion: reduce) {
  .wheel .link, .wheel .node { transition: none; }
}
```

- [ ] **Step 2: Write `components/atlas/Wheel.tsx`**

```tsx
"use client";

import { useState } from "react";
import { STACKS } from "@/data/atlas";
import {
  arcs,
  domainById,
  domainSkills,
  focusOf,
  linkPaths,
  links,
  nodeLayout,
  skills,
  type Mode,
} from "@/lib/atlas";

// Hovering a skill previews its connections; leaving falls back to the selection.
export function Wheel({
  mode,
  onSelect,
}: {
  mode: Mode;
  onSelect: (id: string) => void;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const shown: Mode = hover ? { type: "skill", id: hover } : mode;
  const focus = focusOf(shown);
  // Lit links are drawn last so they sit on top of the dimmed ones.
  const order = links
    .map((_, i) => i)
    .sort((a, b) => Number(focus.links.has(a)) - Number(focus.links.has(b)));
  const [count, caption] =
    shown.type === "skill"
      ? [skills[shown.id].links.length, "connections"]
      : shown.type === "domain"
        ? [domainSkills[shown.id].length, `${domainById[shown.id].name} skills`]
        : [STACKS[shown.i].ids.length, "skills in stack"];

  return (
    <svg
      viewBox="-580 -580 1160 1160"
      role="group"
      aria-label="Skill wheel: skills grouped by domain, lines show how they strengthen each other"
      className="wheel block h-auto w-full"
    >
      {arcs.map((a) => (
        <g key={a.d} data-d={a.d}>
          <path className="arc" d={a.arc} />
          <path id={`dp-${a.d}`} d={a.label} fill="none" />
          <text className="dlabel">
            <textPath href={`#dp-${a.d}`} startOffset="50%" textAnchor="middle">
              {a.name}
            </textPath>
          </text>
        </g>
      ))}

      <g>
        {order.map((i) => (
          <path
            key={i}
            className={focus.links.has(i) ? "link on" : "link"}
            data-d={skills[links[i].a].d}
            d={linkPaths[i]}
          />
        ))}
      </g>

      <text className="center-s" y={-14}>Skill Atlas</text>
      <text className="center-t" y={22}>{count}</text>
      <text className="center-s" y={48}>{caption}</text>

      <g>
        {Object.values(skills).map((s) => {
          const n = nodeLayout(s);
          const cls = [
            "node",
            focus.nodes.has(s.id) && "on",
            mode.type === "skill" && mode.id === s.id && "sel",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <g
              key={s.id}
              className={cls}
              data-d={s.d}
              tabIndex={0}
              role="button"
              aria-label={s.name}
              onClick={() => onSelect(s.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(s.id);
                }
              }}
              onMouseEnter={() => setHover(s.id)}
              onMouseLeave={() => setHover(null)}
            >
              <circle cx={s.x.toFixed(1)} cy={s.y.toFixed(1)} r={n.r.toFixed(1)} />
              <text transform={n.transform} textAnchor={n.left ? "end" : "start"}>
                {s.name}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
```

- [ ] **Step 3: Write `components/atlas/Panel.tsx`**

```tsx
import { DOMAINS, STACKS } from "@/data/atlas";
import {
  domainById,
  domainSkills,
  skills,
  stackLinks,
  stacksOf,
  type Mode,
} from "@/lib/atlas";
import { pill } from "@/components/shared/Section";
import { SkillGuide, h3 } from "./SkillGuide";

function Row({
  id,
  title,
  note,
  onClick,
}: {
  id: string;
  title: string;
  note: string;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        data-d={skills[id].d}
        className="grid w-full cursor-pointer grid-cols-[8px_minmax(0,1fr)] items-baseline gap-x-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-white/[0.04]"
      >
        <span className="c-dot" />
        <span className="text-neutral-100">{title}</span>
        <span className="col-start-2 text-[13px] leading-snug text-neutral-500">
          {note}
        </span>
      </button>
    </li>
  );
}

const kicker = "flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider";
const title = "mt-2 mb-2 text-2xl text-neutral-100";
const order = DOMAINS.map((d) => d.id);

// What the wheel's current selection means, and where to go from it.
export function Panel({ mode, onMode }: { mode: Mode; onMode: (m: Mode) => void }) {
  const go = (id: string) => () => onMode({ type: "skill", id });

  if (mode.type === "skill") {
    const s = skills[mode.id];
    const related = [...s.links].sort(
      (a, b) => order.indexOf(skills[a.to].d) - order.indexOf(skills[b.to].d),
    );
    const stacks = stacksOf(s.id);
    return (
      <div data-d={s.d}>
        <div className={`${kicker} c-text`}>
          <span className="c-dot" />
          {domainById[s.d].full}
        </div>
        <h2 className={title}>{s.name}</h2>
        <p className="text-neutral-400">{s.desc}</p>
        <SkillGuide skill={s} />
        {stacks.length > 0 && (
          <>
            <h3 className={h3}>Part of these stacks</h3>
            <div className="flex flex-wrap gap-1.5">
              {stacks.map((st) => (
                <button
                  key={st.name}
                  className={pill}
                  onClick={() => onMode({ type: "stack", i: st.i })}
                >
                  {st.name}
                </button>
              ))}
            </div>
          </>
        )}
        <h3 className={h3}>Complements {related.length} skills</h3>
        <ul>
          {related.map((l) => (
            <Row
              key={l.to}
              id={l.to}
              title={skills[l.to].name}
              note={l.reason}
              onClick={go(l.to)}
            />
          ))}
        </ul>
      </div>
    );
  }

  if (mode.type === "domain") {
    const d = domainById[mode.id];
    return (
      <div data-d={d.id}>
        <div className={`${kicker} c-text`}>
          <span className="c-dot" />
          Domain
        </div>
        <h2 className={title}>{d.full}</h2>
        <p className="text-neutral-400">{d.desc}</p>
        <h3 className={h3}>{domainSkills[d.id].length} skills</h3>
        <ul>
          {domainSkills[d.id].map((t) => (
            <Row key={t.id} id={t.id} title={t.name} note={t.desc} onClick={go(t.id)} />
          ))}
        </ul>
      </div>
    );
  }

  const st = STACKS[mode.i];
  const inner = stackLinks(mode.i);
  return (
    <div>
      <div className={`${kicker} text-neutral-400`}>Skill stack</div>
      <h2 className={title}>{st.name}</h2>
      <p className="text-neutral-400">{st.desc}</p>
      <h3 className={h3}>The skills</h3>
      <ul>
        {st.ids.map((id) => (
          <Row key={id} id={id} title={skills[id].name} note={skills[id].desc} onClick={go(id)} />
        ))}
      </ul>
      <h3 className={h3}>Why they compound ({inner.length} links)</h3>
      <ul>
        {inner.map((l) => (
          <Row
            key={`${l.a}-${l.b}`}
            id={l.a}
            title={`${skills[l.a].name} + ${skills[l.b].name}`}
            note={l.reason}
            onClick={go(l.a)}
          />
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 4: Wire the dialog into `components/atlas/Atlas.tsx`**

Replace the imports and the top of the component with:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Section, pill } from "@/components/shared/Section";
import { DOMAINS, STACKS } from "@/data/atlas";
import {
  DEFAULT_MODE,
  domainSkills,
  findSkill,
  isMode,
  sameMode,
  skills,
  type Mode,
} from "@/lib/atlas";
import { Panel } from "./Panel";
import { SkillGuide } from "./SkillGuide";
import { Wheel } from "./Wheel";
import "./atlas.css";

const KEY = "atlas-mode";
const chip = `${pill} cursor-pointer aria-pressed:border-neutral-100 aria-pressed:bg-neutral-100 aria-pressed:text-neutral-900`;

export function Atlas() {
  const [query, setQuery] = useState("");
  const [miss, setMiss] = useState(false);
  const [mode, setModeState] = useState<Mode>(DEFAULT_MODE);
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLElement>(null);

  // Restore the last selection after hydration; storage may be unavailable.
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(KEY) ?? "null");
      if (isMode(saved)) setModeState(saved);
    } catch {}
  }, []);

  function setMode(m: Mode) {
    setModeState(m);
    try {
      localStorage.setItem(KEY, JSON.stringify(m));
    } catch {}
    const p = panel.current;
    if (!p) return;
    p.scrollTop = 0;
    // Stacked layout: bring the panel into view so the tap visibly does something.
    if (!matchMedia("(min-width: 1024px)").matches)
      p.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Clicking the active chip again goes back to the default selection.
  const toggle = (m: Mode) => setMode(sameMode(m, mode) ? DEFAULT_MODE : m);

  function openWheel(m?: Mode) {
    if (m) setModeState(m);
    dialog.current?.showModal();
    if (m)
      try {
        localStorage.setItem(KEY, JSON.stringify(m));
      } catch {}
  }
```

Keep `search()` as it is.

In the JSX, add the "Open the wheel" button after the `<datalist>`, inside the same `flex` row:

```tsx
          <button className={`${pill} cursor-pointer`} onClick={() => openWheel()}>
            Open the wheel
          </button>
```

Add a "Show on the wheel" button inside each card, after `<SkillGuide skill={s} />`:

```tsx
                <button
                  className={`${pill} mt-6 cursor-pointer`}
                  onClick={() => openWheel({ type: "skill", id: s.id })}
                >
                  Show on the wheel →
                </button>
```

Add the dialog as the last child of `<div className="atlas">`:

```tsx
      <dialog
        ref={dialog}
        aria-label="Skill wheel"
        className="atlas-dialog m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-surface-page p-0 text-[14.5px] font-light text-neutral-300 backdrop:bg-black/60"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start gap-3 border-b border-white/[0.06] p-4">
            <div className="flex flex-1 flex-wrap gap-1.5">
              {DOMAINS.map((d) => (
                <button
                  key={d.id}
                  data-d={d.id}
                  aria-pressed={mode.type === "domain" && mode.id === d.id}
                  className={chip}
                  onClick={() => toggle({ type: "domain", id: d.id })}
                >
                  <span className="c-dot" />
                  {d.name}
                </button>
              ))}
              {STACKS.map((st, i) => (
                <button
                  key={st.name}
                  aria-pressed={mode.type === "stack" && mode.i === i}
                  className={chip}
                  onClick={() => toggle({ type: "stack", i })}
                >
                  {st.name}
                </button>
              ))}
            </div>
            <form method="dialog">
              <button className={`${pill} cursor-pointer`} autoFocus>
                Close
              </button>
            </form>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:overflow-hidden">
            <div className="overflow-x-auto lg:flex lg:items-center lg:overflow-auto">
              <div className="min-w-[740px] lg:min-w-0 lg:flex-1">
                <Wheel mode={mode} onSelect={(id) => setMode({ type: "skill", id })} />
              </div>
            </div>
            <aside
              ref={panel}
              aria-live="polite"
              className="scroll-mt-0 border-t border-white/[0.06] p-5 lg:overflow-y-auto lg:border-t-0 lg:border-l"
            >
              <Panel mode={mode} onMode={setMode} />
            </aside>
          </div>
        </div>
      </dialog>
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit && npm run lint && npm run atlas:check && npm run build`
Expected: no errors, `atlas: ok`, the build lists `/atlas` as a static route.

Run `npm run dev` and check `/atlas` in a browser at 1440px wide:
- "Open the wheel" opens a full-screen dialog with the wheel on the left and the panel on the right. AI Prompting is selected by default.
- Hovering a skill lights its links and neighbours and updates the centre count. Moving off returns to the selection.
- Clicking a skill or pressing Enter on a focused one updates the panel and resets its scroll to the top.
- A domain chip lights that domain and shows it in the panel. Clicking it again returns to the default. A stack chip lights the stack's skills and inner links, and the panel shows "Why they compound".
- In the panel, a connection row, a stack pill and a stack's skill row each navigate.
- Esc and Close each shut the dialog. While it is open, scrolling doesn't move the page behind.
- "Show on the wheel →" on a card opens the dialog with that skill selected.
- Reloading `/atlas` and reopening the wheel restores the last selection.
- Setting `localStorage["atlas-mode"]` to `{"type":"skill","id":"gone"}` in devtools, then reloading and opening, falls back to AI Prompting with no error.

Repeat at 375px wide:
- The wheel scrolls sideways inside the dialog, with the panel below it.
- Tapping a skill scrolls the panel into view.
- The console has no errors or hydration warnings.

- [ ] **Step 6: Commit**

```bash
git add components/atlas
git commit -m "feat(atlas): add the skill wheel dialog with panel and filters"
```
