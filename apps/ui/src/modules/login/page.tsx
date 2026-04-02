"use client";

import { config } from "@config/config";
import { Card, CardContent } from "@packages/ui/card";
import { Icon } from "@packages/ui/icon";
import { Badge } from "@packages/ui/badge";
import Marquee from "@packages/ui/marquee";
import Image from "next/image";

import { useEffect, useState } from "react";

export default function Login() {
  const { baseUrl } = config.api;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    console.log("EssenceTube Login Page - API Base URL:", baseUrl);
  }, [baseUrl]);

  const handleLogin = (e: React.MouseEvent) => {
    console.log("Login button clicked! Redirecting to:", `${baseUrl}/login`, e);
    if (!baseUrl) {
      console.warn(
        "Base URL is not defined. Falling back to local /api/login?",
      );
    }
  };

  const marqueeItems = [
    "NO ALGORITHMS",
    "NO DISTRACTIONS",
    "YOUR FEED",
    "YOUR CONTROL",
    "100% PRIVATE",
    "ESSENTIAL YOUTUBE",
  ];

  return (
    <div className="min-h-screen bg-[#fff5e1] dark:bg-[#121212] flex flex-col font-base selection:bg-main selection:text-main-foreground overflow-x-hidden relative">
      {/* Texture Overlay - Lowered z-index to avoid blocking clicks */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[0] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <header className="relative z-10 pt-20 pb-16 px-6 flex flex-col items-center text-center overflow-hidden">
        {/* Floating Decorators */}
        <div className="absolute top-10 left-[10%] -rotate-12 animate-bounce-slow hidden md:block">
          <Badge
            variant="default"
            className="text-xl py-2 px-6 border-4 border-black shadow-[4px_4px_0px_#000] bg-yellow-400 text-black font-black uppercase tracking-tighter"
          >
            v1.8.0
          </Badge>
        </div>

        <div className="absolute top-20 right-[15%] rotate-6 animate-pulse hidden md:block">
          <Icon icon="lucide:sparkles" className="w-12 h-12 text-main" />
        </div>

        <div className="relative mb-10 group">
          <div className="absolute -inset-4 bg-main rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <Image
            src="/img/logo.png"
            width={160}
            height={160}
            alt="EssenceTube Logo"
            className="relative transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:drop-shadow-[8px_8px_0px_rgba(255,255,255,0.1)]"
          />
          <div className="absolute -bottom-4 -right-10 rotate-12">
            <Badge className="bg-red-500 text-white border-4 border-black shadow-[4px_4px_0px_#000] font-black text-lg py-1 px-4 uppercase italic">
              Essential
            </Badge>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-pixelify-sans leading-none mb-6 tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
          EssenceTube
        </h1>

        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-xl md:text-3xl font-geist-mono font-bold leading-tight uppercase tracking-tight">
            Stop the infinite scroll. <br />
            <span className="bg-main text-white px-4 py-1 inline-block -rotate-1 transform shadow-[4px_4px_0px_#000] border-2 border-black mt-2">
              Reclaim your time.
            </span>
          </p>
        </div>

        <div className="relative w-full max-w-lg mx-auto z-50 px-4 group">
          {/* Blur background now with pointer-events-none */}
          <div className="absolute -inset-2 bg-main rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity animate-pulse pointer-events-none" />

          <a
            href={isMounted ? `${baseUrl}/login` : "#"}
            onClick={(e) => {
              handleLogin(e);
              // Force navigation just in case
              if (baseUrl) {
                window.location.href = `${baseUrl}/login`;
              }
            }}
            className="relative z-10 w-full py-8 text-xl md:text-2xl font-black bg-main text-white border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] active:translate-x-[12px] active:translate-y-[12px] active:shadow-none transition-all duration-200 uppercase tracking-tighter flex items-center justify-center gap-4 group cursor-pointer"
          >
            Sign in with Google
            <Icon
              icon="lucide:arrow-right"
              className="w-6 h-6 md:w-10 md:h-10 opacity-50 group-hover:translate-x-2 transition-transform"
            />
          </a>
        </div>
      </header>

      <div className="py-2 border-y-4 border-black bg-white dark:bg-black relative z-10">
        <Marquee items={marqueeItems} />
      </div>

      <main className="max-w-6xl mx-auto w-full px-6 py-24 mb-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "No Algorithms",
              desc: "Purely user-driven. No manipulation, no rabbit holes.",
              icon: "lucide:zap-off",
              color: "bg-[#ff9494]",
              rotate: "-rotate-1",
            },
            {
              title: "Your Circles",
              desc: "Simple subscription feed. Focus on creators you love.",
              icon: "lucide:heart",
              color: "bg-[#a0e7e5]",
              rotate: "rotate-1",
            },
            {
              title: "Privacy First",
              desc: "No tracking, no data selling. Your data, your rules.",
              icon: "lucide:shield-check",
              color: "bg-[#b4f8c8]",
              rotate: "-rotate-2",
            },
            {
              title: "Essential Only",
              desc: "Minimalist interface built for productivity and focus.",
              icon: "lucide:layout-template",
              color: "bg-[#fbe7c6]",
              rotate: "rotate-2",
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className={`${feature.color} border-4 border-black shadow-[8px_8px_0px_#000] transform ${feature.rotate} hover:rotate-0 transition-transform duration-300 h-full`}
            >
              <CardContent className="p-8 flex flex-col h-full">
                <div className="bg-white border-4 border-black p-4 inline-block mb-6 shadow-[4px_4px_0px_#000]">
                  <Icon icon={feature.icon} className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-black font-pixelify-sans mb-4 uppercase tracking-tighter">
                  {feature.title}
                </h3>
                <p className="text-lg font-geist-mono font-bold leading-snug opacity-90">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-32 flex flex-col items-center gap-12 font-geist-mono">
          <div className="w-32 h-4 bg-black/10 dark:bg-white/10 rounded-full" />
          <div className="flex flex-wrap justify-center gap-12 text-lg font-black uppercase tracking-widest">
            <a
              href="/terms"
              className="hover:text-main hover:underline decoration-4 transition-all pb-1"
            >
              Terms of Service
            </a>
            <a
              href="/privacy"
              className="hover:text-main hover:underline decoration-4 transition-all pb-1"
            >
              Privacy Policy
            </a>
          </div>
          <p className="max-w-md text-center text-sm font-bold opacity-30 mt-8">
            &copy; 2026 ESSENCETUBE. <br />
          </p>
        </div>
      </main>

      <div
        className="fixed inset-0 -z-50 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}
