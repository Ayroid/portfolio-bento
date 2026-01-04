import { BentoItem } from "@/components/BentoItem";
import FadeUpReveal from "@/components/FadeUpReveal";

/**
 * LATTICE STRUCTURE (30 columns)
 * Base row height: 50px
 */

interface LifeCardProps {
  title: string;
  description: string;
  redirectTo: string;
  redirectTarget?: "_self" | "_blank";
  bgColor?: string;
  hoverBgColor?: string;
  textColor?: string;
  colSpan?: number;
  rowSpan?: number;
}

const LifeCard = ({
  title,
  description,
  redirectTo,
  redirectTarget = "_self",
  bgColor,
  hoverBgColor,
  textColor,
  colSpan = 10,
  rowSpan = 3,
}: LifeCardProps) => {
  return (
    <BentoItem
      colSpan={colSpan}
      rowSpan={rowSpan}
      className="md:col-span-1 lg:col-span-10 group"
      redirectTo={redirectTo}
      redirectTarget={redirectTarget}
    >
      <div
        className={`flex h-full flex-col justify-end p-4 sm:p-6 relative ${bgColor} ${hoverBgColor} transition-colors`}
      >
        {/* Arrow pointing to top-right corner */}
        <svg
          className={`absolute top-4 right-4 h-8 w-8 group-hover:top-3 group-hover:right-3 sm:h-10 sm:w-10 ${textColor} opacity-50 transition-all`}
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

        <h3
          className={`text-2xl sm:text-3xl font-bold ${textColor} font-mono`}
        >
          {title}
        </h3>

        <p className="text-sm text-zinc-400">{description}</p>
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
          <div className="flex h-full flex-col justify-center p-4 sm:p-6">
            <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
              Beyond Code
            </h2>
            <p className="text-sm text-zinc-400 sm:text-base">
              Books, tools, and things that inspire me
            </p>
          </div>
        </BentoItem>

        {/* Books Card */}
        <LifeCard
          title="BOOKS"
          description="What I'm reading and recommend"
          redirectTo="/books"
        />

        {/* Tools Card */}
        <LifeCard
          title="TOOLS"
          description="My favorite dev tools and resources"
          redirectTo="/tools"
        />

        {/* Recommendations Card */}
        <LifeCard
          title="MEDIA"
          description="My favorite YouTube channels and podcasts"
          redirectTo="/recommendations"
        />
      </div>
    </FadeUpReveal>
  );
};

export default LifeSection;
