import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// Define Client Table Schema
export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  address: text("address"),
  created_at: timestamp("created_at").defaultNow(),
});

// Create Zod Validation Schema
export const insertClientSchema = createInsertSchema(clients);

// Define Types for TypeScript
export type NewClient = typeof clients.$inferInsert;
export type TClient = typeof clients.$inferSelect;
