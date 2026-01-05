import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiRedis,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiLinux,
  SiGit,
  SiDocker,
  SiTerraform,
  SiAmazon,
  SiVercel,
  SiNginx,
  SiPostgresql,
  SiPrisma,
} from "react-icons/si";

export const TechStackData = [
  { name: "React", icon: <SiReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Prisma", icon: <SiPrisma /> },
  { name: "Redis", icon: <SiRedis /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Linux", icon: <SiLinux /> },
  { name: "Git", icon: <SiGit /> },
  { name: "Docker", icon: <SiDocker /> },
  { name: "Terraform", icon: <SiTerraform /> },
  { name: "AWS", icon: <SiAmazon /> },
  { name: "Vercel", icon: <SiVercel /> },
  { name: "Nginx", icon: <SiNginx /> },
];

const TechStackCard = () => {
  return (
    <section
      className="flex h-full flex-col p-4 sm:p-6"
      aria-labelledby="tech-stack-heading"
    >
      <h3
        id="tech-stack-heading"
        className="mb-2 text-base font-bold text-white sm:mb-3 sm:text-lg"
      >
        Tech Stack
      </h3>
      <TooltipProvider>
        <ul
          className="flex flex-1 list-none flex-wrap content-start"
          role="list"
        >
          {TechStackData.map((tech) => (
            <li key={tech.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="flex cursor-pointer items-center justify-center py-2 px-1 md:py-3 md:px-3"
                    aria-label={tech.name}
                  >
                    <span className="text-4xl md:text-5xl" aria-hidden="true">
                      {tech.icon}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tech.name}</p>
                </TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>
      </TooltipProvider>
    </section>
  );
};

export default TechStackCard;
