import { z } from "zod";

export const clientCredentialsSchema = z.object({
  grant_type: z.literal("client_credentials"),
  client_id: z.string().min(1, "Client ID is required"),
  client_secret: z.string().min(1, "Client secret is required"),
});

export type ClientCredentialsInput = z.infer<typeof clientCredentialsSchema>;

export function validateClientCredentials(
  data: unknown,
): ClientCredentialsInput {
  return clientCredentialsSchema.parse(data);
}
