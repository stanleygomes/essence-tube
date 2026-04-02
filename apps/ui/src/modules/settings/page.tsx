"use client";

import React from "react";
import ThemeSelector from "./components/ThemeSelector";
import Header from "@shared/components/header/Header";
import Button from "@shared/ui/button/Button";
import NextImage from "next/image";
import { getUser } from "@services/userStorageService";

export default function Settings() {
  const user = getUser();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen pb-40">
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
                <NextImage
                  src={user.photo_url}
                  alt={user.name || "User"}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <NextImage
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
              <div className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0_#000] mt-2">
                ACTIVE SESSION
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-8 border-4 border-black shadow-[10px_10px_0px_#000]">
            <h2 className="font-black text-3xl uppercase mb-8 tracking-tighter flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white border-2 border-black shadow-[2px_2px_0px_#000]">
                1
              </span>
              Appearance
            </h2>
            <ThemeSelector />
          </div>

          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-8 border-4 border-black shadow-[10px_10px_0px_#000] h-fit">
            <h2 className="font-black text-3xl uppercase mb-8 tracking-tighter flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center bg-yellow-500 text-black border-2 border-black shadow-[2px_2px_0px_#000]">
                2
              </span>
              Permissions
            </h2>
            <div className="space-y-6">
              <div className="p-4 bg-white/50 dark:bg-black/20 border-2 border-black shadow-[4px_4px_0px_#000]">
                <p className="font-black uppercase text-sm mb-1">
                  YouTube Access
                </p>
                <p className="font-geist-mono text-[11px] uppercase font-bold text-yellow-800 dark:text-yellow-300">
                  Full API connectivity established
                </p>
              </div>
              <div className="p-4 bg-white/50 dark:bg-black/20 border-2 border-black shadow-[4px_4px_0px_#000]">
                <p className="font-black uppercase text-sm mb-1">
                  Data Retention
                </p>
                <p className="font-geist-mono text-[11px] uppercase font-bold text-yellow-800 dark:text-yellow-300">
                  Encryption active for local metadata
                </p>
              </div>
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
