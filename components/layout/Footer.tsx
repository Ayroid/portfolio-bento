"use client";

import { ActionCard, BentoItem, VisitorCount } from "@/components/shared";
import { siteConfig } from "@/config";

/**
 * LATTICE STRUCTURE (30 columns × 5 rows)
 * Base row height: 50px
 */

const Footer = () => {
  return (
    <>
      <div
        className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,1fr)]"
        style={{
          gridAutoRows: "40px",
        }}
      >
        {/* Open to Work Section */}
        <BentoItem colSpan={20} rowSpan={4}>
          <div className="flex h-full flex-col items-start justify-end p-6 sm:p-8">
            <h3 className="font-sans text-2xl font-semibold text-white sm:text-3xl">
              Let&apos;s build something real
            </h3>
            <p className="max-w-xl font-sans text-base text-zinc-500 sm:text-xl">
              Open to full-time roles, contracts, and serious collaborations.
            </p>
          </div>
        </BentoItem>

        <BentoItem colSpan={10} rowSpan={4}>
          <ActionCard
            href={siteConfig.calendarUrl}
            label="CONTACT"
            bgColor="bg-accent"
            hoverBgColor="hover:bg-accent-hover"
            textColor="text-accent-foreground"
            iconColor="text-accent-foreground"
          />
        </BentoItem>
      </div>

      {/* Footer Credits - Plain centered text */}
      <div className="mt-8 flex flex-col items-center justify-center gap-3">
        <VisitorCount />
        <p className="text-center font-sans text-xs text-zinc-600 sm:text-sm">
          Designed & Developed by{" "}
          <span className="font-bold text-zinc-400">{siteConfig.name}</span>
          <br />© 2026 All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
