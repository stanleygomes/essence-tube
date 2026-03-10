import { eq } from "drizzle-orm";
import { db } from "../config/database-client.js";
import { oauth_clients } from "../schemas/database/index.js";
import { OAuthClient } from "../types/oauth-client.entity.js";

export class OAuthClientRepository {
  async findByClientId(clientId: string): Promise<OAuthClient | null> {
    const result = await db
      .select()
      .from(oauth_clients)
      .where(eq(oauth_clients.client_id, clientId))
      .limit(1);
    return result[0] ?? null;
  }

  async create(client: Omit<OAuthClient, "id">): Promise<OAuthClient> {
    const result = await db.insert(oauth_clients).values(client).returning();
    if (!result[0]) throw new Error("OAuth client creation failed");
    return result[0];
  }
}
