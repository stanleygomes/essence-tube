import { createHash, randomBytes } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { JwtService, JwtPayload } from "@logos/utils";
import { AuthError } from "../errors/AuthError.js";
import { OAuthClientRepository } from "../repositories/oauth-client.repository.js";

const DEFAULT_TOKEN_EXPIRY_SECONDS = 3600;

export class ClientCredentialsService {
  constructor(
    private readonly oauthClientRepository: OAuthClientRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    clientId: string,
    clientSecret: string,
  ): Promise<{ access_token: string; token_type: string; expires_in: number }> {
    const client = await this.oauthClientRepository.findByClientId(clientId);

    if (!client) {
      throw new AuthError("Invalid client credentials");
    }

    const secretHash = createHash("sha256").update(clientSecret).digest("hex");

    if (secretHash !== client.client_secret_hash) {
      throw new AuthError("Invalid client credentials");
    }

    const payload: JwtPayload = {
      uuid: clientId,
      email: "",
      grant_type: "client_credentials",
    };

    const token = this.jwtService.signAccessToken(payload);
    const decoded = this.jwtService.verify(token) as JwtPayload & {
      exp?: number;
      iat?: number;
    };
    const expiresIn =
      decoded.exp && decoded.iat
        ? decoded.exp - decoded.iat
        : DEFAULT_TOKEN_EXPIRY_SECONDS;

    return { access_token: token, token_type: "Bearer", expires_in: expiresIn };
  }

  async register(
    name: string,
  ): Promise<{ client_id: string; client_secret: string }> {
    const clientId = uuidv4();
    const clientSecret = randomBytes(32).toString("hex");
    const clientSecretHash = createHash("sha256")
      .update(clientSecret)
      .digest("hex");

    await this.oauthClientRepository.create({
      client_id: clientId,
      client_secret_hash: clientSecretHash,
      name,
      created_at: new Date(),
    });

    return { client_id: clientId, client_secret: clientSecret };
  }
}
