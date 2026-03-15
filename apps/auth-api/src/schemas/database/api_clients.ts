import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const api_clients = sqliteTable("api_clients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  uuid: text("uuid").notNull().unique(),
  client_id: text("client_id").notNull().unique(),
  client_secret_hash: text("client_secret_hash").notNull(),
  name: text("name").notNull(),
  created_at: integer("created_at", { mode: "timestamp" }),
});
