import { eq } from "drizzle-orm";
import { db } from "../config/database-client.js";
import { users } from "../schemas/database/index.js";
import { User } from "../types/user.entity.js";

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    return result[0] ?? null;
  }

  async create(user: User): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    if (!result[0]) throw new Error("User creation failed");
    return result[0];
  }
}
