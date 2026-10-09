"use client";

import { memo, useRef, useState } from "react";
import { Section, pill } from "@/components/shared/Section";
import { DOMAINS, STACKS } from "@/data/atlas";
import {
  DEFAULT_MODE,
  domainSkills,
  isMode,
  sameMode,
  type Mode,
} from "@/lib/atlas";
import { Panel } from "./Panel";
import { Search } from "./Search";
import { SkillGuide } from "./SkillGuide";
import { Wheel } from "./Wheel";
import "./atlas.css";

// The selection is remembered across visits; storage may be unavailable.
const KEY = "atlas-mode";
function readSaved(): Mode | undefined {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(KEY) ?? "null");
    return isMode(saved) ? saved : undefined;
  } catch {}
}
function writeSaved(m: Mode) {
  try {
    localStorage.setItem(KEY, JSON.stringify(m));
  } catch {}
}
const chip = `${pill} shrink-0 cursor-pointer whitespace-nowrap aria-pressed:border-neutral-100 aria-pressed:bg-neutral-100 aria-pressed:text-neutral-900`;

// The guide never depends on the wheel's selection, so it's memoised with no
// props and skips re-rendering its 104 cards when the selection changes. Its
// "Show on the wheel" buttons are handled by one click listener in Atlas.
const Guide = memo(function Guide() {
  return DOMAINS.map((d) => (
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
            <button className={`${pill} mt-6 cursor-pointer`} data-show={s.id}>
              Show on the wheel →
            </button>
          </div>
        </details>
      ))}
    </Section>
  ));
});

export function Atlas() {
  const [mode, setModeState] = useState<Mode>(DEFAULT_MODE);
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLElement>(null);

  // A new selection always starts at the top of its panel.
  function setMode(m: Mode) {
    setModeState(m);
    writeSaved(m);
    if (panel.current) panel.current.scrollTop = 0;
  }

  // Wheel taps only: in the stacked layout, bring the panel into view so the
  // tap visibly does something. Chips stay put so the lit wheel stays visible.
  function selectSkill(id: string) {
    setMode({ type: "skill", id });
    if (!matchMedia("(min-width: 1024px)").matches)
      panel.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Clicking the active chip again goes back to the default selection.
  const toggle = (m: Mode) => setMode(sameMode(m, mode) ? DEFAULT_MODE : m);

  // Opens on the given skill, else on the last saved selection, scrolled to
  // the top.
  function openWheel(m?: Mode) {
    const next = m ?? readSaved();
    if (next) {
      setModeState(next);
      writeSaved(next);
    }
    dialog.current?.showModal();
    // Reset after opening: a closed dialog isn't rendered, so it can't scroll.
    const p = panel.current;
    if (p) {
      p.scrollTop = 0;
      // The stacked layout scrolls the panel's parent instead.
      if (p.parentElement) p.parentElement.scrollTop = 0;
    }
  }

  return (
    <div
      className="atlas"
      onClick={(e) => {
        const id = (e.target as Element).closest<HTMLElement>("[data-show]")
          ?.dataset.show;
        if (id) openWheel({ type: "skill", id });
      }}
    >
      <Search>
        <button
          className={`${pill} cursor-pointer`}
          onClick={() => openWheel()}
        >
          Open the wheel
        </button>
      </Search>

      <Guide />

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
                <Wheel mode={mode} onSelect={selectSkill} />
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
