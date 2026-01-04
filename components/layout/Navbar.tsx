"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { BentoItem, FadeUpReveal } from "@/components/shared";
import { navLinks } from "@/config";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * LATTICE STRUCTURE (30 columns × 1 rows)
 * Base row height: 80px
 */

const Navbar = () => {
  return (
    <FadeUpReveal>
      <div
        className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,1fr)]"
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
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  width={32}
                  height={32}
                />
              </div>
              <h1 className="font-mono text-xl font-bold text-white sm:text-2xl">
                Ayroid
              </h1>
            </Link>

            {/* Desktop Navigation */}
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

            {/* Mobile Navigation - Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="flex h-10 w-10 items-center justify-center text-zinc-400 transition-colors hover:text-white md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex flex-col bg-[#121214] text-white"
              >
                <SheetHeader className="border-b">
                  <SheetTitle>
                    <SheetClose asChild>
                      <Link href="/" className="flex items-center gap-2 py-2">
                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-black">
                          <Image
                            src="/profile.jpg"
                            alt="Profile"
                            width={40}
                            height={40}
                          />
                        </div>
                        <span className="font-mono text-2xl font-bold text-white">
                          Ayroid
                        </span>
                      </Link>
                    </SheetClose>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-1 flex-col gap-6 p-8">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="text-2xl text-zinc-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                {/* Copyright */}
                <div className="border-t border-zinc-800 p-6 text-center">
                  <p className="font-mono text-sm text-zinc-500">
                    © {new Date().getFullYear()} Ayroid
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </BentoItem>
      </div>
    </FadeUpReveal>
  );
};

export default Navbar;
