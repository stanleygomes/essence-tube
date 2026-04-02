import { config } from "@config/config";
import { HttpClient } from "@shared/services/http-client";

const { baseUrl } = config.api;
const http = new HttpClient(baseUrl!);

export async function getPlaylists() {
  if (typeof window === "undefined") return [];
  return http.get("/playlists");
}

export async function getPlaylistVideos(id: string) {
  if (typeof window === "undefined") return [];
  return http.get(`/playlists/${id}`);
}

export async function removePlaylistVideo(playlistItemId: string) {
  if (typeof window === "undefined") return [];
  return http.delete(`/playlists/video?id=${playlistItemId}`);
}

export async function addVideoToPlaylist(playlistId: string, videoId: string) {
  if (typeof window === "undefined") return [];
  return http.post(
    `/playlists/video?playlistId=${playlistId}&videoId=${videoId}`,
  );
}
