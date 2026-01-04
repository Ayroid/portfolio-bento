"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";
import { PiGlobeSimple } from "react-icons/pi";
import Image from "next/image";

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

export function ExperienceCard() {
  const [openIndex, setOpenIndex] = useState(0);

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

  const toggleAccordion = (index: number) => {
    if (openIndex !== index) {
      setOpenIndex(index);
    }
  };

  return (
    <div className="h-full">
      <h2 className="group flex items-end justify-start border-b px-6 py-6 font-mono text-2xl text-white sm:px-8 sm:text-3xl lg:text-4xl">
        EXPERIENCE
      </h2>
      <div className="">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`overflow-hidden px-6 py-4 transition-all sm:px-4 ${
              index !== experiences.length - 1 ? "border-b border-zinc-800" : ""
            }`}
          >
            {/* Header Section */}
            <div
              className="cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              {/* Row 1: Logo + Name | Social Links + Chevron */}
              <div className="flex items-center justify-between">
                {/* Left: Logo + Company Name */}
                <div className="flex items-start gap-2">
                  {/* Company Logo */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-0.5">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="-mt-1 text-base font-bold text-white sm:text-lg">
                    {exp.company}
                  </h3>
                </div>

                {/* Right: Social Links + Chevron */}
                <div className="-mt-2 flex items-center gap-1.5">
                  {exp.socials?.website && (
                    <a
                      href={exp.socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 transition-colors hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <PiGlobeSimple className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {exp.socials?.twitter && (
                    <a
                      href={exp.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 transition-colors hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaXTwitter className="h-3 w-3" />
                    </a>
                  )}
                  {exp.socials?.linkedin && (
                    <a
                      href={exp.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 transition-colors hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaLinkedin className="h-3 w-3" />
                    </a>
                  )}
                  {exp.socials?.github && (
                    <a
                      href={exp.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 transition-colors hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub className="h-3 w-3" />
                    </a>
                  )}
                  <FaChevronDown
                    className={`ml-1 h-3 w-3 text-zinc-400 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Row 2: Duration | Location */}
              <div className="-mt-3 ml-10 flex items-center gap-1 text-sm">
                <p className="text-zinc-400">{exp.period}</p>
                <span className="text-zinc-600">|</span>
                <p className="text-zinc-500">{exp.location}</p>
              </div>

              {/* Position */}
              <p className="mt-0 ml-10 text-sm font-bold text-zinc-400">
                {exp.title}
              </p>
            </div>

            {/* Expandable Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-[600px]" : "max-h-0"
              }`}
            >
              <div className="mt-3 ml-6">
                {/* Responsibilities */}
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
                      <span className="mt-1 mr-2 text-zinc-600">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
