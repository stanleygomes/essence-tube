import { RedisRepository } from "../repository.js";
import { TokenModel } from "../models/token.model.js";
import { Token } from "../../../../domain/entities/token.entity.js";
import { TokenMapper } from "../mappers/token.mapper.js";
import { BusinessError } from "../../../../domain/errors/BusinessError.js";
import { Logger } from "../../../logger/pino.logger.js";
import type { TokenRepository } from "../../../../domain/port/databases/token.repository.js";

export class TokenRedisRepository implements TokenRepository {
  private readonly tokenRepository: RedisRepository<TokenModel>;
  private readonly logger = Logger.getLogger();

  constructor() {
    this.tokenRepository = new RedisRepository<TokenModel>("token");
  }

  async getTokenByUUID(uuid: string): Promise<Token | null> {
    try {
      const doc = await this.tokenRepository.findOne(uuid);
      return doc ? TokenMapper.toEntity(doc) : null;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError("Error retrieving token from database");
    }
  }

  async createToken(token: Token): Promise<Token> {
    try {
      const doc = TokenMapper.toModel(token);
      await this.tokenRepository.create(doc.uuid, doc);
      return token;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError("Error creating token in Redis");
    }
  }

  async updateTokenByUUID(token: Token, uuid: string): Promise<Token> {
    try {
      const doc = TokenMapper.toModel(token);
      await this.tokenRepository.update(uuid, doc);
      return token;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError("Error updating token in Redis");
    }
  }
}
