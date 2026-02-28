import Database from "better-sqlite3";
import { DownloadHistory } from "../../../domain/entities/download-history.entity.js";
import { DownloadHistoryRepository } from "../../../domain/port/databases/download-history.repository.js";
import { Logger } from "../../logger/pino.logger.js";
import { config } from "../../config/index.js";

export class SQLiteDownloadHistoryRepository implements DownloadHistoryRepository {
  private db: Database.Database;
  private logger = Logger.getLogger();

  constructor(dbPath = config.database.sqlite.path) {
    this.db = new Database(dbPath);
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS download_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        format TEXT NOT NULL,
        type TEXT NOT NULL,
        filename TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
      )
      .run();
  }

  save(entry: DownloadHistory): void {
    try {
      this.db
        .prepare(
          `INSERT INTO download_history (url, format, type, filename, created_at)
         VALUES (?, ?, ?, ?, datetime('now'))`,
        )
        .run(entry.url, entry.format, entry.type, entry.filename);
    } catch (error) {
      this.logger.error({ error, entry }, "Failed to save download history");
    }
  }

  findAll(): DownloadHistory[] {
    return this.db
      .prepare(
        `SELECT id, url, format, type, filename, created_at FROM download_history ORDER BY id DESC`,
      )
      .all() as DownloadHistory[];
  }
}
