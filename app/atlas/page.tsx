import type { Metadata } from "next";
import { Atlas } from "@/components/atlas/Atlas";
import { PageHeader } from "@/components/shared/Section";
import { DOMAINS } from "@/data/atlas";
import { links, skills } from "@/lib/atlas";

const description =
  "A map of the skills that matter today and how they make each other stronger.";

export const metadata: Metadata = {
  title: "Skill Atlas | Ayroid",
  description,
  openGraph: { title: "Skill Atlas | Ayroid", description },
};

export default function AtlasPage() {
  return (
    <>
      <PageHeader
        title="Skill Atlas"
        description={`${Object.keys(skills).length} skills · ${DOMAINS.length} domains · ${links.length} connections`}
      />
      <Atlas />
    </>
  );
}
