import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import * as schema from "../schemas/database/index.js";
import { config } from "./environment.js";
import { PinoLogger } from "./pino.logger.js";

const pool = new Pool({
  connectionString: config.database.url,
});

export const db = drizzle(pool, { schema });

const logger = PinoLogger.getLogger();

export function runMigrations() {
  logger.info("Running database migrations...");
  migrate(db, { migrationsFolder: config.database.migrationsFolder });
  logger.info("Database migrations completed");
}
