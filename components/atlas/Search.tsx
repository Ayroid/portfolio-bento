"use client";

import { useState } from "react";
import { findSkill, skills } from "@/lib/atlas";

const names = new Set(Object.values(skills).map((s) => s.name.toLowerCase()));

// Owns its own state so typing doesn't re-render the guide below it.
export function Search({ children }: { children?: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [miss, setMiss] = useState(false);

  // Opens the matching skill's guide card and scrolls it into view.
  function search(value: string) {
    const s = findSkill(value);
    setMiss(!s && value.trim() !== "");
    if (!s) return;
    const card = document.getElementById(
      `g-${s.id}`
    ) as HTMLDetailsElement | null;
    if (!card) return;
    card.open = true;
    card.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div data-atlas-search className="px-5 pb-8">
      <div className="flex flex-wrap gap-2">
        <input
          type="search"
          list="atlas-skills"
          value={query}
          onChange={(e) => {
            const v = e.target.value;
            setQuery(v);
            setMiss(false);
            // Picking a suggestion fills in an exact name: go there without Enter.
            if (names.has(v.trim().toLowerCase())) search(v);
          }}
          onKeyDown={(e) => e.key === "Enter" && search(query)}
          placeholder="Find a skill, e.g. Negotiation"
          aria-label="Find a skill"
          className="min-w-0 flex-1 rounded-md border border-white/10 bg-transparent px-3 py-1.5 text-neutral-100 placeholder:text-neutral-600 focus:border-white/25 focus:outline-none"
        />
        <datalist id="atlas-skills">
          {Object.values(skills).map((s) => (
            <option key={s.id} value={s.name} />
          ))}
        </datalist>
        {children}
      </div>
      <p
        className="mt-2 text-[13px] text-neutral-500 empty:hidden"
        role="status"
      >
        {miss ? `No skill matches “${query.trim()}”.` : ""}
      </p>
    </div>
  );
}
