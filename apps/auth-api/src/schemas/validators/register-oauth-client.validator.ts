import { z } from "zod";

export const registerOAuthClientSchema = z.object({
  name: z.string().min(1, "Client name is required"),
});

export type RegisterOAuthClientInput = z.infer<
  typeof registerOAuthClientSchema
>;

export function validateRegisterOAuthClient(
  data: unknown,
): RegisterOAuthClientInput {
  return registerOAuthClientSchema.parse(data);
}
