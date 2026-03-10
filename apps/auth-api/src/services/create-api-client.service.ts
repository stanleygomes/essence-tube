import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { ApiClientRepository } from "../repositories/api-client.repository.js";

const BCRYPT_SALT_ROUNDS = 12;

export class CreateApiClientService {
  constructor(private readonly apiClientRepository: ApiClientRepository) {}

  async execute(name: string): Promise<{ client_id: string; client_secret: string }> {
    const clientId = uuidv4();
    const clientSecret = uuidv4();
    const clientSecretHash = await bcrypt.hash(clientSecret, BCRYPT_SALT_ROUNDS);

    await this.apiClientRepository.create({
      uuid: uuidv4(),
      client_id: clientId,
      client_secret_hash: clientSecretHash,
      name,
      created_at: new Date(),
    });

    return { client_id: clientId, client_secret: clientSecret };
  }
}
