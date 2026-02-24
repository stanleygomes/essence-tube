import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const tokens = sqliteTable("tokens", {
  uuid: text("uuid").primaryKey(),
  access_token: text("access_token").notNull(),
  expires_in: integer("expires_in").notNull(),
  scope: text("scope"),
  token_type: text("token_type"),
  refresh_token: text("refresh_token").notNull(),
  refresh_token_expires_in: integer("refresh_token_expires_in"),
  created_at: text("created_at").notNull(),
});
