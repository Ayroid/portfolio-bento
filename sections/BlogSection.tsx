import React from "react";
import { BentoItem } from "@/components/BentoItem";
import { ActionCard } from "../components/ActionCard";

/**
 * LATTICE STRUCTURE (30 columns × 10 rows)
 * Base row height: 50px
 */

interface BlogItem {
	type: "blog" | "action";
	colSpan: number;
	rowSpan: number;
	mdColSpan?: number;
	lgColSpan?: number;
	lgRowSpan?: number;
	redirectTo: string;
	// Blog-specific fields
	backgroundImage?: string;
	category?: string;
	categoryBg?: string;
	categoryText?: string;
	categoryBorder?: string;
	title?: string;
	description?: string;
	date?: string;
	// Action card-specific fields
	label?: string;
	bgColor?: string;
	hoverBgColor?: string;
	textColor?: string;
	iconColor?: string;
}

// Blog data structure for reference - currently using hardcoded JSX below
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const blogData: BlogItem[] = [
	{
		type: "blog",
		colSpan: 10,
		rowSpan: 4,
		mdColSpan: 1,
		lgColSpan: 10,
		lgRowSpan: 8,
		redirectTo: "https://ayroid.hashnode.dev/memory-management-paradigms",
		backgroundImage:
			"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
		category: "Development",
		categoryBg: "bg-blue-900/50",
		categoryText: "text-blue-400",
		categoryBorder: "border-blue-800",
		title: "Memory Management Paradigms",
		description:
			"Explore different memory management approaches and their impact on application performance and reliability.",
		date: "9 Jun 2024",
	},
	{
		type: "action",
		colSpan: 10,
		rowSpan: 2,
		mdColSpan: 2,
		lgColSpan: 10,
		lgRowSpan: 2,
		redirectTo: "https://ayroid.hashnode.dev/",
		label: "ARTICLES",
		bgColor: "bg-[#e5e5e5]",
		hoverBgColor: "hover:bg-[#dddddd]",
		textColor: "text-black",
		iconColor: "text-black",
	},
	{
		type: "blog",
		colSpan: 10,
		rowSpan: 6,
		mdColSpan: 1,
		lgColSpan: 10,
		lgRowSpan: 6,
		redirectTo:
			"https://ayroid.hashnode.dev/from-url-to-webpage-dns-networking-and-browser-internals",
		backgroundImage:
			"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
		category: "Web Development",
		categoryBg: "bg-purple-900/50",
		categoryText: "text-purple-400",
		categoryBorder: "border-purple-800",
		title: "From URL to Webpage: DNS, Networking, and Browser Internals",
		description:
			"Deep dive into the journey from typing a URL to seeing a webpage rendered on your screen.",
		date: "3 Aug 2024",
	},
	{
		type: "blog",
		colSpan: 10,
		rowSpan: 6,
		mdColSpan: 1,
		lgColSpan: 10,
		lgRowSpan: 4,
		redirectTo:
			"https://ayroid.hashnode.dev/dockerize-deploy-mern-stack-application-on-aws-EC2",
		backgroundImage:
			"https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
		category: "DevOps",
		categoryBg: "bg-cyan-900/50",
		categoryText: "text-cyan-400",
		categoryBorder: "border-cyan-800",
		title: "Dockerize & Deploy a MERN Stack application on AWS EC2",
		description:
			"Learn to efficiently dockerize and deploy MERN applications on AWS EC2.",
		date: "10 Mar 2024",
	},
	{
		type: "blog",
		colSpan: 10,
		rowSpan: 8,
		mdColSpan: 2,
		lgColSpan: 10,
		lgRowSpan: 6,
		redirectTo:
			"https://ayroid.hashnode.dev/build-and-manage-aws-infrastructure-with-terraform",
		backgroundImage:
			"https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&q=80",
		category: "DevOps",
		categoryBg: "bg-green-900/50",
		categoryText: "text-green-400",
		categoryBorder: "border-green-800",
		title: "Building Scalable AWS Infrastructure with Terraform",
		description:
			"Learn to use Terraform efficiently and provision scalable infrastructure on AWS.",
		date: "11 May 2024",
	},
	{
		type: "blog",
		colSpan: 10,
		rowSpan: 4,
		mdColSpan: 1,
		lgColSpan: 10,
		lgRowSpan: 4,
		redirectTo:
			"https://ayroid.hashnode.dev/from-chaos-to-clarity-how-conventional-commits-revolutionize-version-control",
		backgroundImage:
			"https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
		category: "Development",
		categoryBg: "bg-orange-900/50",
		categoryText: "text-orange-400",
		categoryBorder: "border-orange-800",
		title: "Conventional Commits: Writing Better Commit Messages",
		description:
			"Discover how conventional commits and Commitizen streamline your project's history.",
		date: "10 Mar 2024",
	},
];

const BlogSection = () => {
	return (
		<div
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,1fr)] gap-2"
			style={{
				gridAutoRows: "50px", // Base row height
			}}
		>
			{/* Memory Management Paradigms - 10 cols × 10 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={6}
				className="md:col-span-1 lg:col-span-10 overflow-hidden group"
				redirectTo="https://ayroid.hashnode.dev/memory-management-paradigms"
			>
				<div className="relative h-full w-full overflow-hidden">
					{/* Background Image */}
					<div
						className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
						style={{
							backgroundImage:
								"url('https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80')",
						}}
					/>
					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

					{/* Content */}
					<div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transition-all duration-300 group-hover:pb-6">
						<div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded text-xs border border-blue-800">
								Development
							</span>
						</div>
						<h3 className="text-white font-bold mb-0 text-sm sm:text-base transition-all duration-300 group-hover:mb-2">
							Memory Management Paradigms
						</h3>
						<p className="text-zinc-300 text-xs leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300">
							Explore different memory management approaches and their impact on
							application performance and reliability.
						</p>
						<div className="flex items-center gap-3 mt-0 max-h-0 overflow-hidden opacity-0 group-hover:max-h-10 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300">
							<p className="text-zinc-400 text-xs">9 Jun 2024</p>
						</div>
					</div>
				</div>
			</BentoItem>

			{/* View All Link - 10 cols × 2 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={2}
				className="md:col-span-2 lg:col-span-10"
			>
				<ActionCard
					href="/blogs"
					label="BLOGS"
					bgColor="bg-[#e5e5e5]"
					hoverBgColor="hover:bg-[#dddddd]"
					textColor="text-black"
					iconColor="text-black"
				/>
			</BentoItem>

			{/* From URL to Webpage - 10 cols × 6 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={6}
				className="md:col-span-1 lg:col-span-10 overflow-hidden group"
				redirectTo="https://ayroid.hashnode.dev/from-url-to-webpage-dns-networking-and-browser-internals"
			>
				<div className="relative h-full w-full overflow-hidden">
					{/* Background Image */}
					<div
						className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
						style={{
							backgroundImage:
								"url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80')",
						}}
					/>
					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

					{/* Content */}
					<div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transition-all duration-300 group-hover:pb-6">
						<div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<span className="px-2 py-1 bg-purple-900/50 text-purple-400 rounded text-xs border border-purple-800">
								Web Development
							</span>
						</div>
						<h3 className="text-white font-bold mb-0 text-sm sm:text-base transition-all duration-300 group-hover:mb-2">
							From URL to Webpage: DNS, Networking, and Browser Internals
						</h3>
						<p className="text-zinc-300 text-xs leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300">
							Deep dive into the journey from typing a URL to seeing a webpage
							rendered on your screen.
						</p>
						<div className="flex items-center gap-3 mt-0 max-h-0 overflow-hidden opacity-0 group-hover:max-h-10 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300">
							<p className="text-zinc-400 text-xs">3 Aug 2024</p>
						</div>
					</div>
				</div>
			</BentoItem>

			{/* Docker MERN Article - 10 cols × 6 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={8}
				className="md:col-span-1 lg:col-span-10 overflow-hidden group"
				redirectTo="https://ayroid.hashnode.dev/dockerize-deploy-mern-stack-application-on-aws-EC2"
			>
				<div className="relative h-full w-full overflow-hidden">
					{/* Background Image */}
					<div
						className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
						style={{
							backgroundImage:
								"url('https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80')",
						}}
					/>
					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

					{/* Content */}
					<div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transition-all duration-300 group-hover:pb-6">
						<div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<span className="px-2 py-1 bg-cyan-900/50 text-cyan-400 rounded text-xs border border-cyan-800">
								DevOps
							</span>
						</div>
						<h3 className="text-white font-bold mb-0 text-sm sm:text-base transition-all duration-300 group-hover:mb-2">
							Dockerize & Deploy a MERN Stack application on AWS EC2
						</h3>
						<p className="text-zinc-300 text-xs leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300">
							Learn to efficiently dockerize and deploy MERN applications on AWS
							EC2.
						</p>
						<div className="flex items-center gap-3 mt-0 max-h-0 overflow-hidden opacity-0 group-hover:max-h-10 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300">
							<p className="text-zinc-400 text-xs">10 Mar 2024</p>
						</div>
					</div>
				</div>
			</BentoItem>

			{/* Terraform AWS Article - 10 cols × 6 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={4}
				className="md:col-span-2 lg:col-span-10 overflow-hidden group"
				redirectTo="https://ayroid.hashnode.dev/build-and-manage-aws-infrastructure-with-terraform"
			>
				<div className="relative h-full w-full overflow-hidden">
					{/* Background Image */}
					<div
						className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
						style={{
							backgroundImage:
								"url('https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&q=80')",
						}}
					/>
					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

					{/* Content */}
					<div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transition-all duration-300 group-hover:pb-6">
						<div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<span className="px-2 py-1 bg-green-900/50 text-green-400 rounded text-xs border border-green-800">
								DevOps
							</span>
						</div>
						<h3 className="text-white font-bold mb-0 text-sm sm:text-base transition-all duration-300 group-hover:mb-2">
							Building Scalable AWS Infrastructure with Terraform
						</h3>
						<p className="text-zinc-300 text-xs leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300">
							Learn to use Terraform efficiently and provision scalable
							infrastructure on AWS.
						</p>
						<div className="flex items-center gap-3 mt-0 max-h-0 overflow-hidden opacity-0 group-hover:max-h-10 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300">
							<p className="text-zinc-400 text-xs">11 May 2024</p>
						</div>
					</div>
				</div>
			</BentoItem>

			{/* Conventional Commits Article - 10 cols × 4 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={4}
				className="md:col-span-1 lg:col-span-10 overflow-hidden group"
				redirectTo="https://ayroid.hashnode.dev/from-chaos-to-clarity-how-conventional-commits-revolutionize-version-control"
			>
				<div className="relative h-full w-full overflow-hidden">
					{/* Background Image */}
					<div
						className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
						style={{
							backgroundImage:
								"url('https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80')",
						}}
					/>
					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

					{/* Content */}
					<div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transition-all duration-300 group-hover:pb-6">
						<div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<span className="px-2 py-1 bg-orange-900/50 text-orange-400 rounded text-xs border border-orange-800">
								Development
							</span>
						</div>
						<h3 className="text-white font-bold mb-0 text-sm sm:text-base transition-all duration-300 group-hover:mb-2">
							Conventional Commits: Writing Better Commit Messages
						</h3>
						<p className="text-zinc-300 text-xs leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300">
							Discover how conventional commits and Commitizen streamline your
							project&apos;s history.
						</p>
						<div className="flex items-center gap-3 mt-0 max-h-0 overflow-hidden opacity-0 group-hover:max-h-10 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300">
							<p className="text-zinc-400 text-xs">10 Mar 2024</p>
						</div>
					</div>
				</div>
			</BentoItem>
		</div>
	);
};

export default BlogSection;
