import React from "react";
import { BentoItem } from "@/app/components/BentoItem";

/**
 * LATTICE STRUCTURE (30 columns × 10 rows)
 * Base row height: 50px
 */

const BlogSection = () => {
	return (
		<div
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,1fr)] gap-2"
			style={{
				gridAutoRows: "50px", // Base row height
			}}
		>
			{/* Header - 20 cols × 2 rows */}
			<BentoItem
				colSpan={20}
				rowSpan={2}
				className="md:col-span-2 lg:col-span-20 lg:row-span-2"
			>
				<div className="p-4 sm:p-6 h-full flex flex-col justify-center">
					<h3 className="text-white font-bold text-xl sm:text-2xl mb-2 uppercase italic">
						Articles & Learnings
					</h3>
					<p className="text-zinc-500 text-xs sm:text-sm">
						Sharing insights on DevOps, Development, and Tech
					</p>
				</div>
			</BentoItem>

			{/* Terraform AWS Article - 10 cols × 6 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={6}
				className="md:col-span-1 lg:col-span-10 lg:row-span-6 overflow-hidden group"
				redirectTo="https://ayroid.hashnode.dev/build-and-manage-aws-infrastructure-with-terraform"
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
								DevOps
							</span>
						</div>
						<h3 className="text-white font-bold mb-0 text-sm sm:text-base transition-all duration-300 group-hover:mb-2">
							Provision and Manage AWS Infrastructure with Terraform
						</h3>
						<p className="text-zinc-300 text-xs leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300">
							Learn to use Terraform efficiently and provision and manage resources on AWS.
						</p>
						<div className="flex items-center gap-3 mt-0 max-h-0 overflow-hidden opacity-0 group-hover:max-h-10 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300">
							<p className="text-zinc-400 text-xs">3 Aug 2024</p>
						</div>
					</div>
				</div>
			</BentoItem>

			{/* Next.js vs React Article - 10 cols × 8 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={8}
				className="md:col-span-1 lg:col-span-10 lg:row-span-8 overflow-hidden group"
				redirectTo={
					"https://ayroid.hashnode.dev/nextjs-vs-react-a-developers-perspective-on-why-nextjs-stands-out"
				}
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
							Next.js vs React: A Developer&apos;s Perspective
						</h3>
						<p className="text-zinc-300 text-xs leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300">
							Discover why Next.js excels over React, featuring key benefits and firsthand insights from a developer&apos;s experience.
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
				className="md:col-span-2 lg:col-span-10 lg:row-span-2"
				redirectTo={"https://ayroid.hashnode.dev/"}
			>
				<div className="p-4 sm:p-6 flex items-center justify-center">
					<p className="text-zinc-500 text-sm text-center">
						View all articles on Hashnode →
					</p>
				</div>
			</BentoItem>

			{/* Conventional Commits Article - 10 cols × 6 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={6}
				className="md:col-span-2 lg:col-span-10 lg:row-span-6 overflow-hidden group"
				redirectTo="https://ayroid.hashnode.dev/from-chaos-to-clarity-how-conventional-commits-revolutionize-version-control"
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
								Development
							</span>
						</div>
						<h3 className="text-white font-bold mb-0 text-sm sm:text-base transition-all duration-300 group-hover:mb-2">
							From Chaos to Clarity: How Conventional Commits Revolutionize Version Control
						</h3>
						<p className="text-zinc-300 text-xs leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300">
							Discover how conventional commits and Commitizen streamline your project&apos;s history.
						</p>
						<div className="flex items-center gap-3 mt-0 max-h-0 overflow-hidden opacity-0 group-hover:max-h-10 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300">
							<p className="text-zinc-400 text-xs">11 May 2024</p>
						</div>
					</div>
				</div>
			</BentoItem>

			{/* Docker MERN Article - 10 cols × 4 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={4}
				className="md:col-span-1 lg:col-span-10 lg:row-span-4 overflow-hidden group"
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
							<span className="px-2 py-1 bg-orange-900/50 text-orange-400 rounded text-xs border border-orange-800">
								DevOps
							</span>
						</div>
						<h3 className="text-white font-bold mb-0 text-sm sm:text-base transition-all duration-300 group-hover:mb-2">
							Dockerize & Deploy a MERN Stack application on AWS EC2
						</h3>
						<p className="text-zinc-300 text-xs leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300">
							Learn to efficiently dockerize and deploy MERN applications on AWS EC2.
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
