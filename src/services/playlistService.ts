import { config } from "@config/config";
import { getAuth } from "@services/authService";

export async function getPlaylists() {
  const { baseUrl } = config.api;

  if (typeof window === "undefined") return [];

  const auth = getAuth();
  const uuid = auth?.uuid;

  if (!uuid) return [];

  const res = await fetch(`${baseUrl}/playlists`, {
    headers: {
      uuid,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar playlists!");
  }

  return res.json();
}

export async function getPlaylistVideos(id: string) {
  const { baseUrl } = config.api;

  if (typeof window === "undefined") return [];

  const auth = getAuth();
  const uuid = auth?.uuid;

  if (!uuid) return [];

  const res = await fetch(`${baseUrl}/playlists/${id}`, {
    headers: {
      uuid,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar videos desta playlist!");
  }

  return res.json();
}
