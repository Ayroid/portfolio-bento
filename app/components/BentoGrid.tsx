"use client";

import { useState } from "react";

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
				className={`min-h-${height} bg-[#0a0a0a] border-zinc-800 rounded-[10px] h-full w-full relative overflow-hidden`}
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
						<div className="p-4 sm:p-6 flex items-center justify-between">
							<h1 className="text-xl sm:text-2xl font-bold text-white">
								Ram<span className="text-zinc-500">X</span>
							</h1>
							<nav className="hidden md:flex gap-2 lg:gap-8 text-zinc-400 text-sm lg:text-base">
								<a href="#about" className="hover:text-white transition-colors">
									About
								</a>
								<a href="#work" className="hover:text-white transition-colors">
									Work
								</a>
								<a
									href="#projects"
									className="hover:text-white transition-colors"
								>
									Projects
								</a>
								<a
									href="#contact"
									className="hover:text-white transition-colors"
								>
									Contact
								</a>
							</nav>
							<button className="md:hidden text-zinc-400">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</button>
						</div>
					</BentoItem>
				</div>

				{/* Rows 1-2: Unified Grid with spanning */}
				<div
					className="grid gap-2"
					style={{
						gridTemplateColumns: "repeat(30, 2fr)",
						gridTemplateRows: "repeat(2, 2fr)",
					}}
				>
					{/* Box 1: Hero Section - Row 1, Column 1 */}
					<BentoItem colSpan={14} rowSpan={1} className="h-80">
						<div className="p-8 h-full flex flex-col justify-between">
							<div>
								<h2 className="text-5xl font-bold text-white mb-4">
									Ramkrishna Swarnkar
								</h2>
								<p className="text-xl text-zinc-400 mb-4">
									Full Stack Web Developer & Open Source Contributor
								</p>
								<p className="text-zinc-500 leading-relaxed">
									Building interactive web apps with emphasis on UI design and
									solving real-world problems through MVPs. Passionate about
									Three.js and modern web technologies.
								</p>
							</div>
							<div className="flex gap-2">
								<button className="px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-zinc-200 transition-colors">
									View Resume
								</button>
								<button className="px-6 py-2 border border-zinc-700 text-white rounded-lg hover:border-zinc-500 transition-colors">
									Contact Me
								</button>
							</div>
						</div>
					</BentoItem>

					{/* Box 2: Current Role */}
					<BentoItem colSpan={6} rowSpan={1}>
						<div className="p-6 h-full flex flex-col justify-between">
							<div>
								<div className="w-3 h-3 rounded-full bg-green-500 mb-4"></div>
								<h3 className="text-white font-bold text-lg mb-2">Currently</h3>
								<p className="text-zinc-400 text-sm mb-2">
									Founding Frontend Engineer
								</p>
								<p className="text-zinc-500 text-xs mb-4">
									good day :3 · Remote (US)
								</p>
								<p className="text-zinc-500 text-sm">
									Architecting frontend infrastructure for promotional campaign
									platform
								</p>
							</div>
							<p className="text-zinc-600 text-xs">August 2025 - Present</p>
						</div>
					</BentoItem>

					{/* Box 3: Quick Stats - Spans 2 rows in Column 3 */}
					<BentoItem colSpan={10} rowSpan={2}>
						<div className="p-6 h-full flex flex-col justify-between">
							<div>
								<h3 className="text-white font-bold text-xl mb-6">
									Quick Stats
								</h3>
								<div className="space-y-6">
									<div>
										<p className="text-4xl font-bold text-white mb-1">4+</p>
										<p className="text-zinc-500 text-sm">Featured Projects</p>
									</div>
									<div>
										<p className="text-4xl font-bold text-white mb-1">3+</p>
										<p className="text-zinc-500 text-sm">Years Experience</p>
									</div>
									<div>
										<p className="text-4xl font-bold text-white mb-1">99.9%</p>
										<p className="text-zinc-500 text-sm">Success Rate</p>
									</div>
								</div>
							</div>
						</div>
					</BentoItem>

					{/* Box 4: Frontend Skills - Row 2, Column 1 */}
					<BentoItem colSpan={10} rowSpan={1}>
						<div className="p-6">
							<h3 className="text-white font-bold text-xl mb-4">Frontend</h3>
							<div className="flex flex-wrap gap-3">
								{[
									"TypeScript",
									"React",
									"Next.js",
									"Tailwind CSS",
									"Three.js",
								].map((skill) => (
									<span
										key={skill}
										className="px-3 py-1 bg-zinc-900 text-zinc-400 rounded-lg text-sm border border-zinc-800"
									>
										{skill}
									</span>
								))}
							</div>
						</div>
					</BentoItem>

					{/* Box 5: Backend Skills - Row 2, Column 2 */}
					<BentoItem colSpan={10} rowSpan={1}>
						<div className="p-6">
							<h3 className="text-white font-bold text-xl mb-4">
								Backend & Tools
							</h3>
							<div className="flex flex-wrap gap-3">
								{["Bun", "PostgreSQL", "Figma", "Vercel", "AWS", "Postman"].map(
									(skill) => (
										<span
											key={skill}
											className="px-3 py-1 bg-zinc-900 text-zinc-400 rounded-lg text-sm border border-zinc-800"
										>
											{skill}
										</span>
									)
								)}
							</div>
						</div>
					</BentoItem>
				</div>

				{/* Row 3: Featured Work*/}
				<div
					className="grid gap-2"
					style={{
						gridTemplateColumns: "repeat(30, 2fr)",
						gridTemplateRows: "repeat(10, 2fr)",
					}}
				>
					<BentoItem colSpan={10} rowSpan={2} height={20}>
						<div className="p-4 sm:p-6 flex items-center justify-center">
							<p className="text-zinc-600 text-xs sm:text-sm text-center">
								© 2025 Ram Swarnkar
							</p>
						</div>
					</BentoItem>

					<BentoItem colSpan={10} rowSpan={10}>
						<div className="p-4 sm:p-6">
							<h3 className="text-white font-bold mb-2">
								Backend Developer Intern
							</h3>
							<p className="text-zinc-400 text-sm mb-4">Upsurge Labs</p>
							<p className="text-zinc-500 text-xs mb-4">
								June - July 2025 · Bangalore
							</p>
							<p className="text-zinc-600 text-sm">
								Contributed to backend development and API integration projects.
							</p>
						</div>
					</BentoItem>
					<BentoItem colSpan={10} rowSpan={5}>
						<div className="p-4 sm:p-6">
							<h3 className="text-white font-bold mb-2">
								Backend Developer Intern
							</h3>
							<p className="text-zinc-400 text-sm mb-4">Upsurge Labs</p>
							<p className="text-zinc-500 text-xs mb-4">
								June - July 2025 · Bangalore
							</p>
							<p className="text-zinc-600 text-sm">
								Contributed to backend development and API integration projects.
							</p>
						</div>
					</BentoItem>
					<BentoItem colSpan={10} rowSpan={8}>
						<div className="p-4 sm:p-6">
							<h3 className="text-white font-bold mb-2">
								Backend Developer Intern
							</h3>
							<p className="text-zinc-400 text-sm mb-4">Upsurge Labs</p>
							<p className="text-zinc-500 text-xs mb-4">
								June - July 2025 · Bangalore
							</p>
							<p className="text-zinc-600 text-sm">
								Contributed to backend development and API integration projects.
							</p>
						</div>
					</BentoItem>
					<BentoItem colSpan={10} rowSpan={5}>
						<div className="p-4 sm:p-6">
							<h3 className="text-white font-bold mb-2">
								Backend Developer Intern
							</h3>
							<p className="text-zinc-400 text-sm mb-4">Upsurge Labs</p>
							<p className="text-zinc-500 text-xs mb-4">
								June - July 2025 · Bangalore
							</p>
							<p className="text-zinc-600 text-sm">
								Contributed to backend development and API integration projects.
							</p>
						</div>
					</BentoItem>
				</div>

				{/* Row 4: ToolBox */}

				<div
					className="grid gap-2"
					style={{
						gridTemplateColumns: "repeat(30, 2fr)",
						gridTemplateRows: "repeat(20, 2fr)",
					}}
				>
					<BentoItem colSpan={20} rowSpan={4} height={30}>
						<div className="p-4 sm:p-6 flex items-center justify-center">
							<p className="text-zinc-600 text-xs sm:text-sm text-center">
								© 2025 Ram Swarnkar
							</p>
						</div>
					</BentoItem>

					<BentoItem colSpan={10} rowSpan={10} height={80}>
						<div className="p-4 sm:p-6">
							<h3 className="text-white font-bold mb-2">
								Backend Developer Intern
							</h3>
							<p className="text-zinc-400 text-sm mb-4">Upsurge Labs</p>
							<p className="text-zinc-500 text-xs mb-4">
								June - July 2025 · Bangalore
							</p>
							<p className="text-zinc-600 text-sm">
								Contributed to backend development and API integration projects.
							</p>
						</div>
					</BentoItem>
					<BentoItem colSpan={10} rowSpan={16} height={80}>
						<div className="p-4 sm:p-6">
							<h3 className="text-white font-bold mb-2">
								Backend Developer Intern
							</h3>
							<p className="text-zinc-400 text-sm mb-4">Upsurge Labs</p>
							<p className="text-zinc-500 text-xs mb-4">
								June - July 2025 · Bangalore
							</p>
							<p className="text-zinc-600 text-sm">
								Contributed to backend development and API integration projects.
							</p>
						</div>
					</BentoItem>
					<BentoItem colSpan={10} rowSpan={2} height={20}>
						<div className="p-4 sm:p-6 flex items-center justify-center">
							<p className="text-zinc-600 text-xs sm:text-sm text-center">
								© 2025 Ram Swarnkar
							</p>
						</div>
					</BentoItem>
					<BentoItem colSpan={10} rowSpan={14} height={80}>
						<div className="p-4 sm:p-6">
							<h3 className="text-white font-bold mb-2">
								Backend Developer Intern
							</h3>
							<p className="text-zinc-400 text-sm mb-4">Upsurge Labs</p>
							<p className="text-zinc-500 text-xs mb-4">
								June - July 2025 · Bangalore
							</p>
							<p className="text-zinc-600 text-sm">
								Contributed to backend development and API integration projects.
							</p>
						</div>
					</BentoItem>
					<BentoItem colSpan={10} rowSpan={10} height={80}>
						<div className="p-4 sm:p-6">
							<h3 className="text-white font-bold mb-2">
								Backend Developer Intern
							</h3>
							<p className="text-zinc-400 text-sm mb-4">Upsurge Labs</p>
							<p className="text-zinc-500 text-xs mb-4">
								June - July 2025 · Bangalore
							</p>
							<p className="text-zinc-600 text-sm">
								Contributed to backend development and API integration projects.
							</p>
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
						<button className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-black rounded-lg text-sm sm:text-base font-semibold hover:bg-zinc-200 transition-colors whitespace-nowrap">
							Get in Touch
						</button>
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
										className="text-white text-sm sm:text-base hover:text-zinc-300 transition-colors"
									>
										github.com/ramxcodes
									</a>
								</div>
								<div>
									<p className="text-zinc-500 text-xs mb-1">LinkedIn</p>
									<a
										href="https://linkedin.com/in/ramxcodes"
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
									{ name: "Twitter", handle: "@ramxcodes" },
									{ name: "YouTube", handle: "@ramxcodes" },
									{ name: "Instagram", handle: "@ramxcodes" },
									{ name: "Medium", handle: "ramxcodes" },
								].map((social) => (
									<div key={social.name} className="text-center">
										<div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-900 rounded-full mx-auto mb-2 flex items-center justify-center">
											<span className="text-zinc-600 text-xs">
												{social.name[0]}
											</span>
										</div>
										<p className="text-zinc-500 text-xs">{social.name}</p>
									</div>
								))}
							</div>
						</div>
					</BentoItem>
				</div>

				{/* Row 8: Footer */}

				<BentoItem height={20}>
					<div className="p-4 sm:p-6 flex items-center justify-center">
						<p className="text-zinc-600 text-xs sm:text-sm text-center">
							© 2025 Ram Swarnkar
						</p>
					</div>
				</BentoItem>
			</div>
		</div>
	);
}
