import Image from "next/image";
import {
  PageHeader,
  Section,
  row,
  rowTitle,
} from "@/components/shared/Section";
import { toolsData } from "@/data/tools";

const categories = [...new Set(toolsData.map((tool) => tool.category))];

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        title="Tools"
        description="Software I use every day to build things."
      />

      {categories.map((category) => (
        <Section key={category} label={category.toLowerCase()}>
          {toolsData
            .filter((tool) => tool.category === category)
            .map((tool) => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${row} grid-cols-[minmax(0,1fr)_auto] items-baseline sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)_auto]`}
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  {tool.icon && (
                    <Image
                      src={tool.icon}
                      alt=""
                      width={16}
                      height={16}
                      className="shrink-0 object-contain"
                    />
                  )}
                  <span className={`truncate ${rowTitle}`}>{tool.name}</span>
                </span>
                <span className="hidden truncate text-neutral-400 sm:block">
                  {tool.description}
                </span>
                <span className="text-neutral-600">↗</span>
              </a>
            ))}
        </Section>
      ))}
    </>
  );
}
