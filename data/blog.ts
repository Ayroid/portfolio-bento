export interface BlogItemData {
  redirectTo: string;
  redirectTarget?: "_blank" | "_self" | "_parent" | "_top";
  category: string;
  title: string;
  description: string;
  date: string;
}

export const blogs: BlogItemData[] = [
  {
    redirectTo: "/blogs/memory-management-paradigms",
    redirectTarget: "_self",
    category: "Development",
    title: "Memory Management Paradigms",
    description:
      "Explore different memory management approaches and their impact on application performance and reliability.",
    date: "9 Jun 2024",
  },
  {
    redirectTo:
      "/blogs/from-url-to-webpage-dns-networking-and-browser-internals",
    redirectTarget: "_self",
    category: "Web Development",
    title: "From URL to Webpage: DNS & Networking Internals",
    description:
      "Deep dive into the journey from typing a URL to seeing a webpage rendered on your screen.",
    date: "3 Aug 2024",
  },
  {
    redirectTo: "/blogs/dockerize-deploy-mern-stack-application-on-aws-ec2",
    redirectTarget: "_self",
    category: "DevOps",
    title: "Dockerize & Deploy a MERN Stack application on AWS EC2",
    description:
      "Learn to efficiently dockerize and deploy MERN applications on AWS EC2.",
    date: "10 Mar 2024",
  },
  {
    redirectTo: "/blogs/build-and-manage-aws-infrastructure-with-terraform",
    redirectTarget: "_self",
    category: "DevOps",
    title: "Building Scalable AWS Infrastructure with Terraform",
    description:
      "Learn to use Terraform efficiently and provision scalable infrastructure on AWS.",
    date: "11 May 2024",
  },
  {
    redirectTo:
      "/blogs/from-chaos-to-clarity-how-conventional-commits-revolutionize-version-control",
    redirectTarget: "_self",
    category: "Development",
    title: "Conventional Commits: Writing Better Commit Messages",
    description:
      "Discover how conventional commits and Commitizen streamline your project's history.",
    date: "10 Mar 2024",
  },
];
