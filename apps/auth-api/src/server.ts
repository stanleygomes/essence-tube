import "dotenv/config";
import Fastify, { FastifyInstance } from "fastify";
import { AppRouter } from "./router.js";
import { Logger } from "./config/pino.logger.js";
import { config } from "./config/environment.js";
import { Docs } from "./docs.js";
import { runMigrations } from "./database/client.js";

export class AppServer {
  private fastify: FastifyInstance;
  private logger = Logger.getLogger();

  constructor() {
    this.fastify = Fastify();
  }

  private getPort(): number {
    return config.app.server.port ? Number(config.app.server.port) : 3000;
  }

  public async start() {
    try {
      runMigrations();
    } catch (error) {
      this.logger.error(error, "Migration failed");
      process.exit(1);
    }

    await Docs.register(this.fastify);

    const router = new AppRouter();
    router.register(this.fastify, config.app.server.path);

    const port = this.getPort();
    const { url, path } = config.app.server;
    const { path: pathDocs } = config.app.docs;

    this.fastify.listen({ port }, (err) => {
      if (err) {
        throw err;
      }

      this.logger.info(`Fastify server running on ${url}:${port}${path}`);
      this.logger.info(`Swagger docs available at ${url}:${port}${pathDocs}`);
    });
  }
}

new AppServer().start();
