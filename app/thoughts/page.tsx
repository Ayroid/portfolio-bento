import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { desc } from "drizzle-orm";
import { FadeUpReveal, LikeButton } from "@/components/shared";
import { siteConfig } from "@/config";
import { db, schema } from "@/db";

// Re-read the feed periodically so a newly added thought appears without a
// redeploy; likes come back fresh on each regeneration.
export const revalidate = 60;

export const metadata: Metadata = {
  title: `Thoughts — ${siteConfig.name}`,
  description: "Thoughts and views about life in general.",
  openGraph: {
    title: `Thoughts — ${siteConfig.name}`,
    description: "Thoughts and views about life in general.",
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
    <div className="flex w-full flex-col gap-8 py-8">
      {/* Page Header */}
      <FadeUpReveal>
        <div className="flex flex-col gap-0">
          <div className="relative overflow-hidden border p-12 sm:p-16">
            {/* Corner decorations */}
            <div className="absolute top-3 left-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-700" />
              <div className="h-1.5 w-1.5 bg-zinc-800" />
            </div>
            <div className="absolute top-3 right-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-800" />
              <div className="h-1.5 w-1.5 bg-zinc-700" />
            </div>
            <div className="absolute bottom-3 left-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-800" />
              <div className="h-1.5 w-1.5 bg-zinc-700" />
            </div>
            <div className="absolute right-3 bottom-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-700" />
              <div className="h-1.5 w-1.5 bg-zinc-800" />
            </div>
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 3px, currentcolor 4px, currentcolor 4px, transparent 5px)",
              }}
            />
            <div className="relative flex flex-col items-center gap-4">
              <MessageCircle className="h-8 w-8 text-zinc-600 sm:h-10 sm:w-10" />
              <h1 className="text-center font-mono text-3xl font-bold tracking-wider text-white sm:text-5xl">
                THOUGHTS
              </h1>
            </div>
          </div>
          <div className="border border-t-0 p-6">
            <p className="text-center font-sans text-sm text-zinc-400 sm:text-base">
              Thoughts and views about life in general.
            </p>
          </div>
        </div>
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
