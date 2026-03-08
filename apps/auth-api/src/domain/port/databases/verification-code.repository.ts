import { VerificationCode } from "../../entities/verification-code.entity.js";

export interface VerificationCodeRepository {
  save(code: VerificationCode): VerificationCode;
  findValidCode(email: string, code: string): VerificationCode | null;
  markUsed(id: string): void;
}
