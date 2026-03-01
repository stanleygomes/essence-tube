import { Readable, PassThrough } from "stream";
import ytdl from "@distube/ytdl-core";
import ytpl from "ytpl";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import archiver from "archiver";

ffmpeg.setFfmpegPath(ffmpegStatic as unknown as string);

const YOUTUBE_HOSTS = [
  "www.youtube.com",
  "youtube.com",
  "youtu.be",
  "m.youtube.com",
];

export class YoutubeDownloaderService {
  isValidYoutubeUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return YOUTUBE_HOSTS.includes(parsed.hostname);
    } catch {
      return false;
    }
  }

  isPlaylistUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      const list = parsed.searchParams.get("list");
      const v = parsed.searchParams.get("v");
      return !!(list && !v);
    } catch {
      return false;
    }
  }

  isVideoUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      const v = parsed.searchParams.get("v");
      return !!(v || parsed.hostname === "youtu.be");
    } catch {
      return false;
    }
  }

  async videoExists(url: string): Promise<boolean> {
    try {
      await ytdl.getInfo(url);
      return true;
    } catch {
      return false;
    }
  }

  async playlistExists(url: string): Promise<boolean> {
    try {
      await ytpl(url, { limit: 1 });
      return true;
    } catch {
      return false;
    }
  }

  private sanitizeFilename(title: string): string {
    return title.replace(/[^a-zA-Z0-9_\- ]/g, "_");
  }

  async getVideoTitle(url: string): Promise<string> {
    const info = await ytdl.getInfo(url);
    return this.sanitizeFilename(info.videoDetails.title);
  }

  downloadVideo(url: string, format: "mp3" | "mp4"): Readable {
    if (format === "mp4") {
      return ytdl(url, { filter: "videoandaudio", quality: "highest" });
    }

    const audioStream = ytdl(url, {
      filter: "audioonly",
      quality: "highestaudio",
    });
    const passThrough = new PassThrough();

    ffmpeg(audioStream).toFormat("mp3").pipe(passThrough);

    return passThrough;
  }

  async downloadPlaylist(
    url: string,
    format: "mp3" | "mp4",
  ): Promise<Readable> {
    const playlist = await ytpl(url);
    const archive = archiver("zip", { zlib: { level: 5 } });

    for (const item of playlist.items) {
      const videoStream = this.downloadVideo(item.shortUrl, format);
      const ext = format === "mp4" ? "mp4" : "mp3";
      const safeTitle = this.sanitizeFilename(item.title);
      archive.append(videoStream as unknown as import("stream").Readable, {
        name: `${safeTitle}.${ext}`,
      });
    }

    archive.finalize();
    return archive as unknown as Readable;
  }
}
