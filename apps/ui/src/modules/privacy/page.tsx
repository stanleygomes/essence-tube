"use client";

import Header from "@shared/components/header/Header";
import Card from "@shared/ui/card/Card";

export default function Privacy() {
  return (
    <>
      <Header title="" showBackButton={true} backButtonText="Back" />
      <div className="min-h-screen pb-24 px-4 sm:px-6 relative overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[0] mix-blend-overlay" />

        <div className="max-w-2xl mx-auto relative z-10 py-8">
          <Card className="p-8 border-4 border-black shadow-[8px_8px_0_#000] bg-white dark:bg-[#1a1a1a]">
            <h1 className="font-black text-4xl text-black dark:text-white uppercase tracking-tighter mb-8 pb-4 border-b-4 border-black">
              Privacy Policy
            </h1>

            <div className="space-y-8 font-geist-mono text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              <section>
                <h2 className="font-black text-lg text-black dark:text-white uppercase tracking-tight mb-2">
                  1. Data Accessed
                </h2>
                <p>
                  This application accesses your Google account information,
                  including your name, email address, profile picture, and
                  YouTube data (such as playlists, videos, and subscriptions),
                  through the YouTube API and Google OAuth services.
                </p>
              </section>

              <section>
                <h2 className="font-black text-lg text-black dark:text-white uppercase tracking-tight mb-2">
                  2. How We Use Your Data
                </h2>
                <p>
                  The data accessed from your Google and YouTube accounts is
                  used exclusively to provide the core features of the
                  application, such as displaying your playlists, videos,
                  subscriptions, and allowing you to manage your own YouTube
                  content. We do not use your data for advertising or any other
                  unrelated purposes.
                </p>
              </section>

              <section>
                <h2 className="font-black text-lg text-black dark:text-white uppercase tracking-tight mb-2">
                  3. Data Sharing
                </h2>
                <p>
                  We do not share, transfer, or disclose your Google or YouTube
                  data with any third parties. Your data is only used within
                  this application to provide the requested features.
                </p>
              </section>

              <section>
                <h2 className="font-black text-lg text-black dark:text-white uppercase tracking-tight mb-2">
                  4. Data Protection
                </h2>
                <p>
                  We implement industry-standard security measures to protect
                  your data, including the use of secure HTTPS connections and
                  encrypted storage for authentication tokens.
                </p>
              </section>

              <div className="bg-main/10 p-4 border-2 border-black/20 italic text-xs">
                If you have any questions about this policy or wish to request
                deletion of any data, please contact our support hub.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
