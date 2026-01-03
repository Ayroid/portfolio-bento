"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowUpRight, Pin } from "lucide-react";
import Link from "next/link";

interface BlogPost {
	id: string;
	title: string;
	description: string;
	date: string;
	category: string;
	href: string;
	isPinned?: boolean;
	isNew?: boolean;
}

const blogPosts: BlogPost[] = [
	{
		id: "1",
		title: "Memory Management Paradigms",
		description:
			"Explore different memory management approaches and their impact on application performance and reliability.",
		date: "9 Jun 2024",
		category: "Development",
		href: "https://ayroid.hashnode.dev/memory-management-paradigms",
		isPinned: true,
	},
	{
		id: "2",
		title: "From URL to Webpage: DNS & Networking Internals",
		description:
			"Deep dive into the journey from typing a URL to seeing a webpage rendered on your screen.",
		date: "3 Aug 2024",
		category: "Web Development",
		href: "https://ayroid.hashnode.dev/from-url-to-webpage-dns-networking-and-browser-internals",
	},
	{
		id: "3",
		title: "Syncing Hashnode with Obsidian",
		description:
			"Streamline your workflow by syncing your Obsidian directory with Hashnode. Publish updates with a single command.",
		date: "19 Dec 2024",
		category: "Automation",
		href: "https://ayroid.hashnode.dev/syncing-hashnode-with-obsidian",
		isNew: true,
	},
	{
		id: "4",
		title: "Dockerize & Deploy a MERN Stack application on AWS EC2",
		description:
			"Learn to efficiently dockerize and deploy MERN applications on AWS EC2.",
		date: "10 Mar 2024",
		category: "DevOps",
		href: "https://ayroid.hashnode.dev/dockerize-deploy-mern-stack-application-on-aws-EC2",
	},
	{
		id: "5",
		title: "Building Scalable AWS Infrastructure with Terraform",
		description:
			"Learn to use Terraform efficiently and provision scalable infrastructure on AWS.",
		date: "11 May 2024",
		category: "DevOps",
		href: "https://ayroid.hashnode.dev/build-and-manage-aws-infrastructure-with-terraform",
		isPinned: true,
	},
	{
		id: "6",
		title: "Next.js vs React: When and Why to Use Each",
		description:
			"Compare Next.js and React to understand when to use each framework, based on real experience building projects.",
		date: "9 Jun 2024",
		category: "Web Development",
		href: "https://ayroid.hashnode.dev/nextjs-vs-react-when-and-why-to-use-each",
	},
	{
		id: "7",
		title: "Conventional Commits: Writing Better Commit Messages",
		description:
			"Discover how conventional commits and Commitizen streamline your project's history.",
		date: "10 Mar 2024",
		category: "Development",
		href: "https://ayroid.hashnode.dev/from-chaos-to-clarity-how-conventional-commits-revolutionize-version-control",
	},
];

interface BlogCardProps {
	post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
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
		<a
			href={post.href}
			target="_blank"
			rel="noopener noreferrer"
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
				className="relative bg-[#18181b] border border-zinc-800 h-full w-full p-5 sm:p-6 flex flex-col gap-3 transition-colors duration-300"
				style={{ zIndex: 2 }}
			>
				{/* Header with badges */}
				<div className="flex items-center justify-between gap-2 flex-wrap">
					<div className="flex items-center gap-2 flex-wrap">
						<Badge variant="outline" className="text-xs mb-0">
							{post.category}
						</Badge>
						{post.isPinned && (
							<Badge
								variant="secondary"
								className="text-xs mb-0 bg-amber-900/50 text-amber-400 border-amber-800"
							>
								<Pin className="w-3 h-3 mr-1" />
								Pinned
							</Badge>
						)}
						{post.isNew && (
							<Badge
								variant="secondary"
								className="text-xs mb-0 bg-green-900/50 text-green-400 border-green-800"
							>
								New
							</Badge>
						)}
					</div>
					<ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
				</div>

				{/* Title */}
				<h3 className="text-white font-semibold text-base sm:text-lg leading-tight group-hover:text-zinc-100 transition-colors">
					{post.title}
				</h3>

				{/* Description */}
				<p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
					{post.description}
				</p>

				{/* Footer with date */}
				<div className="flex items-center gap-2 mt-auto pt-2">
					<Calendar className="w-3.5 h-3.5 text-zinc-500" />
					<span className="text-zinc-500 text-xs">{post.date}</span>
				</div>
			</div>
		</a>
	);
};

export default function BlogsPage() {
	const pinnedPosts = blogPosts.filter((post) => post.isPinned);
	const otherPosts = blogPosts.filter((post) => !post.isPinned);

	return (
		<div className="flex flex-col gap-8">
			{/* Page Header */}
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between flex-wrap gap-4">
					<div>
						<h1 className="text-3xl sm:text-4xl font-bold text-white">
							Blog
						</h1>
						<p className="text-zinc-400 mt-2 text-sm sm:text-base">
							Thoughts, tutorials, and insights on development, DevOps, and
							technology.
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

			{/* Pinned Posts Section */}
			{pinnedPosts.length > 0 && (
				<div className="flex flex-col gap-4">
					<h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
						Pinned
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{pinnedPosts.map((post) => (
							<BlogCard key={post.id} post={post} />
						))}
					</div>
				</div>
			)}

			{/* All Posts Section */}
			<div className="flex flex-col gap-4">
				<h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
					All Posts
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{otherPosts.map((post) => (
						<BlogCard key={post.id} post={post} />
					))}
				</div>
			</div>

			{/* More Posts CTA */}
			<div className="flex flex-col items-center justify-center py-8 gap-4 border border-zinc-800 bg-[#18181b]">
				<p className="text-zinc-400 text-sm text-center">
					Want to read more? Check out all my articles on Hashnode.
				</p>
				<a
					href="https://ayroid.hashnode.dev/"
					target="_blank"
					rel="noopener noreferrer"
					className="px-6 py-3 bg-white hover:bg-zinc-200 text-black font-medium text-sm transition-colors inline-flex items-center gap-2"
				>
					Visit Hashnode
					<ArrowUpRight className="w-4 h-4" />
				</a>
			</div>
		</div>
	);
}
