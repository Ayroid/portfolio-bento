import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { projectsData, getProjectBySlug, techStack, statusColors } from "@/lib/projects-data";

export async function generateStaticParams() {
	return projectsData.map((project) => ({
		slug: project.slug,
	}));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const project = getProjectBySlug(slug);

	if (!project) {
		notFound();
	}

	return (
		<div className="flex flex-col gap-8">
			{/* Back Button */}
			<Link
				href="/projects"
				className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors w-fit"
			>
				<ArrowLeft className="w-4 h-4" />
				<span className="text-sm">Back to Projects</span>
			</Link>

			{/* Project Header */}
			<div className="flex flex-col gap-4">
				<div className="flex items-start justify-between gap-4 flex-wrap">
					<div className="flex-1">
						<h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
							{project.title}
						</h1>
						<p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
							{project.description}
						</p>
					</div>

					{/* Status Badge */}
					<div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full">
						<span
							className={`w-2.5 h-2.5 rounded-full ${statusColors[project.status]}`}
						/>
						<span className="text-white text-sm font-medium">
							{project.status}
						</span>
					</div>
				</div>

				{/* Meta Info */}
				<div className="flex items-center gap-4 flex-wrap">
					<Badge variant="outline" className="text-sm">
						{project.category}
					</Badge>
					{project.date && (
						<div className="flex items-center gap-2 text-zinc-500">
							<Calendar className="w-4 h-4" />
							<span className="text-sm">{project.date}</span>
						</div>
					)}
				</div>

				{/* Links */}
				<div className="flex items-center gap-3">
					{project.demoLink && (
						<a
							href={project.demoLink}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-200 text-black font-medium text-sm transition-colors"
						>
							<ExternalLink className="w-4 h-4" />
							Live Demo
						</a>
					)}
					{project.githubLink && (
						<a
							href={project.githubLink}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white font-medium text-sm transition-colors"
						>
							<Github className="w-4 h-4" />
							View Source
						</a>
					)}
				</div>
			</div>

			{/* Project Image */}
			<div className="relative w-full h-[400px] border border-zinc-800 overflow-hidden">
				<Image
					src={project.image}
					alt={project.title}
					fill
					className="object-cover"
					priority
				/>
			</div>

			{/* Long Description */}
			{project.longDescription && (
				<div className="border border-zinc-800 bg-[#18181b] p-6 sm:p-8">
					<h2 className="text-xl font-bold text-white mb-4">About the Project</h2>
					<p className="text-zinc-400 leading-relaxed">
						{project.longDescription}
					</p>
				</div>
			)}

			{/* Technologies */}
			<div className="border border-zinc-800 bg-[#18181b] p-6 sm:p-8">
				<h2 className="text-xl font-bold text-white mb-4">
					Technologies Used
				</h2>
				<div className="flex flex-wrap gap-3">
					{project.technologies.map((tech) => {
						const techInfo = techStack[tech];
						const Icon = techInfo.icon;
						return (
							<Tooltip key={tech}>
								<TooltipTrigger asChild>
									<div className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
										<Icon className="w-5 h-5 text-white" />
										<span className="text-sm text-zinc-300">
											{techInfo.name}
										</span>
									</div>
								</TooltipTrigger>
								<TooltipContent>{techInfo.name}</TooltipContent>
							</Tooltip>
						);
					})}
				</div>
			</div>

			{/* Related Projects */}
			<div className="border-t border-zinc-800 pt-8">
				<h2 className="text-xl font-bold text-white mb-4">Other Projects</h2>
				<div className="flex gap-3 overflow-x-auto pb-2">
					{projectsData
						.filter((p) => p.id !== project.id)
						.slice(0, 3)
						.map((relatedProject) => (
							<Link
								key={relatedProject.id}
								href={`/projects/${relatedProject.slug}`}
								className="group min-w-[250px] border border-zinc-800 hover:border-zinc-700 bg-[#18181b] transition-colors"
							>
								<div className="relative h-32 w-full overflow-hidden">
									<Image
										src={relatedProject.image}
										alt={relatedProject.title}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<div className="p-3">
									<h3 className="text-white font-semibold text-sm mb-1 group-hover:text-zinc-100 transition-colors">
										{relatedProject.title}
									</h3>
									<p className="text-zinc-500 text-xs line-clamp-2">
										{relatedProject.description}
									</p>
								</div>
							</Link>
						))}
				</div>
			</div>

			{/* Bottom Navigation */}
			<div className="flex justify-between items-center border-t border-zinc-800 pt-8">
				<Link
					href="/projects"
					className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
				>
					<ArrowLeft className="w-4 h-4" />
					<span className="text-sm">All Projects</span>
				</Link>
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
				>
					<span className="text-sm">Home</span>
				</Link>
			</div>
		</div>
	);
}
