"use client";

import { ProjectTimelineStage } from "@/types";
import { Rocket, Code, CheckCheck, Lightbulb } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProjectTimelineProps {
  stages: ProjectTimelineStage[];
}

export function ProjectTimeline({ stages }: ProjectTimelineProps) {
  return (
    <div className="w-full bg-surface-card">
      <div className="grid w-full grid-cols-2 md:grid-cols-4">
        {stages.map((stage, index) => (
          <div
            key={stage.label}
            className="flex w-full items-center border p-4 sm:p-6 md:p-8"
          >
            {/* Stage Circle */}
            <div className="flex w-full flex-col items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors sm:h-12 sm:w-12 ${
                      stage.completed
                        ? "border-green-500 text-white"
                        : "border-amber-500/50 bg-transparent text-amber-500/50"
                    }`}
                  >
                    {index === stages.length - 1 ? (
                      <Rocket className="h-5 w-5 sm:h-6 sm:w-6" />
                    ) : index === stages.length - 2 ? (
                      <Code className="h-5 w-5 sm:h-6 sm:w-6" />
                    ) : index === stages.length - 3 ? (
                      <CheckCheck className="h-5 w-5 sm:h-6 sm:w-6" />
                    ) : (
                      <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{stage.tooltip}</p>
                </TooltipContent>
              </Tooltip>
              <span
                className={`mt-2 text-sm font-medium sm:text-sm ${
                  stage.completed ? "text-zinc-300" : "text-zinc-500"
                }`}
              >
                {stage.label}
              </span>
              <span className={"text-xs text-zinc-300"}>
                {stage.date ? `[${stage.date}]` : "[xx-xxx-xxxx]"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
