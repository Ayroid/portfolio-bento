import React from "react";
import { BentoItem } from "@/components/shared/BentoItem";
import { ActionCard } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/shared";
import { blogs, type BlogItemData } from "@/data/blog-data";

/**
 * LATTICE STRUCTURE (30 columns × 10 rows)
 * Base row height: 50px
 */

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

export const BlogSection = () => {
  return (
    <>
      <Separator />
      <div
        className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,1fr)]"
        style={{
          gridAutoRows: "40px",
        }}
      >
        {/* BLOGS CTA - Mobile (shown first on mobile) */}
        <BentoItem
          colSpan={10}
          rowSpan={5}
          className="lg:hidden"
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

        {/* First blog */}
        <BlogCard blog={blogs[0]} />

        {/* BLOGS CTA - Desktop (shown after first blog on desktop) */}
        <BentoItem
          colSpan={10}
          rowSpan={5}
          className="hidden lg:block md:col-span-2 lg:col-span-10"
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
        {blogs.slice(1).map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
      <Separator />
    </>
  );
};
