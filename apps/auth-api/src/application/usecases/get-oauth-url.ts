import { OAuthService } from "../../domain/port/services/oauth.service.js";

export class GetOAuthUrlUseCase {
  constructor(private readonly oauthService: OAuthService) {}

  execute(): string {
    return this.oauthService.getAuthUrl();
  }
}
