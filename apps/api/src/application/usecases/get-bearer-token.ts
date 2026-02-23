import { BusinessError } from '../../domain/errors/BusinessError.js';
import { Token } from '../../domain/entities/token.entity.js';
import { SaveRefreshTokenUseCase } from './save-refresh-token.js';
import { TokenRepository } from '../../domain/port/databases/token.repository.js';
import { AuthService } from '../../domain/port/auth/auth.service.js';
import { UserRepository } from '../../domain/port/databases/user.repository.js';

export class GetPartnerBearerTokenUseCase {
  constructor(
    private readonly saveRefreshToken: SaveRefreshTokenUseCase,
    private readonly tokenRepository: TokenRepository,
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(bearerToken: string): Promise<string> {
    if (!bearerToken) {
      throw new BusinessError('Session ID is required!');
    }
    
    const tokenPayload = this.getTokenPayload(bearerToken);
    const user = await this.userRepository.getUserByUUID(tokenPayload.uuid);

    if (!user || !user.partner_token) {
      throw new BusinessError(`User not found or partner token is missing for UUID: ${tokenPayload.uuid}`);
    }

    const sessionId = user.partner_token;
    const token = await this.tokenRepository.getTokenByUUID(sessionId) as Token | null;
    if (!token) {
      throw new BusinessError(`Token not found for the provided session ID: ${sessionId}`);
    }

    if (this.isTokenExpired(token)) {
      const newToken = await this.saveRefreshToken.execute(token.refresh_token, token.uuid);
      return newToken.access_token;
    }

    return token.access_token;
  }

  private isTokenExpired(token: Token): boolean {
    if (!token || !token.created_at || !token.expires_in) return true;
    const createdAt = new Date(token.created_at).getTime();
    const expiresInMs = token.expires_in * 1000;
    return Date.now() > (createdAt + expiresInMs - 60000);
  }

  private getTokenPayload(token: string): any {
    return this.authService.decodeTokenPayload(token);
  }
}
