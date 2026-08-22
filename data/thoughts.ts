export interface Thought {
  /** Stable id, also used as the anchor for permalinks. */
  id: string;
  /** ISO 8601 timestamp. */
  date: string;
  /** Plain text. Blank lines and single newlines are preserved as written. */
  body: string;
  tags?: string[];
}

/** Newest first — the feed renders these in array order. */
export const thoughts: Thought[] = [
  {
    id: "2026-08-22-native-scroll",
    date: "2026-08-22T09:20:00Z",
    body: "Ripped a smooth-scroll library out of my site today.\n\nIt hijacked the wheel, ran a permanent rAF loop, and pushed scrolling onto the main thread. One line of CSS replaced it.",
    tags: ["perf", "css"],
  },
  {
    id: "2026-08-22-clipping",
    date: "2026-08-22T08:05:00Z",
    body: "overflow-x: auto quietly forces overflow-y to compute to a non-visible value.\n\nSpent a while wondering why a tooltip kept getting clipped by a container I never told to clip anything.",
    tags: ["css"],
  },
  {
    id: "2026-08-21-hello",
    date: "2026-08-21T18:30:00Z",
    body: "Starting a place for the short stuff — the things that aren't worth a blog post but are worth writing down.",
  },
];
