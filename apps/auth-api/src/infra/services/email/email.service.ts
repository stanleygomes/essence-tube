import nodemailer from "nodemailer";
import { config } from "../../../config/environment.js";
import { EmailService } from "../../../domain/port/services/email.service.js";

export class NodemailerEmailService implements EmailService {
  private transporter = nodemailer.createTransport(config.email.smtp);

  async sendCode(email: string, code: string): Promise<void> {
    await this.transporter.sendMail({
      from: config.email.from,
      to: email,
      subject: "Your verification code",
      text: `Your code is: ${code}. It expires in 10 minutes.`,
    });
  }
}
