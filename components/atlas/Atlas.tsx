"use client";

import { useState } from "react";
import { Section } from "@/components/shared/Section";
import { DOMAINS } from "@/data/atlas";
import { domainSkills, findSkill, skills } from "@/lib/atlas";
import { SkillGuide } from "./SkillGuide";
import "./atlas.css";

export function Atlas() {
  const [query, setQuery] = useState("");
  const [miss, setMiss] = useState(false);

  // Opens the matching skill's guide card and scrolls it into view.
  function search() {
    const s = findSkill(query);
    setMiss(!s && query.trim() !== "");
    if (!s) return;
    const card = document.getElementById(
      `g-${s.id}`
    ) as HTMLDetailsElement | null;
    if (!card) return;
    card.open = true;
    card.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="atlas">
      <div className="px-5 pb-8">
        <div className="flex flex-wrap gap-2">
          <input
            type="search"
            list="atlas-skills"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setMiss(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="Find a skill, e.g. Negotiation"
            aria-label="Find a skill"
            className="min-w-0 flex-1 rounded-md border border-white/10 bg-transparent px-3 py-1.5 text-neutral-100 placeholder:text-neutral-600 focus:border-white/25 focus:outline-none"
          />
          <datalist id="atlas-skills">
            {Object.values(skills).map((s) => (
              <option key={s.id} value={s.name} />
            ))}
          </datalist>
        </div>
        {miss && (
          <p className="mt-2 text-[13px] text-neutral-500" role="status">
            No skill matches “{query.trim()}”.
          </p>
        )}
      </div>

      {DOMAINS.map((d) => (
        <Section key={d.id} label={d.name.toLowerCase()}>
          <p className="mb-4 text-neutral-500">{d.desc}</p>
          {domainSkills[d.id].map((s) => (
            <details
              key={s.id}
              id={`g-${s.id}`}
              data-d={s.d}
              className="group/card scroll-mt-4 border-t border-white/[0.06]"
            >
              <summary className="grid cursor-pointer list-none gap-1 py-3 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2.5">
                  <span className="c-dot" />
                  <span className="text-neutral-100 decoration-neutral-600 underline-offset-4 group-hover/card:underline">
                    {s.name}
                  </span>
                  <span className="ml-auto font-mono text-[11px] text-neutral-600">
                    {s.links.length} links
                  </span>
                </span>
                <span className="text-neutral-500">{s.desc}</span>
              </summary>
              <div className="pb-8">
                <SkillGuide skill={s} />
              </div>
            </details>
          ))}
        </Section>
      ))}
    </div>
  );
}
