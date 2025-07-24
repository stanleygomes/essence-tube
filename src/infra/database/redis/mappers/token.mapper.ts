import { Token } from '../../../../domain/entities/token.entity.js';
import { TokenModel } from '../models/token.model.js';

export class TokenMapper {
  static toEntity(model: TokenModel): Token {
    return {
      uuid: model.uuid,
      access_token: model.access_token,
      expires_in: model.expires_in,
      scope: model.scope,
      token_type: model.token_type,
      refresh_token: model.refresh_token,
      refresh_token_expires_in: model.refresh_token_expires_in,
      created_at: model.created_at,
    };
  }

  static toModel(entity: Token): TokenModel {
    return {
      uuid: entity.uuid,
      access_token: entity.access_token,
      expires_in: entity.expires_in,
      scope: entity.scope,
      token_type: entity.token_type,
      refresh_token: entity.refresh_token,
      refresh_token_expires_in: entity.refresh_token_expires_in,
      created_at: typeof entity.created_at === 'string' ? entity.created_at : entity.created_at.toISOString(),
    };
  }
}
