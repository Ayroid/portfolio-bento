"use client";

import Image from "next/image";
import { ActionCard, BentoItem, Separator } from "@/components/shared/";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SiAmazon,
  SiAmazons3,
  SiAmazonwebservices,
  SiCloudinary,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiGo,
  SiJavascript,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPwa,
  SiRaspberrypi,
  SiReact,
  SiRedis,
  SiShadcnui,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { VscGlobe } from "react-icons/vsc";

/**
 * LATTICE STRUCTURE (30 columns × 10 rows)
 * Base row height: 50px
 */

const techStack = {
  AmazonWebServices: { icon: SiAmazonwebservices, name: "Amazon Web Services" },
  AWS: { icon: SiAmazon, name: "AWS" },
  Cloudinary: { icon: SiCloudinary, name: "Cloudinary" },
  Demo: { icon: VscGlobe, name: "Demo" },
  Docker: { icon: SiDocker, name: "Docker" },
  Express: { icon: SiExpress, name: "Express" },
  Git: { icon: SiGit, name: "Git" },
  Github: { icon: SiGithub, name: "GitHub" },
  Go: { icon: SiGo, name: "Go" },
  Javascript: { icon: SiJavascript, name: "JavaScript" },
  Kubernetes: { icon: SiKubernetes, name: "Kubernetes" },
  Linux: { icon: SiLinux, name: "Linux" },
  MongoDB: { icon: SiMongodb, name: "MongoDB" },
  NextJS: { icon: SiNextdotjs, name: "Next.js" },
  Nginx: { icon: SiNginx, name: "Nginx" },
  NodeJS: { icon: SiNodedotjs, name: "Node.js" },
  PostgreSQL: { icon: SiPostgresql, name: "PostgreSQL" },
  Prisma: { icon: SiPrisma, name: "Prisma" },
  PWA: { icon: SiPwa, name: "Progressive Web App" },
  RaspberryPi: { icon: SiRaspberrypi, name: "RaspberryPi" },
  React: { icon: SiReact, name: "React" },
  Redis: { icon: SiRedis, name: "Redis" },
  S3: { icon: SiAmazons3, name: "S3" },
  ShadcnUI: { icon: SiShadcnui, name: "Shadcn UI" },
  TailwindCSS: { icon: SiTailwindcss, name: "Tailwind CSS" },
  Terraform: { icon: SiTerraform, name: "Terraform" },
  Typescript: { icon: SiTypescript, name: "TypeScript" },
  Vercel: { icon: SiVercel, name: "Vercel" },
};

type TechKey = keyof typeof techStack;

const TechIcon = ({ techKey }: { techKey: TechKey }) => {
  const tech = techStack[techKey];
  const Icon = tech.icon;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>
          <Icon className="h-6 w-6 text-white" />
        </span>
      </TooltipTrigger>
      <TooltipContent>{tech.name}</TooltipContent>
    </Tooltip>
  );
};

interface WebAppProject {
  description: string;
  technologies: TechKey[];
  image: string;
  demoLink?: string;
  githubLink?: string;
  status: "Live" | "Building" | "Archived" | "Reviving";
}

interface LandingPageProject {
  image: string;
  mobileImage: string;
  description: string;
  technologies: TechKey[];
  demoLink?: string;
  githubLink?: string;
  status: "Live" | "Building" | "Archived" | "Reviving";
}

const statusColors = {
  Live: "bg-green-500",
  Building: "bg-yellow-500",
  Archived: "bg-amber-800",
  Reviving: "bg-blue-500",
};

const webApps: Record<string, WebAppProject> = {
  Ideos: {
    description:
      "Unified productivity platform consolidating Kanban boards, Pomodoro timers, Reminders, and Note-taking with Gen-AI integration via multi-agent framework and RAG.",
    technologies: [
      "NextJS",
      "NodeJS",
      "MongoDB",
      // "KindeAuth",
      "TailwindCSS",
      "ShadcnUI",
      "Cloudinary",
      "Docker",
      "AmazonWebServices",
      // Zustand
    ] as TechKey[],
    image: "/projects/ideos.png",
    // demoLink: "https://ideos.live",
    githubLink: "https://github.com/Ayroid/Ideos-Frontend",
    status: "Reviving",
  },
  Darch: {
    description:
      "Visual cloud architecture designer to create AWS infrastructure through an intuitive drag-and-drop interface and automatically provision resources on your cloud.",
    technologies: [
      "NextJS",
      "NodeJS",
      "MongoDB",
      "Terraform",
      "TailwindCSS",
      "ShadcnUI",
      "Docker",
      "AmazonWebServices",
    ] as TechKey[],
    image: "/projects/darch.png",
    demoLink: "https://darch.ayroid.in",
    status: "Building",
  },
  Validuct: {
    description:
      "Idea validation platform that helps builders validate product ideas with structured community feedback and real demand signals before investing time and resources.",
    technologies: [
      "NextJS",
      "NodeJS",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Docker",
      "AmazonWebServices",
      "Nginx",
    ] as TechKey[],
    image: "/projects/validuct.png",
    status: "Live",
    demoLink: "https://validuct.com",
  },
  Parko: {
    description:
      "Complete parking solution providing real-time parking availability, spot reservation, and navigation functionalities at UPES.",
    technologies: [
      "React",
      "Express",
      "MongoDB",
      "Javascript",
      "RaspberryPi",
      "PWA",
      "Nginx",
      "Docker",
      "AmazonWebServices",
    ] as TechKey[],
    image: "/projects/parko.jpg",
    githubLink: "https://github.com/Ayroid/PARKO-Frontend",
    status: "Archived",
  },
  "Terminal Portfolio": {
    description:
      "Bash-based terminal portfolio showcasing projects and skills with native linux commands.",
    technologies: [
      "NextJS",
      "Typescript",
      "Linux",
      "TailwindCSS",
      "Vercel",
    ] as TechKey[],
    image: "/projects/termfolio.png",
    githubLink: "https://github.com/Ayroid/PARKO-Frontend",
    status: "Live",
  },
  Vault: {
    description:
      "Lightweight CLI tool for managing reusable React and Next.js components with local registry and GitHub sync capabilities.",
    technologies: [
      "Go",
      "Git",
      "Github",
      "React",
      "NextJS",
      "Linux",
    ] as TechKey[],
    image: "/projects/vault_full.png",
    githubLink: "https://github.com/Ayroid/vault",
    status: "Live",
  },
};

const landingPages: Record<string, LandingPageProject> = {
  Orbionio: {
    image: "/projects/orbionio.png",
    mobileImage: "/projects/orbionio_full.png",
    description:
      "Modern landing page for Orbionio platform with sleek design and animations.",
    technologies: ["NextJS", "TailwindCSS", "Vercel"] as TechKey[],
    demoLink: "https://orbionio.in",
    status: "Live",
  },
  UPESCSA: {
    image: "/projects/upescsa.png",
    mobileImage: "/projects/upescsa_full.png",
    description:
      "Official website for UPES Computer Science Association with event management features.",
    technologies: ["NextJS", "TailwindCSS", "Vercel"] as TechKey[],
    demoLink: "https://upescsa.in",
    status: "Live",
  },
};

interface WebAppCardProps {
  title: string;
  slug: string;
  info: WebAppProject;
}

const WebAppCard = ({ title, slug, info }: WebAppCardProps) => {
  const handleCardClick = () => {
    window.location.href = `/projects/${slug}`;
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex h-full cursor-pointer flex-col"
    >
      <div className="relative -mx-2 -mt-2 mb-4 h-56 overflow-hidden">
        <Image
          src={info.image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mb-2 flex flex-col justify-between px-4 pb-2 sm:px-6">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <div className="mb-2 flex items-center justify-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="relative flex h-3 w-3">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                      statusColors[info.status]
                    }`}
                  />
                  <span
                    className={`relative inline-flex h-3 w-3 rounded-full ${
                      statusColors[info.status]
                    }`}
                  />
                </span>
              </TooltipTrigger>
              <TooltipContent>{info.status}</TooltipContent>
            </Tooltip>
            {info.demoLink && (
              <a
                href={info.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <VscGlobe className="h-6 w-6" />
                  </TooltipTrigger>
                  <TooltipContent>Visit</TooltipContent>
                </Tooltip>
              </a>
            )}
            {info.githubLink && (
              <a
                href={info.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SiGithub className="h-5 w-5" />
                  </TooltipTrigger>
                  <TooltipContent>Github</TooltipContent>
                </Tooltip>
              </a>
            )}
          </div>
        </div>
        <p className="mb-4 flex-1 font-sans text-sm leading-relaxed text-zinc-400">
          {info.description}
        </p>
        <div className="flex flex-col flex-wrap gap-2 font-sans text-zinc-400">
          <span>Technologies</span>
          <div className="flex flex-wrap gap-2">
            {info.technologies.map((tech) => (
              <TechIcon key={tech} techKey={tech} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface LandingPageCardProps {
  title: string;
  slug: string;
  info: LandingPageProject;
}

const LandingPageCard = ({ title, slug, info }: LandingPageCardProps) => {
  const handleCardClick = () => {
    window.location.href = `/projects/${slug}`;
  };

  return (
    <>
      {/* Mobile/Tablet: Render as WebAppCard with full image */}
      <div className="lg:hidden">
        <WebAppCard
          title={title}
          slug={slug}
          info={{
            description: info.description,
            technologies: info.technologies,
            image: info.mobileImage,
            demoLink: info.demoLink,
            githubLink: info.githubLink,
            status: info.status,
          }}
        />
      </div>

      {/* Desktop: Render minimal landing page card with logo */}
      <div
        onClick={handleCardClick}
        className="group hidden h-full cursor-pointer flex-col p-4 sm:p-6 lg:flex"
      >
        <div className="relative -mx-2 -mt-2 mb-4 h-56 overflow-hidden">
          <Image
            src={info.image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex justify-between">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <div className="mb-2 flex items-center justify-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="relative flex h-3 w-3">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                      statusColors[info.status]
                    }`}
                  />
                  <span
                    className={`relative inline-flex h-3 w-3 rounded-full ${
                      statusColors[info.status]
                    }`}
                  />
                </span>
              </TooltipTrigger>
              <TooltipContent>{info.status}</TooltipContent>
            </Tooltip>
            {info.demoLink && (
              <a
                href={info.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <VscGlobe className="h-6 w-6" />
                  </TooltipTrigger>
                  <TooltipContent>Visit</TooltipContent>
                </Tooltip>
              </a>
            )}
            {info.githubLink && (
              <a
                href={info.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SiGithub className="h-5 w-5" />
                  </TooltipTrigger>
                  <TooltipContent>Visit</TooltipContent>
                </Tooltip>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const ProjectSection = () => {
  return (
    <>
      <Separator />
      <div
        className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,1fr)]"
        style={{
          gridAutoRows: "50px", // Base row height
        }}
      >
        {/* Header - 10 cols × 2 rows */}
        <BentoItem
          colSpan={10}
          rowSpan={2}
          className="md:col-span-1 lg:col-span-10"
        >
          <ActionCard
            href="/projects"
            label="PROJECTS"
            bgColor="bg-white"
            hoverBgColor="hover:bg-[#dddddd]"
            textColor="text-black"
            iconColor="text-black"
          />
        </BentoItem>

        {/* Ideos Project - 10 cols × 8 rows */}
        <BentoItem
          colSpan={10}
          rowSpan={8}
          className="md:col-span-1 lg:col-span-10"
        >
          <WebAppCard title="Ideos" slug="ideos" info={webApps.Ideos} />
        </BentoItem>

        {/* Darch Project - 10 cols × 8 rows */}
        <BentoItem
          colSpan={10}
          rowSpan={8}
          className="md:col-span-1 lg:col-span-10"
        >
          <WebAppCard title="Darch" slug="darch" info={webApps.Darch} />
        </BentoItem>

        {/* Validuct - 10 cols × 8 rows */}
        <BentoItem
          colSpan={10}
          rowSpan={8}
          className="md:col-span-2 lg:col-span-10"
        >
          <WebAppCard
            title="Validuct"
            slug="validuct"
            info={webApps.Validuct}
          />
        </BentoItem>

        {/* Parko - 10 cols × 8 rows */}
        <BentoItem
          colSpan={10}
          rowSpan={8}
          className="md:col-span-2 lg:col-span-10"
        >
          <WebAppCard title="Parko" slug="parko" info={webApps.Parko} />
        </BentoItem>

        {/* Terminal Portfolio - 10 cols × 8 rows */}
        <BentoItem
          colSpan={10}
          rowSpan={8}
          className="md:col-span-2 lg:col-span-10"
        >
          <WebAppCard
            title="Terminal Portfolio"
            slug="terminal-portfolio"
            info={webApps["Terminal Portfolio"]}
          />
        </BentoItem>

        {/* Vault - 10 cols × 6 rows */}
        <BentoItem
          colSpan={10}
          rowSpan={6}
          className="md:col-span-2 lg:col-span-10"
        >
          <WebAppCard title="Vault" slug="vault" info={webApps.Vault} />
        </BentoItem>
      </div>
    </>
  );
};
