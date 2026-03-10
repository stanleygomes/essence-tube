export interface User {
  id?: number;
  uuid: string;
  name: string | null;
  email: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}
