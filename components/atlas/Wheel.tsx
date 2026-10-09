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

// Hovering a skill previews its connections; leaving falls back to the selection.
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
  const [count, caption] =
    shown.type === "skill"
      ? [skills[shown.id].links.length, "connections"]
      : shown.type === "domain"
        ? [domainSkills[shown.id].length, `${domainById[shown.id].name} skills`]
        : [STACKS[shown.i].ids.length, "skills in stack"];

  return (
    <svg
      viewBox="-580 -580 1160 1160"
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

      <text className="center-s" y={-14}>
        Skill Atlas
      </text>
      <text className="center-t" y={22}>
        {count}
      </text>
      <text className="center-s" y={48}>
        {caption}
      </text>

      <g>
        {Object.values(skills).map((s) => {
          const n = nodeLayout(s);
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
              onClick={() => onSelect(s.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(s.id);
                }
              }}
              onMouseEnter={() => setHover(s.id)}
              onMouseLeave={() => setHover(null)}
            >
              <circle
                cx={s.x.toFixed(1)}
                cy={s.y.toFixed(1)}
                r={n.r.toFixed(1)}
              />
              <text
                transform={n.transform}
                textAnchor={n.left ? "end" : "start"}
              >
                {s.name}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
