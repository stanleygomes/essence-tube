import { z } from "zod";

export const verifyCodeSchema = z.object({
  email: z.email("Invalid email format"),
  code: z.string().min(1, "Code is required"),
});

export type VerifyCodeInput = z.infer<typeof verifyCodeSchema>;

export function validateVerifyCode(data: unknown): VerifyCodeInput {
  return verifyCodeSchema.parse(data);
}
