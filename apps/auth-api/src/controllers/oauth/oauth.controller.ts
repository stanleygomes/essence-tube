import { FastifyRequest, FastifyReply } from "fastify";
import { ClientCredentialsService } from "../../services/client-credentials.service.js";
import { validateClientCredentials } from "../../schemas/validators/client-credentials.validator.js";
import { validateRegisterOAuthClient } from "../../schemas/validators/register-oauth-client.validator.js";

export class OAuthController {
  constructor(
    private readonly clientCredentialsService: ClientCredentialsService,
  ) {}

  token = async (
    request: FastifyRequest<{
      Body: {
        grant_type: string;
        client_id: string;
        client_secret: string;
      };
    }>,
    reply: FastifyReply,
  ) => {
    const validatedData = validateClientCredentials(request.body);
    const result = await this.clientCredentialsService.execute(
      validatedData.client_id,
      validatedData.client_secret,
    );
    reply.send(result);
  };

  registerClient = async (
    request: FastifyRequest<{ Body: { name: string } }>,
    reply: FastifyReply,
  ) => {
    const validatedData = validateRegisterOAuthClient(request.body);
    const result = await this.clientCredentialsService.register(
      validatedData.name,
    );
    reply.code(201).send(result);
  };
}
