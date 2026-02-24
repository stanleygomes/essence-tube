import { createClient } from "@libsql/client";
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import { config } from "../../config/index.js";
import { sql } from "drizzle-orm";

let db: LibSQLDatabase | null = null;

export async function connectSQLite(): Promise<LibSQLDatabase> {
  if (db) {
    return db;
  }

  const { url, authToken } = config.databases.turso;

  if (!url) {
    throw new Error("Turso database URL is not defined in config!");
  }

  const client = createClient({ url, authToken });

  db = drizzle(client);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS users (
      uuid TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      photo_url TEXT NOT NULL,
      partner_id TEXT NOT NULL,
      partner_token TEXT NOT NULL,
      created_at TEXT,
      updated_at TEXT
    )
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS tokens (
      uuid TEXT PRIMARY KEY,
      access_token TEXT NOT NULL,
      expires_in INTEGER NOT NULL,
      scope TEXT,
      token_type TEXT,
      refresh_token TEXT NOT NULL,
      refresh_token_expires_in INTEGER,
      created_at TEXT NOT NULL
    )
  `);

  return db;
}
