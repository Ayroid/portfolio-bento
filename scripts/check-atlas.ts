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
assert.equal(
  Object.keys(skills).length,
  SKILL_ROWS.length,
  "duplicate skill ids"
);
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
  "skill outside every domain"
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
    STACKS[0].ids.includes(links[i].a) && STACKS[0].ids.includes(links[i].b)
  );

// Search: exact name beats partial, case and spaces ignored, misses are undefined.
assert.equal(findSkill("Negotiation")?.id, "negotiate");
assert.equal(findSkill("  SALES ")?.id, "sales");
assert.ok(findSkill("negoti"));
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
