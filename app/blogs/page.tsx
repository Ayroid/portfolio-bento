import { getAllBlogs } from "@/lib/blog-utils";
import BlogsClient from "./BlogsClient";

export default function BlogsPage() {
  const blogs = getAllBlogs();
  return <BlogsClient blogs={blogs} />;
}
