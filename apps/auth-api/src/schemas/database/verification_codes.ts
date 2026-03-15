import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const verification_codes = pgTable("verification_codes", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  code: text("code").notNull(),
  expires_at: timestamp("expires_at", { mode: "date" }).notNull(),
  used: boolean("used").notNull().default(false),
  created_at: timestamp("created_at", { mode: "date" }),
});
