import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOGS_PATH = path.join(process.cwd(), "content/blogs");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  isPinned: boolean;
  isNew: boolean;
  readingTime: string;
  content: string;
}

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  isPinned: boolean;
  isNew: boolean;
  readingTime: string;
}

// Get all blog slugs for static generation
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOGS_PATH)) return [];
  return fs
    .readdirSync(BLOGS_PATH)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

// Get all blog metadata (for listing page)
export function getAllBlogs(): BlogMeta[] {
  const slugs = getAllBlogSlugs();
  const blogs = slugs
    .map((slug) => getBlogMeta(slug))
    .filter(Boolean) as BlogMeta[];

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
    readingTime: stats.text,
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
    readingTime: stats.text,
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
