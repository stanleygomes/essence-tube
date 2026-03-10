import { randomBytes } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { ClientRepository } from "../repositories/client.repository.js";
import { ClientCredentialsService } from "./client-credentials.service.js";

export class CreateClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(name: string): Promise<{ client_id: string; client_secret: string }> {
    const client_id = uuidv4();
    const client_secret = randomBytes(32).toString("hex");
    const client_secret_hash = ClientCredentialsService.hashSecret(client_secret);

    await this.clientRepository.create({
      uuid: uuidv4(),
      client_id,
      client_secret_hash,
      name,
      created_at: new Date(),
    });

    return { client_id, client_secret };
  }
}
