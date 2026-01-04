import { BentoItem } from "@/components/shared/BentoItem";
import { FadeUpReveal } from "@/components/shared";
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

const LifeCard = ({
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
          <Icon className="h-8 w-8 text-zinc-400 transition-colors group-hover:text-white" />

          {/* Arrow pointing to top-right corner */}
          <svg
            className="h-8 w-8 text-white opacity-50 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-10 sm:w-10"
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
        </div>

        {/* Text at bottom */}
        <div>
          <h3 className="font-mono text-2xl font-bold text-white sm:text-3xl">
            {title}
          </h3>
          <p className="font-sans text-sm text-zinc-400">{description}</p>
        </div>
      </div>
    </BentoItem>
  );
};

const LifeSection = () => {
  return (
    <FadeUpReveal>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)]"
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
    </FadeUpReveal>
  );
};

export default LifeSection;
