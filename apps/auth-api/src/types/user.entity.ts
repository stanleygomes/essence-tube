export interface User {
  uuid: string;
  name: string;
  email: string;
  photo_url: string;
  partner_id: string;
  partner_token: string;
  created_at?: Date;
  updated_at?: Date;
}
