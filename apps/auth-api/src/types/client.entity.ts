export interface ApiClient {
  id?: number;
  uuid: string;
  client_id: string;
  client_secret_hash: string;
  name: string;
  created_at?: Date | null;
}
