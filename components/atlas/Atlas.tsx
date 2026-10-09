"use client";

import { useRef, useState } from "react";
import { Section, pill } from "@/components/shared/Section";
import { DOMAINS, STACKS } from "@/data/atlas";
import {
  DEFAULT_MODE,
  domainSkills,
  findSkill,
  isMode,
  sameMode,
  skills,
  type Mode,
} from "@/lib/atlas";
import { Panel } from "./Panel";
import { SkillGuide } from "./SkillGuide";
import { Wheel } from "./Wheel";
import "./atlas.css";

const KEY = "atlas-mode";
const chip = `${pill} shrink-0 cursor-pointer whitespace-nowrap aria-pressed:border-neutral-100 aria-pressed:bg-neutral-100 aria-pressed:text-neutral-900`;

export function Atlas() {
  const [query, setQuery] = useState("");
  const [miss, setMiss] = useState(false);
  const [mode, setModeState] = useState<Mode>(DEFAULT_MODE);
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLElement>(null);

  // The selection is remembered across visits; storage may be unavailable.
  function save(m: Mode) {
    setModeState(m);
    try {
      localStorage.setItem(KEY, JSON.stringify(m));
    } catch {}
  }

  function setMode(m: Mode) {
    save(m);
    const p = panel.current;
    if (!p) return;
    p.scrollTop = 0;
    // Stacked layout: bring the panel into view so the tap visibly does something.
    if (!matchMedia("(min-width: 1024px)").matches)
      p.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Clicking the active chip again goes back to the default selection.
  const toggle = (m: Mode) => setMode(sameMode(m, mode) ? DEFAULT_MODE : m);

  // Opens on the given skill, else on the last saved selection.
  function openWheel(m?: Mode) {
    let next = m;
    if (!next)
      try {
        const saved: unknown = JSON.parse(localStorage.getItem(KEY) ?? "null");
        if (isMode(saved)) next = saved;
      } catch {}
    if (next) save(next);
    dialog.current?.showModal();
  }

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
          <button
            className={`${pill} cursor-pointer`}
            onClick={() => openWheel()}
          >
            Open the wheel
          </button>
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
                <button
                  className={`${pill} mt-6 cursor-pointer`}
                  onClick={() => openWheel({ type: "skill", id: s.id })}
                >
                  Show on the wheel →
                </button>
              </div>
            </details>
          ))}
        </Section>
      ))}

      <dialog
        ref={dialog}
        aria-label="Skill wheel"
        className="atlas-dialog bg-surface-page m-0 h-dvh max-h-none w-screen max-w-none border-0 p-0 text-[14.5px] font-light text-neutral-300 backdrop:bg-black/60"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start gap-3 border-b border-white/[0.06] p-4">
            {/* One sideways-scrolling row on small screens, wrapped from lg up. */}
            <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto lg:flex-wrap">
              {DOMAINS.map((d) => (
                <button
                  key={d.id}
                  data-d={d.id}
                  aria-pressed={mode.type === "domain" && mode.id === d.id}
                  className={chip}
                  onClick={() => toggle({ type: "domain", id: d.id })}
                >
                  <span className="c-dot" />
                  {d.name}
                </button>
              ))}
              {STACKS.map((st, i) => (
                <button
                  key={st.name}
                  aria-pressed={mode.type === "stack" && mode.i === i}
                  className={chip}
                  onClick={() => toggle({ type: "stack", i })}
                >
                  {st.name}
                </button>
              ))}
            </div>
            <form method="dialog">
              <button className={`${pill} cursor-pointer`} autoFocus>
                Close
              </button>
            </form>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:overflow-hidden">
            <div className="overflow-x-auto lg:flex lg:items-center lg:overflow-auto">
              <div className="min-w-[740px] lg:min-w-0 lg:flex-1">
                <Wheel
                  mode={mode}
                  onSelect={(id) => setMode({ type: "skill", id })}
                />
              </div>
            </div>
            <aside
              ref={panel}
              aria-live="polite"
              className="border-t border-white/[0.06] p-5 lg:overflow-y-auto lg:border-t-0 lg:border-l"
            >
              <Panel mode={mode} onMode={setMode} />
            </aside>
          </div>
        </div>
      </dialog>
    </div>
  );
}
