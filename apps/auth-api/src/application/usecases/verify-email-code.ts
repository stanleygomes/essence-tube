import { v4 as uuidv4 } from "uuid";
import { UserRepository } from "../../domain/port/databases/user.repository.js";
import { VerificationCodeRepository } from "../../domain/port/databases/verification-code.repository.js";
import { AuthService } from "../../domain/port/services/auth.service.js";
import { BusinessError } from "../../errors/BusinessError.js";

export class VerifyEmailCodeUseCase {
  constructor(
    private readonly verificationCodeRepository: VerificationCodeRepository,
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  execute(email: string, code: string): string {
    const record = this.verificationCodeRepository.findValidCode(email, code);

    if (!record) {
      throw new BusinessError("Invalid or expired code");
    }

    this.verificationCodeRepository.markUsed(record.id);

    const user =
      this.userRepository.findByEmail(email) ??
      this.userRepository.save({
        id: uuidv4(),
        name: email.split("@")[0] || email,
        email,
        photo_url: "",
        provider: "email",
        provider_id: email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    return this.authService.generateToken(user);
  }
}
