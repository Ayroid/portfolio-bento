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
    id,
    d,
    name,
    desc,
    why,
    start,
    about,
    how,
    levels,
    signs,
    trap,
    links: [],
    angle: 0,
    x: 0,
    y: 0,
  };
}

export const links = LINK_ROWS.filter(([a, b]) => skills[a] && skills[b]).map(
  ([a, b, reason]) => ({ a, b, reason })
);
links.forEach((l, i) => {
  skills[l.a].links.push({ to: l.b, reason: l.reason, i });
  skills[l.b].links.push({ to: l.a, reason: l.reason, i });
});

export const domainById = Object.fromEntries(
  DOMAINS.map((d) => [d.id, d])
) as Record<DomainId, Domain>;

export const domainSkills = Object.fromEntries(
  DOMAINS.map((d) => [
    d.id,
    SKILL_ROWS.filter((r) => r[1] === d.id).map((r) => skills[r[0]]),
  ])
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
  const mid = ((((a0 + a1) / 2) % 360) + 360) % 360;
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
    return (
      typeof m.i === "number" &&
      Number.isInteger(m.i) &&
      m.i >= 0 &&
      m.i < STACKS.length
    );
  return false;
}

export const sameMode = (a: Mode, b: Mode) =>
  JSON.stringify(a) === JSON.stringify(b);
