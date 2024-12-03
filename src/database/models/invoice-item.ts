import { serverDB } from "@/database/core/db";
import { desc, eq } from "drizzle-orm";
import {
  invoiceItems,
  NewInvoiceItem,
  TInvoiceItem,
} from "@/database/schemas/invoice-system/invoice-item";

export class InvoiceItemModel {
  private userId: string | undefined | null;

  constructor(userId: string | undefined | null) {
    this.userId = userId;
  }

  async getByInvoiceId(invoiceId: string, { current = 0, pageSize = 10 } = {}) {
    const offset = current * pageSize;
    return serverDB.query.invoiceItems.findMany({
      where: eq(invoiceItems.invoice_id, invoiceId),
      limit: pageSize,
      offset,
      orderBy: [desc(invoiceItems.created_at)],
    });
  }

  async getById(id: string): Promise<TInvoiceItem | null> {
    const item = await serverDB.query.invoiceItems.findFirst({
      where: eq(invoiceItems.id, id),
    });
    return item || null;
  }

  async create(data: NewInvoiceItem): Promise<TInvoiceItem> {
    const [newItem] = await serverDB
      .insert(invoiceItems)
      .values(data)
      .returning();
    return newItem;
  }

  async update(id: string, data: Partial<TInvoiceItem>) {
    return serverDB
      .update(invoiceItems)
      .set(data)
      .where(eq(invoiceItems.id, id));
  }

  async delete(id: string) {
    return serverDB.delete(invoiceItems).where(eq(invoiceItems.id, id));
  }
}
