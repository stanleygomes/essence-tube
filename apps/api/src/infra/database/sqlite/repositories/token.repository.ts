import { eq } from "drizzle-orm";
import { Token } from "../../../../domain/entities/token.entity.js";
import { TokenMapper } from "../mappers/token.mapper.js";
import { BusinessError } from "../../../../domain/errors/BusinessError.js";
import { Logger } from "../../../logger/pino.logger.js";
import type { TokenRepository } from "../../../../domain/port/databases/token.repository.js";
import { tokens } from "../schemas/token.schema.js";
import { connectSQLite } from "../connection.js";

export class TokenSQLiteRepository implements TokenRepository {
  private db = connectSQLite();
  private readonly logger = Logger.getLogger();

  async getTokenByUUID(uuid: string): Promise<Token | null> {
    try {
      const rows = this.db
        .select()
        .from(tokens)
        .where(eq(tokens.uuid, uuid));
      const row = rows.get();

      return row ? TokenMapper.toEntity(row) : null;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError("Error retrieving token from database");
    }
  }

  async createToken(token: Token): Promise<Token> {
    try {
      const row = TokenMapper.toRow(token);
      this.db.insert(tokens).values(row).run();
      return token;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError("Error creating token in database");
    }
  }

  async updateTokenByUUID(token: Token, uuid: string): Promise<Token> {
    try {
      const row = TokenMapper.toRow(token);
      this.db.update(tokens).set(row).where(eq(tokens.uuid, uuid)).run();
      return token;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError("Error updating token in database");
    }
  }
}
