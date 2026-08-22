import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const thoughts = pgTable("thoughts", {
  /** Slug used in the permalink anchor. */
  id: varchar("id", { length: 128 }).primaryKey(),
  body: text("body").notNull(),
  /** Absolute image URLs (pbs.twimg.com for anything pulled from X). */
  images: text("images").array().notNull().default([]),
  tags: text("tags").array().notNull().default([]),
  /** Original post on X, when the thought started life as a tweet. */
  source: text("source"),
  postedAt: timestamp("posted_at", { withTimezone: true }).notNull(),
  likes: integer("likes").notNull().default(0),
});

export type ThoughtRow = typeof thoughts.$inferSelect;
