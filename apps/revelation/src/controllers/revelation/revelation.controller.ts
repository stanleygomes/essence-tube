import { FastifyReply, FastifyRequest } from "fastify";
import { PromptExecutionService } from "../../services/prompt-execution.service.js";
import { validateExecutePrompt } from "../../schemas/validators/execute-prompt.validator.js";
import type { UserAuth } from "../../types/user-auth.js";
import { AuthError } from "../../errors/AuthError.js";

interface ExecutePromptBody {
  prompt: string;
}

type AuthenticatedRequest = FastifyRequest & {
  user: UserAuth;
};

export class RevelationController {
  constructor(
    private readonly promptExecutionService: PromptExecutionService,
  ) {}

  executePrompt = async (
    request: FastifyRequest<{ Body: ExecutePromptBody }>,
    reply: FastifyReply,
  ) => {
    const validatedData = validateExecutePrompt(request.body);
    const user = (request as AuthenticatedRequest).user;

    if (!user) {
      throw new AuthError("Not authorized");
    }

    const result = await this.promptExecutionService.execute(
      validatedData.prompt,
      user,
    );

    reply.send({
      response: result.response,
      createdAt: result.createdAt.toISOString(),
    });
  };
}
