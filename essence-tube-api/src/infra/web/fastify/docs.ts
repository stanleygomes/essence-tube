import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { config } from '../../config/index.js';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const pkg = require('../../../../package.json');

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
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
        security: [{ bearerAuth: [] }],
      }
    }
  }

  static async register(fastify: any) {
    await fastify.register(swagger, this.buildSwaggerConfig());
    await fastify.register(swaggerUI, {
      routePrefix: config.app.docs.path,
    });
  }
}
