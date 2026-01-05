import {
  NameCard,
  Email,
  Connect,
  AboutCard,
  Experience,
  ProfileCard,
  Resume,
} from "@/components/landing";
import { BentoItem, Separator } from "@/components/shared";

/**
 * LATTICE STRUCTURE (30 columns × 4 rows on desktop)
 * Base row height: 150px
 *
 * Mobile: Single column stack
 * Tablet (md): 2 columns
 * Desktop (lg): 30 column grid
 */

export const HeroSection = () => {
  return (
    <>
      <Separator />
      <div
        className="bento-grid grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-[repeat(30,1fr)]"
        style={{
          gridAutoRows: "150px",
        }}
      >
        {/* Name Card - Mobile: full, MD: 1 col, LG: 14 cols × 2 rows */}
        <BentoItem
          colSpan={14}
          rowSpan={2}
          className="row-span-2 md:col-span-1 md:row-span-2 lg:col-span-14 lg:row-span-2"
        >
          <NameCard />
        </BentoItem>

        {/* Profile Picture - Mobile: full, MD: 1 col, LG: 6 cols × 2 rows */}
        <BentoItem
          colSpan={6}
          rowSpan={2}
          className="row-span-2 md:col-span-1 md:row-span-2 lg:col-span-6 lg:row-span-2"
        >
          <ProfileCard />
        </BentoItem>

        {/* Experience Card - Mobile: full 3 rows, MD: 2 cols 4 rows, LG: 10 cols × 4 rows */}
        <BentoItem
          colSpan={10}
          rowSpan={4}
          className="row-span-3 md:col-span-2 md:row-span-4 lg:col-span-10 lg:row-span-4"
        >
          <Experience />
        </BentoItem>

        {/* About Section - Mobile: full 2 rows, MD: 1 col, LG: 10 cols × 2 rows */}
        <BentoItem
          colSpan={10}
          rowSpan={2}
          className="row-span-2 md:col-span-1 md:row-span-2 lg:col-span-10 lg:row-span-2"
        >
          <AboutCard />
        </BentoItem>

        {/* Email Button - Mobile: full, MD: 1 col, LG: 5 cols × 1 row */}
        <BentoItem
          colSpan={5}
          rowSpan={1}
          className="md:col-span-1 lg:col-span-5 lg:row-span-1"
        >
          <Email />
        </BentoItem>

        {/* Resume Button - Mobile: full, MD: 1 col, LG: 5 cols × 1 row */}
        <BentoItem
          colSpan={5}
          rowSpan={1}
          className="md:col-span-1 lg:col-span-5 lg:row-span-1"
        >
          <Resume />
        </BentoItem>

        {/* Connect Card - Mobile: full, MD: 2 cols, LG: 10 cols × 1 row */}
        <BentoItem
          colSpan={10}
          rowSpan={1}
          className="md:col-span-2 lg:col-span-10 lg:row-span-1"
        >
          <Connect />
        </BentoItem>
      </div>
    </>
  );
};
