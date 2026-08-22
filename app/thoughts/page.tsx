import type { Metadata } from "next";
import Image from "next/image";
import { desc } from "drizzle-orm";
import { FadeUpReveal, LikeButton } from "@/components/shared";
import { siteConfig } from "@/config";
import { db, schema } from "@/db";

// Re-read the feed periodically so a newly added thought appears without a
// redeploy; likes come back fresh on each regeneration.
export const revalidate = 60;

export const metadata: Metadata = {
  title: `Thoughts — ${siteConfig.name}`,
  description:
    "Short notes on building things. The stuff too small for a blog post.",
  openGraph: {
    title: `Thoughts — ${siteConfig.name}`,
    description:
      "Short notes on building things. The stuff too small for a blog post.",
    url: "https://thoughts.ayroid.in",
  },
};

/** Fixed locale + UTC so the server and client agree on the rendered string. */
const formatDate = (value: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(value);

export default async function ThoughtsPage() {
  const thoughts = await db
    .select()
    .from(schema.thoughts)
    .orderBy(desc(schema.thoughts.postedAt));

  return (
    <div className="w-full py-8">
      <FadeUpReveal>
        <header className="bg-surface-card mb-6 border border-zinc-800 p-6">
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.url}
              aria-label={`${siteConfig.name} — back to the main site`}
              className="group shrink-0"
            >
              <Image
                src="/profile.jpg"
                alt={siteConfig.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover ring-1 ring-white/0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:ring-white/40"
              />
            </a>
            <div className="min-w-0">
              <h1 className="font-mono text-xl font-bold tracking-wider text-white">
                THOUGHTS
              </h1>
              <p className="font-sans text-sm text-zinc-500">
                @{siteConfig.username} · {thoughts.length} notes
              </p>
            </div>
          </div>
          <p className="mt-4 font-sans text-sm leading-relaxed text-zinc-400">
            Short notes on building things — the stuff too small for a blog
            post.
          </p>
        </header>
      </FadeUpReveal>

      <div className="flex flex-col">
        {thoughts.map((thought, index) => (
          <FadeUpReveal key={thought.id}>
            <article
              id={thought.id}
              // The stack shares borders, so only the first note keeps a top one.
              className={`bg-surface-card border border-zinc-800 p-6 transition-colors duration-300 hover:bg-white/[0.02] ${
                index === 0 ? "" : "border-t-0"
              }`}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-sm font-semibold text-white">
                  {siteConfig.name}
                </span>
                <span className="font-sans text-sm text-zinc-500">
                  @{siteConfig.username}
                </span>
                <span className="text-zinc-700" aria-hidden="true">
                  ·
                </span>
                <time
                  dateTime={thought.postedAt.toISOString()}
                  className="font-sans text-sm text-zinc-500"
                >
                  {formatDate(thought.postedAt)}
                </time>
              </div>

              {/* whitespace-pre-line keeps the line breaks written in the data file */}
              <p className="mt-2 font-sans text-[15px] leading-relaxed whitespace-pre-line text-zinc-300">
                {thought.body}
              </p>

              {thought.images && thought.images.length > 0 && (
                <div
                  className={`mt-3 grid gap-2 ${
                    thought.images.length > 1 ? "grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {thought.images.map((src) => (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      width={1200}
                      height={1200}
                      // Intrinsic ratio wins; the numbers above are only a hint.
                      className="h-auto w-full border border-zinc-800 object-cover"
                    />
                  ))}
                </div>
              )}

              <div className="mt-3 flex items-center gap-4">
                <LikeButton id={thought.id} initialLikes={thought.likes} />
                {thought.source && (
                  <a
                    href={thought.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] text-zinc-600 underline-offset-4 transition-colors hover:text-zinc-400 hover:underline"
                  >
                    originally on X
                  </a>
                )}
              </div>

              {thought.tags && thought.tags.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {thought.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-zinc-800 px-2 py-0.5 font-mono text-[11px] text-zinc-500"
                    >
                      #{tag}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </FadeUpReveal>
        ))}
      </div>
    </div>
  );
}
