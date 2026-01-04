import React, { ComponentProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lightbulb,
} from "lucide-react";
import { CodeCopyButton } from "@/components/shared/CodeCopyButton";

// ============================================
// Aside / Callout Component (Josh Comeau style)
// ============================================
type AsideType = "info" | "warning" | "success" | "error" | "tip";

interface AsideProps {
  children: React.ReactNode;
  type?: AsideType;
  title?: string;
}

const asideConfig: Record<
  AsideType,
  {
    icon: React.ElementType;
    borderColor: string;
    bgColor: string;
    iconColor: string;
    titleColor: string;
    defaultTitle: string;
  }
> = {
  info: {
    icon: Info,
    borderColor: "border-l-blue-500",
    bgColor: "bg-blue-500/5",
    iconColor: "text-blue-400",
    titleColor: "text-blue-300",
    defaultTitle: "Note",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "border-l-amber-500",
    bgColor: "bg-amber-500/5",
    iconColor: "text-amber-400",
    titleColor: "text-amber-300",
    defaultTitle: "Warning",
  },
  success: {
    icon: CheckCircle,
    borderColor: "border-l-emerald-500",
    bgColor: "bg-emerald-500/5",
    iconColor: "text-emerald-400",
    titleColor: "text-emerald-300",
    defaultTitle: "Success",
  },
  error: {
    icon: XCircle,
    borderColor: "border-l-red-500",
    bgColor: "bg-red-500/5",
    iconColor: "text-red-400",
    titleColor: "text-red-300",
    defaultTitle: "Error",
  },
  tip: {
    icon: Lightbulb,
    borderColor: "border-l-purple-500",
    bgColor: "bg-purple-500/5",
    iconColor: "text-purple-400",
    titleColor: "text-purple-300",
    defaultTitle: "Pro Tip",
  },
};

function Aside({ children, type = "info", title }: AsideProps) {
  const config = asideConfig[type];
  const Icon = config.icon;
  const displayTitle = title || config.defaultTitle;

  return (
    <aside
      className={cn(
        "my-8 border-l-4 p-5 sm:p-6",
        config.borderColor,
        config.bgColor
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", config.iconColor)} />
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "mb-2 font-mono text-sm font-semibold",
              config.titleColor
            )}
          >
            {displayTitle}
          </p>
          <div className="text-sm leading-relaxed text-zinc-300 [&>p]:mb-2 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}

// ============================================
// Sidenote Component (for subtle notes)
// ============================================
function Sidenote({ children }: { children: React.ReactNode }) {
  return (
    <small className="my-4 block border border-zinc-800 bg-zinc-900/50 p-4 text-sm leading-relaxed text-zinc-400">
      {children}
    </small>
  );
}

// ============================================
// Main MDX Components Export
// ============================================
export const MDXComponents = {
  // ==========================================
  // Headings - monospace with scroll margin
  // ==========================================
  h1: ({ children, ...props }: ComponentProps<"h1">) => (
    <h1
      className="mt-12 mb-6 scroll-mt-24 font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ComponentProps<"h2">) => (
    <h2
      className="mt-12 mb-5 scroll-mt-24 border-b border-zinc-800 pb-3 font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentProps<"h3">) => (
    <h3
      className="mt-10 mb-4 scroll-mt-24 font-mono text-xl font-semibold text-white"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentProps<"h4">) => (
    <h4
      className="mt-8 mb-3 scroll-mt-24 font-mono text-lg font-semibold text-zinc-100"
      {...props}
    >
      {children}
    </h4>
  ),

  // ==========================================
  // Paragraph - optimized for reading
  // ==========================================
  p: (props: ComponentProps<"p">) => (
    <p
      className="mb-6 font-sans text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8"
      {...props}
    />
  ),

  // ==========================================
  // Links - with external indicator
  // ==========================================
  a: ({ href, children, ...props }: ComponentProps<"a">) => {
    const isExternal = href?.startsWith("http");
    const baseClass =
      "font-medium text-white underline decoration-zinc-500 decoration-1 underline-offset-[3px] transition-all duration-200 hover:decoration-white hover:decoration-2";

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseClass, "inline-flex items-center gap-0.5")}
          {...props}
        >
          {children}
          <svg
            className="h-3.5 w-3.5 opacity-50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      );
    }

    return (
      <Link href={href || "#"} className={baseClass} {...props}>
        {children}
      </Link>
    );
  },

  // ==========================================
  // Lists - custom bullet styling
  // ==========================================
  ul: (props: ComponentProps<"ul">) => (
    <ul className="mb-6 space-y-3 text-zinc-300" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol
      className="mb-6 list-none space-y-3 text-zinc-300 [counter-reset:list-counter]"
      {...props}
    />
  ),
  li: ({ children, ...props }: ComponentProps<"li">) => (
    <li
      className="relative pl-7 text-base leading-7 text-zinc-300 before:absolute before:top-[0.6rem] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-zinc-500 sm:text-lg [ol>&]:[counter-increment:list-counter] [ol>&]:before:top-[0.35rem] [ol>&]:before:h-auto [ol>&]:before:w-auto [ol>&]:before:rounded-none [ol>&]:before:bg-transparent [ol>&]:before:font-mono [ol>&]:before:text-sm [ol>&]:before:font-medium [ol>&]:before:text-zinc-500 [ol>&]:before:content-[counter(list-counter)'.']"
      {...props}
    >
      {children}
    </li>
  ),

  // ==========================================
  // Blockquote - elegant quote styling
  // ==========================================
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="my-8 border-l-4 border-zinc-600 pl-6 [&>p]:mb-0 [&>p]:text-lg [&>p]:text-zinc-400 [&>p]:italic"
      {...props}
    />
  ),

  // ==========================================
  // Inline code - subtle pill style
  // ==========================================
  code: (props: ComponentProps<"code">) => {
    // Check if it's a code block (has language class from Shiki or className)
    const isCodeBlock =
      props.className?.includes("language-") ||
      props.className?.includes("shiki");
    if (!isCodeBlock) {
      // Inline code styling
      return (
        <code
          className="bg-zinc-800/80 px-1.5 py-0.5 font-mono text-base text-zinc-200"
          {...props}
        />
      );
    }
    // Code block - preserve Shiki styling
    return <code {...props} />;
  },

  // ==========================================
  // Code block - styled with hover glow and copy button
  // ==========================================
  pre: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => {
    const getTextContent = (node: React.ReactNode): string => {
      if (typeof node === "string") {
        return node;
      }
      if (typeof node === "number") {
        return String(node);
      }
      if (
        React.isValidElement(node) &&
        node.props &&
        typeof node.props === "object"
      ) {
        return getTextContent(
          (node.props as { children?: React.ReactNode }).children
        );
      }
      if (Array.isArray(node)) {
        return node.map(getTextContent).join("");
      }
      return "";
    };

    const codeText = getTextContent(children);
    // Check if this is a Shiki-highlighted code block
    const isShiki = className?.includes("shiki");

    return (
      <div className="group relative my-6">
        {/* Subtle glow on hover */}
        <div className="pointer-events-none absolute -inset-px bg-linear-to-r from-zinc-600/10 via-zinc-500/5 to-zinc-600/10 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

        {/* Code container */}
        <div className="relative overflow-hidden bg-zinc-900">
          <pre
            className={cn(
              "overflow-x-auto p-4 font-mono text-sm leading-relaxed sm:p-5",
              isShiki ? "[&>code]:bg-transparent" : "text-zinc-200",
              className
            )}
            {...props}
          >
            {children}
          </pre>
          <CodeCopyButton code={codeText} />
        </div>
      </div>
    );
  },

  // ==========================================
  // Image - styled with hover effect (span-based to avoid hydration issues)
  // ==========================================
  img: (props: ComponentProps<"img">) => {
    const { src, alt, width, height } = props;
    if (src && typeof src === "string") {
      return (
        <span className="group my-10 block">
          <span className="relative block overflow-hidden rounded-sm border border-zinc-800 transition-all duration-300 hover:border-zinc-700">
            <Image
              src={src}
              alt={alt || ""}
              width={typeof width === "number" ? width : 800}
              height={typeof height === "number" ? height : 450}
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              loading="lazy"
              unoptimized={src.startsWith("http")}
            />
          </span>
          {alt && (
            <span className="mt-4 block text-center font-mono text-sm text-zinc-500">
              — {alt}
            </span>
          )}
        </span>
      );
    }
    return null;
  },

  // ==========================================
  // Horizontal rule - decorative divider
  // ==========================================
  hr: () => (
    <div className="my-12 flex items-center justify-center gap-2">
      <span className="h-1 w-1 rounded-full bg-zinc-700" />
      <span className="h-1 w-1 rounded-full bg-zinc-600" />
      <span className="h-1 w-1 rounded-full bg-zinc-700" />
    </div>
  ),

  // ==========================================
  // Table - clean bordered style
  // ==========================================
  table: (props: ComponentProps<"table">) => (
    <div className="my-8 overflow-hidden border border-zinc-800">
      <div className="overflow-x-auto">
        <table className="w-full text-sm" {...props} />
      </div>
    </div>
  ),
  thead: (props: ComponentProps<"thead">) => (
    <thead className="border-b border-zinc-700 bg-zinc-900" {...props} />
  ),
  tbody: (props: ComponentProps<"tbody">) => (
    <tbody className="divide-y divide-zinc-800" {...props} />
  ),
  tr: (props: ComponentProps<"tr">) => (
    <tr className="transition-colors hover:bg-zinc-800/50" {...props} />
  ),
  th: (props: ComponentProps<"th">) => (
    <th
      className="px-4 py-3 text-left font-mono text-xs font-semibold tracking-wider text-zinc-400 uppercase"
      {...props}
    />
  ),
  td: (props: ComponentProps<"td">) => (
    <td className="px-4 py-3 text-zinc-300" {...props} />
  ),

  // ==========================================
  // Text styling
  // ==========================================
  strong: (props: ComponentProps<"strong">) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  em: (props: ComponentProps<"em">) => (
    <em className="text-zinc-200 italic" {...props} />
  ),
  del: (props: ComponentProps<"del">) => (
    <del className="text-zinc-500 line-through" {...props} />
  ),
  mark: (props: ComponentProps<"mark">) => (
    <mark
      className="rounded bg-yellow-500/20 px-1 text-yellow-200"
      {...props}
    />
  ),

  // ==========================================
  // Custom Components (use in MDX)
  // ==========================================
  Aside,
  Sidenote,

  // Shorthand aliases for Aside types
  Note: (props: Omit<AsideProps, "type">) => <Aside type="info" {...props} />,
  Warning: (props: Omit<AsideProps, "type">) => (
    <Aside type="warning" {...props} />
  ),
  Tip: (props: Omit<AsideProps, "type">) => <Aside type="tip" {...props} />,
  Success: (props: Omit<AsideProps, "type">) => (
    <Aside type="success" {...props} />
  ),
  Error: (props: Omit<AsideProps, "type">) => <Aside type="error" {...props} />,
};
