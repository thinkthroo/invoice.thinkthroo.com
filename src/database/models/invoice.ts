import { serverDB } from "@/database/core/db";
import { desc, eq } from "drizzle-orm";
import {
  TInvoice,
  NewInvoice,
  invoices,
} from "@/database/schemas/invoice-system";

export class InvoiceModel {
  private userId: string | undefined | null;

  constructor(userId: string | undefined | null) {
    this.userId = userId;
  }

  async query({ current = 0, pageSize = 9999 } = {}) {
    const offset = current * pageSize;

    return serverDB.query.invoices.findMany({
      limit: pageSize,
      offset,
      orderBy: [desc(invoices.created_at)],
    });
  }

  async getById(id: string): Promise<TInvoice | null> {
    const invoice = await serverDB.query.invoices.findFirst({
      where: eq(invoices.id, id),
    });
    return invoice || null;
  }

  async create(data: NewInvoice): Promise<TInvoice> {
    const [newInvoice] = await serverDB
      .insert(invoices)
      .values(data)
      .returning();
    return newInvoice;
  }

  async update(id: string, data: Partial<TInvoice>) {
    return await serverDB.update(invoices).set(data).where(eq(invoices.id, id));
  }

  async delete(invoiceId: string) {
    return serverDB.delete(invoices).where(eq(invoices.id, invoiceId));
  }
}
