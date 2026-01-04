"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUpRight } from "lucide-react";
import { projectsData, statusColors, techStack } from "@/lib/projects-data";
import { FadeUpReveal } from "@/components/shared";

interface ProjectCardProps {
  project: (typeof projectsData)[0];
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block h-full bg-transparent"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        className="relative flex h-full w-full flex-col overflow-hidden border border-zinc-800 bg-[#18181b] transition-colors duration-300"
        style={{ zIndex: 2 }}
      >
        {/* Project Image */}
        <div className="relative h-72 w-full overflow-hidden">
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
          {/* Title */}
          <h3 className="font-sans text-xl font-bold text-white">
            {project.title}
          </h3>

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
    </Link>
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
          <div className="border p-12 sm:p-16">
            <h1 className="text-center font-mono text-3xl font-bold tracking-wider text-white sm:text-5xl">
              PROJECTS
            </h1>
          </div>
          <div className="border border-t-0 p-6">
            <p className="text-center text-sm text-zinc-400 sm:text-base">
              A collection of web applications, tools, and experiments I&apos;ve
              built.
            </p>
          </div>
        </div>
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

      {/* Explore More */}
      <FadeUpReveal>
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
            Explore More
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href="/work"
              className="group flex items-center justify-between border border-zinc-800 bg-[#18181b] p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <span className="font-sans text-lg font-semibold text-white">
                Work Experience
              </span>
              <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
            </Link>
            <Link
              href="/blogs"
              className="group flex items-center justify-between border border-zinc-800 bg-[#18181b] p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <span className="font-sans text-lg font-semibold text-white">
                Blogs
              </span>
              <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
            </Link>
          </div>
        </div>
      </FadeUpReveal>

      {/* GitHub CTA */}
      <FadeUpReveal>
        <div className="flex flex-col items-center justify-center gap-4 border border-zinc-800 bg-[#18181b] py-8">
          <p className="text-center text-sm text-zinc-400">
            Want to see more? Check out my GitHub for additional projects and
            contributions.
          </p>
          <a
            href="https://github.com/ayroid"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
          >
            Visit GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </FadeUpReveal>
    </div>
  );
}
