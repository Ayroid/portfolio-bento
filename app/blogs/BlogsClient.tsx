"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowUpRight, Pin, Clock } from "lucide-react";
import Link from "next/link";
import { type BlogMeta } from "@/lib/blog-utils";

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

interface BlogsClientProps {
  blogs: BlogMeta[];
}

export default function BlogsClient({ blogs }: BlogsClientProps) {
  const [selectedTag, setSelectedTag] = useState("All");

  // Get all unique tags
  const allTags = Array.from(
    new Set(blogs.flatMap((post) => post.tags))
  ).sort();

  // Filter blogs by tag
  const filterByTag = (posts: BlogMeta[]) => {
    if (selectedTag === "All") return posts;
    return posts.filter((post) => post.tags.includes(selectedTag));
  };

  const pinnedPosts = blogs.filter((post) => post.isPinned);
  const otherPosts = blogs.filter((post) => !post.isPinned);

  const filteredPinned = filterByTag(pinnedPosts);
  const filteredOther = filterByTag(otherPosts);

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

      {/* Popular Tags */}
      {allTags.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
            Popular Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag("All")}
              className={`border px-3 py-1.5 text-xs transition-colors ${
                selectedTag === "All"
                  ? "border-white bg-white text-black"
                  : "border-zinc-800 bg-transparent text-zinc-400 hover:border-zinc-700 hover:text-white"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => {
              const count = blogs.filter((post) =>
                post.tags.includes(tag)
              ).length;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`border px-3 py-1.5 text-xs transition-colors ${
                    selectedTag === tag
                      ? "border-white bg-white text-black"
                      : "border-zinc-800 bg-transparent text-zinc-400 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  {tag} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Pinned Posts Section */}
      {filteredPinned.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
            Pinned
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredPinned.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* All Posts Section */}
      {filteredOther.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
            {filteredPinned.length > 0 ? "More Posts" : "All Posts"}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredOther.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredPinned.length === 0 && filteredOther.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          {blogs.length === 0 ? (
            <p className="text-center text-zinc-400">
              No blog posts yet. Check back soon!
            </p>
          ) : (
            <>
              <p className="text-center text-zinc-400">
                No posts found with tag &quot;{selectedTag}&quot;
              </p>
              <button
                onClick={() => setSelectedTag("All")}
                className="bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
              >
                Clear Filter
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
