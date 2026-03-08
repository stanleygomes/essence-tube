import { User } from "../../../../domain/entities/user.entity.js";
import { UserRepository } from "../../../../domain/port/databases/user.repository.js";
import { getDb } from "../connection.js";

export class SqliteUserRepository implements UserRepository {
  findByEmail(email: string): User | null {
    return (getDb().prepare("SELECT * FROM users WHERE email = ?").get(email) as User) ?? null;
  }

  findByProvider(provider: string, providerId: string): User | null {
    return (
      (getDb()
        .prepare("SELECT * FROM users WHERE provider = ? AND provider_id = ?")
        .get(provider, providerId) as User) ?? null
    );
  }

  save(user: User): User {
    getDb()
      .prepare(
        `INSERT INTO users (id, name, email, photo_url, provider, provider_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(provider, provider_id) DO UPDATE SET
           name = excluded.name,
           email = excluded.email,
           photo_url = excluded.photo_url,
           updated_at = excluded.updated_at`,
      )
      .run(
        user.id,
        user.name,
        user.email,
        user.photo_url,
        user.provider,
        user.provider_id,
        user.created_at,
        user.updated_at,
      );

    return user;
  }
}
