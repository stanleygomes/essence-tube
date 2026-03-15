import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  created_at: timestamp("created_at", { mode: "date" }),
  updated_at: timestamp("updated_at", { mode: "date" }),
});
