import { BentoItem } from "@/components/shared/BentoItem";
import { Separator } from "@/components/shared";
import { BookOpen, Wrench, Play, LucideIcon } from "lucide-react";

/**
 * LATTICE STRUCTURE (30 columns)
 * Base row height: 50px
 */

interface LifeCardProps {
  title: string;
  description: string;
  redirectTo: string;
  redirectTarget?: "_self" | "_blank";
  icon: LucideIcon;
  colSpan?: number;
  rowSpan?: number;
}

export const LifeCard = ({
  title,
  description,
  redirectTo,
  redirectTarget = "_self",
  icon: Icon,
  colSpan = 10,
  rowSpan = 3,
}: LifeCardProps) => {
  return (
    <BentoItem
      colSpan={colSpan}
      rowSpan={rowSpan}
      className="group md:col-span-1 lg:col-span-10"
      redirectTo={redirectTo}
      redirectTarget={redirectTarget}
    >
      <div className="relative flex h-full flex-col justify-between p-6 transition-colors">
        {/* Icon at top left */}
        <div className="flex items-start justify-between">
          <Icon className="h-8 w-8 text-zinc-500 transition-all duration-500 ease-[var(--ease-spring)] group-hover:scale-110 group-hover:-rotate-6 group-hover:text-white" />

          {/* Arrow pointing to top-right corner */}
          <span className="relative block h-8 w-8 overflow-hidden sm:h-10 sm:w-10">
            <svg
              className="absolute inset-0 h-full w-full text-white opacity-50 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-full group-hover:-translate-y-full group-hover:opacity-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="absolute inset-0 h-full w-full translate-x-[-100%] translate-y-full text-white opacity-0 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* Text at bottom */}
        <div className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1">
          <h3 className="font-mono text-2xl font-bold text-white sm:text-3xl">
            {title}
          </h3>
          <p className="font-sans text-sm text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
            {description}
          </p>
        </div>
      </div>
    </BentoItem>
  );
};

export const LifeSection = () => {
  return (
    <>
      <Separator label="03 / Beyond code" />
      <div
        className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,1fr)]"
        style={{
          gridAutoRows: "50px",
        }}
      >
        {/* Section Header */}
        <BentoItem
          colSpan={30}
          rowSpan={2}
          className="md:col-span-2 lg:col-span-30"
        >
          <div className="flex h-full flex-col justify-center p-6">
            <h2 className="mb-2 font-mono text-2xl font-bold text-white sm:text-3xl">
              Beyond Code
            </h2>
            <p className="font-sans text-sm text-zinc-400 sm:text-base">
              Books, tools, and things that inspire me
            </p>
          </div>
        </BentoItem>

        {/* Books Card */}
        <LifeCard
          title="BOOKS"
          description="What I'm reading and recommend"
          redirectTo="/books"
          icon={BookOpen}
        />

        {/* Tools Card */}
        <LifeCard
          title="TOOLS"
          description="My favorite dev tools and resources"
          redirectTo="/tools"
          icon={Wrench}
        />

        {/* Recommendations Card */}
        <LifeCard
          title="MEDIA"
          description="My favorite YouTube channels and podcasts"
          redirectTo="/recommendations"
          icon={Play}
        />
      </div>
    </>
  );
};
