import { RevelationController } from "../controllers/revelation/revelation.controller.js";
import { PromptLogRepository } from "../repositories/prompt-log.repository.js";
import { GoogleAiStudioService } from "../services/google-ai-studio.service.js";
import { PromptExecutionService } from "../services/prompt-execution.service.js";

const promptLogRepository = new PromptLogRepository();
const googleAiStudioService = new GoogleAiStudioService();
const promptExecutionService = new PromptExecutionService(
  googleAiStudioService,
  promptLogRepository,
);

export const revelationController = new RevelationController(
  promptExecutionService,
);
