import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schema.ts",
  out: "./src/database/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_PATH || "./auth.db",
  },
} satisfies Config;
