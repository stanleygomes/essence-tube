import axios from "axios";
import { config } from "../../../config/environment.js";
import { OAuthService, OAuthUserInfo } from "../../../domain/port/services/oauth.service.js";

export class GoogleOAuthService implements OAuthService {
  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: config.oauth.google.clientId,
      redirect_uri: config.oauth.google.redirectUri,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  }

  async getUserInfo(code: string): Promise<OAuthUserInfo> {
    const { data: token } = await axios.post<{ access_token: string }>(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code,
        client_id: config.oauth.google.clientId,
        client_secret: config.oauth.google.clientSecret,
        redirect_uri: config.oauth.google.redirectUri,
        grant_type: "authorization_code",
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );

    const { data: user } = await axios.get<{
      sub: string;
      name: string;
      email: string;
      picture: string;
    }>("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });

    return { id: user.sub, name: user.name, email: user.email, photo_url: user.picture };
  }
}
