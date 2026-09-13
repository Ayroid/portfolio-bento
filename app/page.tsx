import Image from "next/image";
import Link from "next/link";
import { Calendar, Mail } from "lucide-react";
import { siteConfig } from "@/config";
import { experiences } from "@/data/experience";
import { projectsData } from "@/data/projects";
import { blogs } from "@/data/blog";
import GitHubCard from "@/components/landing/GitHub";
import {
  Section,
  inlineLink,
  pill,
  row,
  rowTitle,
} from "@/components/shared/Section";

// "Jan 2025 - Present" -> "2025–", "Oct 2024 - Dec 2024" -> "2024", "2021 - 2023" -> "2021–23"
const years = (period: string) => {
  const [from, to] = period.replace(/[A-Za-z]{3} /g, "").split(" - ");
  if (to === "Present") return `${from}–`;
  return from === to ? from : `${from}–${to.slice(2)}`;
};

export default function Home() {
  return (
    <>
      <header className="flex flex-col items-start gap-4 px-5 py-8 sm:flex-row sm:items-center">
        <Image
          src="/profile.jpg"
          alt=""
          width={56}
          height={56}
          className="rounded-full"
          priority
        />
        <div>
          <h1 className="text-2xl font-normal text-neutral-100">
            {siteConfig.name}
          </h1>
          <p className="text-neutral-500">
            Software Engineer · Faridabad, India
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={siteConfig.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={pill}
            >
              <Calendar className="h-3.5 w-3.5" />
              Book a call
            </a>
            <a href={`mailto:${siteConfig.email}`} className={pill}>
              <Mail className="h-3.5 w-3.5" />
              Send an email
            </a>
          </div>
        </div>
      </header>

      <Section label="now">
        <ul className="list-disc space-y-2 pl-4 leading-relaxed text-neutral-300 marker:text-neutral-600">
          <li>
            Software Engineer at{" "}
            <a
              href="https://www.ymsl.in/"
              target="_blank"
              rel="noopener noreferrer"
              className={inlineLink}
            >
              Yamaha Motor Solutions
            </a>
            , keeping production infrastructure running across India, Japan,
            Europe and Brazil.
          </li>
          <li>
            Building{" "}
            <Link href="/projects/darch" className={inlineLink}>
              Darch
            </Link>
            , a visual AWS architecture designer, and{" "}
            <Link href="/projects/validuct" className={inlineLink}>
              Validuct
            </Link>
            , a place to validate product ideas before building them.
          </li>
          <li>
            Writing about systems, DevOps and the web on the{" "}
            <Link href="/blogs" className={inlineLink}>
              blog
            </Link>
            .
          </li>
        </ul>
      </Section>

      <Section label="work" more={{ href: "/work", text: "Full history" }}>
        {experiences.map((exp) => (
          <Link
            key={exp.company}
            href="/work"
            className={`${row} grid-cols-[minmax(0,1fr)_auto] items-baseline sm:grid-cols-[minmax(0,13rem)_1fr_auto]`}
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <Image
                src={exp.logo}
                alt=""
                width={16}
                height={16}
                className="shrink-0 rounded-full bg-white"
              />
              <span className={`truncate ${rowTitle}`}>{exp.company}</span>
            </span>
            <span className="hidden text-neutral-400 sm:block">
              {exp.title}
            </span>
            <span className="tabular text-neutral-500">
              {years(exp.period)}
            </span>
          </Link>
        ))}
      </Section>

      <Section label="activity">
        <GitHubCard username={siteConfig.username} />
      </Section>

      <Section
        label="projects"
        more={{ href: "/projects", text: "All projects" }}
      >
        {projectsData
          .filter((p) => p.featured)
          .map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className={`${row} grid-cols-[minmax(0,1fr)_auto] items-baseline sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto]`}
            >
              <span className={`truncate ${rowTitle}`}>{p.title}</span>
              <span className="hidden truncate text-neutral-400 sm:block">
                {p.description}
              </span>
              <span className="text-neutral-500">{p.status}</span>
            </Link>
          ))}
      </Section>

      <Section label="writing" more={{ href: "/blogs", text: "All posts" }}>
        {blogs.slice(0, 4).map((b) => (
          <Link
            key={b.redirectTo}
            href={b.redirectTo}
            className={`${row} grid-cols-[3rem_1fr] items-baseline`}
          >
            <span className="tabular text-neutral-500">{b.date.slice(-4)}</span>
            <span className={rowTitle}>{b.title}</span>
          </Link>
        ))}
      </Section>
    </>
  );
}
