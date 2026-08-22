import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { FadeUpReveal, Separator } from "@/components/shared";
import { siteConfig } from "@/config";

export const metadata: Metadata = {
  title: `Resume — ${siteConfig.name}`,
  description: `Resume of ${siteConfig.name}, ${siteConfig.description}.`,
  openGraph: {
    title: `Resume — ${siteConfig.name}`,
    description: `Resume of ${siteConfig.name}, ${siteConfig.description}.`,
    url: `${siteConfig.url}/resume`,
  },
};

export default function ResumePage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <FadeUpReveal>
        <div className="flex flex-col gap-0">
          <div className="relative overflow-hidden border p-12 sm:p-16">
            {/* Corner decorations */}
            <div className="absolute top-3 left-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-700" />
              <div className="h-1.5 w-1.5 bg-zinc-800" />
            </div>
            <div className="absolute top-3 right-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-800" />
              <div className="h-1.5 w-1.5 bg-zinc-700" />
            </div>
            <div className="absolute bottom-3 left-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-800" />
              <div className="h-1.5 w-1.5 bg-zinc-700" />
            </div>
            <div className="absolute right-3 bottom-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-700" />
              <div className="h-1.5 w-1.5 bg-zinc-800" />
            </div>
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 3px, currentcolor 4px, currentcolor 4px, transparent 5px)",
              }}
            />
            <div className="relative flex flex-col items-center gap-4">
              <FileText className="h-8 w-8 text-zinc-600 sm:h-10 sm:w-10" />
              <h1 className="text-center font-mono text-3xl font-bold tracking-wider text-white sm:text-5xl">
                RESUME
              </h1>
            </div>
          </div>
          <div className="border border-t-0 p-6">
            <p className="text-center font-sans text-sm text-zinc-400 sm:text-base">
              What I&apos;ve built, shipped, and worked on so far.
            </p>
          </div>
        </div>
      </FadeUpReveal>

      {/* Separator */}
      <FadeUpReveal>
        <Separator />
      </FadeUpReveal>

      {/* Download */}
      <FadeUpReveal>
        <div className="flex flex-wrap gap-2">
          <a
            href={siteConfig.resumePdf}
            download
            className="group flex items-center gap-2 border border-zinc-800 px-4 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </div>
      </FadeUpReveal>

      {/*
        Hash params hide the viewer's own toolbar/sidebar and fit the page width.
        Sizing the box to the PDF's own 612x792 page means the content never
        overflows it, so the viewer shows no scrollbar and the document scrolls
        with the page instead.
        ponytail: assumes a single Letter page; a multi-page resume needs the
        aspect ratio multiplied by the page count, or a real pdf.js renderer.
      */}
      <FadeUpReveal>
        <object
          data={`${siteConfig.resumePdf}#toolbar=0&navpanes=0&view=FitH`}
          type="application/pdf"
          className="bg-surface-card aspect-[612/792] w-full border border-zinc-800"
          aria-label={`Resume of ${siteConfig.name}`}
        >
          {/* Shown where inline PDF viewing is unsupported — notably iOS Safari. */}
          <p className="p-8 text-center font-sans text-sm text-zinc-400">
            Your browser can&apos;t display PDFs inline.{" "}
            <a
              href={siteConfig.resumePdf}
              className="text-white underline underline-offset-4"
            >
              Open the resume
            </a>{" "}
            instead.
          </p>
        </object>
      </FadeUpReveal>

      {/* Explore More */}
      <FadeUpReveal>
        <div className="mb-12 flex flex-col gap-4 pt-4">
          <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
            Explore More
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href="/work"
              className="group bg-surface-card flex items-center justify-between border border-zinc-800 p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <span className="font-sans text-lg font-semibold text-white">
                Work
              </span>
              <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
            </Link>
            <Link
              href="/projects"
              className="group bg-surface-card flex items-center justify-between border border-zinc-800 p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <span className="font-sans text-lg font-semibold text-white">
                Projects
              </span>
              <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
            </Link>
          </div>
        </div>
      </FadeUpReveal>
    </div>
  );
}
