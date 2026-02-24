import type { User } from "../../../../domain/entities/user.entity.js";
import type { users } from "../schemas/user.schema.js";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

type UserRow = InferSelectModel<typeof users>;
type UserInsert = InferInsertModel<typeof users>;

export class UserMapper {
  static toEntity(row: UserRow): User {
    return {
      uuid: row.uuid,
      name: row.name,
      email: row.email,
      photo_url: row.photo_url,
      partner_id: row.partner_id,
      partner_token: row.partner_token,
      created_at: row.created_at ? new Date(row.created_at) : undefined,
      updated_at: row.updated_at ? new Date(row.updated_at) : undefined,
    };
  }

  static toRow(entity: User): UserInsert {
    return {
      uuid: entity.uuid,
      name: entity.name,
      email: entity.email,
      photo_url: entity.photo_url,
      partner_id: entity.partner_id,
      partner_token: entity.partner_token,
      created_at: entity.created_at
        ? entity.created_at.toISOString()
        : undefined,
      updated_at: entity.updated_at
        ? entity.updated_at.toISOString()
        : undefined,
    };
  }
}
