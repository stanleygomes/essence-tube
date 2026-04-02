"use client";

import React from "react";
import Header from "@shared/components/header/Header";
import Button from "@shared/ui/button/Button";
import Image from "next/image";
import { getUser } from "@services/userStorageService";

export default function Settings() {
  const user = getUser();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen pb-32">
      <Header
        title="Settings"
        showBackButton={true}
        backButtonRoute="/home"
        showUserPhoto={false}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 py-10 pt-14">
        <div className="bg-white dark:bg-[#1a1a1a] border-4 border-black p-8 shadow-[12px_12px_0px_#000] mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative w-32 h-32 rounded-full border-4 border-black overflow-hidden shadow-[6px_6px_0px_#000] bg-main/10 flex items-center justify-center">
              {user?.photo_url ? (
                <Image
                  src={user.photo_url}
                  alt={user.name || "User"}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <Image
                  src="/img/emoji-cool.png"
                  alt="User"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover p-4"
                />
              )}
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <h1 className="font-black text-4xl uppercase tracking-tighter">
                {user?.name || "ANONYMOUS USER"}
              </h1>
              <p className="font-geist-mono font-bold text-gray-500 uppercase tracking-widest text-sm">
                {user?.email || "No signal detected"}
              </p>
              <div className="inline-block bg-green-100 text-green-800 px-3 py-1 border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0_#000] mt-2">
                ACTIVE SESSION
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-6 border-4 border-black shadow-[8px_8px_0px_#000]">
            <h2 className="font-black text-2xl uppercase mb-4 tracking-tighter">
              Appearance
            </h2>
            <div className="space-y-4">
              <p className="font-geist-mono text-xs uppercase font-bold text-blue-800 dark:text-blue-300">
                System automatically adapts to your terminal preference.
              </p>
            </div>
          </div>

          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-6 border-4 border-black shadow-[8px_8px_0px_#000]">
            <h2 className="font-black text-2xl uppercase mb-4 tracking-tighter">
              Permissions
            </h2>
            <div className="space-y-4">
              <p className="font-geist-mono text-xs uppercase font-bold text-yellow-800 dark:text-yellow-300">
                Access to Youtube Playlists and Subscriptions verified.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t-4 border-black pt-12">
          <Button
            color="red"
            onClick={handleLogout}
            className="w-full py-6 text-xl shadow-[8px_8px_0px_#000]"
          >
            TERMINATE SESSION
          </Button>
          <p className="text-center font-geist-mono text-[10px] uppercase text-gray-500 mt-4 tracking-widest">
            Warning: This will clear all local buffers and security tokens.
          </p>
        </div>
      </div>
    </div>
  );
}
