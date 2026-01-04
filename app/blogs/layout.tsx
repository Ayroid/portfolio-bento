import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Ayroid",
  description:
    "Technical blogs about software engineering, DevOps, and technology.",
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
