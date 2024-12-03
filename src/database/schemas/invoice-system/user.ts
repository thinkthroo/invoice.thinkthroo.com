import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "viewer"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  role: roleEnum("role").notNull(),
  password_hash: text("password_hash"),
  created_at: timestamp("created_at").defaultNow(),
});
