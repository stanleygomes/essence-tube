import { eq } from "drizzle-orm";
import { BusinessError } from "../../../../domain/errors/BusinessError.js";
import type { User } from "../../../../domain/entities/user.entity.js";
import { UserMapper } from "../mappers/user.mapper.js";
import { Logger } from "../../../logger/pino.logger.js";
import type { UserRepository } from "../../../../domain/port/databases/user.repository.js";
import { users } from "../schemas/user.schema.js";
import { connectSQLite } from "../connection.js";

export class UserSQLiteRepository implements UserRepository {
  private logger = Logger.getLogger();

  async getUserByUUID(uuid: string): Promise<User | null> {
    try {
      const db = await connectSQLite();
      const rows = await db
        .select()
        .from(users)
        .where(eq(users.uuid, uuid));

      const row = rows[0];
      return row ? UserMapper.toEntity(row) : null;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError("Error retrieving user by uuid from database");
    }
  }

  async getUserByPartnerId(partnerId: string): Promise<User | null> {
    try {
      const db = await connectSQLite();
      const rows = await db
        .select()
        .from(users)
        .where(eq(users.partner_id, partnerId));

      const row = rows[0];
      return row ? UserMapper.toEntity(row) : null;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError(
        "Error retrieving user by partner_id from database",
      );
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      const db = await connectSQLite();
      const row = UserMapper.toRow(user);
      await db.insert(users).values(row);
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError("Error creating user to database");
    }
  }

  async updateUserByUUID(user: User, uuid: string): Promise<User> {
    try {
      const db = await connectSQLite();
      const row = UserMapper.toRow(user);
      await db.update(users).set(row).where(eq(users.uuid, uuid));
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError("Error updating user to database");
    }
  }
}
