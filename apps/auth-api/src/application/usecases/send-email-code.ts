import { randomInt } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { VerificationCodeRepository } from "../../domain/port/databases/verification-code.repository.js";
import { EmailService } from "../../domain/port/services/email.service.js";

export class SendEmailCodeUseCase {
  constructor(
    private readonly verificationCodeRepository: VerificationCodeRepository,
    private readonly emailService: EmailService,
  ) {}

  async execute(email: string): Promise<void> {
    const code = randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    this.verificationCodeRepository.save({
      id: uuidv4(),
      email,
      code,
      expires_at: expiresAt,
      created_at: new Date().toISOString(),
    });

    await this.emailService.sendCode(email, code);
  }
}
