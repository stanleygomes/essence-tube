import { Token } from '../entities/token.entity.js';
import { BusinessError } from '../errors/BusinessError.js';

export class TokenFactory {
  static build(tokenResponse: Token, uuid: string, token?: string | null): Token {
    if (!tokenResponse || !tokenResponse.access_token) {
      throw new BusinessError('Invalid token response from Google. Absent access_token.');
    }
    if (!tokenResponse.refresh_token) {
      throw new BusinessError('Invalid token response from Google. Absent refresh_token.');
    }
    if (!tokenResponse.expires_in) {
      throw new BusinessError('Invalid token response from Google. Absent expires_in.');
    }

    return {
      uuid: uuid,
      access_token: tokenResponse.access_token,
      expires_in: tokenResponse.expires_in,
      scope: tokenResponse.scope,
      token_type: tokenResponse.token_type,
      refresh_token: token || tokenResponse.refresh_token,
      refresh_token_expires_in: tokenResponse.refresh_token_expires_in,
      created_at: new Date(),
    };
  }
}
