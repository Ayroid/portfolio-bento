import Link from "next/link";
import { PageHeader, inlineLink } from "@/components/shared/Section";

export default function NotFound() {
  return (
    <PageHeader title="404" description="This page doesn't exist.">
      <p className="mt-4 text-neutral-400">
        Try the{" "}
        <Link href="/" className={inlineLink}>
          homepage
        </Link>
        ,{" "}
        <Link href="/projects" className={inlineLink}>
          projects
        </Link>{" "}
        or the{" "}
        <Link href="/blogs" className={inlineLink}>
          blog
        </Link>
        .
      </p>
    </PageHeader>
  );
}
