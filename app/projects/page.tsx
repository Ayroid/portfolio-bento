import Image from "next/image";
import Link from "next/link";
import {
  PageHeader,
  Section,
  row,
  rowTitle,
} from "@/components/shared/Section";
import { projectsData } from "@/data/projects";

const ProjectRow = ({ project }: { project: (typeof projectsData)[0] }) => (
  <Link
    href={`/projects/${project.slug}`}
    className={`${row} grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center`}
  >
    <Image
      src={project.image}
      alt=""
      width={144}
      height={90}
      className="aspect-[8/5] w-full rounded-sm border border-white/10 object-cover"
    />
    <span className="min-w-0">
      <span className={`block truncate ${rowTitle}`}>{project.title}</span>
      <span className="block truncate text-neutral-400">
        {project.description}
      </span>
    </span>
    <span className="text-neutral-500">{project.status}</span>
  </Link>
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
        {featured.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </Section>

      {others.length > 0 && (
        <Section label="more">
          {others.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </Section>
      )}
    </>
  );
}
