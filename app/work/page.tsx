"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";
import { PiGlobeSimple } from "react-icons/pi";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FadeUpReveal, Separator } from "@/components/shared";
import { techStack, TechKey } from "@/lib/projects-data";

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
  technologies: TechKey[];
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
      "CloudInfrastructure",
      "Linux",
      "Databases",
      "Monitoring",
      "AWS",
      "Automation",
    ],
    description: [
      "Started my journey as a <strong>Software Engineering Intern</strong> and successfully transitioned into a <strong>full-time Software Engineer</strong> role, taking ownership of critical <strong>production systems</strong> and infrastructure components that power business operations",
      "Managing and maintaining <strong>enterprise-grade systems</strong> and cloud infrastructure deployed across <strong>multiple geographic regions</strong> including India, Japan, Europe, and Brazil, ensuring seamless operations for a global user base",
      "Ensuring <strong>high availability</strong>, <strong>system stability</strong>, and optimal <strong>performance</strong> of core platforms that support <strong>mission-critical business operations</strong>, implementing best practices for <strong>disaster recovery</strong> and <strong>fault tolerance</strong>",
      "Working extensively with <strong>production databases</strong>, orchestrating <strong>deployments</strong> using CI/CD pipelines, and implementing comprehensive <strong>monitoring and alerting systems</strong> to support large-scale workloads and ensure <strong>99.9% uptime</strong>",
      "Collaborating with <strong>cross-functional teams</strong> including DevOps, QA, and product teams to <strong>automate workflows</strong>, improve system <strong>reliability</strong>, proactively identify bottlenecks, and rapidly <strong>resolve production issues</strong> to minimize downtime",
    ],
  },
  {
    title: "Software Developer",
    company: "OrganicGrow",
    logo: "/stealth.jpeg",
    location: "Remote",
    period: "Aug 2024 - Dec 2024",
    technologies: [
      "GenAI",
      "NextJS",
      "NodeJS",
      "Typescript",
      "TailwindCSS",
      "Flask",
      "Redis",
      "Docker",
      "AWS",
      "Vercel",
    ],
    description: [
      "Built and shipped a <strong>GenAI-powered SaaS platform</strong> from the ground up for creating, editing, and managing <strong>social media content at scale</strong>, integrating <strong>multiple AI models</strong> and <strong>third-party APIs</strong> to deliver intelligent content recommendations and automated post generation",
      "Designed and implemented <strong>end-to-end workflows</strong> encompassing <strong>AI-driven content generation</strong>, <strong>real-time collaborative editing</strong>, and <strong>automated multi-platform scheduling</strong>, reducing content creation time by <strong>70%</strong> for marketing teams",
      "Worked across the <strong>full technology stack</strong> including <strong>React frontend</strong>, <strong>Node.js backend APIs</strong>, and <strong>AWS cloud infrastructure</strong> to deliver production-ready features actively used by <strong>100+ paying customers</strong> managing thousands of posts monthly",
      "Improved overall <strong>system performance</strong> by optimizing database queries and API response times, enhanced <strong>reliability</strong> through comprehensive error handling and monitoring, and increased <strong>developer velocity</strong> by establishing code standards and automated testing using a modern <strong>TypeScript-based tech stack</strong>",
    ],
  },
  {
    title: "Freelance Software Developer",
    company: "Independent",
    logo: "/stealth.jpeg",
    location: "Remote",
    period: "2022 - 2024",
    technologies: [
      "NextJS",
      "React",
      "Javascript",
      "Typescript",
      "TailwindCSS",
      "NodeJS",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "Redis",
      "Prisma",
      "Nginx",
      "AWS",
      "Vercel",
    ],
    description: [
      "Built and shipped <strong>production-ready full-stack applications</strong> including <strong>MVPs</strong>, <strong>admin dashboards</strong>, <strong>landing pages</strong>, and <strong>web applications</strong> for individual founders, early-stage startups, and small businesses across various industries including e-commerce, SaaS, and content platforms",
      "Owned projects <strong>end-to-end</strong> as the sole developer—from initial <strong>requirement gathering</strong> and <strong>technical architecture design</strong> to <strong>iterative development</strong>, <strong>production deployment</strong>, <strong>documentation</strong>, and client <strong>handover</strong> with training sessions",
      "Developed robust <strong>RESTful APIs</strong>, implemented secure <strong>authentication and authorization flows</strong> using <strong>JWT</strong> and <strong>OAuth</strong>, and designed scalable <strong>database schemas</strong> and data models for <strong>real-world production use cases</strong> handling thousands of users and transactions",
      "Deployed and managed applications on <strong>client-owned infrastructure</strong> including <strong>AWS</strong>, <strong>Vercel</strong>, and <strong>DigitalOcean</strong>, configured <strong>CI/CD pipelines</strong>, set up <strong>monitoring and logging</strong>, and ensured <strong>smooth delivery</strong> with ongoing <strong>operational stability</strong> and maintenance support",
    ],
  },
];

const ExperienceCard = ({ exp }: { exp: Experience }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="group relative"
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
        className="relative border border-zinc-800 bg-[#18181b] transition-colors duration-300"
        style={{ zIndex: 2 }}
      >
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-zinc-800 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            {/* Left: Logo + Company Info */}
            <div className="flex items-center gap-4">
              {/* Company Logo */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>

              {/* Company Details */}
              <div className="flex flex-col">
                <h2 className="font-sans text-xl font-bold text-white transition-colors group-hover:text-zinc-100 sm:text-2xl">
                  {exp.company}
                </h2>
                <p className="font-sans text-base font-semibold text-zinc-300">
                  {exp.title}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1 font-sans text-sm">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Calendar className="h-3.5 w-3.5" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5 text-zinc-500">
                    <MapPin className="h-3.5 w-3.5" />
                    {exp.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Social Links */}
            <div className="flex items-center">
              {exp.socials?.website && (
                <a
                  href={exp.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white"
                >
                  <PiGlobeSimple className="h-6 w-6" />
                </a>
              )}
              {exp.socials?.linkedin && (
                <a
                  href={exp.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
              )}
              {exp.socials?.twitter && (
                <a
                  href={exp.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white"
                >
                  <FaXTwitter className="h-6 w-6" />
                </a>
              )}
              {exp.socials?.github && (
                <a
                  href={exp.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white"
                >
                  <FaGithub className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Description Points */}
          <ul className="mb-6">
            {exp.description.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-3 font-sans text-sm leading-relaxed text-zinc-400 sm:text-base"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500 transition-colors group-hover:bg-zinc-400" />
                <span dangerouslySetInnerHTML={{ __html: point }} />
              </li>
            ))}
          </ul>

          {/* Technologies */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-sm tracking-wider text-zinc-500 uppercase">
              Technologies
            </span>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => {
                const TechIcon = techStack[tech]?.icon;
                return TechIcon ? (
                  <Tooltip key={tech}>
                    <TooltipTrigger asChild>
                      <span className="cursor-default">
                        <TechIcon className="h-6 w-6 text-zinc-400 transition-colors group-hover:text-white" />
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

      {/* Separator */}
      <FadeUpReveal>
        <Separator />
      </FadeUpReveal>

      {/* Experience Cards */}
      <div className="flex flex-col gap-6">
        {experiences.map((exp, index) => (
          <FadeUpReveal key={index}>
            <ExperienceCard exp={exp} />
          </FadeUpReveal>
        ))}
      </div>

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
