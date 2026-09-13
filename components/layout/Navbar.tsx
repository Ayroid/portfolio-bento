"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// Every page except the homepage gets a single way back: Home.
const Navbar = () => {
  if (usePathname() === "/") return null;

  return (
    <nav className="px-5 pt-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[13px] text-neutral-500 transition-colors hover:text-neutral-100"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Home
      </Link>
    </nav>
  );
};

export default Navbar;
