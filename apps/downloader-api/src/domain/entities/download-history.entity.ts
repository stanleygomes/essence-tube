export interface DownloadHistory {
  id?: number;
  url: string;
  format: "mp3" | "mp4";
  type: "video" | "playlist";
  filename: string;
  created_at?: string;
}
