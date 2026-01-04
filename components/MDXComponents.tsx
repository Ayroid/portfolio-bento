import { ComponentProps } from "react";

// Custom components for MDX rendering
export const MDXComponents = {
  h1: (props: ComponentProps<"h1">) => (
    <h1 className="mt-8 mb-4 text-3xl font-bold text-white" {...props} />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="mt-8 mb-3 text-2xl font-bold text-white" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="mt-6 mb-2 text-xl font-semibold text-white" {...props} />
  ),
  h4: (props: ComponentProps<"h4">) => (
    <h4 className="mt-4 mb-2 text-lg font-semibold text-white" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="mb-4 leading-relaxed text-zinc-300" {...props} />
  ),
  a: (props: ComponentProps<"a">) => (
    <a
      className="text-blue-400 underline underline-offset-2 transition-colors hover:text-blue-300"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul
      className="mb-4 ml-4 list-inside list-disc space-y-1 text-zinc-300"
      {...props}
    />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol
      className="mb-4 ml-4 list-inside list-decimal space-y-1 text-zinc-300"
      {...props}
    />
  ),
  li: (props: ComponentProps<"li">) => (
    <li className="text-zinc-300" {...props} />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="my-4 border-l-4 border-zinc-600 pl-4 text-zinc-400 italic"
      {...props}
    />
  ),
  code: (props: ComponentProps<"code">) => {
    const isInline = !props.className?.includes("language-");
    if (isInline) {
      return (
        <code
          className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-zinc-200"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  pre: (props: ComponentProps<"pre">) => (
    <pre
      className="my-4 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm"
      {...props}
    />
  ),
  img: (props: ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="my-4 h-auto max-w-full rounded-lg"
      alt={props.alt || ""}
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-zinc-800" />,
  table: (props: ComponentProps<"table">) => (
    <div className="my-4 overflow-x-auto">
      <table
        className="min-w-full rounded-lg border border-zinc-800"
        {...props}
      />
    </div>
  ),
  th: (props: ComponentProps<"th">) => (
    <th
      className="border-b border-zinc-700 bg-zinc-800 px-4 py-2 text-left font-semibold text-white"
      {...props}
    />
  ),
  td: (props: ComponentProps<"td">) => (
    <td
      className="border-b border-zinc-800 px-4 py-2 text-zinc-300"
      {...props}
    />
  ),
  strong: (props: ComponentProps<"strong">) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  em: (props: ComponentProps<"em">) => (
    <em className="text-zinc-300 italic" {...props} />
  ),
};
