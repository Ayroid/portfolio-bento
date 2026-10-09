import { pill } from "@/components/shared/Section";
import { DOMAINS, STACKS } from "@/data/atlas";
import {
  domainById,
  domainSkills,
  skills,
  stackLinks,
  stacksOf,
  type Mode,
} from "@/lib/atlas";
import { SkillGuide, h3 } from "./SkillGuide";

function Row({
  id,
  title,
  note,
  onClick,
}: {
  id: string;
  title: string;
  note: string;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        data-d={skills[id].d}
        className="grid w-full cursor-pointer grid-cols-[8px_minmax(0,1fr)] items-baseline gap-x-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-white/[0.04]"
      >
        <span className="c-dot" />
        <span className="text-neutral-100">{title}</span>
        <span className="col-start-2 text-[13px] leading-snug text-neutral-500">
          {note}
        </span>
      </button>
    </li>
  );
}

const kicker =
  "flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider";
const title = "mt-2 mb-2 text-2xl text-neutral-100";
const order = DOMAINS.map((d) => d.id);

// What the wheel's current selection means, and where to go from it.
export function Panel({
  mode,
  onMode,
}: {
  mode: Mode;
  onMode: (m: Mode) => void;
}) {
  const go = (id: string) => () => onMode({ type: "skill", id });

  if (mode.type === "skill") {
    const s = skills[mode.id];
    const related = [...s.links].sort(
      (a, b) => order.indexOf(skills[a.to].d) - order.indexOf(skills[b.to].d)
    );
    const stacks = stacksOf(s.id);
    return (
      <div data-d={s.d}>
        <div className={`${kicker} c-text`}>
          <span className="c-dot" />
          {domainById[s.d].full}
        </div>
        <h2 className={title}>{s.name}</h2>
        <p className="text-neutral-400">{s.desc}</p>
        <SkillGuide skill={s} />
        {stacks.length > 0 && (
          <>
            <h3 className={h3}>Part of these stacks</h3>
            <div className="flex flex-wrap gap-1.5">
              {stacks.map((st) => (
                <button
                  key={st.name}
                  className={`${pill} cursor-pointer`}
                  onClick={() => onMode({ type: "stack", i: st.i })}
                >
                  {st.name}
                </button>
              ))}
            </div>
          </>
        )}
        <h3 className={h3}>Complements {related.length} skills</h3>
        <ul>
          {related.map((l) => (
            <Row
              key={l.to}
              id={l.to}
              title={skills[l.to].name}
              note={l.reason}
              onClick={go(l.to)}
            />
          ))}
        </ul>
      </div>
    );
  }

  if (mode.type === "domain") {
    const d = domainById[mode.id];
    return (
      <div data-d={d.id}>
        <div className={`${kicker} c-text`}>
          <span className="c-dot" />
          Domain
        </div>
        <h2 className={title}>{d.full}</h2>
        <p className="text-neutral-400">{d.desc}</p>
        <h3 className={h3}>{domainSkills[d.id].length} skills</h3>
        <ul>
          {domainSkills[d.id].map((t) => (
            <Row
              key={t.id}
              id={t.id}
              title={t.name}
              note={t.desc}
              onClick={go(t.id)}
            />
          ))}
        </ul>
      </div>
    );
  }

  const st = STACKS[mode.i];
  const inner = stackLinks(mode.i);
  return (
    <div>
      <div className={`${kicker} text-neutral-400`}>Skill stack</div>
      <h2 className={title}>{st.name}</h2>
      <p className="text-neutral-400">{st.desc}</p>
      <h3 className={h3}>The skills</h3>
      <ul>
        {st.ids.map((id) => (
          <Row
            key={id}
            id={id}
            title={skills[id].name}
            note={skills[id].desc}
            onClick={go(id)}
          />
        ))}
      </ul>
      <h3 className={h3}>Why they compound ({inner.length} links)</h3>
      <ul>
        {inner.map((l) => (
          <Row
            key={`${l.a}-${l.b}`}
            id={l.a}
            title={`${skills[l.a].name} + ${skills[l.b].name}`}
            note={l.reason}
            onClick={go(l.a)}
          />
        ))}
      </ul>
    </div>
  );
}
