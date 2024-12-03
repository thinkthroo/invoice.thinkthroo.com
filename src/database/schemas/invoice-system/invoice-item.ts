import {
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { invoices } from "./invoice";
import { createInsertSchema } from "drizzle-zod";

export const invoiceItems = pgTable("invoice_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  invoice_id: uuid("invoice_id").references(() => invoices.id),
  description: text("description").notNull(),
  quantity: integer("quantity").notNull().default(1),
  unit_price: numeric("unit_price").notNull(),
  total_price: numeric("total_price").default("0"),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertInvoiceItemSchema = createInsertSchema(invoiceItems);

export type NewInvoiceItem = typeof invoiceItems.$inferInsert;
export type TInvoiceItem = typeof invoiceItems.$inferSelect;
