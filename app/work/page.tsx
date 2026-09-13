import Image from "next/image";
import { PageHeader } from "@/components/shared/Section";
import { techStack } from "@/data/projects";
import { experiences } from "@/data/experience";

const socialLabels = {
  website: "Website",
  linkedin: "LinkedIn",
  twitter: "X",
  github: "GitHub",
} as const;

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="Work"
        description="Where I've worked and what I did there."
      />

      {experiences.map((exp) => (
        <section
          key={exp.company}
          className="border-t border-white/[0.06] px-5 py-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src={exp.logo}
                alt=""
                width={32}
                height={32}
                className="shrink-0 rounded-full bg-white"
              />
              <div>
                <h2 className="text-neutral-100">{exp.company}</h2>
                <p className="text-neutral-400">{exp.title}</p>
              </div>
            </div>
            <div className="shrink-0 text-right text-[13px] text-neutral-500">
              <p className="tabular-nums">{exp.period}</p>
              <p>{exp.location}</p>
            </div>
          </div>

          <ul className="mt-5 list-disc space-y-2 pl-4 leading-relaxed text-neutral-400 marker:text-neutral-600 [&_strong]:font-normal [&_strong]:text-neutral-200">
            {exp.description.map((point, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
            ))}
          </ul>

          <p className="mt-5 text-[13px] text-neutral-500">
            {exp.technologies.map((t) => techStack[t].name).join(" · ")}
          </p>

          {exp.socials && (
            <div className="mt-3 flex gap-4 text-[13px]">
              {Object.entries(exp.socials).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 transition-colors hover:text-neutral-100"
                >
                  {socialLabels[key as keyof typeof socialLabels]} ↗
                </a>
              ))}
            </div>
          )}
        </section>
      ))}
    </>
  );
}
