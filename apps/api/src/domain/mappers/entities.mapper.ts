import { AuthInfo } from '../entities/auth-info.entity.js';
import { User } from '../entities/user.entity.js';

export class AuthInfoToUserMapper {
  static toUser(authInfo: AuthInfo, tokenUUID: string, uuid: string): User {
    return {
      uuid: uuid,
      name: authInfo.name,
      email: authInfo.email,
      photo_url: authInfo.photo_url,
      partner_id: authInfo.partner_id,
      partner_token: tokenUUID,
      created_at: authInfo.created_at,
      updated_at: authInfo.updated_at,
    };
  }
}

export class UserToAuthInfoMapper {
  static toAuthInfo(user: User): AuthInfo {
    return {
      name: user.name,
      email: user.email,
      photo_url: user.photo_url,
      partner_id: user.partner_id,
    };
  }
}
