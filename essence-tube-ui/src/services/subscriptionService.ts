import { config } from "@config/config";
import { HttpClient } from "../shared/services/http-client";

const { baseUrl } = config.api;
const http = new HttpClient(baseUrl!);

export async function getChannels() {
  if (typeof window === "undefined") return [];
  return http.get("/subscriptions");
}

export async function getChannelVideos(id: string) {
  if (typeof window === "undefined") return [];
  return http.get(`/subscriptions/videos/${id}`);
}
