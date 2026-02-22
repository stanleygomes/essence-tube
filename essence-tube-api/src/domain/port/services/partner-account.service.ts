import { AuthInfo } from '../../entities/auth-info.entity.js';

export interface PartnerAccountService {
  getUserInfo(accessToken: string): Promise<AuthInfo>;
}
