import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { config } from "./environment.js";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(
  readFileSync(new URL("../../package.json", import.meta.url), "utf8"),
);

export class Docs {
  static buildSwaggerConfig() {
    return {
      openapi: {
        info: {
          title: pkg.name,
          description: pkg.description,
          version: pkg.version,
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
    };
  }

  static async register(fastify: any) {
    await fastify.register(swagger, this.buildSwaggerConfig());
    await fastify.register(swaggerUI, {
      routePrefix: config.app.docs.path,
    });
  }
}
