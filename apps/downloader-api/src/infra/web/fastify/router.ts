import { FastifyInstance } from "fastify";
import { DownloadRoutes } from "./routes/download.route.js";
import { downloadMediaUseCase } from "../../providers/dependencies.js";
import { downloadSchema } from "./docs/download.doc.js";

export class AppRouter {
  private downloadRoutes: DownloadRoutes;

  constructor() {
    this.downloadRoutes = new DownloadRoutes(downloadMediaUseCase);
  }

  public register(fastify: FastifyInstance, prefix = "") {
    fastify.post(
      `${prefix}/download`,
      {
        schema: downloadSchema,
      },
      this.downloadRoutes.downloadHandler,
    );
  }
}
