export default function BlogLoading() {
  return (
    <div className="flex animate-pulse flex-col gap-8">
      {/* Back Button Skeleton */}
      <div className="h-5 w-32 rounded bg-zinc-800" />

      {/* Header Skeleton */}
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-5 w-20 rounded-full bg-zinc-800" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="h-9 w-3/4 rounded bg-zinc-800" />
          <div className="h-9 w-1/2 rounded bg-zinc-800" />
        </div>

        {/* Description */}
        <div className="h-6 w-full rounded bg-zinc-800" />

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="h-4 w-32 rounded bg-zinc-800" />
          <div className="h-4 w-24 rounded bg-zinc-800" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="h-5 w-16 rounded-full bg-zinc-800" />
          <div className="h-5 w-20 rounded-full bg-zinc-800" />
        </div>
      </header>

      <hr className="border-zinc-800" />

      {/* Content Skeleton */}
      <article className="space-y-4">
        {/* Paragraphs */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-zinc-800" />
          <div className="h-4 w-full rounded bg-zinc-800" />
          <div className="h-4 w-3/4 rounded bg-zinc-800" />
        </div>

        {/* Heading */}
        <div className="mt-6 h-7 w-1/3 rounded bg-zinc-800" />

        {/* Paragraphs */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-zinc-800" />
          <div className="h-4 w-full rounded bg-zinc-800" />
          <div className="h-4 w-5/6 rounded bg-zinc-800" />
        </div>

        {/* Code Block */}
        <div className="h-40 w-full rounded-lg border border-zinc-800 bg-zinc-800/50" />

        {/* Paragraphs */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-zinc-800" />
          <div className="h-4 w-2/3 rounded bg-zinc-800" />
        </div>

        {/* Heading */}
        <div className="mt-6 h-7 w-1/4 rounded bg-zinc-800" />

        {/* List */}
        <div className="ml-4 space-y-2">
          <div className="h-4 w-3/4 rounded bg-zinc-800" />
          <div className="h-4 w-2/3 rounded bg-zinc-800" />
          <div className="h-4 w-4/5 rounded bg-zinc-800" />
        </div>

        {/* Code Block */}
        <div className="h-32 w-full rounded-lg border border-zinc-800 bg-zinc-800/50" />
      </article>

      <hr className="border-zinc-800" />

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between pb-8">
        <div className="h-5 w-24 rounded bg-zinc-800" />
      </div>
    </div>
  );
}
