import { LEVELS, type Skill } from "@/lib/atlas";

export const h3 =
  "mt-6 mb-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500";

// The full guide for one skill, shared by the guide cards and the wheel's panel.
export function SkillGuide({ skill: s }: { skill: Skill }) {
  return (
    <div className="leading-relaxed text-neutral-300">
      <h3 className={h3}>Why it matters now</h3>
      <p className="c-border border-l-2 pl-3">{s.why}</p>

      <h3 className={h3}>In depth</h3>
      <p>{s.about}</p>

      <h3 className={h3}>How to learn it</h3>
      <ul className="c-marker list-disc space-y-1.5 pl-5">
        {s.how.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>

      <h3 className={h3}>Practice plan</h3>
      <ol className="c-border space-y-3 border-l-2 pl-4">
        {s.levels.map((x, i) => (
          <li key={LEVELS[i][0]}>
            <span className="block text-neutral-100">
              {LEVELS[i][0]}{" "}
              <span className="font-mono text-[11px] text-neutral-500">
                {LEVELS[i][1]}
              </span>
            </span>
            {x}
          </li>
        ))}
      </ol>

      <h3 className={h3}>Do this today</h3>
      <p>{s.start}</p>

      <div className="grid gap-x-6 sm:grid-cols-2">
        <div>
          <h3 className={h3}>Signs you&apos;re improving</h3>
          <p>{s.signs}</p>
        </div>
        <div>
          <h3 className={h3}>Common trap</h3>
          <p>{s.trap}</p>
        </div>
      </div>
    </div>
  );
}
