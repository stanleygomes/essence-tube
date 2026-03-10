import { and, eq, gt } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/database-client.js";
import { verification_codes } from "../schemas/database/index.js";

export class VerificationCodeRepository {
  async create(email: string, code: string, expiresAt: Date): Promise<void> {
    await db.insert(verification_codes).values({
      id: uuidv4(),
      email,
      code,
      expires_at: expiresAt,
      created_at: new Date(),
    });
  }

  async findValid(email: string, code: string): Promise<{ id: string } | null> {
    const now = new Date();
    const result = await db
      .select({ id: verification_codes.id })
      .from(verification_codes)
      .where(
        and(
          eq(verification_codes.email, email),
          eq(verification_codes.code, code),
          eq(verification_codes.used, false),
          gt(verification_codes.expires_at, now),
        ),
      )
      .limit(1);
    return result[0] ?? null;
  }

  async markUsed(id: string): Promise<void> {
    await db
      .update(verification_codes)
      .set({ used: true })
      .where(eq(verification_codes.id, id));
  }
}
