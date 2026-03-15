import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const prompt_logs = sqliteTable("prompt_logs", {
  id: text("id").primaryKey(),
  user_id: text("user_id").notNull(),
  user_email: text("user_email").notNull(),
  prompt: text("prompt").notNull(),
  response: text("response").notNull(),
  created_at: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});
