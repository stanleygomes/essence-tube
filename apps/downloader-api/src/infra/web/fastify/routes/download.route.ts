import { FastifyRequest, FastifyReply } from "fastify";
import { BusinessError } from "../../../../domain/errors/BusinessError.js";
import { NotFoundError } from "../../../../domain/errors/NotFoundError.js";
import { Logger } from "../../../logger/pino.logger.js";
import { DownloadMediaUseCase } from "../../../../application/usecases/download-media-use-case.js";

interface DownloadBody {
  url: string;
  format: "mp3" | "mp4";
}

export class DownloadRoutes {
  private logger = Logger.getLogger();

  constructor(private readonly downloadMediaUseCase: DownloadMediaUseCase) {}

  downloadHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { url, format } = request.body as DownloadBody;

      const result = await this.downloadMediaUseCase.execute({ url, format });

      reply.header(
        "Content-Disposition",
        `attachment; filename="${result.filename}"`,
      );
      reply.header("Content-Type", result.contentType);
      reply.header("Access-Control-Expose-Headers", "Content-Disposition");

      return reply.send(result.stream);
    } catch (error: any) {
      this.logger.error(error);

      if (error instanceof BusinessError) {
        reply.status(400).send({ message: error.message });
        return;
      }

      if (error instanceof NotFoundError) {
        reply.status(404).send({ message: error.message });
        return;
      }

      reply
        .status(500)
        .send({ message: "Internal server error!", error: error.message });
    }
  };
}
