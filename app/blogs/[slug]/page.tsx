import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";
import {
  getAllBlogSlugs,
  getBlogBySlug,
  getRelatedPosts,
} from "@/lib/blog-utils";
import { MDXComponents } from "@/components/shared";
import {
  PageHeader,
  Section,
  row,
  rowTitle,
} from "@/components/shared/Section";

// Enable ISR - regenerate every 24 hours
export const revalidate = 86400;

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

// Content skeleton for streaming
function ContentSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 w-full rounded bg-white/[0.04]" />
      <div className="h-4 w-full rounded bg-white/[0.04]" />
      <div className="h-4 w-3/4 rounded bg-white/[0.04]" />
      <div className="h-32 w-full rounded-md bg-white/[0.04]" />
    </div>
  );
}

// Async component for MDX content - enables streaming
async function BlogContent({ content }: { content: string }) {
  return (
    <article className="font-normal">
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

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog || !blog.isPublished) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 2);

  return (
    <>
      <PageHeader title={blog.title} description={blog.description}>
        <p className="mt-3 text-[13px] text-neutral-500">
          {new Date(blog.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · {blog.readingTime} · {blog.category}
        </p>
      </PageHeader>

      {blog.coverImage && (
        <div className="border-t border-white/[0.06] px-5 py-8">
          <div className="relative aspect-video overflow-hidden rounded-md border border-white/10">
            <Image
              src={blog.coverImage}
              alt=""
              fill
              sizes="600px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="border-t border-white/[0.06] px-5 py-8">
        <Suspense fallback={<ContentSkeleton />}>
          <BlogContent content={blog.content} />
        </Suspense>
      </div>

      {relatedPosts.length > 0 && (
        <Section label="related">
          {relatedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className={`${row} grid-cols-[3rem_1fr] items-baseline`}
            >
              <span className="text-neutral-500 tabular-nums">
                {new Date(post.date).getFullYear()}
              </span>
              <span className={rowTitle}>{post.title}</span>
            </Link>
          ))}
        </Section>
      )}
    </>
  );
}
