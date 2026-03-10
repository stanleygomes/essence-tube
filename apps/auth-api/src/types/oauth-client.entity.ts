export interface OAuthClient {
  id?: number;
  client_id: string;
  client_secret_hash: string;
  name: string;
  created_at?: Date | null;
}
