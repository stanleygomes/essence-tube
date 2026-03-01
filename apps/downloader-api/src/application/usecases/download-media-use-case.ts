import { Readable } from "stream";
import { BusinessError } from "../../domain/errors/BusinessError.js";
import { NotFoundError } from "../../domain/errors/NotFoundError.js";
import { DownloadRequest } from "../../domain/entities/download-request.entity.js";
import { DownloadHistoryRepository } from "../../domain/port/databases/download-history.repository.js";
import { YoutubeDownloaderService } from "../../infra/services/youtube-downloader.service.js";
import { Logger } from "../../infra/logger/pino.logger.js";

export interface DownloadResult {
  stream: Readable;
  filename: string;
  contentType: string;
  isPlaylist: boolean;
  onComplete: () => void;
}

export class DownloadMediaUseCase {
  private logger = Logger.getLogger();

  constructor(
    private readonly youtubeDownloaderService: YoutubeDownloaderService,
    private readonly downloadHistoryRepository: DownloadHistoryRepository,
  ) {}

  async execute(request: DownloadRequest): Promise<DownloadResult> {
    const { url, format } = request;

    if (!url || !format) {
      throw new BusinessError("URL and format are required.");
    }

    if (!this.youtubeDownloaderService.isValidYoutubeUrl(url)) {
      throw new BusinessError("Invalid YouTube URL.");
    }

    const isPlaylist = this.youtubeDownloaderService.isPlaylistUrl(url);
    const isVideo = this.youtubeDownloaderService.isVideoUrl(url);

    if (!isPlaylist && !isVideo) {
      throw new BusinessError("URL must point to a YouTube video or playlist.");
    }

    if (isPlaylist) {
      const exists = await this.youtubeDownloaderService.playlistExists(url);
      if (!exists) {
        throw new NotFoundError("Playlist not found or unavailable.");
      }

      this.logger.info({ url, format }, "Downloading playlist");
      const stream = await this.youtubeDownloaderService.downloadPlaylist(
        url,
        format,
      );

      return {
        stream,
        filename: "playlist.zip",
        contentType: "application/zip",
        isPlaylist: true,
        onComplete: () =>
          this.downloadHistoryRepository.save({
            url,
            format,
            type: "playlist",
            filename: "playlist.zip",
          }),
      };
    }

    const exists = await this.youtubeDownloaderService.videoExists(url);
    if (!exists) {
      throw new NotFoundError("Video not found or unavailable.");
    }

    this.logger.info({ url, format }, "Downloading video");
    const title = await this.youtubeDownloaderService.getVideoTitle(url);
    const ext = format === "mp4" ? "mp4" : "mp3";
    const contentType = format === "mp4" ? "video/mp4" : "audio/mpeg";
    const filename = `${title}.${ext}`;
    const stream = this.youtubeDownloaderService.downloadVideo(url, format);

    return {
      stream,
      filename,
      contentType,
      isPlaylist: false,
      onComplete: () =>
        this.downloadHistoryRepository.save({
          url,
          format,
          type: "video",
          filename,
        }),
    };
  }
}
