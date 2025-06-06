'use client';

import Image from "next/image";

// Importe a fonte Inter do Google Fonts (Next.js App Router)
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], weight: ["700"] });

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
      {/* Logo para modo claro */}
      <Image
        src="/img/logo-light.png"
        alt="Logo EssenceTube"
        width={120}
        height={120}
        className="mb-6 block dark:hidden"
        priority
      />
      {/* Logo para modo escuro */}
      <Image
        src="/img/logo-dark.png"
        alt="Logo EssenceTube (dark)"
        width={120}
        height={120}
        className="mb-6 hidden dark:block"
        priority
      />
      <span
        className={`mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 ${inter.className}`}
      >
        EssenceTube
      </span>
      <p className="mb-8 text-center text-gray-700 dark:text-gray-200 px-8">
        Para visualizar seus vídeos, faça login com sua conta do YouTube.
      </p>
      <a
        href="/api/auth/google"
        target="_blank"
      >
        <button type="button" className="px-6 py-3 bg-red-600 text-white rounded shadow hover:bg-red-700 transition">
          Login com Google
        </button>
      </a>
    </div>
  );
}
