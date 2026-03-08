import axios from "axios";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { config } from "../../../config/environment.js";
import { OAuthService, OAuthUserInfo } from "../../../domain/port/services/oauth.service.js";

export class AppleOAuthService implements OAuthService {
  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: config.oauth.apple.clientId,
      redirect_uri: config.oauth.apple.redirectUri,
      response_type: "code",
      scope: "name email",
      response_mode: "form_post",
    });

    return `https://appleid.apple.com/auth/authorize?${params}`;
  }

  private buildClientSecret(): string {
    const { teamId, keyId, privateKey, clientId } = config.oauth.apple;

    return jwt.sign({}, privateKey, {
      algorithm: "ES256",
      keyid: keyId,
      issuer: teamId,
      audience: "https://appleid.apple.com",
      subject: clientId,
      expiresIn: "180d",
    });
  }

  async getUserInfo(code: string): Promise<OAuthUserInfo> {
    const { data: token } = await axios.post<{ id_token: string }>(
      "https://appleid.apple.com/auth/token",
      new URLSearchParams({
        code,
        client_id: config.oauth.apple.clientId,
        client_secret: this.buildClientSecret(),
        redirect_uri: config.oauth.apple.redirectUri,
        grant_type: "authorization_code",
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );

    const payload = jwtDecode<{ sub: string; email?: string }>(token.id_token);

    return {
      id: payload.sub,
      name: payload.email?.split("@")[0] || payload.sub,
      email: payload.email ?? "",
      photo_url: "",
    };
  }
}
