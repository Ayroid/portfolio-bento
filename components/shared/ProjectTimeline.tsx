import { ProjectTimelineStage } from "@/types";

interface ProjectTimelineProps {
  stages: ProjectTimelineStage[];
}

export function ProjectTimeline({ stages }: ProjectTimelineProps) {
  return (
    <ol>
      {stages.map((stage) => (
        <li
          key={stage.label}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-t border-white/[0.06] py-3"
        >
          <div>
            <p
              className={
                stage.completed ? "text-neutral-100" : "text-neutral-500"
              }
            >
              {stage.label}
            </p>
            <p className="text-[13px] text-neutral-500">{stage.tooltip}</p>
          </div>
          <span className="text-[13px] text-neutral-500 tabular-nums">
            {stage.completed ? (stage.date ?? "Done") : "Upcoming"}
          </span>
        </li>
      ))}
    </ol>
  );
}
