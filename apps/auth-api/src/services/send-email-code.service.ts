import { EmailService } from "@logos/email";
import { loadTemplateFile } from "@logos/utils";
import { randomInt } from "crypto";
import { VerificationCodeRepository } from "../repositories/verification-code.repository.js";
import { config } from "../config/environment.js";

const CODE_LENGTH = 6;
const EXPIRES_IN_MINUTES = 15;

const verificationCodeTemplate = loadTemplateFile(
  import.meta.url,
  "../templates/verification-code.html",
);

export class SendEmailCodeService {
  constructor(
    private readonly verificationCodeRepository: VerificationCodeRepository,
    private readonly emailService: EmailService,
  ) {}

  async execute(email: string): Promise<void> {
    const code = this.generateCode();
    const expiresAt = new Date(Date.now() + EXPIRES_IN_MINUTES * 60 * 1000);
    const html = this.buildEmailHtml(code);

    await this.verificationCodeRepository.create(email, code, expiresAt);
    await this.emailService.sendVerificationCode(email, code, html);
  }

  private generateCode(): string {
    return randomInt(0, 10 ** CODE_LENGTH)
      .toString()
      .padStart(CODE_LENGTH, "0");
  }

  private buildEmailHtml(code: string): string {
    return verificationCodeTemplate
      .replace("{{CODE}}", code)
      .replace("{{EXPIRY_MINUTES}}", String(EXPIRES_IN_MINUTES))
      .replace("{{PLATFORM_URL}}", config.app.web.platformUrl ?? "#");
  }
}
