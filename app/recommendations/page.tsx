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
				<div className="flex items-center justify-between flex-wrap gap-4">
					<div>
						<h1 className="text-3xl sm:text-4xl font-bold text-white">
							Recommendations
						</h1>
						<p className="text-zinc-400 mt-2 text-sm sm:text-base">
							YouTube channels, podcasts, and content that inspires me.
						</p>
					</div>
					<Link
						href="/"
						className="px-4 py-2 text-sm text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-colors"
					>
						← Back to Home
					</Link>
				</div>
			</div>

			{/* Category Filter */}
			<div className="flex gap-2 flex-wrap">
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => setSelectedCategory(category)}
						className={`px-4 py-2 text-sm border transition-colors ${
							selectedCategory === category
								? "bg-white text-black border-white"
								: "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
						}`}
					>
						{category}
					</button>
				))}
			</div>

			{/* Recommendations Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredRecommendations.map((rec) => {
					const Icon = categoryIcons[rec.category as keyof typeof categoryIcons];
					return (
						<a
							key={rec.id}
							href={rec.url}
							target="_blank"
							rel="noopener noreferrer"
							className="group relative bg-[#18181b] border border-zinc-800 hover:border-zinc-700 p-5 sm:p-6 flex flex-col gap-3 transition-all duration-300"
						>
							<div className="flex items-start justify-between gap-2">
								<div className="p-2 bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
									<Icon className="w-5 h-5 text-white" />
								</div>
								<ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
							</div>

							<div>
								<h3 className="text-white font-semibold text-lg mb-1">
									{rec.name}
								</h3>
								{rec.creator && (
									<p className="text-zinc-500 text-xs mb-2">{rec.creator}</p>
								)}
								<p className="text-zinc-400 text-sm leading-relaxed">
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
			<div className="flex flex-col items-center justify-center py-8 gap-4 border border-zinc-800 bg-[#18181b]">
				<p className="text-zinc-400 text-sm text-center">
					These are some of my favorite content creators and resources.
				</p>
			</div>
		</div>
	);
}
