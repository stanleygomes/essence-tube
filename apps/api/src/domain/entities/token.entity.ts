export interface Token {
  uuid: string;
  access_token: string;
  expires_in: number;
  scope?: string;
  token_type?: string;
  refresh_token: string;
  refresh_token_expires_in?: number;
  created_at: Date | string;
  [key: string]: any;
}
