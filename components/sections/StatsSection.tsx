import GitHubCard from "@/components/landing/GitHub";
import TechStackCard from "@/components/landing/TechStack";
import { BentoItem, Separator } from "@/components/shared";

/**
 * LATTICE STRUCTURE (30 columns × 8 rows)
 * Base row height: 50px
 */

export const StatsSection = () => {
  return (
    <>
      <Separator />
      <div
        className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,1fr)]"
        style={{
          gridAutoRows: "50px", // Base row height
        }}
      >
        <BentoItem
          colSpan={10}
          rowSpan={6}
          className="md:col-span-1 lg:col-span-10 lg:row-span-7"
        >
          <TechStackCard />
        </BentoItem>

        <BentoItem
          colSpan={20}
          rowSpan={6}
          className="md:col-span-2 lg:col-span-20 lg:row-span-2"
        >
          <div className="h-full p-4 sm:p-8">
            <GitHubCard username="ayroid" />
          </div>
        </BentoItem>
      </div>
    </>
  );
};
