"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config";

// The homepage carries the name itself; every other page steps back one level
// (/projects/darch -> Projects, /projects -> home).
const Navbar = () => {
  const parts = usePathname().split("/").filter(Boolean);
  if (parts.length === 0) return null;

  const parent = parts.slice(0, -1);

  return (
    <nav className="px-5 pt-6">
      <Link
        href={`/${parent.join("/")}`}
        className="text-[13px] text-neutral-500 capitalize transition-colors hover:text-neutral-100"
      >
        ← {parent.length ? parent[parent.length - 1] : siteConfig.name}
      </Link>
    </nav>
  );
};

export default Navbar;
