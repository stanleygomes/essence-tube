import { BusinessError } from '../../domain/errors/BusinessError.js';
import { Logger } from '../../infra/logger/pino.logger.js';
import { GetPartnerBearerTokenUseCase } from './get-bearer-token.js';
import { PartnerMediaService } from '../../domain/port/services/partner-media.service.js';

export class RemoveVideoFromPlaylistUseCase {
  constructor(
    private readonly getPartnerBearerToken: GetPartnerBearerTokenUseCase,
    private readonly partnerMediaService: PartnerMediaService,
  ) {}

  private logger = Logger.getLogger();

  async execute(bearerToken: string, playlistItemId?: string): Promise<any> {
    const accessToken = await this.getPartnerBearerToken.execute(bearerToken);

    if (!playlistItemId) {
      throw new BusinessError('Playlist Item ID is required!');
    }

    try {
      return await this.partnerMediaService.removeVideoFromPlaylist(accessToken, playlistItemId);
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError('Error deleting playlist items video api');
    }
  }
}
