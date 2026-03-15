import { v4 as uuidv4 } from "uuid";
import { JwtService, JwtPayload } from "@logos/jwt";
import { AuthError } from "../errors/AuthError.js";
import { VerificationCodeRepository } from "../repositories/verification-code.repository.js";
import { UserRepository } from "../repositories/user.repository.js";

export class VerifyEmailCodeService {
  constructor(
    private readonly verificationCodeRepository: VerificationCodeRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    email: string,
    code: string,
  ): Promise<{ token: string; refreshToken: string }> {
    const record = await this.verificationCodeRepository.findValid(email, code);

    if (!record) {
      throw new AuthError("Invalid or expired code");
    }

    await this.verificationCodeRepository.markUsed(record.id);

    let user = await this.userRepository.findByEmail(email);

    if (!user) {
      user = await this.userRepository.create({
        id: uuidv4(),
        name: null,
        email,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    const payload: JwtPayload = { id: user.id, email: user.email };
    const token = this.jwtService.signAccessToken(payload);
    const refreshToken = this.jwtService.signRefreshToken(payload);

    return { token, refreshToken };
  }
}
