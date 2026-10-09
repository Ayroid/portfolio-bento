import { pill, row, rowTitle } from "@/components/shared/Section";
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

// A hairline row like every other list on the site: dot + name, note beneath.
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
    <button
      onClick={onClick}
      data-d={skills[id].d}
      className={`${row} w-full cursor-pointer grid-cols-[8px_minmax(0,1fr)] items-baseline gap-x-3 gap-y-1 text-left`}
    >
      <span className="c-dot -translate-y-px" />
      <span className={rowTitle}>{title}</span>
      <span className="col-start-2 text-neutral-500">{note}</span>
    </button>
  );
}

const heading = "text-xl text-neutral-100";
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
        <h2 className={heading}>{s.name}</h2>
        <p className="mt-1 text-neutral-500">
          <span className="c-text">{domainById[s.d].full}</span> · {s.desc}
        </p>
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
        <div>
          {related.map((l) => (
            <Row
              key={l.to}
              id={l.to}
              title={skills[l.to].name}
              note={l.reason}
              onClick={go(l.to)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (mode.type === "domain") {
    const d = domainById[mode.id];
    return (
      <div data-d={d.id}>
        <h2 className={heading}>{d.full}</h2>
        <p className="mt-1 text-neutral-500">{d.desc}</p>
        <h3 className={h3}>{domainSkills[d.id].length} skills</h3>
        <div>
          {domainSkills[d.id].map((t) => (
            <Row
              key={t.id}
              id={t.id}
              title={t.name}
              note={t.desc}
              onClick={go(t.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  const st = STACKS[mode.i];
  const inner = stackLinks(mode.i);
  return (
    <div>
      <h2 className={heading}>{st.name}</h2>
      <p className="mt-1 text-neutral-500">{st.desc}</p>
      <h3 className={h3}>The skills</h3>
      <div>
        {st.ids.map((id) => (
          <Row
            key={id}
            id={id}
            title={skills[id].name}
            note={skills[id].desc}
            onClick={go(id)}
          />
        ))}
      </div>
      <h3 className={h3}>Why they compound ({inner.length} links)</h3>
      <div>
        {inner.map((l) => (
          <Row
            key={`${l.a}-${l.b}`}
            id={l.a}
            title={`${skills[l.a].name} + ${skills[l.b].name}`}
            note={l.reason}
            onClick={go(l.a)}
          />
        ))}
      </div>
    </div>
  );
}
