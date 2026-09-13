import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronDown, Mail } from "lucide-react";
import { siteConfig } from "@/config";
import { experiences } from "@/data/experience";
import { projectsData } from "@/data/projects";
import { blogs } from "@/data/blog";
import Avatar from "@/components/landing/Avatar";
import {
  Section,
  inlineLink,
  pill,
  row,
  rowTitle,
} from "@/components/shared/Section";

export default function Home() {
  return (
    <>
      <header className="flex flex-col items-start gap-5 px-5 py-8 sm:flex-row">
        <Avatar name={siteConfig.name} />
        <div>
          <h1 className="text-2xl font-normal text-neutral-100">
            {siteConfig.name}
          </h1>
          <p className="text-neutral-500">
            <span className="sr-only">Software Engineer, polymath, explorer</span>
            <span aria-hidden="true" className="word-cycle grid">
              <span>Software Engineer</span>
              <span>Polymath</span>
              <span>Explorer</span>
            </span>
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

      <Section label="about">
        <div className="space-y-3 leading-relaxed text-neutral-300">
          <p>
            I&apos;m a software engineer at{" "}
            <a
              href="https://www.ymsl.in/"
              target="_blank"
              rel="noopener noreferrer"
              className={inlineLink}
            >
              Yamaha Motor Solutions
            </a>
            , where I help keep production systems running for teams across
            India, Japan, Europe and Brazil.
          </p>
          <p>
            I&apos;m happiest when I&apos;m learning something new. I like
            taking on problems I don&apos;t yet know how to solve, because
            that&apos;s where I grow fastest, and I try to bring that same
            habit to every part of my life, not just code.
          </p>
          <p>
            Outside work, that means building{" "}
            <Link href="/projects/darch" className={inlineLink}>
              Darch
            </Link>{" "}
            and{" "}
            <Link href="/projects/validuct" className={inlineLink}>
              Validuct
            </Link>
            , and writing on the{" "}
            <Link href="/blogs" className={inlineLink}>
              blog
            </Link>{" "}
            about what I pick up along the way.
          </p>
        </div>
      </Section>

      <Section label="work" href="/work">
        {experiences.map((exp) => (
          <details
            key={exp.company}
            className="group border-t border-white/[0.06] py-4"
          >
            <summary className="flex cursor-pointer list-none flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4 [&::-webkit-details-marker]:hidden">
              <span className="flex min-w-0 items-center gap-3">
                <Image
                  src={exp.logo}
                  alt=""
                  width={32}
                  height={32}
                  className="shrink-0 rounded-full bg-white"
                />
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-neutral-100">
                      {exp.company}
                    </span>
                    {exp.period.endsWith("Present") && (
                      <span
                        title="Currently working here"
                        className="h-2 w-2 shrink-0 rounded-full bg-emerald-400"
                      >
                        <span className="sr-only">Currently working here</span>
                      </span>
                    )}
                    <ChevronDown className="h-4 w-4 shrink-0 text-neutral-500 transition-transform group-open:rotate-180" />
                  </span>
                  <span className="block text-neutral-400">{exp.title}</span>
                </span>
              </span>
              <span className="shrink-0 pl-11 text-[13px] text-neutral-500 sm:pl-0 sm:text-right">
                <span className="block tabular-nums">{exp.period}</span>
                <span className="block">{exp.location}</span>
              </span>
            </summary>

            <div className="mt-5 border-t border-white/[0.06] pt-5">
              <ul className="list-disc space-y-2 pl-4 leading-relaxed text-neutral-400 marker:text-neutral-600 [&_strong]:font-normal [&_strong]:text-neutral-200">
                {exp.description.map((point, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: point }} />
                ))}
              </ul>
            </div>
          </details>
        ))}
      </Section>

      <Section
        label="projects"
        href="/projects"
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

      <Section label="writing" href="/blogs" more={{ href: "/blogs", text: "All posts" }}>
        {blogs.slice(0, 4).map((b) => (
          <Link
            key={b.redirectTo}
            href={b.redirectTo}
            className={`${row} grid-cols-[3rem_1fr] items-baseline`}
          >
            <span className="text-neutral-500 tabular-nums">
              {b.date.slice(-4)}
            </span>
            <ViewTransition
              name={`post-${b.redirectTo.replace("/blogs/", "")}`}
            >
              <span className={rowTitle}>{b.title}</span>
            </ViewTransition>
          </Link>
        ))}
      </Section>
    </>
  );
}
