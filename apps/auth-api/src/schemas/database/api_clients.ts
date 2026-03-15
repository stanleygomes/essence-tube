import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const api_clients = pgTable("api_clients", {
  id: serial("id").primaryKey(),
  uuid: text("uuid").notNull().unique(),
  client_id: text("client_id").notNull().unique(),
  client_secret_hash: text("client_secret_hash").notNull(),
  name: text("name").notNull(),
  created_at: timestamp("created_at", { mode: "date" }),
});
