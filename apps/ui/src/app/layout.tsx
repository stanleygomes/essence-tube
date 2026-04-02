import type { Viewport, Metadata } from "next";
import { geistSans, geistMono } from "@config/font";
// import "../style/globals.css";
import "@hackernoon/pixel-icon-library/fonts/iconfont.css";
import "@packages/ui/globals.css";

export const metadata: Metadata = {
  title: "EssenceTube",
  description: "",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7ecd7" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

import { SerwistProvider } from "./serwist";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="google-site-verification"
          content="zjHzBow23XhNh-SYFW_B8prT0a_YIOodoR854XReZ34"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#f7ecd7"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#09090b"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SerwistProvider swUrl="/serwist/sw.js">
          <div id="app-container">{children}</div>
        </SerwistProvider>
      </body>
    </html>
  );
}
