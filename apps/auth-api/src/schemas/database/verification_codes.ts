import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const verification_codes = sqliteTable("verification_codes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  code: text("code").notNull(),
  expires_at: integer("expires_at", { mode: "timestamp" }).notNull(),
  used: integer("used", { mode: "boolean" }).notNull().default(false),
  created_at: integer("created_at", { mode: "timestamp" }),
});
