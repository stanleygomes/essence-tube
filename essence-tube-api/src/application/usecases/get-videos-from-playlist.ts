import { BusinessError } from '../../domain/errors/BusinessError.js';
import { Logger } from '../../infra/logger/pino.logger.js';
import { GetPartnerBearerTokenUseCase } from './get-bearer-token.js';
import { PartnerMediaService } from '../../domain/port/services/partner-media.service.js';

export class GetVideosFromPlaylistUseCase {
  constructor(
    private readonly getPartnerBearerToken: GetPartnerBearerTokenUseCase,
    private readonly partnerMediaService: PartnerMediaService,
  ) {}

  private logger = Logger.getLogger();

  async execute(bearerToken: string, playlistId: string): Promise<any> {
    const accessToken = await this.getPartnerBearerToken.execute(bearerToken);

    if (!playlistId) {
      throw new BusinessError('Playlist ID is required!');
    }

    try {
      return await this.partnerMediaService.getPlaylistItems(accessToken, playlistId);
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError('Error retrieving playlist videos video api');
    }
  }
}
