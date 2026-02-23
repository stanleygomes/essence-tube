import { v4 as uuidv4 } from 'uuid';
import { Token } from '../../domain/entities/token.entity.js';
import { TokenFactory } from '../../domain/factories/token.factory.js';
import { TokenRepository } from '../../domain/port/databases/token.repository.js';

export class CreateTokenUseCase {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async execute(tokenResponse: Token): Promise<Token> {
    const uuid = uuidv4();
    const tokenObject = TokenFactory.build(tokenResponse, uuid);
    await this.tokenRepository.createToken(tokenObject);

    return tokenObject;
  }
}
