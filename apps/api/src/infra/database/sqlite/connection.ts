import Database from "better-sqlite3";
import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { config } from "../../config/index.js";
import { sql } from "drizzle-orm";

let db: BetterSQLite3Database | null = null;

export function connectSQLite(): BetterSQLite3Database {
  if (db) {
    return db;
  }

  const { path } = config.databases.sqlite;

  if (!path) {
    throw new Error("SQLite path is not defined in config!");
  }

  const sqlite = new Database(path);
  sqlite.pragma("journal_mode = WAL");

  db = drizzle(sqlite);

  db.run(sql`
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

  db.run(sql`
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
