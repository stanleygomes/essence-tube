import { BusinessError } from '../../domain/errors/BusinessError.js';
import { Logger } from '../../infra/logger/pino.logger.js';
import { PartnerOAuthService } from '../../domain/port/services/partner-oauth.service.js';
import { CreateTokenUseCase } from './create-token.js';
import { Token } from '../../domain/entities/token.entity.js';

export class GenerateAuthTokenUseCase {
  constructor(
    private readonly partnerOAuthService: PartnerOAuthService,
    private readonly createToken: CreateTokenUseCase
  ) {}

  private logger = Logger.getLogger();

  async execute(code: string): Promise<Token> {
    try {
      const tokenResponse = await this.partnerOAuthService.getToken(code);

      if (!tokenResponse || !tokenResponse.access_token) {
        throw new BusinessError('Failed to retrieve access token from Google');
      }

      return this.createToken.execute(tokenResponse);
    } catch (error: any) {
      this.logger.error(error);
      throw new BusinessError(`Error retrieving token: ${error.message}`);
    }
  }
}
