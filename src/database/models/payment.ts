import { serverDB } from "@/database/core/db";
import { eq, desc } from "drizzle-orm";
import {
  NewPayment,
  TPayment,
  payments,
} from "@/database/schemas/invoice-system/payment";

export class PaymentModel {
  private userId: string | undefined | null;

  constructor(userId: string | undefined | null) {
    this.userId = userId;
  }

  async getByInvoiceId(invoiceId: string, { current = 0, pageSize = 10 } = {}) {
    const offset = current * pageSize;
    return serverDB.query.payments.findMany({
      where: eq(payments.invoice_id, invoiceId),
      limit: pageSize,
      offset,
      orderBy: [desc(payments.created_at)],
    });
  }

  async getById(id: string): Promise<TPayment | null> {
    const payment = await serverDB.query.payments.findFirst({
      where: eq(payments.id, id),
    });
    return payment || null;
  }

  async create(data: NewPayment): Promise<TPayment> {
    const [newPayment] = await serverDB
      .insert(payments)
      .values(data)
      .returning();
    return newPayment;
  }

  async update(id: string, data: Partial<TPayment>) {
    return serverDB.update(payments).set(data).where(eq(payments.id, id));
  }

  async delete(id: string) {
    return serverDB.delete(payments).where(eq(payments.id, id));
  }
}
