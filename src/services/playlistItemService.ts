import { config } from "@config/config";
import { getAuth } from "@services/authService";

export async function removePlaylistVideo(id: string) {
  const { baseUrl } = config.api;

  if (typeof window === "undefined") return [];

  const auth = getAuth();
  const uuid = auth?.uuid;

  if (!uuid) return [];

  const res = await fetch(`${baseUrl}/playlistItems/${id}`, {
    method: "DELETE",
    headers: {
      uuid,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao remover vídeo da playlist!");
  }

  return res.json();
}
