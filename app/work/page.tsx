"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";
import { PiGlobeSimple } from "react-icons/pi";
import { Badge } from "@/components/ui/badge";
import { FadeUpReveal } from "@/components/shared";

interface Experience {
  title: string;
  company: string;
  logo: string;
  companyUrl?: string;
  location: string;
  period: string;
  socials?: {
    website?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  technologies: string[];
  description: string[];
}

const experiences: Experience[] = [
  {
    title: "Software Engineer",
    company: "Yamaha Motor Solutions India",
    logo: "/yamaha_logo.png",
    companyUrl: "https://www.ymsl.in/",
    location: "Faridabad, India (On-Site)",
    period: "Jan 2025 - Present",
    socials: {
      website: "https://www.ymsl.in/",
      linkedin:
        "https://www.linkedin.com/company/yamaha-motor-solutions-india-pvt.ltd./",
    },
    technologies: [
      "Cloud Infrastructure",
      "Linux",
      "Databases",
      "System Monitoring",
      "AWS",
      "Automation",
    ],
    description: [
      "Started as a Software Engineering Intern and transitioned into a full-time role working on production systems",
      "Managing enterprise-grade systems and infrastructure across multiple regions including India, Japan, Europe, and Brazil",
      "Ensuring high availability, stability, and performance of core platforms supporting global business operations",
      "Working closely with databases, deployments, and monitoring to support large-scale production workloads",
      "Collaborating with cross-functional teams to automate workflows, improve reliability, and resolve production issues",
    ],
  },
  {
    title: "Software Developer",
    company: "OrganicGrow",
    logo: "/stealth.jpeg",
    location: "Remote",
    period: "Aug 2024 - Dec 2024",
    technologies: ["GenAI", "React", "Node.js", "TypeScript", "AWS"],
    description: [
      "Built and shipped a GenAI-powered platform for creating, editing, and managing social media content at scale",
      "Designed and implemented end-to-end workflows for content generation, real-time editing, and automated scheduling",
      "Worked across frontend, backend, and cloud deployment to deliver features used by 100+ active customers",
      "Improved system performance, reliability, and developer velocity using a modern TypeScript-based stack",
    ],
  },
  {
    title: "Freelance Software Developer",
    company: "Independent",
    logo: "/stealth.jpeg",
    location: "Remote",
    period: "2022 - 2024",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    description: [
      "Built and shipped full-stack MVPs, dashboards, and landing pages for individual founders, startups, and small businesses",
      "Owned projects end-to-end—from requirement discussions and system design to development, deployment, and handover",
      "Developed backend APIs, authentication flows, and database schemas for real-world production use cases",
      "Deployed and managed applications on client-owned infrastructure, ensuring smooth delivery and operational stability",
    ],
  },
];

export default function WorkPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <FadeUpReveal>
        <div className="flex flex-col gap-0">
          <div className="border p-12 sm:p-16">
            <h1 className="text-center font-mono text-3xl font-bold tracking-wider text-white sm:text-5xl">
              WORK
            </h1>
          </div>
          <div className="border border-t-0 p-6">
            <p className="text-center font-sans text-sm text-zinc-400 sm:text-base">
              My professional journey and work experience across different roles
              and companies.
            </p>
          </div>
        </div>
      </FadeUpReveal>

      {/* Experience Cards */}
      <div className="flex flex-col gap-6">
        {experiences.map((exp, index) => (
          <FadeUpReveal key={index}>
            <div className="group border border-zinc-800 bg-[#18181b] transition-all duration-300 hover:border-zinc-700">
              {/* Header */}
              <div className="flex flex-col gap-4 border-b border-zinc-800 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Logo + Company Info */}
                  <div className="flex items-start gap-4">
                    {/* Company Logo */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1">
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>

                    {/* Company Details */}
                    <div className="flex flex-col gap-1">
                      <h2 className="font-sans text-xl font-bold text-white sm:text-2xl">
                        {exp.company}
                      </h2>
                      <p className="font-sans text-base font-semibold text-zinc-300">
                        {exp.title}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 font-sans text-sm text-zinc-400">
                        <span>{exp.period}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-500">{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Social Links */}
                  <div className="flex items-center gap-3">
                    {exp.socials?.website && (
                      <a
                        href={exp.socials.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 transition-colors hover:text-white"
                      >
                        <PiGlobeSimple className="h-5 w-5" />
                      </a>
                    )}
                    {exp.socials?.linkedin && (
                      <a
                        href={exp.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 transition-colors hover:text-white"
                      >
                        <FaLinkedin className="h-4 w-4" />
                      </a>
                    )}
                    {exp.socials?.twitter && (
                      <a
                        href={exp.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 transition-colors hover:text-white"
                      >
                        <FaXTwitter className="h-4 w-4" />
                      </a>
                    )}
                    {exp.socials?.github && (
                      <a
                        href={exp.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 transition-colors hover:text-white"
                      >
                        <FaGithub className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                {/* Description Points */}
                <ul className="mb-6 space-y-3">
                  {exp.description.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-sans text-sm leading-relaxed text-zinc-400 sm:text-base"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-col gap-3">
                  <span className="font-sans text-sm tracking-wider text-zinc-500 uppercase">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="font-sans text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeUpReveal>
        ))}
      </div>

      {/* Other Pages */}
      <FadeUpReveal>
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
            Explore More
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href="/projects"
              className="group flex items-center justify-between border border-zinc-800 bg-[#18181b] p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <span className="font-sans text-lg font-semibold text-white">
                Projects
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
    </div>
  );
}
