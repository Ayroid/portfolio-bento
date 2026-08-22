import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

// One connection per process. Serverless invocations are short-lived, so the
// pool stays small; `prepare: false` keeps this compatible with poolers
// (Neon/Supabase pgbouncer) that don't support prepared statements.
const client = postgres(url, { max: 1, prepare: false });

export const db = drizzle(client, { schema });
export { schema };
