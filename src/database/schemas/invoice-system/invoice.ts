import {
  date,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { clients } from "./client";

export const statusEnum = pgEnum("status", ["draft", "sent", "paid"]);

// https://orm.drizzle.team/docs/sql-schema-declaration#schemas

export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  client_id: uuid("client_id").references(() => clients.id),
  invoice_number: text("invoice_number").notNull(),
  status: statusEnum("status").notNull(),
  due_date: date("due_date"),
  total_amount: numeric("total_amount").default("0"),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertInvoiceSchema = createInsertSchema(invoices);

export type NewInvoice = typeof invoices.$inferInsert;
export type TInvoice = typeof invoices.$inferSelect;
