import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const oauth_clients = sqliteTable("oauth_clients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  client_id: text("client_id").notNull().unique(),
  client_secret_hash: text("client_secret_hash").notNull(),
  name: text("name").notNull(),
  created_at: integer("created_at", { mode: "timestamp" }),
});
