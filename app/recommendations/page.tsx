import Image from "next/image";
import {
  PageHeader,
  Section,
  row,
  rowTitle,
} from "@/components/shared/Section";
import { recommendationsData } from "@/data/recommendations";

const categories = [...new Set(recommendationsData.map((rec) => rec.category))];

export default function RecommendationsPage() {
  return (
    <>
      <PageHeader
        title="Media"
        description="YouTube channels, podcasts and other things worth your time."
      />

      {categories.map((category) => (
        <Section key={category} label={category.toLowerCase()}>
          {recommendationsData
            .filter((rec) => rec.category === category)
            .map((rec) => (
              <a
                key={rec.id}
                href={rec.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${row} grid-cols-[minmax(0,1fr)_auto] items-baseline sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)_auto]`}
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  {rec.icon && (
                    <Image
                      src={rec.icon}
                      alt=""
                      width={16}
                      height={16}
                      className="shrink-0 rounded-full object-cover"
                    />
                  )}
                  <span className={`truncate ${rowTitle}`}>{rec.name}</span>
                </span>
                <span className="hidden truncate text-neutral-400 sm:block">
                  {rec.description}
                </span>
                <span className="text-neutral-600">↗</span>
              </a>
            ))}
        </Section>
      ))}
    </>
  );
}
