import { z } from "zod";

export const createClientSchema = z.object({
  name: z.string().min(1, "name is required"),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;

export function validateCreateClient(data: unknown): CreateClientInput {
  return createClientSchema.parse(data);
}
