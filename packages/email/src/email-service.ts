import { Resend } from "resend";

export class EmailService {
  private resend: Resend;

  constructor(
    private readonly apiKey: string,
    private readonly fromEmail: string,
  ) {
    this.resend = new Resend(this.apiKey);
  }

  async sendVerificationCode(email: string, code: string): Promise<void> {
    await this.resend.emails.send({
      from: this.fromEmail,
      to: email,
      subject: "Your verification code",
      text: `Your verification code is: ${code}`,
    });
  }
}
