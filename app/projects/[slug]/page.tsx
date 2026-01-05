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
import {
  projectsData,
  getProjectBySlug,
  techStack,
  statusColors,
} from "@/lib/projects-data";
import { FadeUpReveal, Separator } from "@/components/shared";

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Get related projects based on position
  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  let relatedProjects: typeof projectsData = [];

  if (currentIndex === 0) {
    relatedProjects = projectsData.slice(1, 3);
  } else if (currentIndex === projectsData.length - 1) {
    relatedProjects = [projectsData[projectsData.length - 2], projectsData[0]];
  } else {
    relatedProjects = [
      projectsData[currentIndex - 1],
      projectsData[currentIndex + 1],
    ];
  }

  return (
    <div className="flex flex-col gap-8 pt-12">
      {/* Back Button */}
      <FadeUpReveal>
        <Link
          href="/projects"
          className="inline-flex w-fit items-center gap-2 text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to Projects</span>
        </Link>
      </FadeUpReveal>

      {/* Project Header */}
      <FadeUpReveal>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="mb-3 font-mono text-3xl font-bold text-white sm:text-4xl">
                {project.title}
              </h1>
              <p className="font-sans text-base leading-relaxed text-zinc-400 sm:text-lg">
                {project.description}
              </p>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${statusColors[project.status]}`}
              />
              <span className="text-sm font-medium text-white">
                {project.status}
              </span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="outline" className="text-sm">
              {project.category}
            </Badge>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
              >
                <Github className="h-4 w-4" />
                View Source
              </a>
            )}
          </div>
        </div>
      </FadeUpReveal>

      {/* Project Image */}
      <FadeUpReveal>
        <div className="relative h-[400px] w-full overflow-hidden border border-zinc-800">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </FadeUpReveal>

      {/* Long Description */}
      {project.longDescription && (
        <FadeUpReveal>
          <div className="border border-zinc-800 bg-[#18181b] p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-white">
              About the Project
            </h2>
            <p className="leading-relaxed text-zinc-400">
              {project.longDescription}
            </p>
          </div>
        </FadeUpReveal>
      )}

      {/* Technologies */}
      <FadeUpReveal>
        <div className="border border-zinc-800 bg-[#18181b] p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-white">
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => {
              const techInfo = techStack[tech];
              const Icon = techInfo.icon;
              return (
                <Tooltip key={tech}>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-900 px-3 py-2 transition-colors hover:border-zinc-700">
                      <Icon className="h-5 w-5 text-white" />
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
      </FadeUpReveal>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <>
          <FadeUpReveal>
            <Separator />
          </FadeUpReveal>
          <FadeUpReveal>
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
                Other Projects
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {relatedProjects.map((relatedProject) => (
                  <Link
                    key={relatedProject.id}
                    href={`/projects/${relatedProject.slug}`}
                    className="group relative block h-full bg-transparent"
                  >
                    <div className="relative flex h-full w-full flex-col overflow-hidden border border-zinc-800 bg-[#18181b] transition-all duration-300 hover:border-zinc-700">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-2 p-4">
                        <h3 className="line-clamp-2 font-sans text-base leading-tight font-semibold text-white transition-colors group-hover:text-zinc-100">
                          {relatedProject.title}
                        </h3>
                        <p className="line-clamp-2 font-sans text-xs leading-relaxed text-zinc-400">
                          {relatedProject.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeUpReveal>
        </>
      )}

      {/* Footer */}
      <FadeUpReveal>
        <Separator />
      </FadeUpReveal>
      <FadeUpReveal>
        <div className="mb-12 flex items-center justify-between pt-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Projects
          </Link>
        </div>
      </FadeUpReveal>
    </div>
  );
}
