import { Resend } from "resend";
import { config } from "../config/environment.js";

export class EmailService {
  private resend = new Resend(config.services.resend.apiKey);

  async sendVerificationCode(email: string, code: string): Promise<void> {
    await this.resend.emails.send({
      from: config.services.resend.fromEmail,
      to: email,
      subject: "Your verification code",
      text: `Your verification code is: ${code}`,
    });
  }
}
