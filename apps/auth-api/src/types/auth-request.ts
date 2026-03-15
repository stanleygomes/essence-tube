import { FastifyRequest } from "fastify";

export type SendCodeRequest = FastifyRequest<{ Body: { email: string } }>;
export type VerifyCodeRequest = FastifyRequest<{
  Body: { email: string; code: string };
}>;
export type RefreshTokenRequest = FastifyRequest<{
  Body: { refreshToken: string };
}>;
export type TokenRequest = FastifyRequest<{
  Body: { grant_type: string; client_id: string; client_secret: string };
}>;
export type CreateClientRequest = FastifyRequest<{ Body: { name: string } }>;
