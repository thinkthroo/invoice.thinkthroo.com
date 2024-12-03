import { serverDB } from "@/database/core/db";
import { eq, desc } from "drizzle-orm";
import {
  clients,
  NewClient,
  TClient,
} from "@/database/schemas/invoice-system/client";

export class ClientModel {
  private userId: string | undefined | null;

  constructor(userId: string | undefined | null) {
    this.userId = userId;
  }

  async getAll({ current = 0, pageSize = 10 } = {}) {
    const offset = current * pageSize;

    return serverDB.query.clients.findMany({
      limit: pageSize,
      offset,
      orderBy: [desc(clients.created_at)],
    });
  }

  async getById(id: string): Promise<TClient | null> {
    const client = await serverDB.query.clients.findFirst({
      where: eq(clients.id, id),
    });
    return client || null;
  }

  async create(data: NewClient): Promise<TClient> {
    const [newClient] = await serverDB.insert(clients).values(data).returning();
    return newClient;
  }

  async update(id: string, data: Partial<NewClient>) {
    await serverDB.update(clients).set(data).where(eq(clients.id, id));
  }

  async delete(id: string) {
    await serverDB.delete(clients).where(eq(clients.id, id));
  }
}
