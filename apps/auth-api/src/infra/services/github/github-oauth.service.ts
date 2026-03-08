import axios from "axios";
import { config } from "../../../config/environment.js";
import { OAuthService, OAuthUserInfo } from "../../../domain/port/services/oauth.service.js";

export class GithubOAuthService implements OAuthService {
  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: config.oauth.github.clientId,
      redirect_uri: config.oauth.github.redirectUri,
      scope: "user:email",
    });

    return `https://github.com/login/oauth/authorize?${params}`;
  }

  async getUserInfo(code: string): Promise<OAuthUserInfo> {
    const { data: token } = await axios.post<{ access_token: string }>(
      "https://github.com/login/oauth/access_token",
      { code, client_id: config.oauth.github.clientId, client_secret: config.oauth.github.clientSecret },
      { headers: { Accept: "application/json" } },
    );

    const { data: user } = await axios.get<{
      id: number;
      name: string;
      email: string | null;
      avatar_url: string;
    }>("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    let email = user.email ?? "";

    if (!email) {
      const { data: emails } = await axios.get<Array<{ email: string; primary: boolean; verified: boolean }>>(
        "https://api.github.com/user/emails",
        { headers: { Authorization: `Bearer ${token.access_token}` } },
      );

      email = emails.find((e) => e.primary && e.verified)?.email ?? "";
    }

    return { id: String(user.id), name: user.name?.trim() || email, email, photo_url: user.avatar_url };
  }
}
