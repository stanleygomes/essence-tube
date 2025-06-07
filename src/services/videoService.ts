import { config } from "@config/config";
import { getAuth } from "@services/authService";

export async function getWatchLaterVideos() {
  const { baseUrl } = config.api;

  if (typeof window === "undefined") return [];

  const auth = getAuth();
  const uuid = auth?.uuid;

  if (!uuid) return [];

  const res = await fetch(`${baseUrl}/videos/watchLater`, {
    headers: {
      uuid,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar vídeos");
  }

  return res.json();
}
