import axios from "axios";
import { config } from "@config/config";

export async function downloadMedia(
  url: string,
  format: "mp3" | "mp4",
): Promise<void> {
  const response = await axios.post(
    `${config.api.baseUrl}/download`,
    { url, format },
    { responseType: "blob" },
  );

  const disposition: string = response.headers["content-disposition"] ?? "";
  const match = disposition.match(/filename="(.+)"/);
  const filename = match ? match[1] : `download.${format}`;

  const objectUrl = window.URL.createObjectURL(
    new Blob([response.data as BlobPart]),
  );
  const link = document.createElement("a");
  link.href = objectUrl;
  link.setAttribute("download", filename ?? `download.${format}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(objectUrl);
}
