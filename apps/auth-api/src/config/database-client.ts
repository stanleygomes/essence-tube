import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "../schemas/database/index.js";
import { config } from "./environment.js";
import { PinoLogger } from "./pino.logger.js";

const sqlite = new Database(config.database.path);
export const db = drizzle(sqlite, { schema });

const logger = PinoLogger.getLogger();

export function runMigrations() {
  logger.info("Running database migrations...");
  migrate(db, { migrationsFolder: config.database.migrationsFolder });
  logger.info("Database migrations completed");
}
