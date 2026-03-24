import { EmailService } from "@logos/email";
import {
  buildVerificationCodeEmailHtml,
  generateVerificationCode,
  loadTemplateFile,
} from "@logos/utils";
import { VerificationCodeRepository } from "../repositories/verification-code.repository.js";
import { PinoLogger } from "../config/pino.logger.js";
import { config } from "../config/environment.js";

const CODE_LENGTH = 6;
const EXPIRES_IN_MINUTES = 15;

const logger = PinoLogger.getLogger();

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
    const code = generateVerificationCode(CODE_LENGTH);
    const expiresAt = new Date(Date.now() + EXPIRES_IN_MINUTES * 60 * 1000);
    const html = buildVerificationCodeEmailHtml(
      verificationCodeTemplate,
      code,
      EXPIRES_IN_MINUTES,
      config.app.web.baseUrl ?? "#",
    );

    await this.verificationCodeRepository.create(email, code, expiresAt);
    await this.emailService.sendVerificationCode(
      "Your verification code",
      email,
      html,
    );

    logger.info(`Verification code sent to ${email}`);
  }
}
