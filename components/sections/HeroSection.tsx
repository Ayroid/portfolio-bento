import { ProfileCard } from "@/components/landing/Profile";
import Experience from "@/components/landing/Experience";
import AboutCard from "@/components/landing/About";
import Connect from "@/components/landing/Connect";
import { NameCard } from "@/components/landing/Name";
import { FadeUpReveal, ActionCard, BentoItem } from "@/components/shared";
import Resume from "@/components/landing/Resume";
import { siteConfig } from "@/config";

/**
 * LATTICE STRUCTURE (30 columns × 4 rows)
 * Base row height: 150px
 */

export const HeroSection = () => {
  return (
    <FadeUpReveal>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)]"
        style={{
          gridAutoRows: "150px",
        }}
      >
        {/* Name Card - 14 cols × 2 rows */}
        <BentoItem
          colSpan={14}
          rowSpan={2}
          className="md:col-span-1 lg:col-span-14 lg:row-span-2"
        >
          <NameCard />
        </BentoItem>

        {/* Profile Picture - 6 cols × 2 rows */}
        <BentoItem
          colSpan={6}
          rowSpan={2}
          className="md:col-span-1 lg:col-span-6 lg:row-span-2"
        >
          <ProfileCard />
        </BentoItem>

        {/* Experience Card - 10 cols × 4 rows */}
        <BentoItem
          colSpan={10}
          rowSpan={4}
          className="md:col-span-2 lg:col-span-10 lg:row-span-4"
        >
          <Experience />
        </BentoItem>

        {/* About Section - 10 cols × 2 rows */}
        <BentoItem
          colSpan={10}
          rowSpan={2}
          className="md:col-span-1 lg:col-span-10 lg:row-span-2"
        >
          <AboutCard />
        </BentoItem>

        {/* Email Button - 5 cols × 1 row */}
        <BentoItem
          colSpan={5}
          rowSpan={1}
          className="md:col-span-1 lg:col-span-5 lg:row-span-1"
        >
          <ActionCard
            href={`mailto:${siteConfig.email}`}
            label="EMAIL"
            bgColor="bg-[#1a1a1a]"
            hoverBgColor="hover:bg-[#222222]"
            textColor="text-white"
            iconColor="text-white"
          />
        </BentoItem>

        {/* Resume Button - 5 cols × 1 row */}
        <BentoItem
          colSpan={5}
          rowSpan={1}
          className="md:col-span-1 lg:col-span-5 lg:row-span-1"
        >
          <Resume />
        </BentoItem>

        {/* Connect Card - 10 cols × 1 row */}
        <BentoItem
          colSpan={10}
          rowSpan={1}
          className="md:col-span-1 lg:col-span-10 lg:row-span-1"
        >
          <Connect />
        </BentoItem>
      </div>
    </FadeUpReveal>
  );
};
