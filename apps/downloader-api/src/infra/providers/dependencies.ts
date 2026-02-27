import { YoutubeDownloaderService } from "../services/youtube-downloader.service.js";
import { DownloadMediaUseCase } from "../../application/usecases/download-media-use-case.js";

const youtubeDownloaderService = new YoutubeDownloaderService();
const downloadMediaUseCase = new DownloadMediaUseCase(youtubeDownloaderService);

export { downloadMediaUseCase };
