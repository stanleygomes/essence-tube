import axios from 'axios';
import { config } from '../../config/index.js';
import { Logger } from '../../logger/pino.logger.js';
import { GoogleAccountInfoResponse } from './responses/google-account-info.response.js';
import { AuthInfoMapper } from './mappers/auth-info.mapper.js';
import { PartnerAccountService } from '../../../domain/port/services/partner-account.service.js';
import { AuthInfo } from '../../../domain/entities/auth-info.entity.js';

const { baseUrl } = config.services.googleAccount;

export class GoogleAccountService implements PartnerAccountService {
  private logger = Logger.getLogger();

  async getUserInfo(accessToken: string): Promise<AuthInfo> {
    try {
      const res = await axios.get<GoogleAccountInfoResponse>(baseUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return AuthInfoMapper.toEntity(res.data);
    } catch (error: any) {
      this.logger.error('Google user info error', error);
      throw new Error(error);
    }
  }
}
