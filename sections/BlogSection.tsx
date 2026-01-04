import React from "react";
import { BentoItem } from "@/components/BentoItem";
import { ActionCard } from "@/components/ActionCard";
import { Badge } from "@/components/ui/badge";
import FadeUpReveal from "@/components/FadeUpReveal";
/**
 * LATTICE STRUCTURE (30 columns × 10 rows)
 * Base row height: 50px
 */

interface BlogItemData {
  colSpan: number;
  rowSpan: number;
  mdColSpan: number;
  redirectTo: string;
  redirectTarget?: "_blank" | "_self" | "_parent" | "_top";
  backgroundImage: string;
  category: string;
  categoryBg: string;
  categoryText: string;
  categoryBorder: string;
  title: string;
  description: string;
  date: string;
}

interface BlogCardProps {
  blog: BlogItemData;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => (
  <BentoItem
    colSpan={10}
    rowSpan={blog.rowSpan}
    className={`${
      blog.mdColSpan === 2 ? "md:col-span-2" : "md:col-span-1"
    } overflow-hidden lg:col-span-10`}
    redirectTo={blog.redirectTo}
    redirectTarget={blog.redirectTarget || "_self"}
  >
    <div className="flex h-full w-full flex-col overflow-hidden p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <Badge variant="outline">{blog.category}</Badge>
        <p className="font-sans text-xs text-zinc-400">{blog.date}</p>
      </div>
      <h3 className="font-sans text-xl font-bold text-white">{blog.title}</h3>
      <p className="max-h-20 overflow-hidden font-sans text-xs leading-relaxed text-zinc-300 opacity-100 transition-all duration-300">
        {blog.description}
      </p>
    </div>
  </BentoItem>
);

const blogData: BlogItemData[] = [
  {
    colSpan: 10,
    rowSpan: 5,
    mdColSpan: 1,
    redirectTo: "/blogs/memory-management-paradigms",
    redirectTarget: "_self",
    backgroundImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    category: "Development",
    categoryBg: "bg-blue-900/50",
    categoryText: "text-blue-400",
    categoryBorder: "border-blue-800",
    title: "Memory Management Paradigms",
    description:
      "Explore different memory management approaches and their impact on application performance and reliability.",
    date: "9 Jun 2024",
  },
  {
    colSpan: 10,
    rowSpan: 5,
    mdColSpan: 1,
    redirectTo:
      "/blogs/from-url-to-webpage-dns-networking-and-browser-internals",
    redirectTarget: "_self",
    backgroundImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    category: "Web Development",
    categoryBg: "bg-purple-900/50",
    categoryText: "text-purple-400",
    categoryBorder: "border-purple-800",
    title: "From URL to Webpage: DNS & Networking Internals",
    description:
      "Deep dive into the journey from typing a URL to seeing a webpage rendered on your screen.",
    date: "3 Aug 2024",
  },
  {
    colSpan: 10,
    rowSpan: 5,
    mdColSpan: 1,
    redirectTo: "/blogs/dockerize-deploy-mern-stack-application-on-aws-ec2",
    redirectTarget: "_self",
    backgroundImage:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
    category: "DevOps",
    categoryBg: "bg-cyan-900/50",
    categoryText: "text-cyan-400",
    categoryBorder: "border-cyan-800",
    title: "Dockerize & Deploy a MERN Stack application on AWS EC2",
    description:
      "Learn to efficiently dockerize and deploy MERN applications on AWS EC2.",
    date: "10 Mar 2024",
  },
  {
    colSpan: 10,
    rowSpan: 5,
    mdColSpan: 2,
    redirectTo: "/blogs/build-and-manage-aws-infrastructure-with-terraform",
    redirectTarget: "_self",
    backgroundImage:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&q=80",
    category: "DevOps",
    categoryBg: "bg-green-900/50",
    categoryText: "text-green-400",
    categoryBorder: "border-green-800",
    title: "Building Scalable AWS Infrastructure with Terraform",
    description:
      "Learn to use Terraform efficiently and provision scalable infrastructure on AWS.",
    date: "11 May 2024",
  },
  {
    colSpan: 10,
    rowSpan: 5,
    mdColSpan: 1,
    redirectTo:
      "/blogs/from-chaos-to-clarity-how-conventional-commits-revolutionize-version-control",
    redirectTarget: "_self",
    backgroundImage:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
    category: "Development",
    categoryBg: "bg-orange-900/50",
    categoryText: "text-orange-400",
    categoryBorder: "border-orange-800",
    title: "Conventional Commits: Writing Better Commit Messages",
    description:
      "Discover how conventional commits and Commitizen streamline your project's history.",
    date: "10 Mar 2024",
  },
];

const BlogSection = () => {
  return (
    <FadeUpReveal>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,1fr)]"
        style={{
          gridAutoRows: "40px",
        }}
      >
        <BlogCard blog={blogData[0]} />

        <BentoItem
          colSpan={10}
          rowSpan={5}
          className="md:col-span-2 lg:col-span-10"
        >
          <ActionCard
            href="/blogs"
            label="BLOGS"
            bgColor="bg-white"
            hoverBgColor="hover:bg-[#dddddd]"
            textColor="text-black"
            iconColor="text-black"
          />
        </BentoItem>

        {blogData.slice(1).map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </FadeUpReveal>
  );
};

export default BlogSection;
