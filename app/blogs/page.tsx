import Link from "next/link";
import { getAllBlogs } from "@/lib/blog-utils";
import type { BlogMeta } from "@/types";
import {
  PageHeader,
  Section,
  row,
  rowTitle,
} from "@/components/shared/Section";

const PostRow = ({ post }: { post: BlogMeta }) => (
  <Link
    href={`/blogs/${post.slug}`}
    className={`${row} grid-cols-[3rem_minmax(0,1fr)_auto] items-baseline`}
  >
    <span className="tabular text-neutral-500">
      {new Date(post.date).getFullYear()}
    </span>
    <span className={rowTitle}>{post.title}</span>
    <span className="hidden text-neutral-500 sm:block">{post.readingTime}</span>
  </Link>
);

export default function BlogsPage() {
  const blogs = getAllBlogs();
  const pinned = blogs.filter((post) => post.isPinned);
  const others = blogs.filter((post) => !post.isPinned);

  return (
    <>
      <PageHeader
        title="Blog"
        description="Tutorials and notes on development, DevOps and technology."
      />

      {pinned.length > 0 && (
        <Section label="pinned">
          {pinned.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </Section>
      )}

      <Section label={pinned.length > 0 ? "more" : "posts"}>
        {others.length > 0 ? (
          others.map((post) => <PostRow key={post.slug} post={post} />)
        ) : (
          <p className="text-neutral-500">No posts yet. Check back soon.</p>
        )}
      </Section>
    </>
  );
}
