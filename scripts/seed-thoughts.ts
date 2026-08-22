/** One-off: move the thoughts that lived in data/thoughts.ts into the DB. */
import { db, schema } from "../db";
import { thoughts as seed } from "../data/thoughts";

async function main() {
  for (const t of seed) {
    const row = {
      id: t.id,
      body: t.body,
      images: t.images ?? [],
      tags: t.tags ?? [],
      source: t.source ?? null,
      postedAt: new Date(t.date),
    };
    await db
      .insert(schema.thoughts)
      .values(row)
      .onConflictDoUpdate({ target: schema.thoughts.id, set: row });
  }
  console.log(`✓ seeded ${seed.length} thoughts`);
  process.exit(0);
}

main().catch((e) => {
  console.error("✗", e.message);
  process.exit(1);
});
