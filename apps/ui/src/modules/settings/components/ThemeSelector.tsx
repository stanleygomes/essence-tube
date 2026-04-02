"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BsSun, BsMoon, BsLaptop } from "react-icons/bs";
import clsx from "clsx";

const themes = [
  {
    id: "light",
    name: "Light Mode",
    icon: BsSun,
    color: "bg-white",
    textColor: "text-black",
  },
  {
    id: "dark",
    name: "Dark Mode",
    icon: BsMoon,
    color: "bg-[#1a1a1a]",
    textColor: "text-white",
  },
  {
    id: "system",
    name: "Automatic",
    icon: BsLaptop,
    color: "bg-gradient-to-br from-white to-[#1a1a1a]",
    textColor: "text-white",
  },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="grid grid-cols-1 gap-4">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={clsx(
            "flex items-center gap-4 p-4 border-4 border-black transition-all group",
            "shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]",
            theme === t.id
              ? "bg-main scale-[1.02]"
              : "bg-white dark:bg-[#1a1a1a]",
          )}
        >
          <div
            className={clsx(
              "w-10 h-10 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]",
              t.color,
            )}
          >
            <t.icon
              className={clsx(
                "w-5 h-5",
                t.id === "system" ? "text-white" : t.textColor,
              )}
            />
          </div>
          <div className="flex-1 text-left">
            <span className="font-black uppercase tracking-tighter text-lg block">
              {t.name}
            </span>
            <span className="font-geist-mono text-[10px] uppercase font-bold text-gray-500 block">
              {t.id === "system"
                ? "Syncs with your terminal preferences"
                : `Force ${t.id} aesthetic`}
            </span>
          </div>
          {theme === t.id && (
            <div className="w-8 h-8 bg-black border-2 border-white rounded-full shadow-[2px_2px_0px_rgba(0,0,0,0.1)]" />
          )}
        </button>
      ))}
    </div>
  );
}
