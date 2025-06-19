import { config } from "@config/config";
import { HttpClient } from "@shared/services/http-client";

const { baseUrl } = config.api;
const http = new HttpClient(baseUrl!);

export async function getVideo(id: string) {
  if (typeof window === "undefined") return [];
  return http.get(`/videos/${id}`);
}
