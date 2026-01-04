import Image from "next/image";
import Link from "next/link";
import { BentoItem } from "@/components/shared";
import { navLinks } from "@/config";

/**
 * LATTICE STRUCTURE (30 columns × 1 rows)
 * Base row height: 80px
 */

const Navbar = () => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)]"
      style={{
        gridAutoRows: "80px", // Base row height
      }}
    >
      {/* Navbar - 30 cols × 1 rows */}
      <BentoItem
        colSpan={30}
        rowSpan={1}
        className="md:col-span-2 lg:col-span-30"
      >
        <div className="flex items-center justify-between p-4 sm:p-6">
          <Link className="flex items-center gap-3" href="/">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-black">
              <Image src="/profile.jpg" alt="Profile" width={32} height={32} />
            </div>
            <h1 className="font-mono text-xl font-bold text-white sm:text-2xl">
              Ayroid
            </h1>
          </Link>

          <nav className="hidden gap-6 font-sans text-sm text-zinc-400 md:flex lg:gap-8 lg:text-base">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button className="text-zinc-400 transition-colors hover:text-white md:hidden">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </BentoItem>
    </div>
  );
};

export default Navbar;
