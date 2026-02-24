import type { Token } from "../../../../domain/entities/token.entity.js";
import type { tokens } from "../schemas/token.schema.js";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

type TokenRow = InferSelectModel<typeof tokens>;
type TokenInsert = InferInsertModel<typeof tokens>;

export class TokenMapper {
  static toEntity(row: TokenRow): Token {
    return {
      uuid: row.uuid,
      access_token: row.access_token,
      expires_in: row.expires_in,
      scope: row.scope ?? undefined,
      token_type: row.token_type ?? undefined,
      refresh_token: row.refresh_token,
      refresh_token_expires_in: row.refresh_token_expires_in ?? undefined,
      created_at: row.created_at,
    };
  }

  static toRow(entity: Token): TokenInsert {
    return {
      uuid: entity.uuid,
      access_token: entity.access_token,
      expires_in: entity.expires_in,
      scope: entity.scope,
      token_type: entity.token_type,
      refresh_token: entity.refresh_token,
      refresh_token_expires_in: entity.refresh_token_expires_in,
      created_at:
        typeof entity.created_at === "string"
          ? entity.created_at
          : entity.created_at.toISOString(),
    };
  }
}
