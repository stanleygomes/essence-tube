import { EmailService } from "@logos/email";
import { randomInt } from "crypto";
import { VerificationCodeRepository } from "../repositories/verification-code.repository.js";

const CODE_LENGTH = 6;
const EXPIRES_IN_MINUTES = 15;

export class SendEmailCodeService {
  constructor(
    private readonly verificationCodeRepository: VerificationCodeRepository,
    private readonly emailService: EmailService,
  ) {}

  async execute(email: string): Promise<void> {
    const code = this.generateCode();
    const expiresAt = new Date(Date.now() + EXPIRES_IN_MINUTES * 60 * 1000);

    await this.verificationCodeRepository.create(email, code, expiresAt);
    await this.emailService.sendVerificationCode(email, code);
  }

  private generateCode(): string {
    return randomInt(0, 10 ** CODE_LENGTH)
      .toString()
      .padStart(CODE_LENGTH, "0");
  }
}
