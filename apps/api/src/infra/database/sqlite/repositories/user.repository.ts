import { eq } from "drizzle-orm";
import { BusinessError } from "../../../../domain/errors/BusinessError.js";
import type { User } from "../../../../domain/entities/user.entity.js";
import { UserMapper } from "../mappers/user.mapper.js";
import { Logger } from "../../../logger/pino.logger.js";
import type { UserRepository } from "../../../../domain/port/databases/user.repository.js";
import { users } from "../schemas/user.schema.js";
import { connectSQLite } from "../connection.js";

export class UserSQLiteRepository implements UserRepository {
  private db = connectSQLite();
  private logger = Logger.getLogger();

  async getUserByUUID(uuid: string): Promise<User | null> {
    try {
      const rows = this.db.select().from(users).where(eq(users.uuid, uuid));
      const row = rows.get();

      return row ? UserMapper.toEntity(row) : null;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError("Error retrieving user by uuid from database");
    }
  }

  async getUserByPartnerId(partnerId: string): Promise<User | null> {
    try {
      const rows = this.db
        .select()
        .from(users)
        .where(eq(users.partner_id, partnerId));
      const row = rows.get();

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
      const row = UserMapper.toRow(user);
      this.db.insert(users).values(row).run();
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError("Error creating user to database");
    }
  }

  async updateUserByUUID(user: User, uuid: string): Promise<User> {
    try {
      const row = UserMapper.toRow(user);
      this.db.update(users).set(row).where(eq(users.uuid, uuid)).run();
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError("Error updating user to database");
    }
  }
}
