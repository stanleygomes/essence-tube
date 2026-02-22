import { Token } from '../../../../domain/entities/token.entity.js';
import { BusinessError } from '../../../../domain/errors/BusinessError.js';
import { GoogleTokenResponse } from '../responses/google-token.response.js';

export class TokenMapper {
  static toEntity(response: GoogleTokenResponse): Token {
    if (!response || !response.access_token || !response.refresh_token || !response.expires_in) {
      const responseJson = JSON.stringify(response)
      throw new BusinessError(`Response token invalid: ${responseJson}`)
    }

    return {
      uuid: response.uuid,
      access_token: response.access_token,
      expires_in: response.expires_in,
      scope: response.scope,
      token_type: response.token_type,
      refresh_token: response.refresh_token,
      refresh_token_expires_in: response.refresh_token_expires_in,
      created_at: response.created_at,
    };
  }

  static toDocument(entity: Token): GoogleTokenResponse {
    return {
      uuid: entity.uuid,
      access_token: entity.access_token,
      expires_in: entity.expires_in,
      scope: entity.scope,
      token_type: entity.token_type,
      refresh_token: entity.refresh_token,
      refresh_token_expires_in: entity.refresh_token_expires_in,
      created_at: entity.created_at,
    };
  }
}
