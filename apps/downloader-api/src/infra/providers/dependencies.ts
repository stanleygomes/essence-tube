import { YoutubeDownloaderService } from "../services/youtube-downloader.service.js";
import { DownloadMediaUseCase } from "../../application/usecases/download-media-use-case.js";
import { SQLiteDownloadHistoryRepository } from "../database/sqlite/download-history.repository.js";

const youtubeDownloaderService = new YoutubeDownloaderService();
const downloadHistoryRepository = new SQLiteDownloadHistoryRepository();
const downloadMediaUseCase = new DownloadMediaUseCase(
  youtubeDownloaderService,
  downloadHistoryRepository,
);

export { downloadMediaUseCase };
