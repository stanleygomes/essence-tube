import { BusinessError } from '../../domain/errors/BusinessError.js';
import { Logger } from '../../infra/logger/pino.logger.js';
import { GetPartnerBearerTokenUseCase } from './get-bearer-token.js';
import { PartnerMediaService } from '../../domain/port/services/partner-media.service.js';

export class GetVideoUseCase {
  constructor(
    private readonly getPartnerBearerToken: GetPartnerBearerTokenUseCase,
    private readonly partnerMediaService: PartnerMediaService,
  ) {}

  private logger = Logger.getLogger();

  async execute(bearerToken: string, videoId: string): Promise<any> {
    const accessToken = await this.getPartnerBearerToken.execute(bearerToken);

    if (!videoId) {
      throw new BusinessError('Video ID is required!');
    }

    try {
      return this.partnerMediaService.getVideoMetadata(accessToken, videoId);
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError('Error retrieving video video api');
    }
  }
}
