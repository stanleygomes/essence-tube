import { z } from "zod";

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;

export function validateRefreshToken(data: unknown): RefreshTokenInput {
  return refreshTokenSchema.parse(data);
}
