import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { JwtService } from "@logos/utils";
import { AuthError } from "../errors/AuthError.js";
import { ClientRepository } from "../repositories/client.repository.js";

const SCRYPT_KEY_LENGTH = 64;

export class ClientCredentialsService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    clientId: string,
    clientSecret: string,
  ): Promise<{ access_token: string; token_type: string; expires_in: number }> {
    const client = await this.clientRepository.findByClientId(clientId);

    if (!client || !this.verifySecret(clientSecret, client.client_secret_hash)) {
      throw new AuthError("Invalid client credentials");
    }

    const token = this.jwtService.signAccessToken({
      uuid: client.uuid,
      sub: client.client_id,
      type: "client_credentials",
    });

    return {
      access_token: token,
      token_type: "Bearer",
      expires_in: 3600,
    };
  }

  static hashSecret(secret: string): string {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(secret, salt, SCRYPT_KEY_LENGTH).toString("hex");
    return `${salt}:${hash}`;
  }

  private verifySecret(secret: string, storedHash: string): boolean {
    const [salt, hash] = storedHash.split(":");
    if (!salt || !hash) return false;
    const derivedHash = scryptSync(secret, salt, SCRYPT_KEY_LENGTH);
    const storedHashBuffer = Buffer.from(hash, "hex");
    return timingSafeEqual(derivedHash, storedHashBuffer);
  }
}
