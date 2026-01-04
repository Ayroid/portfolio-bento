import type { Experience } from "@/types";

export const experiences: Experience[] = [
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
    companyUrl: "#",
    location: "Remote",
    period: "Oct 2024 - Dec 2024",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
    ],
    description: [
      "Developed a comprehensive SaaS platform for organic farming, connecting farmers with buyers and providing tools for farm management",
      "Built features for crop tracking, inventory management, and marketplace functionality",
      "Implemented real-time data sync and analytics dashboards for farm insights",
      "Optimized database queries and API performance for scalability",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Freelance",
    logo: "/freelance.png",
    location: "Remote",
    period: "Jan 2023 - Present",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "AWS",
      "Docker",
    ],
    description: [
      "Delivered custom web solutions for clients across various industries",
      "Built responsive, performant web applications with modern tech stacks",
      "Managed end-to-end development from requirements to deployment",
      "Provided technical consultation and architecture recommendations",
    ],
  },
];
