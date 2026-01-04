"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Code, Terminal, Layout, Wrench } from "lucide-react";

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  url?: string;
  icon?: string;
}

const toolsData: Tool[] = [
  // Development Tools
  {
    id: "1",
    name: "VS Code",
    description: "Primary code editor with extensive extensions",
    category: "Development",
    url: "https://code.visualstudio.com/",
  },
  {
    id: "2",
    name: "Warp",
    description: "Modern terminal with AI-powered command suggestions",
    category: "Development",
    url: "https://www.warp.dev/",
  },
  {
    id: "3",
    name: "Postman",
    description: "API development and testing platform",
    category: "Development",
    url: "https://www.postman.com/",
  },
  // Productivity
  {
    id: "4",
    name: "Notion",
    description: "All-in-one workspace for notes and documentation",
    category: "Productivity",
    url: "https://www.notion.so/",
  },
  {
    id: "5",
    name: "Obsidian",
    description: "Local-first knowledge base and note-taking",
    category: "Productivity",
    url: "https://obsidian.md/",
  },
  // Design
  {
    id: "6",
    name: "Figma",
    description: "Collaborative interface design tool",
    category: "Design",
    url: "https://www.figma.com/",
  },
];

const categories = ["All", "Development", "Productivity", "Design"];

const categoryIcons = {
  Development: Code,
  Productivity: Layout,
  Design: Wrench,
  All: Terminal,
};

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools =
    selectedCategory === "All"
      ? toolsData
      : toolsData.filter((tool) => tool.category === selectedCategory);

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Tools & Setup
            </h1>
            <p className="mt-2 text-sm text-zinc-400 sm:text-base">
              Software and tools I use daily to build and create.
            </p>
          </div>
          <Link
            href="/"
            className="border border-zinc-800 px-4 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`border px-4 py-2 text-sm transition-colors ${
              selectedCategory === category
                ? "border-white bg-white text-black"
                : "border-zinc-800 bg-transparent text-zinc-400 hover:border-zinc-700 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredTools.map((tool) => {
          const Icon =
            categoryIcons[tool.category as keyof typeof categoryIcons];
          return (
            <div
              key={tool.id}
              className="group relative flex flex-col gap-3 border border-zinc-800 bg-[#18181b] p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="border border-zinc-800 bg-zinc-900 p-2 transition-colors group-hover:border-zinc-700">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                {tool.url && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 transition-colors hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {tool.name}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {tool.description}
                </p>
              </div>

              <Badge variant="outline" className="w-fit text-xs">
                {tool.category}
              </Badge>
            </div>
          );
        })}
      </div>

      {/* Other Lifestyle Pages */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
          More Lifestyle
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link
            href="/books"
            className="group flex items-center justify-between border border-zinc-800 bg-[#18181b] p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
          >
            <span className="text-lg font-semibold text-white">Books</span>
            <ExternalLink className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
          </Link>
          <Link
            href="/recommendations"
            className="group flex items-center justify-between border border-zinc-800 bg-[#18181b] p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
          >
            <span className="text-lg font-semibold text-white">
              Recommendations
            </span>
            <ExternalLink className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
}
