import { IconType } from "react-icons";

export type TechKey =
  | "AmazonWebServices"
  | "Android"
  | "AWS"
  | "Cloudinary"
  | "Dart"
  | "Demo"
  | "Docker"
  | "Express"
  | "FastAPI"
  | "Flutter"
  | "Git"
  | "Github"
  | "Go"
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
  | "Python"
  | "RaspberryPi"
  | "React"
  | "Redis"
  | "S3"
  | "ShadcnUI"
  | "TailwindCSS"
  | "Terraform"
  | "Typescript"
  | "Vercel";

export type ProjectStatus = "Live" | "Building" | "Archived" | "Reviving";

export type ProjectCategory = "Web App" | "Mobile App" | "Landing Page" | "Tool";

export interface TechStackItem {
  icon: IconType;
  name: string;
}

export interface ProjectTimelineStage {
  label: string;
  completed: boolean;
  date?: string;
  tooltip: string;
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
  timeline?: ProjectTimelineStage[];
}
