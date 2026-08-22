"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";
import { PiGlobeSimple } from "react-icons/pi";
import Image from "next/image";
import { experiences } from "@/data/experience";
import { TopRightArrow } from "@/components/icons";

const ExperienceCard = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index: number) => {
    if (openIndex !== index) {
      setOpenIndex(index);
    }
  };

  return (
    <section
      className="flex h-full flex-col"
      aria-labelledby="experience-heading"
    >
      <header>
        <Link
          href="/work"
          className="group relative flex items-end justify-start border-b bg-white px-6 py-6 font-mono text-2xl text-black transition-colors hover:bg-[#dddddd] sm:px-8 sm:text-3xl lg:text-4xl"
        >
          <TopRightArrow iconColor="text-black" />
          <h2 id="experience-heading">EXPERIENCE</h2>
        </Link>
      </header>
      <div className="flex-1 overflow-hidden">
        {experiences.map((exp, index) => (
          <article
            key={index}
            className={`relative overflow-hidden px-6 py-4 transition-colors duration-300 hover:bg-white/[0.02] sm:px-4 ${
              index !== experiences.length - 1 ? "border-b border-zinc-800" : ""
            }`}
          >
            <header
              className="cursor-pointer"
              onClick={() => toggleAccordion(index)}
              role="button"
              tabIndex={0}
              aria-expanded={openIndex === index}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleAccordion(index);
                }
              }}
            >
              <div className="flex items-center justify-between">
                <div className="group/exp flex items-start gap-2">
                  <figure className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-0.5 transition-transform duration-300 ease-[var(--ease-spring)] group-hover/exp:scale-110">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </figure>
                  <h3 className="-mt-1 text-base font-bold text-white sm:text-lg">
                    {exp.company}
                  </h3>
                </div>

                <nav
                  className="-mt-2 flex items-center gap-1.5"
                  aria-label={`${exp.company} social links`}
                >
                  {exp.socials?.website && (
                    <a
                      href={exp.socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 transition-all duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${exp.company} website`}
                    >
                      <PiGlobeSimple className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {exp.socials?.twitter && (
                    <a
                      href={exp.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 transition-all duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${exp.company} on X (Twitter)`}
                    >
                      <FaXTwitter className="h-3 w-3" />
                    </a>
                  )}
                  {exp.socials?.linkedin && (
                    <a
                      href={exp.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 transition-all duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${exp.company} on LinkedIn`}
                    >
                      <FaLinkedin className="h-3 w-3" />
                    </a>
                  )}
                  {exp.socials?.github && (
                    <a
                      href={exp.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 transition-all duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${exp.company} on GitHub`}
                    >
                      <FaGithub className="h-3 w-3" />
                    </a>
                  )}
                  <FaChevronDown
                    className={`ml-1 h-3 w-3 text-zinc-400 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </nav>
              </div>

              <div className="-mt-3 ml-10 flex items-center gap-1 text-sm">
                <time className="text-zinc-400">{exp.period}</time>
                <span className="text-zinc-600" aria-hidden="true">
                  |
                </span>
                <address className="text-zinc-500 not-italic">
                  {exp.location}
                </address>
              </div>

              <p className="mt-0 ml-10 text-sm font-bold text-zinc-400">
                {exp.title}
              </p>
            </header>

            <section
              className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]"
              style={{ gridTemplateRows: openIndex === index ? "1fr" : "0fr" }}
              aria-hidden={openIndex !== index}
            >
              <div className="overflow-hidden">
                <div className="mt-3 ml-6">
                  <ul className="space-y-1">
                    {exp.description.map((point, i) => (
                      <li
                        key={i}
                        className={`flex items-start font-sans text-sm leading-snug text-zinc-400 transition-all duration-300 ${
                          openIndex === index
                            ? "translate-y-0 opacity-100"
                            : "translate-y-2 opacity-0"
                        }`}
                        style={{
                          transitionDelay:
                            openIndex === index ? `${i * 50}ms` : "0ms",
                        }}
                      >
                        <span
                          className="mt-1 mr-2 text-zinc-600"
                          aria-hidden="true"
                        >
                          •
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ExperienceCard;
