import { ComponentProps } from "react";

// Custom components for MDX rendering
export const MDXComponents = {
  h1: (props: ComponentProps<"h1">) => (
    <h1 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="text-2xl font-bold text-white mt-8 mb-3" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="text-xl font-semibold text-white mt-6 mb-2" {...props} />
  ),
  h4: (props: ComponentProps<"h4">) => (
    <h4 className="text-lg font-semibold text-white mt-4 mb-2" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="text-zinc-300 leading-relaxed mb-4" {...props} />
  ),
  a: (props: ComponentProps<"a">) => (
    <a
      className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul
      className="list-disc list-inside text-zinc-300 mb-4 space-y-1 ml-4"
      {...props}
    />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol
      className="list-decimal list-inside text-zinc-300 mb-4 space-y-1 ml-4"
      {...props}
    />
  ),
  li: (props: ComponentProps<"li">) => (
    <li className="text-zinc-300" {...props} />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-4 border-zinc-600 pl-4 italic text-zinc-400 my-4"
      {...props}
    />
  ),
  code: (props: ComponentProps<"code">) => {
    const isInline = !props.className?.includes("language-");
    if (isInline) {
      return (
        <code
          className="bg-zinc-800 text-zinc-200 px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  pre: (props: ComponentProps<"pre">) => (
    <pre
      className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto my-4 text-sm"
      {...props}
    />
  ),
  img: (props: ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="rounded-lg my-4 max-w-full h-auto"
      alt={props.alt || ""}
      {...props}
    />
  ),
  hr: () => <hr className="border-zinc-800 my-8" />,
  table: (props: ComponentProps<"table">) => (
    <div className="overflow-x-auto my-4">
      <table
        className="min-w-full border border-zinc-800 rounded-lg"
        {...props}
      />
    </div>
  ),
  th: (props: ComponentProps<"th">) => (
    <th
      className="bg-zinc-800 px-4 py-2 text-left text-white font-semibold border-b border-zinc-700"
      {...props}
    />
  ),
  td: (props: ComponentProps<"td">) => (
    <td
      className="px-4 py-2 text-zinc-300 border-b border-zinc-800"
      {...props}
    />
  ),
  strong: (props: ComponentProps<"strong">) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  em: (props: ComponentProps<"em">) => (
    <em className="italic text-zinc-300" {...props} />
  ),
};
