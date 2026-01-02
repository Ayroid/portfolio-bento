import { BentoItem } from "@/components/BentoItem";
import { GitHubContributions } from "@/components/GitHubContributions";
import BooksCard from "@/components/BooksCard";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	SiReact,
	SiNextdotjs,
	SiNodedotjs,
	SiMongodb,
	SiRedis,
	SiJavascript,
	SiTypescript,
	SiTailwindcss,
	SiLinux,
	SiGit,
	SiDocker,
	SiTerraform,
	SiAmazon,
	SiVercel,
	SiNginx,
	SiPostgresql,
	SiPrisma,
} from "react-icons/si";

/**
 * LATTICE STRUCTURE (30 columns × 8 rows)
 * Base row height: 50px
 */

const StatsSection = () => {
	return (
		<div
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)]"
			style={{
				gridAutoRows: "50px", // Base row height
			}}
		>
			<BentoItem
				colSpan={20}
				rowSpan={6}
				className="md:col-span-2 lg:col-span-20 lg:row-span-2"
			>
				<div className="p-4 sm:p-8 h-full">
					<GitHubContributions username="ayroid" />
				</div>
			</BentoItem>

			<BentoItem
				colSpan={10}
				rowSpan={6}
				className="md:col-span-1 lg:col-span-10 lg:row-span-7"
			>
				<div className="p-4 sm:p-6 h-full flex flex-col">
					<h3 className="text-white font-bold mb-2 sm:mb-3 text-base sm:text-lg">
						Tech Stack
					</h3>
					<TooltipProvider>
						<div className="flex flex-wrap flex-1 content-start">
							{[
								{ name: "React", icon: <SiReact /> },
								{ name: "Next.js", icon: <SiNextdotjs /> },
								{ name: "Node.js", icon: <SiNodedotjs /> },
								{ name: "MongoDB", icon: <SiMongodb /> },
								{ name: "PostgreSQL", icon: <SiPostgresql /> },
								{ name: "Prisma", icon: <SiPrisma /> },
								{ name: "Redis", icon: <SiRedis /> },
								{ name: "Tailwind", icon: <SiTailwindcss /> },
								{ name: "JavaScript", icon: <SiJavascript /> },
								{ name: "TypeScript", icon: <SiTypescript /> },
								{ name: "Linux", icon: <SiLinux /> },
								{ name: "Git", icon: <SiGit /> },
								{ name: "Docker", icon: <SiDocker /> },
								{ name: "Terraform", icon: <SiTerraform /> },
								{ name: "AWS", icon: <SiAmazon /> },
								{ name: "Vercel", icon: <SiVercel /> },
								{ name: "Nginx", icon: <SiNginx /> },
							].map((tech) => (
								<Tooltip key={tech.name}>
									<TooltipTrigger asChild>
										<div className="flex items-center justify-center cursor-pointer p-3">
											<span className="text-5xl">{tech.icon}</span>
										</div>
									</TooltipTrigger>
									<TooltipContent>
										<p>{tech.name}</p>
									</TooltipContent>
								</Tooltip>
							))}
						</div>
					</TooltipProvider>
				</div>
			</BentoItem>

			<BentoItem
				colSpan={10}
				rowSpan={8}
				className="md:col-span-1 lg:col-span-10 lg:row-span-8"
			>
				<div className="p-4 sm:p-6 h-full flex flex-col">
					<h3 className="text-white font-bold mb-2 sm:mb-3 text-base sm:text-lg">
						Tech Stack Distribution
					</h3>
					<div className="flex-1 flex items-center justify-center">
						<div className="relative w-48 h-48">
							<svg viewBox="0 0 200 200" className="transform -rotate-90">
								{(() => {
									const techStack = [
										{ name: "TypeScript", percentage: 30, color: "#3178c6" },
										{ name: "React/Next.js", percentage: 25, color: "#61dafb" },
										{ name: "Node.js", percentage: 20, color: "#68a063" },
										{ name: "Tailwind CSS", percentage: 12, color: "#06b6d4" },
										{ name: "MongoDB", percentage: 8, color: "#47a248" },
										{ name: "Other", percentage: 5, color: "#71717a" },
									];

									let currentAngle = 0;
									const radius = 80;
									const centerX = 100;
									const centerY = 100;
									const strokeWidth = 30;

									return techStack.map((tech, index) => {
										const angle = (tech.percentage / 100) * 360;
										const startAngle = currentAngle;
										const endAngle = currentAngle + angle;

										const startRad = (startAngle * Math.PI) / 180;
										const endRad = (endAngle * Math.PI) / 180;

										const x1 = centerX + radius * Math.cos(startRad);
										const y1 = centerY + radius * Math.sin(startRad);
										const x2 = centerX + radius * Math.cos(endRad);
										const y2 = centerY + radius * Math.sin(endRad);

										const largeArcFlag = angle > 180 ? 1 : 0;

										const pathData = [
											`M ${x1} ${y1}`,
											`A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
										].join(" ");

										currentAngle = endAngle;

										return (
											<path
												key={index}
												d={pathData}
												fill="none"
												stroke={tech.color}
												strokeWidth={strokeWidth}
												strokeLinecap="round"
												className="transition-all hover:opacity-80"
											/>
										);
									});
								})()}
							</svg>
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="text-center">
									<p className="text-white font-bold text-2xl">100%</p>
									<p className="text-zinc-400 text-xs">Coverage</p>
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-2 mt-4">
						{[
							{ name: "TypeScript", percentage: 30, color: "#3178c6" },
							{ name: "React/Next.js", percentage: 25, color: "#61dafb" },
							{ name: "Node.js", percentage: 20, color: "#68a063" },
							{ name: "Tailwind CSS", percentage: 12, color: "#06b6d4" },
							{ name: "MongoDB", percentage: 8, color: "#47a248" },
							{ name: "Other", percentage: 5, color: "#71717a" },
						].map((tech) => (
							<div key={tech.name} className="flex items-center gap-2">
								<div
									className="w-2 h-2 rounded-full"
									style={{ backgroundColor: tech.color }}
								></div>
								<p className="text-zinc-400 text-[10px] sm:text-xs">
									{tech.name} {tech.percentage}%
								</p>
							</div>
						))}
					</div>
				</div>
			</BentoItem>

			<BentoItem
				colSpan={20}
				rowSpan={8}
				className="md:col-span-1 lg:col-span-10"
			>
				<BooksCard />
			</BentoItem>
		</div>
	);
};

export default StatsSection;
