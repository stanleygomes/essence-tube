import { VerificationCode } from "../../../../domain/entities/verification-code.entity.js";
import { VerificationCodeRepository } from "../../../../domain/port/databases/verification-code.repository.js";
import { getDb } from "../connection.js";

export class SqliteVerificationCodeRepository implements VerificationCodeRepository {
  save(code: VerificationCode): VerificationCode {
    getDb()
      .prepare(
        `INSERT INTO verification_codes (id, email, code, expires_at, created_at)
         VALUES (?, ?, ?, ?, ?)`,
      )
      .run(code.id, code.email, code.code, code.expires_at, code.created_at);

    return code;
  }

  findValidCode(email: string, code: string): VerificationCode | null {
    return (
      (getDb()
        .prepare(
          `SELECT * FROM verification_codes
           WHERE email = ? AND code = ? AND used_at IS NULL AND expires_at > ?
           ORDER BY created_at DESC LIMIT 1`,
        )
        .get(email, code, new Date().toISOString()) as VerificationCode) ?? null
    );
  }

  markUsed(id: string): void {
    getDb()
      .prepare("UPDATE verification_codes SET used_at = ? WHERE id = ?")
      .run(new Date().toISOString(), id);
  }
}
