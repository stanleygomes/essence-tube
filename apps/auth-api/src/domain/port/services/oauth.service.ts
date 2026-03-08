export interface OAuthUserInfo {
  id: string;
  name: string;
  email: string;
  photo_url: string;
}

export interface OAuthService {
  getAuthUrl(): string;
  getUserInfo(code: string): Promise<OAuthUserInfo>;
}
