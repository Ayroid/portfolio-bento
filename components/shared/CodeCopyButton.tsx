"use client";

import { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";

interface CodeCopyButtonProps {
  code: string;
}

export function CodeCopyButton({ code }: CodeCopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <form
      action={copyToClipboard}
      className="absolute top-3 right-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100"
    >
      <button
        type="submit"
        aria-label={isCopied ? "Copied to clipboard" : "Copy code"}
        title={isCopied ? "Copied!" : "Copy code"}
        className="cursor-pointer"
      >
        {isCopied ? (
          <CopyCheck className="h-4 w-4 text-neutral-200" />
        ) : (
          <Copy className="h-4 w-4 text-neutral-500 transition-colors hover:text-neutral-100" />
        )}
      </button>
    </form>
  );
}
