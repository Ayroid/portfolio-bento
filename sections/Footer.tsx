"use client";

import { BentoItem } from "@/components/BentoItem";
import { ActionCard } from "@/components/ActionCard";
import FadeUpReveal from "@/components/FadeUpReveal";

/**
 * LATTICE STRUCTURE (30 columns × 5 rows)
 * Base row height: 50px
 */

const Footer = () => {
  return (
    <FadeUpReveal>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)]"
        style={{
          gridAutoRows: "50px", // Base row height
        }}
      >
        {/* Open to Work Section - 22 cols × 3 rows */}
        <BentoItem colSpan={18} rowSpan={3}>
          <div className="flex h-full flex-col items-start justify-end p-6 sm:p-8">
            <h3 className="text-3xl font-semibold text-white">
              Let’s build something real
            </h3>
            <p className="max-w-xl text-xl text-zinc-500">
              Open to full-time roles, contracts, and serious collaborations.
            </p>
          </div>
        </BentoItem>
        <BentoItem colSpan={6} rowSpan={3}>
          <ActionCard
            href="https://cal.com/ayroid/general-meeting"
            label="CONTACT"
            bgColor="bg-white"
            hoverBgColor="hover:bg-[#dddddd]"
            textColor="text-black"
            iconColor="text-black"
          />
        </BentoItem>
        <BentoItem colSpan={6} rowSpan={3}>
          <ActionCard
            href="/projects"
            label="PROJECT"
            bgColor="bg-[#1a1a1a]"
            hoverBgColor="hover:bg-[#222222]"
            textColor="text-white"
            iconColor="text-white"
          />
        </BentoItem>
      </div>

      {/* Footer Credits - Plain centered text */}
      <div className="mt-8 flex items-center justify-center">
        <p className="text-center text-xs text-zinc-600 sm:text-sm">
          Designed & Developed by{" "}
          <span className="font-bold text-zinc-400">Ayush Singh Kushwah</span>
          <br />© 2026 All rights reserved.
        </p>
      </div>
    </FadeUpReveal>
  );
};

export default Footer;
