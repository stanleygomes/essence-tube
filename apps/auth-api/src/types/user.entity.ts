export interface User {
  id: string;
  name: string | null;
  email: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}
