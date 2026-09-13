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
        "my-6 rounded-r-md border-l-2 p-4",
        config.borderColor,
        config.bgColor
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", config.iconColor)} />
        <div className="min-w-0 flex-1">
          <p className={cn("mb-1 text-sm", config.titleColor)}>
            {displayTitle}
          </p>
          <div className="text-sm leading-relaxed text-neutral-300 [&>p]:mb-2 [&>p:last-child]:mb-0">
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
    <small className="my-4 block rounded-md border border-white/[0.06] p-4 text-sm leading-relaxed text-neutral-400">
      {children}
    </small>
  );
}

// ============================================
// Main MDX Components Export
// ============================================
export const MDXComponents = {
  // ==========================================
  // Headings - same face as the body, set apart by size and colour only
  // ==========================================
  h1: ({ children, ...props }: ComponentProps<"h1">) => (
    <h1 className="mt-10 mb-4 scroll-mt-24 text-xl text-neutral-100" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ComponentProps<"h2">) => (
    <h2 className="mt-10 mb-4 scroll-mt-24 text-lg text-neutral-100" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentProps<"h3">) => (
    <h3 className="mt-8 mb-3 scroll-mt-24 text-neutral-100" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentProps<"h4">) => (
    <h4 className="mt-6 mb-2 scroll-mt-24 text-neutral-200" {...props}>
      {children}
    </h4>
  ),

  // ==========================================
  // Paragraph - optimized for reading
  // ==========================================
  p: (props: ComponentProps<"p">) => (
    <p className="mb-5 leading-7 text-neutral-300" {...props} />
  ),

  // ==========================================
  // Links - with external indicator
  // ==========================================
  a: ({ href, children, ...props }: ComponentProps<"a">) => {
    const isExternal = href?.startsWith("http");
    const baseClass =
      "text-neutral-100 underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-300";

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
          {...props}
        >
          {children}
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
    <ul className="mb-5 space-y-2 text-neutral-300" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol
      className="mb-5 list-none space-y-2 text-neutral-300 [counter-reset:list-counter]"
      {...props}
    />
  ),
  li: ({ children, ...props }: ComponentProps<"li">) => (
    <li
      className="relative pl-5 leading-7 text-neutral-300 before:absolute before:top-[0.7rem] before:left-1 before:h-1 before:w-1 before:rounded-full before:bg-neutral-600 [ol>&]:pl-6 [ol>&]:[counter-increment:list-counter] [ol>&]:before:top-0 [ol>&]:before:left-0 [ol>&]:before:h-auto [ol>&]:before:w-auto [ol>&]:before:rounded-none [ol>&]:before:bg-transparent [ol>&]:before:text-neutral-500 [ol>&]:before:content-[counter(list-counter)'.']"
      {...props}
    >
      {children}
    </li>
  ),

  // ==========================================
  // Blockquote
  // ==========================================
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="my-6 border-l-2 border-white/15 pl-5 [&>p]:mb-0 [&>p]:text-neutral-400"
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
          className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-neutral-200"
          {...props}
        />
      );
    }
    // Code block - preserve Shiki styling
    return <code {...props} />;
  },

  // ==========================================
  // Code block - with copy button
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
      <div className="group relative my-6 overflow-hidden rounded-md border border-white/[0.06]">
        <pre
          className={cn(
            "overflow-x-auto p-4 font-mono text-[13px] leading-relaxed",
            isShiki ? "[&>code]:bg-transparent" : "text-neutral-200",
            className
          )}
          {...props}
        >
          {children}
        </pre>
        <CodeCopyButton code={codeText} />
      </div>
    );
  },

  // ==========================================
  // Image (span-based to avoid hydration issues)
  // ==========================================
  img: (props: ComponentProps<"img">) => {
    const { src, alt, width, height } = props;
    if (src && typeof src === "string") {
      return (
        <span className="my-8 block">
          <span className="block overflow-hidden rounded-md border border-white/10">
            <Image
              src={src}
              alt={alt || ""}
              width={typeof width === "number" ? width : 800}
              height={typeof height === "number" ? height : 450}
              className="h-auto w-full object-cover"
              loading="lazy"
              unoptimized={src.startsWith("http")}
            />
          </span>
          {alt && (
            <span className="mt-3 block text-center text-[13px] text-neutral-500">
              {alt}
            </span>
          )}
        </span>
      );
    }
    return null;
  },

  hr: () => <hr className="my-10 border-white/[0.06]" />,

  // ==========================================
  // Table - clean bordered style
  // ==========================================
  table: (props: ComponentProps<"table">) => (
    <div className="my-6 overflow-x-auto rounded-md border border-white/[0.06]">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentProps<"thead">) => (
    <thead className="border-b border-white/[0.06]" {...props} />
  ),
  tbody: (props: ComponentProps<"tbody">) => (
    <tbody className="divide-y divide-white/[0.06]" {...props} />
  ),
  tr: (props: ComponentProps<"tr">) => <tr {...props} />,
  th: (props: ComponentProps<"th">) => (
    <th
      className="px-4 py-2.5 text-left font-normal text-neutral-500"
      {...props}
    />
  ),
  td: (props: ComponentProps<"td">) => (
    <td className="px-4 py-2.5 text-neutral-300" {...props} />
  ),

  // ==========================================
  // Text styling
  // ==========================================
  strong: (props: ComponentProps<"strong">) => (
    <strong className="font-medium text-neutral-100" {...props} />
  ),
  em: (props: ComponentProps<"em">) => (
    <em className="text-neutral-200 italic" {...props} />
  ),
  del: (props: ComponentProps<"del">) => (
    <del className="text-neutral-500 line-through" {...props} />
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
