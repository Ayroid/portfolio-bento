import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";
import { ArrowLeft, Calendar, Clock, Tag, ArrowUpRight } from "lucide-react";
import {
  getAllBlogSlugs,
  getBlogBySlug,
  getRelatedPosts,
} from "@/lib/blog-utils";
import type { BlogMeta } from "@/types";
import { MDXComponents } from "@/components/shared/MDXComponents";
import { Badge } from "@/components/ui/badge";
import FadeUpReveal from "@/components/shared/FadeUpReveal";

// Enable ISR - regenerate every 24 hours
export const revalidate = 86400;

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

// Content skeleton for streaming
function ContentSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-zinc-800" />
        <div className="h-4 w-full rounded bg-zinc-800" />
        <div className="h-4 w-3/4 rounded bg-zinc-800" />
      </div>
      <div className="mt-6 h-7 w-1/3 rounded bg-zinc-800" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-zinc-800" />
        <div className="h-4 w-5/6 rounded bg-zinc-800" />
      </div>
      <div className="h-40 w-full rounded-lg border border-zinc-800 bg-zinc-800/50" />
    </div>
  );
}

// Async component for MDX content - enables streaming
// Uses CSS animation instead of IntersectionObserver for compatibility with streaming
async function BlogContent({ content }: { content: string }) {
  return (
    <article className="prose prose-invert animate-in fade-in slide-in-from-bottom-[30px] fill-mode-both max-w-none duration-800 ease-out">
      <MDXRemote
        source={content}
        components={MDXComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [
                rehypeShiki,
                {
                  theme: "github-dark",
                },
              ],
            ],
          },
        }}
      />
    </article>
  );
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog || !blog.isPublished) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} | Ayroid`,
    description: blog.description,
  };
}

// Related post card component
function RelatedPostCard({ post }: { post: BlogMeta }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group relative block h-full bg-transparent"
    >
      <div className="relative flex h-full w-full flex-col gap-3 border border-zinc-800 bg-[#18181b] p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/50">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="outline" className="text-xs">
            {post.category}
          </Badge>
          <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
        </div>
        <h3 className="line-clamp-2 font-sans text-base leading-tight font-semibold text-white transition-colors group-hover:text-zinc-100">
          {post.title}
        </h3>
        <p className="line-clamp-2 font-sans text-sm leading-relaxed text-zinc-400">
          {post.description}
        </p>
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
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog || !blog.isPublished) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <div className="flex flex-col gap-8">
      {/* Back Button */}
      <FadeUpReveal>
        <Link
          href="/blogs"
          className="inline-flex w-fit items-center gap-2 text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Link>
      </FadeUpReveal>

      {/* Header */}
      <FadeUpReveal>
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="text-xs">
              {blog.category}
            </Badge>
            {blog.isNew && (
              <Badge
                variant="secondary"
                className="border-green-800 bg-green-900/50 text-xs text-green-400"
              >
                New
              </Badge>
            )}
          </div>

          <h1 className="font-mono text-3xl leading-tight font-bold text-white sm:text-4xl">
            {blog.title}
          </h1>

          <p className="font-sans text-lg text-zinc-400">{blog.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(blog.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {blog.readingTime}
            </span>
          </div>

          {blog.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-zinc-500" />
              {blog.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-zinc-700 text-xs text-zinc-400"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>
      </FadeUpReveal>

      <hr className="border-zinc-800" />

      {/* Content - Streamed with Suspense */}
      <Suspense fallback={<ContentSkeleton />}>
        <BlogContent content={blog.content} />
      </Suspense>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <>
          <hr className="border-zinc-800" />
          <FadeUpReveal>
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((post) => (
                  <RelatedPostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </FadeUpReveal>
        </>
      )}

      {/* Footer */}
      <hr className="border-zinc-800" />
      <FadeUpReveal>
        <div className="flex items-center justify-between pb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Blogs
          </Link>
        </div>
      </FadeUpReveal>
    </div>
  );
}
