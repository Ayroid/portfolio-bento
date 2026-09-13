import Image from "next/image";
import Link from "next/link";
import { PageHeader, Section } from "@/components/shared/Section";
import { projectsData, techStack } from "@/data/projects";

const tag =
  "inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-0.5 text-[12px] text-neutral-400";
const GithubIcon = techStack.Github.icon;

// The title link is stretched over the whole card (after:inset-0) so the card is
// clickable without wrapping the Code link inside another <a>.
const ProjectCard = ({ project }: { project: (typeof projectsData)[0] }) => (
  <article className="group relative flex min-w-0 flex-col gap-3 border-b border-white/[0.06] p-5 sm:odd:border-r">
    <Image
      src={project.image}
      alt=""
      width={640}
      height={400}
      sizes="(min-width: 640px) 18rem, 100vw"
      className="aspect-[8/5] w-full rounded-md border border-white/10 object-cover"
    />
    <div className="flex items-center justify-between gap-3">
      <h3 className="truncate text-neutral-100">
        <Link
          href={`/projects/${project.slug}`}
          className="decoration-neutral-600 underline-offset-4 group-hover:underline after:absolute after:inset-0"
        >
          {project.title}
        </Link>
      </h3>
      <div className="flex shrink-0 gap-1.5">
        <span className={tag}>{project.status}</span>
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${tag} relative z-10 transition-colors hover:border-white/25 hover:text-neutral-100`}
          >
            <GithubIcon className="h-3 w-3" aria-hidden="true" />
            Code
          </a>
        )}
      </div>
    </div>
    <p className="leading-relaxed text-neutral-300">{project.description}</p>
    {/* mt-auto pins the stack to the bottom so it lines up across a row. */}
    <p className="mt-auto pt-2 text-[12px] leading-relaxed text-neutral-500">
      {project.technologies.map((t) => techStack[t].name).join(" · ")}
    </p>
  </article>
);

const ProjectGrid = ({ projects }: { projects: typeof projectsData }) => (
  <div className="-mx-5 grid border-t border-white/[0.06] sm:grid-cols-2">
    {projects.map((project) => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </div>
);

export default function ProjectsPage() {
  const featured = projectsData.filter((p) => p.featured);
  const others = projectsData.filter((p) => !p.featured);

  return (
    <>
      <PageHeader
        title="Projects"
        description="Web apps, tools and experiments I've built."
      />

      <Section label="featured">
        <ProjectGrid projects={featured} />
      </Section>

      {others.length > 0 && (
        <Section label="more">
          <ProjectGrid projects={others} />
        </Section>
      )}
    </>
  );
}
