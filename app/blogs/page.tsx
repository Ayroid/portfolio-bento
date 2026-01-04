import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowUpRight, Pin, Clock } from "lucide-react";
import Link from "next/link";
import { getAllBlogs, type BlogMeta } from "@/lib/blog-utils";

export const metadata = {
  title: "Blog | Ayroid",
  description:
    "Technical blogs about software engineering, DevOps, and technology.",
};

interface BlogCardProps {
  post: BlogMeta;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group relative block bg-transparent"
    >
      {/* Card content */}
      <div className="relative flex h-full w-full flex-col gap-3 border border-zinc-800 bg-[#18181b] p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/50 sm:p-6">
        {/* Header with badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="mb-0 text-xs">
              {post.category}
            </Badge>
            {post.isPinned && (
              <Badge
                variant="secondary"
                className="mb-0 border-amber-800 bg-amber-900/50 text-xs text-amber-400"
              >
                <Pin className="mr-1 h-3 w-3" />
                Pinned
              </Badge>
            )}
            {post.isNew && (
              <Badge
                variant="secondary"
                className="mb-0 border-green-800 bg-green-900/50 text-xs text-green-400"
              >
                New
              </Badge>
            )}
          </div>
          <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
        </div>

        {/* Title */}
        <h3 className="text-base leading-tight font-semibold text-white transition-colors group-hover:text-zinc-100 sm:text-lg">
          {post.title}
        </h3>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {post.description}
        </p>

        {/* Footer with date and reading time */}
        <div className="mt-auto flex items-center gap-4 pt-2">
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default function BlogsPage() {
  const allBlogs = getAllBlogs();
  const pinnedPosts = allBlogs.filter((post) => post.isPinned);
  const otherPosts = allBlogs.filter((post) => !post.isPinned);

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Blog</h1>
            <p className="mt-2 text-sm text-zinc-400 sm:text-base">
              Thoughts, tutorials, and insights on development, DevOps, and
              technology.
            </p>
          </div>
          <Link
            href="/"
            className="border border-zinc-800 px-4 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Pinned Posts Section */}
      {pinnedPosts.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
            Pinned
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {pinnedPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* All Posts Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
          All Posts
        </h2>
        {otherPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : allBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 border border-zinc-800 bg-[#18181b] py-12">
            <p className="text-center text-sm text-zinc-400">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
