import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, BlogMeta } from "@/types";

const BLOGS_PATH = path.join(process.cwd(), "content/blogs");

// Get all blog slugs for static generation
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOGS_PATH)) return [];
  return fs
    .readdirSync(BLOGS_PATH)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

// Get all blog metadata (for listing page) - only published posts
export function getAllBlogs(): BlogMeta[] {
  const slugs = getAllBlogSlugs();
  const blogs = slugs
    .map((slug) => getBlogMeta(slug))
    .filter((blog): blog is BlogMeta => blog !== null && blog.isPublished);

  // Sort by date (newest first), then pinned posts at top
  return blogs.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// Get blog metadata only (without content)
export function getBlogMeta(slug: string): BlogMeta | null {
  const filePath = path.join(BLOGS_PATH, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    category: data.category || "General",
    tags: data.tags || [],
    isPinned: data.isPinned || false,
    isNew: data.isNew || false,
    isPublished: data.isPublished !== false, // Default to true if not specified
    readingTime: stats.text,
    coverImage: data.coverImage || undefined,
  };
}

// Get full blog post (with content)
export function getBlogBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOGS_PATH, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    category: data.category || "General",
    tags: data.tags || [],
    isPinned: data.isPinned || false,
    isNew: data.isNew || false,
    isPublished: data.isPublished !== false, // Default to true if not specified
    readingTime: stats.text,
    coverImage: data.coverImage || undefined,
    content,
  };
}

// Get pinned blogs
export function getPinnedBlogs(): BlogMeta[] {
  return getAllBlogs().filter((blog) => blog.isPinned);
}

// Get featured blogs (for homepage)
export function getFeaturedBlogs(count: number = 5): BlogMeta[] {
  const blogs = getAllBlogs();
  const pinned = blogs.filter((b) => b.isPinned);
  const nonPinned = blogs.filter((b) => !b.isPinned);
  return [...pinned, ...nonPinned].slice(0, count);
}

// Get all unique tags from published posts
export function getAllTags(): string[] {
  const publishedBlogs = getAllBlogs();
  const tagsSet = new Set<string>();

  publishedBlogs.forEach((blog) => {
    blog.tags.forEach((tag) => {
      tagsSet.add(tag.toLowerCase());
    });
  });

  return Array.from(tagsSet).sort();
}

// Get related posts based on tags (excluding the current post)
export function getRelatedPosts(
  currentSlug: string,
  maxPosts: number = 2
): BlogMeta[] {
  const currentBlog = getBlogBySlug(currentSlug);
  if (!currentBlog || !currentBlog.isPublished) {
    return [];
  }

  const allBlogs = getAllBlogs();
  const otherBlogs = allBlogs.filter((blog) => blog.slug !== currentSlug);
  const currentTags = currentBlog.tags.map((tag) => tag.toLowerCase());

  // Calculate relevance score based on shared tags
  const blogsWithScore = otherBlogs
    .map((blog) => {
      const sharedTags = blog.tags.filter((tag) =>
        currentTags.includes(tag.toLowerCase())
      );
      return {
        blog,
        score: sharedTags.length,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const relatedPosts = blogsWithScore.slice(0, maxPosts).map((item) => item.blog);

  // If not enough related posts, fill with other posts
  if (relatedPosts.length < maxPosts) {
    const relatedSlugs = new Set(relatedPosts.map((p) => p.slug));
    const fillerPosts = otherBlogs
      .filter((blog) => !relatedSlugs.has(blog.slug))
      .slice(0, maxPosts - relatedPosts.length);
    return [...relatedPosts, ...fillerPosts];
  }

  return relatedPosts;
}
