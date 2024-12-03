import {
  date,
  numeric,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { invoices } from "./invoice";
import { createInsertSchema } from "drizzle-zod";

export const paymentMethodEnum = pgEnum("payment_method", [
  "credit_card",
  "bank_transfer",
]);

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  invoice_id: uuid("invoice_id").references(() => invoices.id),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  payment_date: date("payment_date").defaultNow(),
  payment_method: paymentMethodEnum("payment_method").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertPaymentSchema = createInsertSchema(payments);

export type NewPayment = typeof payments.$inferInsert;
export type TPayment = typeof payments.$inferSelect;
