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
  redirectTo: string;
  redirectTarget?: "_blank" | "_self" | "_parent" | "_top";
  category: string;
  title: string;
  description: string;
  date: string;
}

interface BlogCardProps {
  blog: BlogItemData;
  colSpan?: number;
  rowSpan?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  colSpan = 10,
  rowSpan = 5,
}) => (
  <BentoItem
    colSpan={colSpan}
    rowSpan={rowSpan}
    className="group md:col-span-1 lg:col-span-10"
    redirectTo={blog.redirectTo}
    redirectTarget={blog.redirectTarget || "_self"}
  >
    <div className="flex h-full flex-col justify-between p-6">
      {/* Top: Category & Date */}
      <div className="flex items-center justify-between">
        <Badge
          variant="outline"
          className="border-zinc-700 bg-transparent font-sans text-xs text-zinc-400"
        >
          {blog.category}
        </Badge>
        <span className="font-sans text-xs text-zinc-500">{blog.date}</span>
      </div>

      {/* Middle: Title & Description */}
      <div className="flex flex-1 flex-col justify-center py-4">
        <h3 className="font-sans text-lg leading-tight font-semibold text-white transition-colors group-hover:text-zinc-200 sm:text-xl">
          {blog.title}
        </h3>
        <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-zinc-400">
          {blog.description}
        </p>
      </div>
    </div>
  </BentoItem>
);

const blogData: BlogItemData[] = [
  {
    redirectTo: "/blogs/memory-management-paradigms",
    redirectTarget: "_self",
    category: "Development",
    title: "Memory Management Paradigms",
    description:
      "Explore different memory management approaches and their impact on application performance and reliability.",
    date: "9 Jun 2024",
  },
  {
    redirectTo:
      "/blogs/from-url-to-webpage-dns-networking-and-browser-internals",
    redirectTarget: "_self",
    category: "Web Development",
    title: "From URL to Webpage: DNS & Networking Internals",
    description:
      "Deep dive into the journey from typing a URL to seeing a webpage rendered on your screen.",
    date: "3 Aug 2024",
  },
  {
    redirectTo: "/blogs/dockerize-deploy-mern-stack-application-on-aws-ec2",
    redirectTarget: "_self",
    category: "DevOps",
    title: "Dockerize & Deploy a MERN Stack application on AWS EC2",
    description:
      "Learn to efficiently dockerize and deploy MERN applications on AWS EC2.",
    date: "10 Mar 2024",
  },
  {
    redirectTo: "/blogs/build-and-manage-aws-infrastructure-with-terraform",
    redirectTarget: "_self",
    category: "DevOps",
    title: "Building Scalable AWS Infrastructure with Terraform",
    description:
      "Learn to use Terraform efficiently and provision scalable infrastructure on AWS.",
    date: "11 May 2024",
  },
  {
    redirectTo:
      "/blogs/from-chaos-to-clarity-how-conventional-commits-revolutionize-version-control",
    redirectTarget: "_self",
    category: "Development",
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
        {/* First blog */}
        <BlogCard blog={blogData[0]} />

        {/* BLOGS CTA */}
        <BentoItem
          colSpan={10}
          rowSpan={5}
          className="md:col-span-2 lg:col-span-10"
        >
          <ActionCard
            href="/blogs"
            label="BLOGS"
            bgColor="bg-accent"
            hoverBgColor="hover:bg-accent-hover"
            textColor="text-accent-foreground"
            iconColor="text-accent-foreground"
          />
        </BentoItem>

        {/* Remaining blogs */}
        {blogData.slice(1).map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </FadeUpReveal>
  );
};

export default BlogSection;
