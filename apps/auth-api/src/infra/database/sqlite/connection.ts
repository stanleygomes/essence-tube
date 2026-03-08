import Database from "better-sqlite3";
import { config } from "../../../config/environment.js";

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(config.database.sqlitePath);
    db.pragma("journal_mode = WAL");
    migrate(db);
  }

  return db;
}

function migrate(database: Database.Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT,
      photo_url TEXT,
      provider TEXT NOT NULL,
      provider_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(provider, provider_id)
    );

    CREATE TABLE IF NOT EXISTS verification_codes (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      code TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      used_at TEXT,
      created_at TEXT NOT NULL
    );
  `);
}
