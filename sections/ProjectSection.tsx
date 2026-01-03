import { BentoItem } from "@/components/BentoItem";
import { ActionCard } from "@/components/ActionCard";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
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
	SiKubernetes,
	SiExpress,
	SiAmazons3,
	SiGithub,
	SiShadcnui,
	SiCloudinary,
	SiAmazonwebservices,
	SiRaspberrypi,
	SiPwa,
} from "react-icons/si";
import { VscGlobe } from "react-icons/vsc";
import Link from "next/link";

/**
 * LATTICE STRUCTURE (30 columns × 10 rows)
 * Base row height: 50px
 */

const techStack = {
	React: { icon: SiReact, name: "React" },
	NextJS: { icon: SiNextdotjs, name: "Next.js" },
	NodeJS: { icon: SiNodedotjs, name: "Node.js" },
	MongoDB: { icon: SiMongodb, name: "MongoDB" },
	Redis: { icon: SiRedis, name: "Redis" },
	Javascript: { icon: SiJavascript, name: "JavaScript" },
	Typescript: { icon: SiTypescript, name: "TypeScript" },
	TailwindCSS: { icon: SiTailwindcss, name: "Tailwind CSS" },
	Linux: { icon: SiLinux, name: "Linux" },
	Git: { icon: SiGit, name: "Git" },
	Docker: { icon: SiDocker, name: "Docker" },
	Terraform: { icon: SiTerraform, name: "Terraform" },
	AWS: { icon: SiAmazon, name: "AWS" },
	Vercel: { icon: SiVercel, name: "Vercel" },
	Nginx: { icon: SiNginx, name: "Nginx" },
	PostgreSQL: { icon: SiPostgresql, name: "PostgreSQL" },
	Prisma: { icon: SiPrisma, name: "Prisma" },
	Kubernetes: { icon: SiKubernetes, name: "Kubernetes" },
	Express: { icon: SiExpress, name: "Express" },
	S3: { icon: SiAmazons3, name: "S3" },
	Github: { icon: SiGithub, name: "GitHub" },
	Demo: { icon: VscGlobe, name: "Demo" },
	ShadcnUI: { icon: SiShadcnui, name: "Shadcn UI" },
	Cloudinary: { icon: SiCloudinary, name: "Cloudinary" },
	AmazonWebServices: { icon: SiAmazonwebservices, name: "Amazon Web Services" },
	RaspberryPi: { icon: SiRaspberrypi, name: "RaspberryPi" },
	PWA: { icon: SiPwa, name: "Progressive Web App" },
};

type TechKey = keyof typeof techStack;

const TechIcon = ({ techKey }: { techKey: TechKey }) => {
	const tech = techStack[techKey];
	const Icon = tech.icon;
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<span>
					<Icon className="w-6 h-6 text-white" />
				</span>
			</TooltipTrigger>
			<TooltipContent>{tech.name}</TooltipContent>
		</Tooltip>
	);
};

interface Project {
	title: string;
	description?: string;
	technologies?: TechKey[];
	image?: string;
	demoLink?: string;
	githubLink?: string;
	projectType: "LandingPage" | "WebApp";
	status?: "Live" | "Development" | "Archived";
}

const projects: Project[] = [
	{
		title: "Ideos",
		description:
			"Unified productivity platform consolidating Kanban boards, Pomodoro timers, Reminders, and Note-taking with Gen-AI integration via multi-agent framework and RAG.",
		technologies: [
			"NextJS",
			"NodeJS",
			"MongoDB",
			// "KindeAuth",
			"TailwindCSS",
			"ShadcnUI",
			"Cloudinary",
			"Docker",
			"AmazonWebServices",
			// Zustand
		] as TechKey[],
		image: "/projects/ideos.png",
		demoLink: "https://ideos.live",
		githubLink: "https://github.com/Ayroid/Ideos-Frontend",
		status: "Live",
		projectType: "WebApp",
	},
	{
		title: "Darch",
		description:
			"Visual cloud architecture designer to create AWS infrastructure through an intuitive drag-and-drop interface and automatically provision resources on your cloud.",
		technologies: [
			"NextJS",
			"NodeJS",
			"MongoDB",
			"Terraform",
			"TailwindCSS",
			"ShadcnUI",
			"Docker",
			"AmazonWebServices",
		] as TechKey[],
		image: "/projects/darch.png",
		status: "Development",
		projectType: "WebApp",
		demoLink: "https://darch.ayroid.in",
	},
	{
		title: "Validuct",
		description:
			"AI-powered code validation platform offering real-time feedback, error detection, and optimization suggestions to enhance coding efficiency and quality.",
		technologies: [
			"NextJS",
			"NodeJS",
			"PostgreSQL",
			"Prisma",
			"Redis",
			"Docker",
			"AmazonWebServices",
			"Nginx",
		] as TechKey[],
		image: "/projects/validuct.png",
		status: "Development",
		projectType: "WebApp",
	},
	{
		title: "Parko",
		description:
			"Complete parking solution providing real-time parking availability, spot reservation, and navigation functionalities at UPES.",
		technologies: [
			"React",
			"Express",
			"MongoDB",
			"Javascript",
			"RaspberryPi",
			"PWA",
			"Nginx",
			"Docker",
			"AmazonWebServices",
		] as TechKey[],
		image: "/projects/parko.jpg",
		githubLink: "https://github.com/Ayroid/PARKO-Frontend",
		status: "Archived",
		projectType: "WebApp",
	},
	{
		title: "Terminal Portfolio",
		description:
			"Bash-based terminal portfolio showcasing projects and skills with native linux commands.",
		technologies: [
			"NextJS",
			"Typescript",
			"Linux",
			"TailwindCSS",
			"Vercel",
		] as TechKey[],
		image: "/projects/termfolio.png",
		githubLink: "https://github.com/Ayroid/PARKO-Frontend",
		status: "Live",
		projectType: "LandingPage",
	},
	{
		title: "Orbionio",
		image: "/projects/orbionio.png",
		demoLink: "https://orbionio.in",
		status: "Live",
		projectType: "LandingPage",
	},
	{
		title: "UPESCSA",
		image: "/projects/upescsa.png",
		demoLink: "https://upescsa.in",
		status: "Live",
		projectType: "LandingPage",
	},
];

interface ProjectCardProps {
	info: {
		title?: string;
		description?: string;
		technologies?: TechKey[];
		image?: string;
		demoLink?: string;
		githubLink?: string;
		status?: "Live" | "Development" | "Archived";
	};
}

const ProjectCard = (project: ProjectCardProps) => {
	const statusColors = {
		Live: "bg-green-500",
		Development: "bg-yellow-500",
		Archived: "bg-amber-800",
	};

	return (
		<div className="p-4 sm:p-6 h-full flex flex-col group">
			<div className="relative h-56 mb-4 -mx-2 -mt-2 overflow-hidden">
				{project.info.image && (
					<Image
						src={project.info.image}
						alt={project.info.title ? project.info.title : "Project Image"}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-300"
					/>
				)}
			</div>
			<div className="flex justify-between mb-2">
				<h3 className="text-white font-bold text-xl">{project.info.title}</h3>
				<div className="mb-2 flex items-center justify-center gap-2">
					{project.info.status && (
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="relative flex h-3 w-3">
									<span
										className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
											statusColors[project.info.status]
										}`}
									/>
									<span
										className={`relative inline-flex rounded-full h-3 w-3 ${
											statusColors[project.info.status]
										}`}
									/>
								</span>
							</TooltipTrigger>
							<TooltipContent>{project.info.status}</TooltipContent>
						</Tooltip>
					)}
					{project.info.demoLink && (
						<Link
							href={project.info.demoLink}
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white transition-colors duration-300"
						>
							<VscGlobe className="w-6 h-6" />
						</Link>
					)}
					{project.info.githubLink && (
						<Link
							href={project.info.githubLink}
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white transition-colors duration-300"
						>
							<SiGithub className="w-5 h-5" />
						</Link>
					)}
				</div>
			</div>
			{project.info.description && (
				<p className="text-zinc-400 text-sm mb-4 leading-relaxed flex-1">
					{project.info.description}
				</p>
			)}
			{project.info.technologies && (
				<div className="flex flex-col flex-wrap gap-2 text-zinc-400">
					<span>Technologies</span>
					<div className="flex flex-wrap gap-2">
						{project.info.technologies.map((tech) => (
							<TechIcon key={tech} techKey={tech} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

const ProjectSection = () => {
	return (
		<div
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,1fr)]"
			style={{
				gridAutoRows: "50px", // Base row height
			}}
		>
			{/* Header - 10 cols × 2 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={2}
				className="md:col-span-1 lg:col-span-10"
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

			{/* Ideos Project - 10 cols × 8 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={8}
				className="md:col-span-1 lg:col-span-10"
			>
				<ProjectCard info={projects[0]} />
			</BentoItem>

			{/* Darch - 10 cols × 8 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={8}
				className="md:col-span-1 lg:col-span-10"
			>
				<ProjectCard info={projects[1]} />
			</BentoItem>

			{/* Validuct - 10 cols × 8 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={8}
				className="md:col-span-2 lg:col-span-10"
			>
				<ProjectCard info={projects[2]} />
			</BentoItem>

			{/* Parko - 10 cols × 8 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={8}
				className="md:col-span-2 lg:col-span-10"
			>
				<ProjectCard info={projects[3]} />
			</BentoItem>

			{/* Terminal Folio - 10 cols × 8 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={8}
				className="md:col-span-2 lg:col-span-10"
			>
				<ProjectCard info={projects[4]} />
			</BentoItem>

			{/* Orbinio - 5 cols × 6 rows */}
			<BentoItem
				colSpan={5}
				rowSpan={6}
				className="md:col-span-2 lg:col-span-5"
			>
				<ProjectCard info={projects[5]} />
			</BentoItem>

			{/* UPESCSA - 5 cols × 6 rows */}
			<BentoItem
				colSpan={5}
				rowSpan={6}
				className="md:col-span-2 lg:col-span-5"
			>
				<ProjectCard info={projects[6]} />
			</BentoItem>
		</div>
	);
};

export default ProjectSection;
