import { BusinessError } from '../../domain/errors/BusinessError.js';
import { Logger } from '../../infra/logger/pino.logger.js';
import { GetPartnerBearerTokenUseCase } from './get-bearer-token.js';
import { PartnerMediaService } from '../../domain/port/services/partner-media.service.js';

export class GetLatestVideosFromChannelUseCase {
  constructor(
    private readonly getPartnerBearerToken: GetPartnerBearerTokenUseCase,
    private readonly partnerMediaService: PartnerMediaService,
  ) {}

  private logger = Logger.getLogger();

  async execute(bearerToken: string, channelId: string): Promise<any> {
    const accessToken = await this.getPartnerBearerToken.execute(bearerToken);

    try {
      return await this.partnerMediaService.getLatestVideosFromChannel(accessToken, channelId);
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError('Error retrieving channel videos api');
    }
  }
}
