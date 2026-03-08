export interface VerificationCode {
  id: string;
  email: string;
  code: string;
  expires_at: string;
  used_at?: string;
  created_at: string;
}
