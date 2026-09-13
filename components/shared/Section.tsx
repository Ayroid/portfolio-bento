import Link from "next/link";

// The few pieces every page is built from: a labelled section, a page header,
// and the row / link / pill styles that go inside them.

export const inlineLink =
  "text-neutral-100 underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-300";
export const row =
  "group grid gap-4 border-t border-white/[0.06] py-3 transition-colors";
export const rowTitle =
  "text-neutral-100 decoration-neutral-600 underline-offset-4 group-hover:underline";
export const pill =
  "inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1 text-[13px] text-neutral-300 transition-colors hover:border-white/25 hover:text-neutral-100";

// With an href the /label becomes a link that lights up while the section is
// hovered (a named group, so it doesn't clash with the rows' own `group`).
export function Section({
  label,
  href,
  more,
  children,
}: {
  label: string;
  href?: string;
  more?: { href: string; text: string };
  children: React.ReactNode;
}) {
  return (
    <section className="group/section border-t border-white/[0.06] px-5 py-8">
      <h2 className="mb-4 font-mono text-[11px] text-neutral-500">
        {href ? (
          <Link
            href={href}
            className="underline-offset-4 transition-colors group-hover/section:text-neutral-100 hover:underline"
          >
            /{label}
          </Link>
        ) : (
          `/${label}`
        )}
      </h2>
      {children}
      {more && (
        <Link
          href={more.href}
          className="mt-3 inline-block text-[13px] text-neutral-500 transition-colors hover:text-neutral-100"
        >
          {more.text} →
        </Link>
      )}
    </section>
  );
}

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="px-5 py-8">
      <h1 className="text-2xl font-normal text-neutral-100">{title}</h1>
      {description && (
        <p className="mt-1 leading-relaxed text-neutral-500">{description}</p>
      )}
      {children}
    </header>
  );
}
