import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getAllBlogSlugs, getBlogBySlug } from "@/lib/blog-utils";
import { MDXComponents } from "@/components/MDXComponents";
import { Badge } from "@/components/ui/badge";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
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
  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} | Ayroid`,
    description: blog.description,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Back Button */}
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blogs
      </Link>

      {/* Header */}
      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="outline" className="text-xs">
            {blog.category}
          </Badge>
          {blog.isNew && (
            <Badge
              variant="secondary"
              className="text-xs bg-green-900/50 text-green-400 border-green-800"
            >
              New
            </Badge>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
          {blog.title}
        </h1>

        <p className="text-zinc-400 text-lg">{blog.description}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(blog.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {blog.readingTime}
          </span>
        </div>

        {blog.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-zinc-500" />
            {blog.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-zinc-700 text-zinc-400 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <hr className="border-zinc-800" />

      {/* Content */}
      <article className="prose prose-invert max-w-none">
        <MDXRemote source={blog.content} components={MDXComponents} />
      </article>

      {/* Footer */}
      <hr className="border-zinc-800" />
      <div className="flex justify-between items-center pb-8">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All Blogs
        </Link>
      </div>
    </div>
  );
}
