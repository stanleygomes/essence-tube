import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schemas/database/index.ts",
  out: "./src/database/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_PATH || "./auth.db",
  },
} satisfies Config;
