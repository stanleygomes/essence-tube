import { eq } from "drizzle-orm";
import { db } from "../config/database-client.js";
import { api_clients } from "../schemas/database/index.js";
import { ApiClient } from "../types/client.entity.js";

export class ClientRepository {
  async findByClientId(clientId: string): Promise<ApiClient | null> {
    const result = await db
      .select()
      .from(api_clients)
      .where(eq(api_clients.client_id, clientId))
      .limit(1);
    return result[0] ?? null;
  }

  async create(client: Omit<ApiClient, "id">): Promise<ApiClient> {
    const result = await db.insert(api_clients).values(client).returning();
    if (!result[0]) throw new Error("Failed to create API client: no result returned from database");
    return result[0];
  }
}
