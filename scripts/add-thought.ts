/**
 * Add a thought from an X post URL:
 *   npm run thought:add -- https://x.com/ayroids/status/123 [--tags life,css]
 *
 * Content comes from api.fxtwitter.com, a free no-auth mirror of X's public
 * post data. Nothing here needs an X API key.
 */
import { db, schema } from "../db";

type FxPhoto = { url: string };
type FxTweet = {
  text: string;
  created_at: string;
  media?: { photos?: FxPhoto[] };
  author?: { screen_name?: string };
};

/** Turns the first words of a post into a stable, readable slug. */
export function slugify(text: string, id: string): string {
  const words = text
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6)
    .join("-");
  return words || `post-${id}`;
}

export function parseStatusUrl(url: string): { user: string; id: string } {
  const m = url.match(
    /(?:twitter\.com|x\.com)\/([^/]+)\/status(?:es)?\/(\d+)/i
  );
  if (!m) throw new Error(`Not an X post URL: ${url}`);
  return { user: m[1], id: m[2] };
}

async function main() {
  const [url, ...rest] = process.argv.slice(2);
  if (!url) throw new Error("Usage: npm run thought:add -- <x-post-url>");

  const tagArg = rest.indexOf("--tags");
  const tags =
    tagArg === -1 ? [] : (rest[tagArg + 1] ?? "").split(",").filter(Boolean);

  const { user, id } = parseStatusUrl(url);

  const res = await fetch(`https://api.fxtwitter.com/${user}/status/${id}`);
  if (!res.ok) throw new Error(`fxtwitter returned ${res.status}`);
  const tweet: FxTweet = (await res.json()).tweet;

  const row = {
    id: slugify(tweet.text, id),
    body: tweet.text,
    images: (tweet.media?.photos ?? []).map((p) => p.url),
    tags,
    source: `https://x.com/${user}/status/${id}`,
    postedAt: new Date(tweet.created_at),
  };

  await db
    .insert(schema.thoughts)
    .values(row)
    .onConflictDoUpdate({ target: schema.thoughts.id, set: row });

  console.log(`✓ ${row.id}`);
  console.log(`  ${row.body.slice(0, 70).replace(/\n/g, " ")}...`);
  console.log(
    `  ${row.images.length} image(s), posted ${row.postedAt.toISOString().slice(0, 10)}`
  );
  process.exit(0);
}

if (process.argv[1]?.includes("add-thought")) {
  main().catch((e) => {
    console.error("✗", e.message);
    process.exit(1);
  });
}
