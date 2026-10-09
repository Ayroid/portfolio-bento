"use client";

import { useState } from "react";
import { STACKS } from "@/data/atlas";
import {
  arcs,
  domainById,
  domainSkills,
  focusOf,
  linkPaths,
  links,
  nodeLayout,
  skills,
  type Mode,
} from "@/lib/atlas";

// Sized for the 640px column: no per-skill labels (they'd be ~6px), so the
// centre names whatever is hovered or selected instead.
export function Wheel({
  mode,
  onSelect,
}: {
  mode: Mode;
  onSelect: (id: string) => void;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const shown: Mode = hover ? { type: "skill", id: hover } : mode;
  const focus = focusOf(shown);
  // Lit links are drawn last so they sit on top of the dimmed ones.
  const order = links
    .map((_, i) => i)
    .sort((a, b) => Number(focus.links.has(a)) - Number(focus.links.has(b)));
  const [name, caption] =
    shown.type === "skill"
      ? [
          skills[shown.id].name,
          `${skills[shown.id].links.length} connections · ${domainById[skills[shown.id].d].name}`,
        ]
      : shown.type === "domain"
        ? [domainById[shown.id].full, `${domainSkills[shown.id].length} skills`]
        : [STACKS[shown.i].name, `${STACKS[shown.i].ids.length} skill stack`];

  return (
    <svg
      viewBox="-385 -385 770 770"
      role="group"
      aria-label="Skill wheel: skills grouped by domain, lines show how they strengthen each other"
      className="wheel block h-auto w-full"
    >
      {arcs.map((a) => (
        <g key={a.d} data-d={a.d}>
          <path className="arc" d={a.arc} />
          <path id={`dp-${a.d}`} d={a.label} fill="none" />
          <text className="dlabel">
            <textPath href={`#dp-${a.d}`} startOffset="50%" textAnchor="middle">
              {a.name}
            </textPath>
          </text>
        </g>
      ))}

      <g>
        {order.map((i) => (
          <path
            key={i}
            className={focus.links.has(i) ? "link on" : "link"}
            data-d={skills[links[i].a].d}
            d={linkPaths[i]}
          />
        ))}
      </g>

      <text className="center-t" y={-4}>
        {name}
      </text>
      <text className="center-s" y={30}>
        {caption}
      </text>

      <g>
        {Object.values(skills).map((s) => {
          const cls = [
            "node",
            focus.nodes.has(s.id) && "on",
            mode.type === "skill" && mode.id === s.id && "sel",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <g
              key={s.id}
              className={cls}
              data-d={s.d}
              tabIndex={0}
              role="button"
              aria-label={s.name}
              aria-pressed={mode.type === "skill" && mode.id === s.id}
              onClick={() => onSelect(s.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(s.id);
                }
              }}
              onMouseEnter={() => setHover(s.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(s.id)}
              onBlur={() => setHover(null)}
            >
              {/* Invisible, larger target: the dots alone are a few px wide. */}
              <circle
                className="hit"
                cx={s.x.toFixed(1)}
                cy={s.y.toFixed(1)}
                r={9}
              />
              <circle
                cx={s.x.toFixed(1)}
                cy={s.y.toFixed(1)}
                r={nodeLayout(s).r.toFixed(1)}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
