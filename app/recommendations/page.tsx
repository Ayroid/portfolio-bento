"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Youtube, Podcast, Book } from "lucide-react";
import FadeUpReveal from "@/components/shared/FadeUpReveal";

interface Recommendation {
  id: string;
  name: string;
  description: string;
  category: string;
  url?: string;
  creator?: string;
}

const recommendationsData: Recommendation[] = [
  // YouTube Channels
  {
    id: "1",
    name: "Fireship",
    creator: "Jeff Delaney",
    description: "High-intensity web development tutorials and tech news",
    category: "YouTube",
    url: "https://www.youtube.com/@Fireship",
  },
  {
    id: "2",
    name: "ThePrimeagen",
    creator: "ThePrimeagen",
    description: "Vim, coding, and developer productivity",
    category: "YouTube",
    url: "https://www.youtube.com/@ThePrimeagen",
  },
  {
    id: "3",
    name: "Web Dev Simplified",
    creator: "Kyle Cook",
    description: "Clear, concise web development tutorials",
    category: "YouTube",
    url: "https://www.youtube.com/@WebDevSimplified",
  },
  // Podcasts
  {
    id: "4",
    name: "Syntax.fm",
    creator: "Wes Bos & Scott Tolinski",
    description: "A tasty treats podcast for web developers",
    category: "Podcast",
    url: "https://syntax.fm/",
  },
  {
    id: "5",
    name: "The Changelog",
    creator: "Changelog Media",
    description: "Conversations with hackers and open source contributors",
    category: "Podcast",
    url: "https://changelog.com/podcast",
  },
];

const categories = ["All", "YouTube", "Podcast", "Blog"];

const categoryIcons = {
  YouTube: Youtube,
  Podcast: Podcast,
  Blog: Book,
  All: ExternalLink,
};

export default function RecommendationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredRecommendations =
    selectedCategory === "All"
      ? recommendationsData
      : recommendationsData.filter((rec) => rec.category === selectedCategory);

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <FadeUpReveal>
        <div className="flex flex-col gap-0">
          <div className="border p-12 sm:p-16">
            <h1 className="text-center font-mono text-3xl font-bold tracking-wider text-white sm:text-5xl">
              RECOMMENDATIONS
            </h1>
          </div>
          <div className="border border-t-0 p-6">
            <p className="text-center font-sans text-sm text-zinc-400 sm:text-base">
              YouTube channels, podcasts, and content that inspires me.
            </p>
          </div>
        </div>
      </FadeUpReveal>

      {/* Category Filter */}
      <FadeUpReveal>
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
      </FadeUpReveal>

      {/* Recommendations Grid */}
      <FadeUpReveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredRecommendations.map((rec) => {
            const Icon =
              categoryIcons[rec.category as keyof typeof categoryIcons];
            return (
              <a
                key={rec.id}
                href={rec.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col gap-3 border border-zinc-800 bg-[#18181b] p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="border border-zinc-800 bg-zinc-900 p-2 transition-colors group-hover:border-zinc-700">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <ExternalLink className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
                </div>

                <div>
                  <h3 className="mb-1 font-sans text-lg font-semibold text-white">
                    {rec.name}
                  </h3>
                  {rec.creator && (
                    <p className="mb-2 font-sans text-xs text-zinc-500">
                      {rec.creator}
                    </p>
                  )}
                  <p className="font-sans text-sm leading-relaxed text-zinc-400">
                    {rec.description}
                  </p>
                </div>

                <Badge variant="outline" className="w-fit text-xs">
                  {rec.category}
                </Badge>
              </a>
            );
          })}
        </div>
      </FadeUpReveal>

      {/* Other Lifestyle Pages */}
      <FadeUpReveal>
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
            More Lifestyle
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href="/tools"
              className="group flex items-center justify-between border border-zinc-800 bg-[#18181b] p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <span className="text-lg font-semibold text-white">
                Tools & Setup
              </span>
              <ExternalLink className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
            </Link>
            <Link
              href="/books"
              className="group flex items-center justify-between border border-zinc-800 bg-[#18181b] p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <span className="text-lg font-semibold text-white">Books</span>
              <ExternalLink className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
            </Link>
          </div>
        </div>
      </FadeUpReveal>
    </div>
  );
}
