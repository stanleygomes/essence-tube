import { config } from '../../infra/config/index.js';
import { AuthInfo } from '../../domain/entities/auth-info.entity.js';
import { AuthService } from '../../domain/port/auth/auth.service.js';
import { PartnerAccountService } from '../../domain/port/services/partner-account.service.js';
import { GenerateAuthTokenUseCase } from './generate-auth-token.js';
import { SaveUserUseCase } from './save-user-use-case.js';

export class GetUrlRedirectBackUseCase {
  constructor(
    private readonly generateAuthToken: GenerateAuthTokenUseCase,
    private readonly partnerAccountService: PartnerAccountService,
    private readonly saveUserUseCase: SaveUserUseCase,
    private readonly authService: AuthService,
  ) {}

  async execute(authCode: string): Promise<string> {
    const token = await this.generateAuthToken.execute(authCode);
    const partnerUserInfo = await this.partnerAccountService.getUserInfo(token.access_token);
    const user = await this.saveUserUseCase.execute(partnerUserInfo, token.uuid);
    const bearerToken = this.authService.generateToken(partnerUserInfo, user.uuid)

    const webBaseUrl = config.app.web.baseUrl;
    const redirectUrl = new URL(`${webBaseUrl}/auth/redirect`);

    redirectUrl.searchParams.append('token', bearerToken);

    return redirectUrl.toString();
  }
}
