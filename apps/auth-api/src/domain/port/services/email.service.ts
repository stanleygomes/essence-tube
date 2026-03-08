export interface EmailService {
  sendCode(email: string, code: string): Promise<void>;
}
