import { BentoItem } from "@/app/components/BentoItem";
import { GitHubContributions } from "@/app/components/GitHubContributions";
import BooksCard from "@/app/components/BooksCard";

/**
 * LATTICE STRUCTURE (30 columns × 8 rows)
 * Base row height: 50px
 */

const StatsSection = () => {
	return (
		<div
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)] gap-2"
			style={{
				gridAutoRows: "50px", // Base row height
			}}
		>
			<BentoItem
				colSpan={20}
				rowSpan={5}
				className="md:col-span-2 lg:col-span-20 lg:row-span-2"
			>
				<div className="p-4 sm:p-8 h-full">
					<GitHubContributions username="ayroid" />
				</div>
			</BentoItem>

			<BentoItem
				colSpan={10}
				rowSpan={7}
				className="md:col-span-1 lg:col-span-10 lg:row-span-7"
			>
				<div className="p-4 sm:p-6 h-full flex flex-col">
					<h3 className="text-white font-bold mb-3 sm:mb-4">Tech Stack</h3>
					<div className="grid grid-cols-4 gap-3 flex-1">
						{[
							{ name: "Next.js", icon: "▲" },
							{ name: "Node.js", icon: "◆" },
							{ name: "MongoDB", icon: "🍃" },
							{ name: "Redis", icon: "◈" },
							{ name: "JavaScript", icon: "JS" },
							{ name: "TypeScript", icon: "TS" },
							{ name: "Tailwind", icon: "🎨" },
							{ name: "Linux", icon: "🐧" },
							{ name: "Git", icon: "⎇" },
							{ name: "Docker", icon: "🐋" },
							{ name: "Terraform", icon: "⚙️" },
							{ name: "AWS", icon: "☁️" },
							{ name: "Vercel", icon: "▲" },
							{ name: "Nginx", icon: "⚡" },
						].map((tech) => (
							<div
								key={tech.name}
								className="flex flex-col items-center justify-center hover:bg-zinc-800 rounded-lg transition-colors"
							>
								<span className="text-lg sm:text-xl mb-1">{tech.icon}</span>
								<span className="text-zinc-400 text-[10px] sm:text-xs text-center">
									{tech.name}
								</span>
							</div>
						))}
					</div>
				</div>
			</BentoItem>

			<BentoItem
				colSpan={10}
				rowSpan={8}
				className="md:col-span-1 lg:col-span-10 lg:row-span-8"
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
				className="md:col-span-2 lg:col-span-10 lg:row-span-2"
			>
				<div className="p-4 sm:p-6 flex items-center justify-center">
					<p className="text-zinc-600 text-xs text-center">
						Numbers that describes me
					</p>
				</div>
			</BentoItem>

			<BentoItem
				colSpan={20}
				rowSpan={6}
				className="md:col-span-1 lg:col-span-10 lg:row-span-4"
			>
				<BooksCard />
			</BentoItem>
		</div>
	);
};

export default StatsSection;
