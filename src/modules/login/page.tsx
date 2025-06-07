import { Inter } from "next/font/google";
import ImageByTheme from "@shared/components/image-by-theme/ImageByTheme";
import { config } from '@config/config'

const inter = Inter({ subsets: ["latin"], weight: ["700"] });

export default function Login() {
  const { baseUrl } = config.api;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
      <ImageByTheme
        srcDark="/img/logo-dark.png"
        srcLight="/img/logo-light.png"
        width={120}
        height={120}
        classNameLight="mb-6 block dark:hidden"
        classNameDark="mb-6 hidden dark:block"
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
        href={`${baseUrl}/login`}
        target="_blank"
      >
        <button type="button" className="px-6 py-3 bg-red-600 text-white rounded shadow hover:bg-red-700 transition">
          Login com Google
        </button>
      </a>
    </div>
  );
}
