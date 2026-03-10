import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  created_at: integer("created_at", { mode: "timestamp" }),
  updated_at: integer("updated_at", { mode: "timestamp" }),
});
