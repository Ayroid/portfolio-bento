"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Star, Calendar } from "lucide-react";
import { projectsData, statusColors } from "@/lib/projects-data";

interface ProjectCardProps {
	project: (typeof projectsData)[0];
}

const ProjectCard = ({ project }: ProjectCardProps) => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		setMousePosition({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		});
	};

	return (
		<Link
			href={`/projects/${project.slug}`}
			className="group relative block bg-transparent"
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Hover glow effect */}
			<div
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
				style={{
					background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
					opacity: isHovered ? 1 : 0,
					zIndex: 3,
				}}
			/>

			{/* Border glow effect */}
			<div
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
				style={{
					background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3), transparent 40%)`,
					opacity: isHovered ? 1 : 0,
					zIndex: 1,
				}}
			/>

			{/* Card content */}
			<div
				className="relative bg-[#18181b] border border-zinc-800 h-full w-full flex flex-col overflow-hidden transition-colors duration-300"
				style={{ zIndex: 2 }}
			>
				{/* Project Image */}
				<div className="relative h-48 w-full overflow-hidden">
					<Image
						src={project.image}
						alt={project.title}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-300"
					/>
					{/* Status Badge on Image */}
					<div className="absolute top-3 right-3">
						<div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-zinc-800">
							<span
								className={`w-2 h-2 rounded-full ${statusColors[project.status]}`}
							/>
							<span className="text-white text-xs font-medium">
								{project.status}
							</span>
						</div>
					</div>
				</div>

				{/* Content */}
				<div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
					{/* Header with badges */}
					<div className="flex items-center justify-between gap-2 flex-wrap">
						<div className="flex items-center gap-2 flex-wrap">
							<Badge variant="outline" className="text-xs mb-0">
								{project.category}
							</Badge>
							{project.featured && (
								<Badge
									variant="secondary"
									className="text-xs mb-0 bg-amber-900/50 text-amber-400 border-amber-800"
								>
									<Star className="w-3 h-3 mr-1 fill-amber-400" />
									Featured
								</Badge>
							)}
						</div>
						<ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					</div>

					{/* Title */}
					<h3 className="text-white font-semibold text-base sm:text-lg leading-tight group-hover:text-zinc-100 transition-colors">
						{project.title}
					</h3>

					{/* Description */}
					<p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 flex-1">
						{project.description}
					</p>

					{/* Footer with date */}
					{project.date && (
						<div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
							<Calendar className="w-3.5 h-3.5 text-zinc-500" />
							<span className="text-zinc-500 text-xs">{project.date}</span>
						</div>
					)}
				</div>
			</div>
		</Link>
	);
};

export default function ProjectsPage() {
	const [selectedTag, setSelectedTag] = useState("All");
	const featuredProjects = projectsData.filter((project) => project.featured);
	const otherProjects = projectsData.filter((project) => !project.featured);

	// Get all unique tags
	const allTags = Array.from(
		new Set(projectsData.flatMap((project) => project.tags))
	).sort();

	// Filter projects by tag
	const filterByTag = (projects: typeof projectsData) => {
		if (selectedTag === "All") return projects;
		return projects.filter((project) => project.tags.includes(selectedTag));
	};

	const filteredFeatured = filterByTag(featuredProjects);
	const filteredOther = filterByTag(otherProjects);

	return (
		<div className="flex flex-col gap-8">
			{/* Page Header */}
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between flex-wrap gap-4">
					<div>
						<h1 className="text-3xl sm:text-4xl font-bold text-white">
							Projects
						</h1>
						<p className="text-zinc-400 mt-2 text-sm sm:text-base">
							A collection of web applications, tools, and experiments I've built.
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

			{/* Popular Tags */}
			<div className="flex flex-col gap-3">
				<h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
					Popular Tags
				</h2>
				<div className="flex gap-2 flex-wrap">
					<button
						onClick={() => setSelectedTag("All")}
						className={`px-3 py-1.5 text-xs border transition-colors ${
							selectedTag === "All"
								? "bg-white text-black border-white"
								: "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
						}`}
					>
						All
					</button>
					{allTags.map((tag) => {
						const count = projectsData.filter((project) =>
							project.tags.includes(tag)
						).length;
						return (
							<button
								key={tag}
								onClick={() => setSelectedTag(tag)}
								className={`px-3 py-1.5 text-xs border transition-colors ${
									selectedTag === tag
										? "bg-white text-black border-white"
										: "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
								}`}
							>
								{tag} ({count})
							</button>
						);
					})}
				</div>
			</div>

			{/* Featured Projects Section */}
			{filteredFeatured.length > 0 && (
				<div className="flex flex-col gap-4">
					<h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
						Featured
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{filteredFeatured.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
				</div>
			)}

			{/* All Projects Section */}
			{filteredOther.length > 0 && (
				<div className="flex flex-col gap-4">
					<h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
						{filteredFeatured.length > 0 ? "More Projects" : "All Projects"}
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{filteredOther.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
				</div>
			)}

			{/* No Results */}
			{filteredFeatured.length === 0 && filteredOther.length === 0 && (
				<div className="flex flex-col items-center justify-center py-12 gap-4">
					<p className="text-zinc-400 text-center">
						No projects found with tag "{selectedTag}"
					</p>
					<button
						onClick={() => setSelectedTag("All")}
						className="px-4 py-2 bg-white hover:bg-zinc-200 text-black font-medium text-sm transition-colors"
					>
						Clear Filter
					</button>
				</div>
			)}

			{/* GitHub CTA */}
			<div className="flex flex-col items-center justify-center py-8 gap-4 border border-zinc-800 bg-[#18181b]">
				<p className="text-zinc-400 text-sm text-center">
					Want to see more? Check out my GitHub for additional projects and contributions.
				</p>
				<a
					href="https://github.com/ayroid"
					target="_blank"
					rel="noopener noreferrer"
					className="px-6 py-3 bg-white hover:bg-zinc-200 text-black font-medium text-sm transition-colors inline-flex items-center gap-2"
				>
					Visit GitHub
					<ArrowUpRight className="w-4 h-4" />
				</a>
			</div>
		</div>
	);
}

