import { BusinessError } from '../../domain/errors/BusinessError.js';
import { Logger } from '../../infra/logger/pino.logger.js';
import { GetPartnerBearerTokenUseCase } from './get-bearer-token.js';
import { PartnerMediaService } from '../../domain/port/services/partner-media.service.js';

export class GetPlaylistsUseCase {
  constructor(
    private readonly getPartnerBearerToken: GetPartnerBearerTokenUseCase,
    private readonly partnerMediaService: PartnerMediaService,
  ) {}

  private logger = Logger.getLogger();

  async execute(bearerToken: string): Promise<any> {
    const accessToken = await this.getPartnerBearerToken.execute(bearerToken);

    try {
      return await this.partnerMediaService.getPlaylistList(accessToken);
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError('Error retrieving playlists video api');
    }
  }
}
