import type { Viewport, Metadata } from "next";
import { pixelify, geistSans, geistMono } from "@config/font";
import "../style/globals.css";
import "@hackernoon/pixel-icon-library/fonts/iconfont.css";

export const metadata: Metadata = {
  title: "EssenceTube",
  description: "",
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7ecd7" },
    { media: "(prefers-color-scheme: dark)", color: "#3a2c1a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

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
          content="#ffffff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#18181b"
        />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body
        className={`${pixelify.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id="app-container">{children}</div>
      </body>
    </html>
  );
}
