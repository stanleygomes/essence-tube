import { z } from "zod";

export const executePromptSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, "Prompt is required")
    .max(5000, "Prompt is too long"),
});

export type ExecutePromptInput = z.infer<typeof executePromptSchema>;

export function validateExecutePrompt(data: unknown): ExecutePromptInput {
  return executePromptSchema.parse(data);
}
