import { IconType } from "react-icons";

export type TechKey =
  | "AmazonWebServices"
  | "AWS"
  | "Cloudinary"
  | "Demo"
  | "Docker"
  | "Express"
  | "Git"
  | "Github"
  | "Javascript"
  | "Kubernetes"
  | "Linux"
  | "MongoDB"
  | "NextJS"
  | "Nginx"
  | "NodeJS"
  | "PostgreSQL"
  | "Prisma"
  | "PWA"
  | "RaspberryPi"
  | "React"
  | "Redis"
  | "S3"
  | "ShadcnUI"
  | "TailwindCSS"
  | "Terraform"
  | "Typescript"
  | "Vercel";

export type ProjectStatus = "Live" | "In Development" | "Archived" | "Reviving";

export type ProjectCategory = "Web App" | "Landing Page" | "Tool";

export interface TechStackItem {
  icon: IconType;
  name: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  tags: string[];
  technologies: TechKey[];
  image: string;
  demoLink?: string;
  githubLink?: string;
  status: ProjectStatus;
  featured?: boolean;
}
