import { config } from "@config/config";
import { getAuth } from "@services/authService";

export async function getVideo(id: string) {
  const { baseUrl } = config.api;

  if (typeof window === "undefined") return [];

  const auth = getAuth();
  const uuid = auth?.uuid;

  if (!uuid) return [];

  const res = await fetch(`${baseUrl}/videos/${id}`, {
    headers: {
      uuid,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar video!");
  }

  return res.json();
}
