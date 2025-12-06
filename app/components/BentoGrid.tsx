"use client";

import { useState } from "react";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { Profile } from "./Profile";
import { ExperienceSection } from "./ExperienceSection";
import { AboutSection } from "./AboutSection";
import { ActionButton } from "./ActionButton";
import { ConnectButton } from "./ConnectButton";

interface BentoItemProps {
	children?: React.ReactNode;
	className?: string;
	colSpan?: number;
	rowSpan?: number;
	height?: number;
}

function BentoItem({
	children,
	className = "",
	colSpan = 1,
	rowSpan = 1,
	height = 80,
}: BentoItemProps) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		setMousePosition({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		});
	};

	return (
		<div
			className={`bg-transparent rounded-[10px] relative cursor-pointer ${className}`}
			style={{
				gridColumn: `span ${colSpan}`,
				gridRow: `span ${rowSpan}`,
				["--mouse-x" as string]: `${mousePosition.x}px`,
				["--mouse-y" as string]: `${mousePosition.y}px`,
			}}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Hover glow effect */}
			<div
				className="pointer-events-none absolute inset-0 rounded-[10px] opacity-0 transition-opacity duration-500"
				style={{
					background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
					opacity: isHovered ? 1 : 0,
					zIndex: 3,
				}}
			/>

			{/* Border glow effect */}
			<div
				className="pointer-events-none absolute inset-0 rounded-[10px] opacity-0 transition-opacity duration-500"
				style={{
					background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3), transparent 40%)`,
					opacity: isHovered ? 1 : 0,
					zIndex: 1,
				}}
			/>

			{/* Content container */}
			<div
				className={`min-h-${height} bg-[#090909] rounded-[10px] h-full w-full relative overflow-hidden`}
				style={{ zIndex: 2 }}
			>
				<div className="relative z-10 h-full">{children}</div>
			</div>
		</div>
	);
}

export function BentoGrid() {
	return (
		<div className="w-full max-w-[1520px] mx-auto p-2 sm:p-4">
			<div className="flex flex-col gap-2 ">
				{/* Full Width Header - Navigation */}
				<div className="grid grid-cols-1 gap-2 ">
					<BentoItem className="h-20" height={20}>
						<Header />
					</BentoItem>
				</div>

				{/* Rows 1-2: Unified Grid with spanning */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)] lg:grid-rows-[repeat(4,2fr)] gap-2">
					{/* Box 1: Hero Section - Row 1, Column 1 */}
					<BentoItem
						colSpan={14}
						rowSpan={2}
						className="md:col-span-1 lg:col-span-14"
					>
						<HeroSection />
					</BentoItem>

					{/* Box 2: Current Role */}
					<BentoItem
						colSpan={6}
						rowSpan={2}
						className="md:col-span-1 lg:col-span-6"
					>
						<Profile />
					</BentoItem>

					{/* Box 3: Quick Stats - Spans 2 rows in Column 3 */}
					<BentoItem
						colSpan={10}
						rowSpan={4}
						className="md:col-span-2 lg:col-span-10 lg:row-span-2"
					>
						<ExperienceSection />
					</BentoItem>

					{/* Box 4: About Section - Row 2, Column 1 */}
					<BentoItem
						colSpan={10}
						rowSpan={2}
						className="md:col-span-1 lg:col-span-10"
					>
						<AboutSection />
					</BentoItem>

					{/* Box 5: Socials - Row 2, Column 2 */}
					<BentoItem
						colSpan={5}
						rowSpan={1}
						className="md:col-span-1 lg:col-span-10"
					>
						<ActionButton href="mailto:ayushsk.work@gmail.com" label="EMAIL" />
					</BentoItem>
					<BentoItem
						colSpan={5}
						rowSpan={1}
						className="md:col-span-1 lg:col-span-10"
					>
						<ActionButton
							href="https://drive.google.com/file/d/1TIDYNaseyA11HRNvMjx8BQuCHbTZGCHK/view?usp=sharing"
							label="RESUME"
							bgColor="bg-[#e5e5e5]"
							hoverBgColor="hover:bg-[#dddddd]"
							textColor="text-black"
							iconColor="text-black"
						/>
					</BentoItem>
					<BentoItem
						colSpan={10}
						rowSpan={1}
						className="md:col-span-1 lg:col-span-10"
					>
						<ConnectButton />
					</BentoItem>
				</div>

				{/* Row 3: Featured Work - Projects & Experience */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)] gap-2">
					<BentoItem
						colSpan={10}
						rowSpan={2}
						height={20}
						className="md:col-span-1 lg:col-span-10 lg:row-span-2"
					>
						<div className="p-4 sm:p-6">
							<h3 className="text-white font-bold mb-2">NotesBuddy</h3>
							<p className="text-zinc-400 text-sm mb-2">Study Platform</p>
							<p className="text-zinc-600 text-xs">
								Comprehensive platform with notes, flashcards, quizzes & AI
								chatbot
							</p>
						</div>
					</BentoItem>

					<BentoItem
						colSpan={10}
						rowSpan={10}
						className="md:col-span-1 lg:col-span-10 lg:row-span-10"
					>
						<div className="p-4 sm:p-6 h-full flex flex-col">
							<div className="mb-4">
								<h3 className="text-white font-bold text-lg sm:text-xl mb-2">
									Experience
								</h3>
							</div>
							<div className="space-y-3 sm:space-y-4 flex-1 overflow-auto">
								<div className="border-l-2 border-zinc-800 pl-4">
									<h4 className="text-white font-bold text-xs sm:text-sm">
										Founding Frontend Engineer
									</h4>
									<p className="text-zinc-400 text-xs mb-1">good day :3</p>
									<p className="text-zinc-600 text-xs">August 2025 - Present</p>
								</div>
								<div className="border-l-2 border-zinc-800 pl-4">
									<h4 className="text-white font-bold text-xs sm:text-sm">
										Backend Developer Intern
									</h4>
									<p className="text-zinc-400 text-xs mb-1">Upsurge Labs</p>
									<p className="text-zinc-600 text-xs">June - July 2025</p>
								</div>
								<div className="border-l-2 border-zinc-800 pl-4">
									<h4 className="text-white font-bold text-xs sm:text-sm">
										Founding Engineer
									</h4>
									<p className="text-zinc-400 text-xs mb-1">Prepeasy</p>
									<p className="text-zinc-600 text-xs">April - June 2025</p>
								</div>
								<div className="border-l-2 border-zinc-800 pl-4">
									<h4 className="text-white font-bold text-xs sm:text-sm">
										SDE-1 (Full Stack) Intern
									</h4>
									<p className="text-zinc-400 text-xs mb-1">Expelee</p>
									<p className="text-zinc-600 text-xs">Aug 2023 - April 2025</p>
								</div>
							</div>
						</div>
					</BentoItem>

					<BentoItem
						colSpan={10}
						rowSpan={5}
						className="md:col-span-1 lg:col-span-10 lg:row-span-5"
					>
						<div className="p-4 sm:p-6">
							<h3 className="text-white font-bold mb-2">Appwrite MCP Server</h3>
							<p className="text-zinc-400 text-sm mb-2">
								Model Context Protocol
							</p>
							<p className="text-zinc-600 text-xs mb-3">
								7 tools with 99.9% success rate
							</p>
							<div className="flex flex-wrap gap-2">
								{["TypeScript", "Appwrite", "MCP"].map((tag) => (
									<span
										key={tag}
										className="px-2 py-1 bg-zinc-900 text-zinc-400 rounded text-xs border border-zinc-800"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					</BentoItem>

					<BentoItem
						colSpan={10}
						rowSpan={8}
						className="md:col-span-2 lg:col-span-10 lg:row-span-8"
					>
						<div className="p-4 sm:p-6 h-full flex flex-col">
							<h3 className="text-white font-bold text-lg sm:text-xl mb-4">
								Bio
							</h3>
							<div className="flex items-center gap-3 sm:gap-4 mb-4">
								<div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-yellow-400 flex items-center justify-center text-2xl sm:text-3xl shrink-0">
									🐶
								</div>
								<div>
									<h4 className="text-white font-bold text-sm sm:text-base">
										Ramkrishna Swarnkar
									</h4>
									<p className="text-zinc-500 text-xs sm:text-sm">@ramxcodes</p>
								</div>
							</div>
							<p className="text-zinc-400 text-xs sm:text-sm leading-relaxed flex-1">
								Full Stack Web Developer & Open Source Contributor passionate
								about building interactive web apps with emphasis on UI design.
								Specialized in creating MVPs that solve real-world problems.
							</p>
							<div className="flex gap-2 mt-4">
								<a
									href="https://github.com/ramxcodes"
									className="text-zinc-500 hover:text-white text-xs"
								>
									GitHub
								</a>
								<span className="text-zinc-700">•</span>
								<a
									href="mailto:ramxcodes@gmail.com"
									className="text-zinc-500 hover:text-white text-xs"
								>
									Email
								</a>
							</div>
						</div>
					</BentoItem>

					<BentoItem
						colSpan={10}
						rowSpan={5}
						className="md:col-span-1 lg:col-span-10 lg:row-span-5"
					>
						<div className="p-4 sm:p-6">
							<h3 className="text-white font-bold mb-2">Syncify</h3>
							<p className="text-zinc-400 text-sm mb-2">Music Streaming</p>
							<p className="text-zinc-600 text-xs mb-3">
								Real-time platform with synchronized playback
							</p>
							<div className="flex flex-wrap gap-2">
								{["React", "WebSockets", "Real-time"].map((tag) => (
									<span
										key={tag}
										className="px-2 py-1 bg-zinc-900 text-zinc-400 rounded text-xs border border-zinc-800"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					</BentoItem>
				</div>

				{/* Row 4: ToolBox - Blogs, GitHub Activity, Setup */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)] gap-2">
					<BentoItem
						colSpan={20}
						rowSpan={4}
						height={30}
						className="md:col-span-2 lg:col-span-20 lg:row-span-4"
					>
						<div className="p-4 sm:p-6">
							<h3 className="text-white font-bold text-base sm:text-lg mb-3">
								Blogs
							</h3>
							<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
								<div className="flex-1">
									<h4 className="text-white font-semibold text-sm mb-1">
										Go in Me
									</h4>
									<p className="text-zinc-500 text-xs">
										Exploring Go programming
									</p>
								</div>
								<div className="flex-1">
									<h4 className="text-white font-semibold text-sm mb-1">
										My Winter Arc
									</h4>
									<p className="text-zinc-500 text-xs">
										Personal development journey
									</p>
								</div>
							</div>
						</div>
					</BentoItem>

					<BentoItem
						colSpan={10}
						rowSpan={10}
						height={80}
						className="md:col-span-1 lg:col-span-10 lg:row-span-10"
					>
						<div className="p-4 sm:p-6">
							<h3 className="text-white font-bold mb-2 sm:mb-3">
								Pasandida Aurat
							</h3>
							<p className="text-zinc-400 text-sm mb-2">Dating Platform</p>
							<p className="text-zinc-600 text-xs mb-3 sm:mb-4">
								Emphasizing authentic connections (in development)
							</p>
							<div className="flex flex-wrap gap-2">
								{["Next.js", "Dating", "Social", "MVP"].map((tag) => (
									<span
										key={tag}
										className="px-2 py-1 bg-zinc-900 text-zinc-400 rounded text-xs border border-zinc-800"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					</BentoItem>

					<BentoItem
						colSpan={10}
						rowSpan={16}
						height={80}
						className="md:col-span-1 lg:col-span-10 lg:row-span-16"
					>
						<div className="p-4 sm:p-6 h-full flex flex-col">
							<h3 className="text-white font-bold mb-2 sm:mb-3 text-base sm:text-lg">
								GitHub Activity
							</h3>
							<div className="space-y-2 mb-3 sm:mb-4">
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 rounded-full bg-green-500"></div>
									<p className="text-zinc-400 text-xs">
										1,000+ contributions this year
									</p>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 rounded-full bg-blue-500"></div>
									<p className="text-zinc-400 text-xs">
										Active open source contributor
									</p>
								</div>
							</div>
							<div className="flex-1 bg-zinc-900 rounded-lg p-2 sm:p-3 border border-zinc-800">
								<div className="grid grid-cols-12 gap-1">
									{Array.from({ length: 84 }).map((_, i) => {
										const intensity = (i * 7 + i * 3) % 5;
										const colors = [
											"bg-zinc-800",
											"bg-green-900",
											"bg-green-700",
											"bg-green-600",
											"bg-green-500",
										];
										return (
											<div
												key={i}
												className={`h-2 rounded-sm ${colors[intensity]}`}
											></div>
										);
									})}
								</div>
								<p className="text-zinc-600 text-xs mt-2">
									Contribution activity
								</p>
							</div>
						</div>
					</BentoItem>

					<BentoItem
						colSpan={10}
						rowSpan={2}
						height={20}
						className="md:col-span-2 lg:col-span-10 lg:row-span-2"
					>
						<div className="p-4 sm:p-6 flex items-center justify-center">
							<p className="text-zinc-600 text-xs text-center">
								Technologies I work with
							</p>
						</div>
					</BentoItem>

					<BentoItem
						colSpan={10}
						rowSpan={14}
						height={80}
						className="md:col-span-2 lg:col-span-10 lg:row-span-14"
					>
						<div className="p-4 sm:p-6 h-full flex flex-col">
							<h3 className="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">
								All Technologies
							</h3>
							<div className="space-y-3 flex-1 overflow-auto">
								<div>
									<p className="text-zinc-500 text-xs mb-2 uppercase">
										Languages
									</p>
									<div className="flex flex-wrap gap-2">
										{["TypeScript", "JavaScript", "Go"].map((tech) => (
											<span
												key={tech}
												className="px-2 py-1 bg-zinc-900 text-zinc-400 rounded text-xs border border-zinc-800"
											>
												{tech}
											</span>
										))}
									</div>
								</div>
								<div>
									<p className="text-zinc-500 text-xs mb-2 uppercase">Tools</p>
									<div className="flex flex-wrap gap-2">
										{["Git", "Docker", "Vercel", "AWS"].map((tech) => (
											<span
												key={tech}
												className="px-2 py-1 bg-zinc-900 text-zinc-400 rounded text-xs border border-zinc-800"
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</BentoItem>

					<BentoItem
						colSpan={10}
						rowSpan={10}
						height={80}
						className="md:col-span-1 lg:col-span-10 lg:row-span-10"
					>
						<div className="p-4 sm:p-6">
							<h3 className="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">
								Setup
							</h3>
							<div className="space-y-3">
								<div className="flex items-start gap-3">
									<span className="text-lg sm:text-xl">👓</span>
									<div>
										<h4 className="text-white font-semibold text-xs sm:text-sm mb-1">
											Wears Used
										</h4>
										<p className="text-zinc-500 text-xs">
											Glasses, Watch, Airpods Max
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<span className="text-lg sm:text-xl">💻</span>
									<div>
										<h4 className="text-white font-semibold text-xs sm:text-sm mb-1">
											VSCode / Cursor Setup
										</h4>
										<p className="text-zinc-500 text-xs">
											One Dark Pro theme with custom extensions
										</p>
									</div>
								</div>
							</div>
						</div>
					</BentoItem>
				</div>

				{/* Row 6: CTA Banner */}
				<BentoItem>
					<div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col sm:flex-row items-center justify-between gap-2">
						<div>
							<h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">
								Let&apos;s Work Together
							</h3>
							<p className="text-zinc-500 text-sm sm:text-base">
								Open to new opportunities and collaborations
							</p>
						</div>
						<a
							href="mailto:ramxcodes@gmail.com"
							className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-black rounded-lg text-sm sm:text-base font-semibold hover:bg-zinc-200 transition-colors whitespace-nowrap"
						>
							Get in Touch
						</a>
					</div>
				</BentoItem>

				{/* Row 7: Contact Info + Social Links */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
					{/* Contact Info */}
					<BentoItem className="h-auto min-h-[280px] sm:h-[400px] lg:h-[547px]">
						<div className="p-4 sm:p-6 h-full flex flex-col">
							<h3 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-6">
								Contact
							</h3>
							<div className="space-y-3 sm:space-y-4 flex-1">
								<div>
									<p className="text-zinc-500 text-xs mb-1">Email</p>
									<a
										href="mailto:ramxcodes@gmail.com"
										className="text-white text-sm sm:text-base hover:text-zinc-300 transition-colors break-all"
									>
										ramxcodes@gmail.com
									</a>
								</div>
								<div>
									<p className="text-zinc-500 text-xs mb-1">GitHub</p>
									<a
										href="https://github.com/ramxcodes"
										target="_blank"
										rel="noopener noreferrer"
										className="text-white text-sm sm:text-base hover:text-zinc-300 transition-colors"
									>
										github.com/ramxcodes
									</a>
								</div>
								<div>
									<p className="text-zinc-500 text-xs mb-1">LinkedIn</p>
									<a
										href="https://linkedin.com/in/ramxcodes"
										target="_blank"
										rel="noopener noreferrer"
										className="text-white text-sm sm:text-base hover:text-zinc-300 transition-colors"
									>
										linkedin.com/in/ramxcodes
									</a>
								</div>
							</div>
						</div>
					</BentoItem>

					{/* Social Links Grid */}
					<BentoItem className="h-auto min-h-[200px] md:col-span-2">
						<div className="p-4 sm:p-6">
							<h3 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-6">
								Connect
							</h3>
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 ">
								{[
									{
										name: "Twitter",
										handle: "@ramxcodes",
										url: "https://twitter.com/ramxcodes",
									},
									{
										name: "YouTube",
										handle: "@ramxcodes",
										url: "https://youtube.com/@ramxcodes",
									},
									{
										name: "Instagram",
										handle: "@ramxcodes",
										url: "https://instagram.com/ramxcodes",
									},
									{
										name: "Medium",
										handle: "ramxcodes",
										url: "https://medium.com/@ramxcodes",
									},
								].map((social) => (
									<a
										key={social.name}
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-center hover:scale-105 transition-transform"
									>
										<div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-900 rounded-full mx-auto mb-2 flex items-center justify-center border border-zinc-800 hover:border-zinc-700">
											<span className="text-zinc-600 text-xs font-bold">
												{social.name[0]}
											</span>
										</div>
										<p className="text-zinc-500 text-xs">{social.name}</p>
										<p className="text-zinc-700 text-xs">{social.handle}</p>
									</a>
								))}
							</div>
						</div>
					</BentoItem>
				</div>

				{/* Row 8: Footer */}
				<BentoItem height={20}>
					<div className="p-4 sm:p-6 flex items-center justify-center">
						<p className="text-zinc-600 text-xs sm:text-sm text-center">
							© 2025 Ramkrishna Swarnkar · Built with Next.js & Tailwind CSS
						</p>
					</div>
				</BentoItem>
			</div>
		</div>
	);
}
