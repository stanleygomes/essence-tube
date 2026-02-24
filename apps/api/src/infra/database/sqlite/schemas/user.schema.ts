import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  uuid: text("uuid").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  photo_url: text("photo_url").notNull(),
  partner_id: text("partner_id").notNull(),
  partner_token: text("partner_token").notNull(),
  created_at: text("created_at"),
  updated_at: text("updated_at"),
});
