import { v4 as uuidv4 } from "uuid";
import { UserRepository } from "../../domain/port/databases/user.repository.js";
import { OAuthService } from "../../domain/port/services/oauth.service.js";
import { AuthService } from "../../domain/port/services/auth.service.js";

export class OAuthCallbackUseCase {
  constructor(
    private readonly oauthService: OAuthService,
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly provider: string,
  ) {}

  async execute(code: string): Promise<string> {
    const info = await this.oauthService.getUserInfo(code);

    const user =
      (info.email ? this.userRepository.findByEmail(info.email) : null) ??
      this.userRepository.findByProvider(this.provider, info.id) ??
      this.userRepository.save({
        id: uuidv4(),
        name: info.name,
        email: info.email,
        photo_url: info.photo_url,
        provider: this.provider,
        provider_id: info.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    return this.authService.generateToken(user);
  }
}
