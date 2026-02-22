import { AuthInfo } from '../../../../domain/entities/auth-info.entity.js';
import { GoogleAccountInfoResponse } from '../responses/google-account-info.response.js';

export class AuthInfoMapper {
  static toEntity(response: GoogleAccountInfoResponse): AuthInfo {
    return {
      partner_id: response.sub,
      email: response.email,
      name: response.name,
      photo_url: response.picture,
    };
  }
}
