import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { sql } from "drizzle-orm";
import * as schema from "../schemas/database/index.js";
import { config } from "./environment.js";
import { PinoLogger } from "./pino.logger.js";

const logger = PinoLogger.getLogger();

const client = createClient({
  url: config.database.url,
  authToken: config.database.authToken,
});

export const db = drizzle(client, { schema });

export async function ensureDatabaseSchema() {
  logger.info("Ensuring revelation database schema...");

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS prompt_logs (
      id TEXT PRIMARY KEY NOT NULL,
      user_id TEXT NOT NULL,
      user_email TEXT NOT NULL,
      prompt TEXT NOT NULL,
      response TEXT NOT NULL,
      created_at INTEGER NOT NULL
    )
  `);

  logger.info("Revelation database schema is ready");
}
