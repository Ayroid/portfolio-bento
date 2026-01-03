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
      <div className="relative bg-[#18181b] border border-zinc-800 h-full w-full p-5 sm:p-6 flex flex-col gap-3 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/50">
        {/* Header with badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs mb-0">
              {post.category}
            </Badge>
            {post.isPinned && (
              <Badge
                variant="secondary"
                className="text-xs mb-0 bg-amber-900/50 text-amber-400 border-amber-800"
              >
                <Pin className="w-3 h-3 mr-1" />
                Pinned
              </Badge>
            )}
            {post.isNew && (
              <Badge
                variant="secondary"
                className="text-xs mb-0 bg-green-900/50 text-green-400 border-green-800"
              >
                New
              </Badge>
            )}
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold text-base sm:text-lg leading-tight group-hover:text-zinc-100 transition-colors">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
          {post.description}
        </p>

        {/* Footer with date and reading time */}
        <div className="flex items-center gap-4 mt-auto pt-2">
          <span className="flex items-center gap-1.5 text-zinc-500 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5 text-zinc-500 text-xs">
            <Clock className="w-3.5 h-3.5" />
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
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Blog</h1>
            <p className="text-zinc-400 mt-2 text-sm sm:text-base">
              Thoughts, tutorials, and insights on development, DevOps, and
              technology.
            </p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 text-sm text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Pinned Posts Section */}
      {pinnedPosts.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
            Pinned
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pinnedPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* All Posts Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
          All Posts
        </h2>
        {otherPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : allBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4 border border-zinc-800 bg-[#18181b]">
            <p className="text-zinc-400 text-sm text-center">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
