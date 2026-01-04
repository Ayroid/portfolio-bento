"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowUpRight, Pin, Clock } from "lucide-react";
import Link from "next/link";
import type { BlogMeta } from "@/types";
import { FadeUpReveal, Separator } from "@/components/shared";

interface BlogCardProps {
  post: BlogMeta;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group relative block h-full bg-transparent"
    >
      {/* Card content */}
      <div className="relative flex h-full w-full flex-col overflow-hidden border border-zinc-800 bg-[#18181b] transition-all duration-300 hover:border-zinc-700">
        {/* Blog Image */}
        {post.coverImage && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          {/* Category Badge on Image */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="border-zinc-700 bg-black/70 text-xs text-white backdrop-blur-sm"
            >
              {post.category}
            </Badge>
            {post.isPinned && (
              <Badge
                variant="secondary"
                className="border-amber-800 bg-amber-900/70 text-xs text-amber-400 backdrop-blur-sm"
              >
                <Pin className="mr-1 h-3 w-3" />
                Pinned
              </Badge>
            )}
            {post.isNew && (
              <Badge
                variant="secondary"
                className="border-green-800 bg-green-900/70 text-xs text-green-400 backdrop-blur-sm"
              >
                New
              </Badge>
            )}
          </div>
        </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          {/* Title */}
          <h3 className="font-sans text-xl font-bold text-white">
            {post.title}
          </h3>

          {/* Description */}
          <p className="line-clamp-2 font-sans text-sm leading-relaxed text-zinc-400">
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
      <FadeUpReveal>
        <div className="flex flex-col gap-0">
          <div className="border p-12 sm:p-16">
            <h1 className="text-center font-mono text-3xl font-bold tracking-wider text-white sm:text-5xl">
              BLOGS
            </h1>
          </div>
          <div className="border border-t-0 p-6">
            <p className="text-center font-sans text-sm text-zinc-400 sm:text-base">
              Thoughts, tutorials, and insights on development, DevOps, and
              technology.
            </p>
          </div>
        </div>
      </FadeUpReveal>

      {/* Separator */}
      <FadeUpReveal>
        <Separator />
      </FadeUpReveal>

      {/* Popular Tags */}
      {allTags.length > 0 && (
        <FadeUpReveal>
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
        </FadeUpReveal>
      )}

      {/* Pinned Posts Section */}
      {filteredPinned.length > 0 && (
        <div className="flex flex-col gap-4">
          <FadeUpReveal>
            <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
              Pinned
            </h2>
          </FadeUpReveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredPinned.map((post) => (
              <FadeUpReveal key={post.slug} className="h-full">
                <BlogCard post={post} />
              </FadeUpReveal>
            ))}
          </div>
        </div>
      )}

      {/* All Posts Section */}
      {filteredOther.length > 0 && (
        <div className="flex flex-col gap-4">
          <FadeUpReveal>
            <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
              {filteredPinned.length > 0 ? "More Posts" : "All Posts"}
            </h2>
          </FadeUpReveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredOther.map((post) => (
              <FadeUpReveal key={post.slug} className="h-full">
                <BlogCard post={post} />
              </FadeUpReveal>
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

      <FadeUpReveal>
        <Separator />
      </FadeUpReveal>

      {/* Explore More */}
      <FadeUpReveal>
        <div className="mb-12 flex flex-col gap-4 pt-4">
          <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
            Explore More
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href="/work"
              className="group flex items-center justify-between border border-zinc-800 bg-[#18181b] p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <span className="font-sans text-lg font-semibold text-white">
                Work Experience
              </span>
              <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
            </Link>
            <Link
              href="/projects"
              className="group flex items-center justify-between border border-zinc-800 bg-[#18181b] p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <span className="font-sans text-lg font-semibold text-white">
                Projects
              </span>
              <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
            </Link>
          </div>
        </div>
      </FadeUpReveal>
    </div>
  );
}
