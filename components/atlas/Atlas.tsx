"use client";

import { Maximize2, Minimize2 } from "lucide-react";
import { memo, useRef, useState, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
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
// It's read through useSyncExternalStore so the server render (no storage)
// and the first client render agree, then the saved value takes over.
const KEY = "atlas-mode";
const noSubscribe = () => () => {};
function readRaw() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}
function parseSaved(raw: string | null): Mode | undefined {
  try {
    const saved: unknown = JSON.parse(raw ?? "null");
    return isMode(saved) ? saved : undefined;
  } catch {}
}
function writeSaved(m: Mode) {
  try {
    localStorage.setItem(KEY, JSON.stringify(m));
  } catch {}
}
const chip = `${pill} cursor-pointer aria-pressed:border-neutral-100 aria-pressed:bg-neutral-100 aria-pressed:text-neutral-900`;

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
              Show on the wheel ↑
            </button>
          </div>
        </details>
      ))}
    </Section>
  ));
});

const panelLabel = { skill: "skill", domain: "domain", stack: "stack" };

export function Atlas() {
  const [picked, setPicked] = useState<Mode | null>(null);
  const saved = useSyncExternalStore(noSubscribe, readRaw, () => null);
  const mode = picked ?? parseSaved(saved) ?? DEFAULT_MODE;

  function setMode(m: Mode) {
    setPicked(m);
    writeSaved(m);
  }

  // Clicking the active chip again goes back to the default selection.
  const toggle = (m: Mode) => setMode(sameMode(m, mode) ? DEFAULT_MODE : m);

  const [full, setFull] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  // The wheel glides between its inline spot and full screen while the rest of
  // the page fades. Without view transitions (or with reduced motion) it just
  // switches.
  function setFullscreen(on: boolean) {
    const run = () => {
      flushSync(() => setFull(on));
      if (on) dialog.current?.showModal();
      else dialog.current?.close();
    };
    if (
      !document.startViewTransition ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return run();
    document.startViewTransition(run);
  }

  return (
    <div
      className="atlas"
      onClick={(e) => {
        // A guide card's "Show on the wheel" selects it and scrolls up to it.
        const id = (e.target as Element).closest<HTMLElement>("[data-show]")
          ?.dataset.show;
        if (!id) return;
        setMode({ type: "skill", id });
        document
          .getElementById("wheel")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      <Search />

      <div id="wheel" className="scroll-mt-4">
        <Section label="wheel">
          <div className="flex flex-wrap gap-1.5">
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
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
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
          <div className="relative mt-6">
            <button
              className={`${pill} absolute top-0 right-0 z-10 cursor-pointer`}
              onClick={() => setFullscreen(true)}
            >
              <Maximize2 className="h-3.5 w-3.5" />
              Full screen
            </button>
            {/* While full screen, hold the wheel's space so the page doesn't jump. */}
            {full ? (
              <div className="aspect-square" />
            ) : (
              <Wheel
                mode={mode}
                onSelect={(id) => setMode({ type: "skill", id })}
              />
            )}
          </div>
        </Section>
      </div>

      <Section label={panelLabel[mode.type]}>
        <Panel mode={mode} onMode={setMode} />
      </Section>

      <Guide />

      <dialog
        ref={dialog}
        aria-label="Skill wheel, full screen"
        className="atlas-full bg-surface-page m-0 h-dvh max-h-none w-screen max-w-none border-0 p-0 text-neutral-300 backdrop:bg-transparent"
        onCancel={(e) => {
          // Esc animates out like the button does.
          e.preventDefault();
          setFullscreen(false);
        }}
        onClose={() => setFull(false)}
      >
        {full && (
          <>
            <button
              className={`${pill} bg-surface-page fixed top-4 right-4 z-10 cursor-pointer`}
              onClick={() => setFullscreen(false)}
              autoFocus
            >
              <Minimize2 className="h-3.5 w-3.5" />
              Exit full screen
            </button>
            {/* As big as the screen allows; phones scroll a 740px wheel so the
                names stay readable, as on the original Atlas. */}
            <div className="grid h-full place-items-center overflow-auto">
              <div className="w-[max(740px,min(100vw,100dvh))] md:w-[min(100vw,100dvh)]">
                <Wheel
                  labels
                  mode={mode}
                  onSelect={(id) => setMode({ type: "skill", id })}
                />
              </div>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
