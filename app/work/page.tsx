import Image from "next/image";
import { PageHeader } from "@/components/shared/Section";
import { techStack, TechKey } from "@/data/projects";

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

const socialLabels = {
  website: "Website",
  linkedin: "LinkedIn",
  twitter: "X",
  github: "GitHub",
} as const;

const experiences: Experience[] = [
  {
    title: "Software Engineer",
    company: "Yamaha Motor Solutions India",
    logo: "/yamaha_logo.png",
    companyUrl: "https://www.ymsl.in/",
    location: "Faridabad, India",
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
