export interface Thought {
  /** Stable id, also used as the anchor for permalinks. */
  id: string;
  /** ISO 8601 timestamp. */
  date: string;
  /** Plain text. Blank lines and single newlines are preserved as written. */
  body: string;
  /** Paths under /public, rendered below the body. */
  images?: string[];
  tags?: string[];
  /** Original post on X, when the thought started life as a tweet. */
  source?: string;
}

/** Newest first — the feed renders these in array order. */
export const thoughts: Thought[] = [
  {
    id: "finding-the-truth",
    date: "2026-08-21T00:00:00Z",
    body: "If something changes then it's not true.\nLife if all about finding the truth & recognising yourself & getting what you want out of it",
    tags: ["life"],
    source: "https://x.com/ayroids/status/2090879722943398324",
  },
  {
    id: "amazing-people",
    date: "2026-08-20T00:00:00Z",
    body: "Honestly, you meet amazing people at unexpected yet at the right times when you need their wise mindset and thoughts.",
    tags: ["life"],
    source: "https://x.com/ayroids/status/2090499856095904023",
  },
  {
    id: "everything-uncertain",
    date: "2026-08-06T00:00:00Z",
    body: "When everything is uncertain\nYou're free to do anything",
    tags: ["life"],
    source: "https://x.com/ayroids/status/2085334070805033147",
  },
  {
    id: "build-a-routine",
    date: "2026-08-04T00:00:00Z",
    body: "If you don't build a routine for yourself, you'll be assigned one.",
    tags: ["life"],
    source: "https://x.com/ayroids/status/2084681151105712394",
  },
  {
    id: "excess-of-resources",
    date: "2026-07-15T00:00:00Z",
    body: "The problem of today is the excess of resources which end up being the source of chaos, let alone help",
    tags: ["life"],
    source: "https://x.com/ayroids/status/2077436616982069550",
  },
  {
    id: "tight-deadline",
    date: "2026-02-25T00:00:00Z",
    body: "This and the next week are way too much work with a tight deadline at work, yesterday I had to work 9 hours onsite and a 30 min call after the day at home & same would continue for today and coming days\n\nThis is a huge learning opportunity and hopefully will apply these principles to the side projects which would be on hold for a while now",
    tags: ["work"],
    source: "https://x.com/ayroids/status/2026496444723769448",
  },
  {
    id: "break-from-tech-life",
    date: "2025-09-27T16:22:22Z",
    body: 'Today, I took a break from tech life\n\nInstead, I spent the time at home, living as carefree as a child without any thoughts of office work or personal projects.\n\nToday, I completed the "Show your work" book & attached the learnings from it below in their raw form. If you spend time reading through, do share your views :)',
    images: [
      "/thoughts/show-your-work-1.jpg",
      "/thoughts/show-your-work-2.jpg",
    ],
    tags: ["life", "books"],
    source: "https://x.com/ayroids/status/1971973700531679546",
  },
  {
    id: "the-lonely-chapter",
    date: "2025-09-20T15:28:16Z",
    body: "23, living away from home, working a full-time job—I've learnt a lot about myself.\n\nOne thing I've realised: I'm alone in my mindset, thoughts, and views on life. I don't really connect with people my age, which often leaves me out. So I started embracing it by eating alone at work, evening walks with nothing but thoughts or podcasts, and today, watching a movie alone in a mall far away from my residence.\n\nIt's not loneliness. It's the realisation that the more serious and real you get about life, the fewer people relate to you.\n\nThe Lonely Chapter!",
    tags: ["life"],
    source: "https://x.com/ayroids/status/1969423373185765639",
  },
  {
    id: "third-year-notes",
    date: "2025-07-26T06:26:06Z",
    body: "Found these 3rd year notes\nI was a different beast back then\n\nStudied during the day, implemented at the nights!\n\nTruly building silently!",
    images: ["/thoughts/third-year-notes.jpg"],
    tags: ["life"],
    source: "https://x.com/ayroids/status/1948993210585403486",
  },
];
