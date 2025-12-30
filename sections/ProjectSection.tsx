import { BentoItem } from "@/components/BentoItem";
import { ActionCard } from "@/components/ActionCard";

/**
 * LATTICE STRUCTURE (30 columns × 10 rows)
 * Base row height: 50px
 */

const ProjectSection = () => {
	return (
		<div
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,1fr)] gap-2"
			style={{
				gridAutoRows: '50px' // Base row height
			}}
		>
			{/* Header - 10 cols × 2 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={2}
				// height={160}
				className="md:col-span-1 lg:col-span-10 lg:row-span-2"
			>
				<ActionCard
					href="/projects"
					label="PROJECTS"
					bgColor="bg-[#e5e5e5]"
					hoverBgColor="hover:bg-[#dddddd]"
					textColor="text-black"
					iconColor="text-black"
				/>
			</BentoItem>

			{/* Parko Project - 10 cols × 10 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={10}
				className="md:col-span-1 lg:col-span-10 lg:row-span-10"
			>
				<div className="p-4 sm:p-6 h-full flex flex-col">
					<div
						className={`h-32 bg-linear-to-br from-cyan-500 to-blue-500 opacity-20 rounded-lg mb-4 -mx-2 -mt-2`}
					></div>
					<h3 className="text-white font-bold text-xl mb-3">Parko</h3>
					<p className="text-zinc-400 text-sm mb-4 leading-relaxed flex-1">
						Complete parking solution providing real-time parking availability,
						spot reservation, and navigation functionalities.
					</p>
					<div className="flex flex-wrap gap-2">
						{["React", "Express", "MongoDB", "AWS", "Nginx"].map((tag) => (
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

			{/* Ideos Project - 10 cols × 5 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={5}
				className="md:col-span-1 lg:col-span-10 lg:row-span-5"
			>
				<div className="p-4 sm:p-6 h-full flex flex-col">
					<div
						className={`h-20 bg-linear-to-br from-blue-500 to-purple-500 opacity-20 rounded-lg mb-3 -mx-2 -mt-2`}
					></div>
					<h3 className="text-white font-bold mb-2">Ideos</h3>
					<p className="text-zinc-400 text-xs mb-3 leading-relaxed flex-1">
						Unified productivity platform consolidating Kanban boards, Pomodoro
						timers, reminders, and note-taking with Gen-AI integration for
						enhanced automation.
					</p>
					<div className="flex flex-wrap gap-2">
						{["Next.js", "TypeScript", "MongoDB", "AI", "DevOps"].map((tag) => (
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

			{/* Terraform EC2 - 10 cols × 8 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={8}
				className="md:col-span-2 lg:col-span-10 lg:row-span-8"
			>
				<div className="p-4 sm:p-6 h-full flex flex-col">
					<div
						className={`h-24 bg-linear-to-br from-orange-500 to-red-500 opacity-20 rounded-lg mb-4 -mx-2 -mt-2`}
					></div>
					<h3 className="text-white font-bold text-lg mb-3">
						Terraform EC2 Project
					</h3>
					<p className="text-zinc-400 text-sm mb-4 leading-relaxed flex-1">
						Automated infrastructure deployment showcasing best practices with
						modular configurations, remote state management using S3.
					</p>
					<div className="flex flex-wrap gap-2">
						{["Terraform", "AWS", "DevOps", "Infrastructure"].map((tag) => (
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

			{/* Visual Rift - 10 cols × 5 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={5}
				className="md:col-span-1 lg:col-span-10 lg:row-span-5"
			>
				<div className="p-4 sm:p-6 h-full flex flex-col">
					<div
						className={`h-20 bg-linear-to-br from-purple-500 to-pink-500 opacity-20 rounded-lg mb-3 -mx-2 -mt-2`}
					></div>
					<h3 className="text-white font-bold mb-2">Visual Rift</h3>
					<p className="text-zinc-400 text-xs mb-3 leading-relaxed flex-1">
						Microservices Orchestration Engine streamlining multi-cloud
						application deployment using intuitive UML diagrams.
					</p>
					<div className="flex flex-wrap gap-2">
						{["Next.js", "MongoDB", "TailwindCSS", "Docker", "Kubernetes"].map(
							(tag) => (
								<span
									key={tag}
									className="px-2 py-1 bg-zinc-900 text-zinc-400 rounded text-xs border border-zinc-800"
								>
									{tag}
								</span>
							)
						)}
					</div>
				</div>
			</BentoItem>
		</div>
	);
};

export default ProjectSection;
