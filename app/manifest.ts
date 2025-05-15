import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EssenceTube",
    short_name: "EssenceTube",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#003630300000",
    icons: [
      {
        src: "/img/icon-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/img/icon-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
      {
        src: "/img/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  };
}
