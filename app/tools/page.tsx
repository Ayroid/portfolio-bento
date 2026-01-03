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
				<div className="flex items-center justify-between flex-wrap gap-4">
					<div>
						<h1 className="text-3xl sm:text-4xl font-bold text-white">
							Tools & Setup
						</h1>
						<p className="text-zinc-400 mt-2 text-sm sm:text-base">
							Software and tools I use daily to build and create.
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

			{/* Tools Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredTools.map((tool) => {
					const Icon =
						categoryIcons[tool.category as keyof typeof categoryIcons];
					return (
						<div
							key={tool.id}
							className="group relative bg-[#18181b] border border-zinc-800 hover:border-zinc-700 p-5 sm:p-6 flex flex-col gap-3 transition-all duration-300"
						>
							<div className="flex items-start justify-between gap-2">
								<div className="p-2 bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
									<Icon className="w-5 h-5 text-white" />
								</div>
								{tool.url && (
									<a
										href={tool.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-zinc-500 hover:text-white transition-colors"
									>
										<ExternalLink className="w-4 h-4" />
									</a>
								)}
							</div>

							<div>
								<h3 className="text-white font-semibold text-lg mb-2">
									{tool.name}
								</h3>
								<p className="text-zinc-400 text-sm leading-relaxed">
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

			{/* Add Your Own CTA */}
			<div className="flex flex-col items-center justify-center py-8 gap-4 border border-zinc-800 bg-[#18181b]">
				<p className="text-zinc-400 text-sm text-center">
					These are some of the tools I use regularly. The list is always
					evolving!
				</p>
			</div>
		</div>
	);
}
