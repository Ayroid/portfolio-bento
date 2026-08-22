"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUpRight, FolderCode } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { VscGlobe } from "react-icons/vsc";
import { projectsData, statusColors, techStack } from "@/data/projects";
import { FadeUpReveal, Separator } from "@/components/shared";

interface ProjectCardProps {
  project: (typeof projectsData)[0];
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCardClick = () => {
    router.push(`/projects/${project.slug}`);
  };

  return (
    <div
      className="group relative block h-full cursor-pointer bg-transparent"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Hover glow effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
          opacity: isHovered ? 1 : 0,
          zIndex: 3,
        }}
      />

      {/* Border glow effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3), transparent 40%)`,
          opacity: isHovered ? 1 : 0,
          zIndex: 1,
        }}
      />

      {/* Card content */}
      <div
        className="relative flex h-full w-full flex-col overflow-hidden border border-zinc-800 bg-surface-card transition-colors duration-300"
        style={{ zIndex: 2 }}
      >
        {/* Project Image */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Status Badge on Image */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-black/70 px-3 py-1.5 backdrop-blur-sm">
              <span
                className={`h-2 w-2 rounded-full ${
                  statusColors[project.status]
                }`}
              />
              <span className="text-xs font-medium text-white">
                {project.status}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          {/* Title and Links */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-sans text-xl font-bold text-white">
              {project.title}
            </h3>
            {(project.githubLink || project.demoLink) && (
              <div className="flex items-center gap-2">
                {project.demoLink && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 transition-colors duration-300 hover:text-white"
                      >
                        <VscGlobe className="h-6 w-6" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>Visit</TooltipContent>
                  </Tooltip>
                )}
                {project.githubLink && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 transition-colors duration-300 hover:text-white"
                      >
                        <SiGithub className="h-5 w-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>Github</TooltipContent>
                  </Tooltip>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="font-sans text-sm leading-relaxed text-zinc-400">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mt-auto flex flex-col flex-wrap gap-2 text-zinc-400">
            <span>Technologies</span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => {
                const TechIcon = techStack[tech]?.icon;
                return TechIcon ? (
                  <Tooltip key={tech}>
                    <TooltipTrigger asChild>
                      <span>
                        <TechIcon className="h-6 w-6 text-white" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{techStack[tech].name}</TooltipContent>
                  </Tooltip>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState("All");
  const featuredProjects = projectsData.filter((project) => project.featured);
  const otherProjects = projectsData.filter((project) => !project.featured);

  // Get all unique tags
  const allTags = Array.from(
    new Set(projectsData.flatMap((project) => project.tags))
  ).sort();

  // Filter projects by tag
  const filterByTag = (projects: typeof projectsData) => {
    if (selectedTag === "All") return projects;
    return projects.filter((project) => project.tags.includes(selectedTag));
  };

  const filteredFeatured = filterByTag(featuredProjects);
  const filteredOther = filterByTag(otherProjects);

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <FadeUpReveal>
        <div className="flex flex-col gap-0">
          <div className="relative overflow-hidden border p-12 sm:p-16">
            {/* Corner decorations */}
            <div className="absolute top-3 left-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-700" />
              <div className="h-1.5 w-1.5 bg-zinc-800" />
            </div>
            <div className="absolute top-3 right-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-800" />
              <div className="h-1.5 w-1.5 bg-zinc-700" />
            </div>
            <div className="absolute bottom-3 left-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-800" />
              <div className="h-1.5 w-1.5 bg-zinc-700" />
            </div>
            <div className="absolute right-3 bottom-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-700" />
              <div className="h-1.5 w-1.5 bg-zinc-800" />
            </div>
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 3px, currentcolor 4px, currentcolor 4px, transparent 5px)",
              }}
            />
            <div className="relative flex flex-col items-center gap-4">
              <FolderCode className="h-8 w-8 text-zinc-600 sm:h-10 sm:w-10" />
              <h1 className="text-center font-mono text-3xl font-bold tracking-wider text-white sm:text-5xl">
                PROJECTS
              </h1>
            </div>
          </div>
          <div className="border border-t-0 p-6">
            <p className="text-center text-sm text-zinc-400 sm:text-base">
              A collection of web applications, tools, and experiments I&apos;ve
              built.
            </p>
          </div>
        </div>
      </FadeUpReveal>

      {/* Separator */}
      <FadeUpReveal>
        <Separator />
      </FadeUpReveal>

      {/* Popular Tags */}
      <FadeUpReveal>
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
            Popular Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag("All")}
              className={`border px-3 py-1.5 text-xs transition-colors ${
                selectedTag === "All"
                  ? "border-white bg-white text-black"
                  : "border-zinc-800 bg-transparent text-zinc-400 hover:border-zinc-700 hover:text-white"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => {
              const count = projectsData.filter((project) =>
                project.tags.includes(tag)
              ).length;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`border px-3 py-1.5 text-xs transition-colors ${
                    selectedTag === tag
                      ? "border-white bg-white text-black"
                      : "border-zinc-800 bg-transparent text-zinc-400 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  {tag} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </FadeUpReveal>

      {/* Featured Projects Section */}
      {filteredFeatured.length > 0 && (
        <div className="flex flex-col gap-4">
          <FadeUpReveal>
            <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
              Featured
            </h2>
          </FadeUpReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredFeatured.map((project) => (
              <FadeUpReveal key={project.id} className="h-full">
                <ProjectCard project={project} />
              </FadeUpReveal>
            ))}
          </div>
        </div>
      )}

      {/* All Projects Section */}
      {filteredOther.length > 0 && (
        <div className="flex flex-col gap-4">
          <FadeUpReveal>
            <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
              {filteredFeatured.length > 0 ? "More Projects" : "All Projects"}
            </h2>
          </FadeUpReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredOther.map((project) => (
              <FadeUpReveal key={project.id} className="h-full">
                <ProjectCard project={project} />
              </FadeUpReveal>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredFeatured.length === 0 && filteredOther.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <p className="text-center text-zinc-400">
            No projects found with tag &quot;{selectedTag}&quot;
          </p>
          <button
            onClick={() => setSelectedTag("All")}
            className="bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Separator */}
      <FadeUpReveal>
        <Separator />
      </FadeUpReveal>

      {/* Explore More */}
      <FadeUpReveal>
        <div className="mb-12 flex flex-col gap-4 pt-4">
          <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
            Explore More
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href="/work"
              className="group flex items-center justify-between border border-zinc-800 bg-surface-card p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <span className="font-sans text-lg font-semibold text-white">
                Work Experience
              </span>
              <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
            </Link>
            <Link
              href="/blogs"
              className="group flex items-center justify-between border border-zinc-800 bg-surface-card p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <span className="font-sans text-lg font-semibold text-white">
                Blogs
              </span>
              <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
            </Link>
          </div>
        </div>
      </FadeUpReveal>
    </div>
  );
}
