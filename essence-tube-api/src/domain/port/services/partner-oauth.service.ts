import { Token } from '../../entities/token.entity.js';

export interface PartnerOAuthService {
  getToken(authCode: string): Promise<Token>;
  refreshToken(token: string): Promise<Token>;
  buildUrlConsent(): string;
}
