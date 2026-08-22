import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { db, schema } from "@/db";

/** Bumps a thought's like count and returns the new total. */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // A single atomic UPDATE, so concurrent likes can't clobber each other.
  const [row] = await db
    .update(schema.thoughts)
    .set({ likes: sql`${schema.thoughts.likes} + 1` })
    .where(eq(schema.thoughts.id, id))
    .returning({ likes: schema.thoughts.likes });

  if (!row) {
    return NextResponse.json({ error: "No such thought" }, { status: 404 });
  }

  // Drop the cached feed so the next visitor sees the new count rather than a
  // snapshot from up to `revalidate` seconds ago.
  revalidatePath("/thoughts");

  return NextResponse.json({ likes: row.likes });
}
