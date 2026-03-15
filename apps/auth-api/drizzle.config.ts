import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schemas/database/index.ts",
  out: "./src/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      "postgres://postgres:postgres@localhost:5432/auth_api",
  },
} satisfies Config;
