"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Youtube, Podcast, Sparkles } from "lucide-react";
import { FadeUpReveal, Separator } from "@/components/shared";
import { recommendationsData } from "@/data/recommendations";

const categories = ["All", "Engineering", "Podcast"];

const categoryIcons = {
  YouTube: Youtube,
  Podcast: Podcast,
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
          <div className="relative overflow-hidden border p-12 sm:p-16">
            {/* Corner decorations */}
            <div className="absolute top-3 left-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-700" />
              <div className="h-1.5 w-1.5 bg-zinc-800" />
            </div>
            <div className="absolute top-3 right-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-800" />
              <div className="h-1.5 w-1.5 bg-zinc-700" />
            </div>
            <div className="absolute bottom-3 left-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-800" />
              <div className="h-1.5 w-1.5 bg-zinc-700" />
            </div>
            <div className="absolute right-3 bottom-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-700" />
              <div className="h-1.5 w-1.5 bg-zinc-800" />
            </div>
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 3px, currentcolor 4px, currentcolor 4px, transparent 5px)",
              }}
            />
            <div className="relative flex flex-col items-center gap-4">
              <Sparkles className="h-8 w-8 text-zinc-600 sm:h-10 sm:w-10" />
              <h1 className="text-center font-mono text-3xl font-bold tracking-wider text-white sm:text-5xl">
                RECOMMENDATIONS
              </h1>
            </div>
          </div>
          <div className="border border-t-0 p-6">
            <p className="text-center font-sans text-sm text-zinc-400 sm:text-base">
              YouTube channels, podcasts, and content that inspires me.
            </p>
          </div>
        </div>
      </FadeUpReveal>

      {/* Separator */}
      <FadeUpReveal>
        <Separator />
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
              <div
                key={rec.id}
                className="group relative flex flex-col gap-3 border border-zinc-800 bg-surface-card p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center justify-center gap-3 p-2 transition-colors group-hover:border-zinc-700">
                    {rec.icon ? (
                      <Image
                        src={rec.icon}
                        alt={rec.name}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <Icon className="h-8 w-8 text-white" />
                    )}
                    <div>
                      <h3 className="font-sans text-xl font-semibold text-white">
                        {rec.name}
                      </h3>
                      {rec.creator && (
                        <p className="font-sans text-xs text-zinc-500">
                          {rec.creator}
                        </p>
                      )}
                    </div>
                  </div>
                  {rec.url && (
                    <a
                      href={rec.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 transition-colors hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <div>
                  <p className="font-sans text-sm leading-relaxed text-zinc-400">
                    {rec.description}
                  </p>
                </div>

                <Badge variant="outline" className="w-fit text-xs">
                  {rec.category}
                </Badge>
              </div>
            );
          })}
        </div>
      </FadeUpReveal>

      {/* Separator */}
      <FadeUpReveal>
        <Separator />
      </FadeUpReveal>

      {/* Other Lifestyle Pages */}
      <FadeUpReveal>
        <div className="mb-12 flex flex-col gap-4 pt-4">
          <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
            More Lifestyle
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href="/tools"
              className="group flex items-center justify-between border border-zinc-800 bg-surface-card p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <span className="text-lg font-semibold text-white">
                Tools & Setup
              </span>
              <ExternalLink className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
            </Link>
            <Link
              href="/books"
              className="group flex items-center justify-between border border-zinc-800 bg-surface-card p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
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
