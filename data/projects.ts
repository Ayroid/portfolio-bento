import {
  SiAmazon,
  SiAmazons3,
  SiAmazonwebservices,
  SiCloudinary,
  SiDocker,
  SiExpress,
  SiFlask,
  SiGit,
  SiGithub,
  SiGrafana,
  SiJavascript,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenai,
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
import { TbCloudCog, TbAutomation, TbDatabase } from "react-icons/tb";
import { VscGlobe } from "react-icons/vsc";
import type { ProjectStatus, Project } from "@/types";

export const techStack = {
  AmazonWebServices: { icon: SiAmazonwebservices, name: "Amazon Web Services" },
  Automation: { icon: TbAutomation, name: "Automation" },
  AWS: { icon: SiAmazon, name: "AWS" },
  CloudInfrastructure: { icon: TbCloudCog, name: "Cloud Infrastructure" },
  Cloudinary: { icon: SiCloudinary, name: "Cloudinary" },
  Databases: { icon: TbDatabase, name: "Databases" },
  Demo: { icon: VscGlobe, name: "Demo" },
  Docker: { icon: SiDocker, name: "Docker" },
  Express: { icon: SiExpress, name: "Express" },
  Flask: { icon: SiFlask, name: "Flask" },
  GenAI: { icon: SiOpenai, name: "GenAI" },
  Git: { icon: SiGit, name: "Git" },
  Github: { icon: SiGithub, name: "GitHub" },
  Javascript: { icon: SiJavascript, name: "JavaScript" },
  Kubernetes: { icon: SiKubernetes, name: "Kubernetes" },
  Linux: { icon: SiLinux, name: "Linux" },
  MongoDB: { icon: SiMongodb, name: "MongoDB" },
  Monitoring: { icon: SiGrafana, name: "Monitoring" },
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

export type TechKey = keyof typeof techStack;

export const projectsData: Project[] = [
  {
    id: "1",
    title: "Ideos",
    slug: "ideos",
    description:
      "Unified productivity platform consolidating Kanban boards, Pomodoro timers, Reminders, and Note-taking with Gen-AI integration via multi-agent framework and RAG.",
    longDescription:
      "Ideos is a comprehensive productivity platform that brings together essential tools in one place. Features include task management with Kanban boards, time tracking with Pomodoro timers, smart reminders, and an AI-powered note-taking system using RAG (Retrieval-Augmented Generation). The platform leverages a multi-agent AI framework to provide intelligent suggestions and automate routine tasks.",
    category: "Web App",
    tags: ["Frontend", "Backend", "AI", "Productivity"],
    technologies: [
      "NextJS",
      "NodeJS",
      "MongoDB",
      "TailwindCSS",
      "ShadcnUI",
      "Cloudinary",
      "Docker",
      "AmazonWebServices",
    ],
    image: "/projects/ideos.png",
    githubLink: "https://github.com/Ayroid/Ideos-Frontend",
    status: "Reviving",
    featured: true,
  },
  {
    id: "2",
    title: "Darch",
    slug: "darch",
    description:
      "Visual cloud architecture designer to create AWS infrastructure through an intuitive drag-and-drop interface and automatically provision resources on your cloud.",
    longDescription:
      "Darch simplifies cloud infrastructure deployment by providing a visual drag-and-drop interface for designing AWS architectures. Once designed, the platform automatically generates Terraform configurations and provisions resources directly to your AWS account. Perfect for developers who want to quickly prototype and deploy cloud infrastructure without diving deep into Terraform syntax.",
    category: "Web App",
    tags: ["Frontend", "Backend", "DevOps", "Cloud"],
    technologies: [
      "NextJS",
      "NodeJS",
      "MongoDB",
      "Terraform",
      "TailwindCSS",
      "ShadcnUI",
      "Docker",
      "AmazonWebServices",
    ],
    image: "/projects/darch.png",
    demoLink: "https://darch.ayroid.in",
    status: "Building",
    featured: true,
    timeline: [
      {
        label: "Draft",
        completed: true,
        date: "01-Aug-2025",
        tooltip: "Idea drafted",
      },
      {
        label: "Validated",
        completed: true,
        date: "05-Aug-2025",
        tooltip: "Idea Validated",
      },
      {
        label: "Building",
        completed: true,
        date: "05-Aug-2025",
        tooltip: "Development in Progress",
      },
      { label: "Launched", completed: false, tooltip: "Yet to be launched" },
    ],
  },
  {
    id: "3",
    title: "Validuct",
    slug: "validuct",
    description:
      "Idea validation platform that helps builders validate product ideas with structured community feedback and real demand signals before investing time and resources.",
    longDescription:
      "Validuct is an idea validation platform built to help entrepreneurs and builders stop guessing and start validating. Instead of unstructured opinions, it provides real demand signals like ‘Would Pay’ and ‘Problem Real’, structured category-based feedback, and clear idea lifecycle tracking from draft to launch. Builders can discover trending ideas, collect actionable insights, and validate market demand before investing serious time or resources. Validuct bridges the gap between noisy discussions and true validation by focusing on signals, structure, and follow-through.",

    category: "Web App",
    tags: ["Frontend", "Backend", "AI", "Development"],
    technologies: [
      "NextJS",
      "NodeJS",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Docker",
      "AmazonWebServices",
      "Nginx",
    ],
    image: "/projects/validuct.png",
    status: "Live",
    demoLink: "https://validuct.com",
    featured: true,
    timeline: [
      {
        label: "Draft",
        completed: true,
        date: "01-Jan-2026",
        tooltip: "Idea drafted",
      },
      {
        label: "Validated",
        completed: true,
        date: "02-Jan-2026",
        tooltip: "Idea Validated",
      },
      {
        label: "Building",
        completed: true,
        date: "02-Jan-2026",
        tooltip: "Development Done",
      },
      {
        label: "Launched",
        completed: true,
        date: "12-Jan-2026",
        tooltip: "Project launched",
      },
    ],
  },
  {
    id: "4",
    title: "Parko",
    slug: "parko",
    description:
      "Complete parking solution providing real-time parking availability, spot reservation, and navigation functionalities at UPES.",
    longDescription:
      "Parko is a smart parking management system designed for UPES campus. It uses IoT sensors (Raspberry Pi) to detect parking availability in real-time, allows users to reserve spots in advance, and provides navigation to their reserved spot. The system also includes analytics dashboards for parking administrators and supports Progressive Web App installation for offline access.",
    category: "Web App",
    tags: ["Frontend", "Backend", "IoT", "Full-Stack"],
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
    ],
    image: "/projects/parko.jpg",
    githubLink: "https://github.com/Ayroid/PARKO-Frontend",
    status: "Archived",
  },
  {
    id: "5",
    title: "Terminal Portfolio",
    slug: "terminal-portfolio",
    description:
      "Bash-based terminal portfolio showcasing projects and skills with native linux commands.",
    longDescription:
      "An interactive terminal-style portfolio website that simulates a real bash terminal. Visitors can use familiar Linux commands like 'ls', 'cd', 'cat', and custom commands to navigate through my work, skills, and projects. Built with Next.js and TypeScript, it provides a unique and engaging way to explore a developer portfolio.",
    category: "Tool",
    tags: ["Frontend", "TypeScript", "Interactive"],
    technologies: ["NextJS", "Typescript", "Linux", "TailwindCSS", "Vercel"],
    image: "/projects/termfolio.png",
    githubLink: "https://github.com/Ayroid/terminal-portfolio",
    demoLink: "https://terminal.ayroid.in",
    status: "Live",
    featured: true,
    timeline: [
      {
        label: "Draft",
        completed: true,
        date: "14-Dec-2024",
        tooltip: "Idea drafted",
      },
      {
        label: "Validated",
        completed: true,
        date: "14-Dec-2024",
        tooltip: "Idea Validated",
      },
      {
        label: "Building",
        completed: true,
        date: "14-Dec-2024",
        tooltip: "Development Done",
      },
      {
        label: "Launched",
        completed: true,
        date: "16-Dec-2024",
        tooltip: "Project launched",
      },
    ],
  },
  {
    id: "6",
    title: "Orbionio",
    slug: "orbionio",
    description:
      "Modern landing page for Orbionio platform with sleek design and animations.",
    longDescription:
      "A stunning landing page built for Orbionio, featuring modern web design principles, smooth animations, and an engaging user experience. The site is fully responsive and optimized for performance across all devices.",
    category: "Landing Page",
    tags: ["Frontend", "Design", "Next.js"],
    technologies: ["NextJS", "TailwindCSS", "Vercel"],
    image: "/projects/orbionio_full.png",
    demoLink: "https://orbionio.in",
    status: "Live",
  },
  {
    id: "7",
    title: "UPES CSA",
    slug: "upescsa",
    description:
      "Official website for UPES Computer Science Association with event management features.",
    longDescription:
      "The official website for UPES Computer Science Association, featuring event listings, member profiles, and news updates. Built with modern web technologies to provide a seamless experience for students and visitors.",
    category: "Landing Page",
    tags: ["Frontend", "Design", "Next.js"],
    technologies: ["NextJS", "TailwindCSS", "Vercel"],
    image: "/projects/upescsa_full.png",
    demoLink: "https://upescsa.in",
    status: "Live",
  },
  {
    id: "8",
    title: "Terraform EC2",
    slug: "terraform-ec2",
    description:
      "Terraform project demonstrating EC2 deployment using best practices including reusable modules and remote state storage with S3.",
    longDescription:
      "A Terraform project showcasing best practices for deploying AWS EC2 instances. Implements modular architecture with reusable Terraform modules, remote state management using S3 backend, and proper state locking with DynamoDB for team collaboration.",
    category: "Tool",
    tags: ["DevOps", "Cloud", "Infrastructure"],
    technologies: ["Terraform", "AmazonWebServices", "Docker", "Git"],
    image: "/projects/terraform.jpg",
    githubLink: "https://github.com/Ayroid/terraform-ec2",
    status: "Live",
  },
];

export const statusColors: Record<ProjectStatus, string> = {
  Live: "bg-green-500",
  Building: "bg-yellow-500",
  Archived: "bg-amber-800",
  Reviving: "bg-blue-500",
};

export function getProjectBySlug(slug: string): Project | undefined {
  console.log("Getting project for slug: ", slug);
  return projectsData.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projectsData.filter((project) => project.featured);
}
