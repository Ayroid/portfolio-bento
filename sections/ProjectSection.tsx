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

const projects = [
	{
		title: "Ideos",
		description:
			"Unified productivity platform consolidating Kanban boards, Pomodoro timers, reminders, and note-taking with Gen-AI integration via multi-agent framework and RAG.",
		technologies: ["NextJS", "MongoDB", "Docker", "Kubernetes", "AWS"] as TechKey[],
		image: "/projects/ideos.png",
		demoLink: "https://ideos.live",
		githubLink: "https://github.com/Ayroid/Ideos-Frontend",
	},
	{
		title: "Visual Rift",
		description:
			"Microservices Orchestration Engine streamlining multi-cloud application deployment using intuitive UML diagrams with Docker and Kubernetes.",
		technologies: ["NextJS", "MongoDB", "Docker", "Kubernetes", "AWS"] as TechKey[],
		image: "/projects/visualrift.jpg",
		githubLink: "https://github.com/Visual-Rift/Visual-Rift-Client",
	},
	{
		title: "Parko",
		description:
			"Complete parking solution providing real-time parking availability, spot reservation, and navigation functionalities at UPES.",
		technologies: ["React", "Express", "MongoDB", "AWS", "Nginx"] as TechKey[],
		image: "/projects/parko.jpg",
		githubLink: "https://github.com/Ayroid/PARKO-Frontend",
	},
	{
		title: "Terraform EC2",
		description:
			"Automated infrastructure deployment with modular configurations, remote state management using S3, and best practices for AWS.",
		technologies: ["Terraform", "AWS", "Docker", "S3"] as TechKey[],
		image: "/projects/terraform.jpg",
		demoLink:
			"https://ayroid.hashnode.dev/build-and-manage-aws-infrastructure-with-terraform",
		githubLink: "https://github.com/Ayroid/terraform-ec2-project",
	},
];

interface ProjectCardProps {
	title?: string;
	description?: string;
	technologies?: TechKey[];
	image?: string;
	demoLink?: string;
	githubLink?: string;
}

const ProjectCard = ({
	title,
	description,
	technologies,
	image,
	demoLink,
	githubLink,
}: ProjectCardProps) => {
	return (
		<div className="p-4 sm:p-6 h-full flex flex-col group">
			<div className="relative h-56 mb-4 -mx-2 -mt-2 overflow-hidden">
				{image && (
					<Image
						src={image}
						alt={title ? title : "Project Image"}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-300"
					/>
				)}
			</div>
			<div className="flex justify-between mb-2">
				<h3 className="text-white font-bold text-xl">{title}</h3>
				<div className="mb-2 flex items-center justify-center gap-2">
					{demoLink && (
						<Link
							href={demoLink}
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white transition-colors duration-300"
						>
							<VscGlobe className="w-6 h-6" />
						</Link>
					)}
					{githubLink && (
						<Link
							href={githubLink}
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white transition-colors duration-300"
						>
							<SiGithub className="w-5 h-5" />
						</Link>
					)}
				</div>
			</div>
			{description && (
				<p className="text-zinc-400 text-sm mb-4 leading-relaxed flex-1">
					{description}
				</p>
			)}
			{technologies && (
				<div className="flex flex-col flex-wrap gap-2 text-zinc-400">
					<span>Technologies</span>
					<div className="flex flex-wrap gap-2">
						{technologies.map((tech) => (
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
				<ProjectCard
					title={projects[0].title}
					description={projects[0].description}
					technologies={projects[0].technologies}
					image={projects[0].image}
					demoLink={projects[0].demoLink}
				/>
			</BentoItem>

			{/* Visual Rift - 10 cols × 8 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={8}
				className="md:col-span-1 lg:col-span-10"
			>
				<ProjectCard
					title={projects[1].title}
					description={projects[1].description}
					technologies={projects[1].technologies}
					image={projects[1].image}
					githubLink={projects[1].githubLink}
				/>
			</BentoItem>

			{/* Terraform EC2 - 10 cols × 8 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={8}
				className="md:col-span-2 lg:col-span-10"
			>
				<ProjectCard
					title={projects[3].title}
					description={projects[3].description}
					technologies={projects[3].technologies}
					image={projects[3].image}
					demoLink={projects[3].demoLink}
				/>
			</BentoItem>

			{/* Terraform EC2 - 10 cols × 8 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={8}
				className="md:col-span-2 lg:col-span-10"
			>
				<ProjectCard
					title={projects[3].title}
					description={projects[3].description}
					technologies={projects[3].technologies}
					image={projects[3].image}
					demoLink={projects[3].demoLink}
				/>
			</BentoItem>

			{/* Terraform EC2 - 10 cols × 8 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={8}
				className="md:col-span-2 lg:col-span-10"
			>
				<ProjectCard
					title={projects[3].title}
					description={projects[3].description}
					technologies={projects[3].technologies}
					image={projects[3].image}
					demoLink={projects[3].demoLink}
				/>
			</BentoItem>
			{/* Terraform EC2 - 5 cols × 6 rows */}
			<BentoItem
				colSpan={5}
				rowSpan={6}
				className="md:col-span-2 lg:col-span-5"
			>
				<ProjectCard
					title={projects[3].title}
					image={projects[3].image}
					demoLink={projects[3].demoLink}
				/>
			</BentoItem>
			{/* Terraform EC2 - 5 cols × 6 rows */}
			<BentoItem
				colSpan={5}
				rowSpan={6}
				className="md:col-span-2 lg:col-span-5"
			>
				<ProjectCard
					title={projects[3].title}
					image={projects[3].image}
					demoLink={projects[3].demoLink}
				/>
			</BentoItem>

			{/* Parko - 10 cols × 5 rows */}
			{/* <BentoItem
				colSpan={10}
				rowSpan={5}
				className="md:col-span-1 lg:col-span-10"
			>
				<ProjectCard
					title={projects[2].title}
					description={projects[2].description}
					technologies={projects[2].technologies}
					image={projects[2].image}
					demoLink={projects[2].demoLink}
					githubLink={projects[2].githubLink}
				/>
			</BentoItem> */}
		</div>
	);
};

export default ProjectSection;
