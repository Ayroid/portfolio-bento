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

const TechStackCard = () => {
  return (
    <div className="flex h-full flex-col p-4 sm:p-6">
      <h3 className="mb-2 text-base font-bold text-white sm:mb-3 sm:text-lg">
        Tech Stack
      </h3>
      <TooltipProvider>
        <div className="flex flex-1 flex-wrap content-start">
          {[
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
          ].map((tech) => (
            <Tooltip key={tech.name}>
              <TooltipTrigger asChild>
                <div className="flex cursor-pointer items-center justify-center p-3">
                  <span className="text-5xl">{tech.icon}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tech.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
};

export default TechStackCard;
