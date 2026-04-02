/// <reference lib="webworker" />
import { defaultCache } from "@serwist/next/worker";
import { Serwist, type SerwistGlobalConfig } from "serwist";

declare const self: ServiceWorkerGlobalScope & SerwistGlobalConfig;

const serwist = new Serwist({
  precacheEntries: (self as any).__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();

self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || "/icon.png",
      badge: "/badge.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "2",
      },
    } as NotificationOptions & { vibrate?: number[] };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification click received.");
  event.notification.close();
  event.waitUntil(self.clients.openWindow("<https://your-website.com>"));
});
