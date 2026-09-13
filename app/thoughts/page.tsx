import type { Metadata } from "next";
import Image from "next/image";
import { desc } from "drizzle-orm";
import { LikeButton } from "@/components/shared";
import { PageHeader } from "@/components/shared/Section";
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
    <>
      <PageHeader
        title="Thoughts"
        description="Thoughts and views about life in general."
      />

      {thoughts.map((thought) => (
        <article
          key={thought.id}
          id={thought.id}
          className="border-t border-white/[0.06] px-5 py-6"
        >
          <div className="flex items-baseline gap-2 text-[13px] text-neutral-500">
            <span className="text-neutral-200">{siteConfig.name}</span>
            <span>@{siteConfig.username}</span>
            <span className="text-neutral-700" aria-hidden="true">
              ·
            </span>
            <time dateTime={thought.postedAt.toISOString()}>
              {formatDate(thought.postedAt)}
            </time>
          </div>

          {/* whitespace-pre-line keeps the line breaks written in the data file */}
          <p className="mt-2 leading-relaxed whitespace-pre-line text-neutral-300">
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
                  className="h-auto w-full rounded-md border border-white/10 object-cover"
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
                className="text-[12px] text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-400 hover:underline"
              >
                originally on X
              </a>
            )}
          </div>

          {thought.tags && thought.tags.length > 0 && (
            <p className="mt-3 font-mono text-[11px] text-neutral-600">
              {thought.tags.map((tag) => `#${tag}`).join(" ")}
            </p>
          )}
        </article>
      ))}
    </>
  );
}
