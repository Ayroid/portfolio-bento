import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageHeader, inlineLink, pill } from "@/components/shared/Section";
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
    <>
      <PageHeader
        title="Resume"
        description="What I've built, shipped, and worked on so far."
      >
        <div className="mt-4">
          <a href={siteConfig.resumePdf} download className={pill}>
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </a>
        </div>
      </PageHeader>

      <div className="border-t border-white/[0.06] px-5 py-8">
        {/*
          Hash params hide the viewer's own toolbar/sidebar and fit the page width.
          Sizing the box to the PDF's own 612x792 page means the content never
          overflows it, so the viewer shows no scrollbar and the document scrolls
          with the page instead.
          ponytail: assumes a single Letter page; a multi-page resume needs the
          aspect ratio multiplied by the page count, or a real pdf.js renderer.
        */}
        <object
          data={`${siteConfig.resumePdf}#toolbar=0&navpanes=0&view=FitH`}
          type="application/pdf"
          className="aspect-[612/792] w-full rounded-md border border-white/10"
          aria-label={`Resume of ${siteConfig.name}`}
        >
          {/* Shown where inline PDF viewing is unsupported — notably iOS Safari. */}
          <p className="p-8 text-center text-neutral-400">
            Your browser can&apos;t display PDFs inline.{" "}
            <a href={siteConfig.resumePdf} className={inlineLink}>
              Open the resume
            </a>{" "}
            instead.
          </p>
        </object>
      </div>
    </>
  );
}
