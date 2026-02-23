import { Token } from '../../entities/token.entity.js';

export interface TokenRepository {
  getTokenByUUID(uuid: string): Promise<Token | null>;
  createToken(token: Token): Promise<Token>;
  updateTokenByUUID(token: Token, uuid: string): Promise<Token>;
}
