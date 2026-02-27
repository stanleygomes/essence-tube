import type { Metadata } from "next";
import "../style/globals.css";

export const metadata: Metadata = {
  title: "EssenceTube Downloader",
  description: "Download YouTube videos and playlists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div id="app-container">{children}</div>
      </body>
    </html>
  );
}
