"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Youtube, Podcast, Book } from "lucide-react";

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
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Recommendations
            </h1>
            <p className="mt-2 text-sm text-zinc-400 sm:text-base">
              YouTube channels, podcasts, and content that inspires me.
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

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                <h3 className="mb-1 text-lg font-semibold text-white">
                  {rec.name}
                </h3>
                {rec.creator && (
                  <p className="mb-2 text-xs text-zinc-500">{rec.creator}</p>
                )}
                <p className="text-sm leading-relaxed text-zinc-400">
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

      {/* Add More CTA */}
      <div className="flex flex-col items-center justify-center gap-4 border border-zinc-800 bg-[#18181b] py-8">
        <p className="text-center text-sm text-zinc-400">
          These are some of my favorite content creators and resources.
        </p>
      </div>
    </div>
  );
}
