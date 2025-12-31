import { BentoItem } from "@/components/BentoItem";
import { ActionCard } from "@/components/ActionCard";
import Image from "next/image";

/**
 * LATTICE STRUCTURE (30 columns × 10 rows)
 * Base row height: 50px
 */

const projects = [
	{
		title: "Ideos",
		description:
			"Unified productivity platform consolidating Kanban boards, Pomodoro timers, reminders, and note-taking with Gen-AI integration via multi-agent framework and RAG.",
		tags: ["Next.js", "TypeScript", "MongoDB", "Docker", "AI"],
		image: "/projects/ideos.png",
		timeperiod: "June 2024 - Present",
		demolink: "https://ideos.live",
		github: "https://github.com/Ayroid/Ideos-Frontend",
	},
	{
		title: "Visual Rift",
		description:
			"Microservices Orchestration Engine streamlining multi-cloud application deployment using intuitive UML diagrams with Docker and Kubernetes.",
		tags: ["Next.js", "MongoDB", "Docker", "K8s", "AWS"],
		image: "/projects/visualrift.jpg",
		timeperiod: "Jan 2024 - Aug 2024",
		github: "https://github.com/Visual-Rift/Visual-Rift-Client",
	},
	{
		title: "UPES CSA",
		description:
			"Official website of UPES CSA with integrated Event Registration and Management system featuring automated mailings.",
		tags: ["React", "Express", "MongoDB", "AWS", "Docker"],
		image: "/projects/upescsa.jpg",
		timeperiod: "Dec 2023 - Jan 2024",
		demolink: "https://upescsa.in",
		github: "https://github.com/Ayroid/UPESCSA-Website-Frontend",
	},
	{
		title: "Parko",
		description:
			"Complete parking solution providing real-time parking availability, spot reservation, and navigation functionalities at UPES.",
		tags: ["React", "Express", "MongoDB", "AWS", "Nginx"],
		image: "/projects/parko.jpg",
		timeperiod: "Aug 2023 - Nov 2023",
		github: "https://github.com/Ayroid/PARKO-Frontend",
	},
	{
		title: "Terraform EC2",
		description:
			"Automated infrastructure deployment with modular configurations, remote state management using S3, and best practices for AWS.",
		tags: ["Terraform", "AWS", "DevOps", "S3"],
		image: "/projects/terraform.jpg",
		timeperiod: "July 2024",
		demolink:
			"https://ayroid.hashnode.dev/build-and-manage-aws-infrastructure-with-terraform",
		github: "https://github.com/Ayroid/terraform-ec2-project",
	},
];

const ProjectSection = () => {
	return (
		<div
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,1fr)] gap-2"
			style={{
				gridAutoRows: "50px", // Base row height
			}}
		>
			{/* Header - 10 cols × 2 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={2}
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

			{/* Ideos Project - 10 cols × 10 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={10}
				className="md:col-span-1 lg:col-span-10 lg:row-span-10"
			>
				<a
					href={projects[0].demolink}
					target="_blank"
					rel="noopener noreferrer"
					className="p-4 sm:p-6 h-full flex flex-col group"
				>
					<div className="relative h-32 rounded-lg mb-4 -mx-2 -mt-2 overflow-hidden">
						<Image
							src={projects[0].image}
							alt={projects[0].title}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					</div>
					<h3 className="text-white font-bold text-xl mb-1">
						{projects[0].title}
					</h3>
					<p className="text-zinc-500 text-xs mb-3">{projects[0].timeperiod}</p>
					<p className="text-zinc-400 text-sm mb-4 leading-relaxed flex-1">
						{projects[0].description}
					</p>
					<div className="flex flex-wrap gap-2">
						{projects[0].tags.map((tag) => (
							<span
								key={tag}
								className="px-2 py-1 bg-zinc-900 text-zinc-400 rounded text-xs border border-zinc-800"
							>
								{tag}
							</span>
						))}
					</div>
				</a>
			</BentoItem>

			{/* Visual Rift - 10 cols × 5 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={5}
				className="md:col-span-1 lg:col-span-10 lg:row-span-5"
			>
				<a
					href={projects[1].github}
					target="_blank"
					rel="noopener noreferrer"
					className="p-4 sm:p-6 h-full flex flex-col group"
				>
					<div className="relative h-20 rounded-lg mb-3 -mx-2 -mt-2 overflow-hidden">
						<Image
							src={projects[1].image}
							alt={projects[1].title}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					</div>
					<h3 className="text-white font-bold mb-1">{projects[1].title}</h3>
					<p className="text-zinc-500 text-[10px] mb-2">
						{projects[1].timeperiod}
					</p>
					<p className="text-zinc-400 text-xs mb-3 leading-relaxed flex-1">
						{projects[1].description}
					</p>
					<div className="flex flex-wrap gap-2">
						{projects[1].tags.map((tag) => (
							<span
								key={tag}
								className="px-2 py-1 bg-zinc-900 text-zinc-400 rounded text-xs border border-zinc-800"
							>
								{tag}
							</span>
						))}
					</div>
				</a>
			</BentoItem>

			{/* Terraform EC2 - 10 cols × 8 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={8}
				className="md:col-span-2 lg:col-span-10 lg:row-span-8"
			>
				<a
					href={projects[4].demolink}
					target="_blank"
					rel="noopener noreferrer"
					className="p-4 sm:p-6 h-full flex flex-col group"
				>
					<div className="relative h-24 rounded-lg mb-4 -mx-2 -mt-2 overflow-hidden">
						<Image
							src={projects[4].image}
							alt={projects[4].title}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					</div>
					<h3 className="text-white font-bold text-lg mb-1">
						{projects[4].title}
					</h3>
					<p className="text-zinc-500 text-xs mb-3">{projects[4].timeperiod}</p>
					<p className="text-zinc-400 text-sm mb-4 leading-relaxed flex-1">
						{projects[4].description}
					</p>
					<div className="flex flex-wrap gap-2">
						{projects[4].tags.map((tag) => (
							<span
								key={tag}
								className="px-2 py-1 bg-zinc-900 text-zinc-400 rounded text-xs border border-zinc-800"
							>
								{tag}
							</span>
						))}
					</div>
				</a>
			</BentoItem>

			{/* UPES CSA - 10 cols × 5 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={5}
				className="md:col-span-1 lg:col-span-10 lg:row-span-5"
			>
				<a
					href={projects[2].demolink}
					target="_blank"
					rel="noopener noreferrer"
					className="p-4 sm:p-6 h-full flex flex-col group"
				>
					<div className="relative h-20 rounded-lg mb-3 -mx-2 -mt-2 overflow-hidden">
						<Image
							src={projects[2].image}
							alt={projects[2].title}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					</div>
					<h3 className="text-white font-bold mb-1">{projects[2].title}</h3>
					<p className="text-zinc-500 text-[10px] mb-2">
						{projects[2].timeperiod}
					</p>
					<p className="text-zinc-400 text-xs mb-3 leading-relaxed flex-1">
						{projects[2].description}
					</p>
					<div className="flex flex-wrap gap-2">
						{projects[2].tags.map((tag) => (
							<span
								key={tag}
								className="px-2 py-1 bg-zinc-900 text-zinc-400 rounded text-xs border border-zinc-800"
							>
								{tag}
							</span>
						))}
					</div>
				</a>
			</BentoItem>

			{/* Parko - 10 cols × 3 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={3}
				className="md:col-span-1 lg:col-span-10 lg:row-span-3"
			>
				<a
					href={projects[3].github}
					target="_blank"
					rel="noopener noreferrer"
					className="p-4 h-full flex items-center gap-4 group"
				>
					<div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden">
						<Image
							src={projects[3].image}
							alt={projects[3].title}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					</div>
					<div className="flex-1 min-w-0">
						<h3 className="text-white font-bold text-sm mb-1">
							{projects[3].title}
						</h3>
						<p className="text-zinc-400 text-xs line-clamp-2">
							{projects[3].description}
						</p>
					</div>
				</a>
			</BentoItem>
		</div>
	);
};

export default ProjectSection;
