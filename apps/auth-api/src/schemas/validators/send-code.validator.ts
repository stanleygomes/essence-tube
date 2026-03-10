import { z } from "zod";

export const sendCodeSchema = z.object({
  email: z.email("Invalid email format"),
});

export type SendCodeInput = z.infer<typeof sendCodeSchema>;

export function validateSendCode(data: unknown): SendCodeInput {
  return sendCodeSchema.parse(data);
}
