import { BentoItem } from "@/app/components/BentoItem";

const CopySection = () => {
	return (
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
							<p className="text-zinc-500 text-xs">Exploring Go programming</p>
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
					<h3 className="text-white font-bold mb-2 sm:mb-3">Pasandida Aurat</h3>
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
						<p className="text-zinc-600 text-xs mt-2">Contribution activity</p>
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
							<p className="text-zinc-500 text-xs mb-2 uppercase">Languages</p>
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
	);
};

export default CopySection;
