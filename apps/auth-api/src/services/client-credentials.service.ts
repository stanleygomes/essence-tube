import bcrypt from "bcryptjs";
import { JwtService } from "@logos/jwt";
import { AuthError } from "../errors/AuthError.js";
import { ApiClientRepository } from "../repositories/api-client.repository.js";

const ACCESS_TOKEN_EXPIRES_IN_SECONDS = 3600;

export class ClientCredentialsService {
  constructor(
    private readonly apiClientRepository: ApiClientRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    clientId: string,
    clientSecret: string,
  ): Promise<{ access_token: string; token_type: string; expires_in: number }> {
    const client = await this.apiClientRepository.findByClientId(clientId);

    if (!client) {
      throw new AuthError("Invalid client credentials");
    }

    const isValid = await bcrypt.compare(
      clientSecret,
      client.client_secret_hash,
    );

    if (!isValid) {
      throw new AuthError("Invalid client credentials");
    }

    const token = this.jwtService.signAccessToken({
      id: client.uuid,
      email: clientId,
      type: "client_credentials",
    });

    return {
      access_token: token,
      token_type: "Bearer",
      expires_in: ACCESS_TOKEN_EXPIRES_IN_SECONDS,
    };
  }
}
