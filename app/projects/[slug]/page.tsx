import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { projectsData, getProjectBySlug, techStack } from "@/data/projects";
import { ProjectTimeline } from "@/components/shared";
import {
  PageHeader,
  Section,
  pill,
  row,
  rowTitle,
} from "@/components/shared/Section";

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
    <>
      <PageHeader
        title={project.title}
        titleTransition={`project-${project.slug}`}
        description={project.description}
      >
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[13px] text-neutral-500">
            {project.status}
          </span>
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={pill}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Visit
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={pill}
            >
              <Github className="h-3.5 w-3.5" />
              Source
            </a>
          )}
        </div>
      </PageHeader>

      <div className="border-t border-white/[0.06] px-5 py-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-white/10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="600px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {project.longDescription && (
        <Section label="about">
          <p className="leading-relaxed text-neutral-300">
            {project.longDescription}
          </p>
        </Section>
      )}

      {project.timeline && project.timeline.length > 0 && (
        <Section label="timeline">
          <ProjectTimeline stages={project.timeline} />
        </Section>
      )}

      <Section label="stack">
        <p className="leading-relaxed text-neutral-300">
          {project.technologies.map((t) => techStack[t].name).join(" · ")}
        </p>
      </Section>

      {relatedProjects.length > 0 && (
        <Section label="more">
          {relatedProjects.map((p) => (
            <Link
              key={p.id}
              href={`/projects/${p.slug}`}
              className={`${row} grid-cols-[minmax(0,1fr)_auto] items-baseline sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto]`}
            >
              <ViewTransition name={`project-${p.slug}`}>
                <span className={`truncate ${rowTitle}`}>{p.title}</span>
              </ViewTransition>
              <span className="hidden truncate text-neutral-400 sm:block">
                {p.description}
              </span>
              <span className="text-neutral-500">{p.status}</span>
            </Link>
          ))}
        </Section>
      )}
    </>
  );
}
