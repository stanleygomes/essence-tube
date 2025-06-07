'use client';

// import InstallPrompt from '@shared/components/install-prompt/InstallPrompt';
import Link from "next/link";
import { IoChevronBack, IoClose, IoPersonCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Image from "next/image";
import { Inter } from "next/font/google";
import ImageByTheme from '../image-by-theme/ImageByTheme';
const inter = Inter({ subsets: ["latin"], weight: ["700"] });

export interface IHeader {
  showLogo?: boolean,
  title: string,
  showBackButton?: boolean,
  action?: React.ReactNode,
}

function BackOrCloseButton({
  showBackButton,
  canGoBack,
}: {
  showBackButton: boolean;
  canGoBack: boolean;
}) {
  const router = useRouter();

  if (!showBackButton) return null;

  return canGoBack ? (
    <button
      type="button"
      onClick={() => router.back()}
      className="mr-2 flex items-center justify-center"
      aria-label="Voltar"
    >
      <IoChevronBack className="w-7 h-7 text-gray-900 dark:text-gray-100" />
    </button>
  ) : (
    <Link
      href="/home"
      className="mr-2 flex items-center justify-center"
      aria-label="Fechar"
    >
      <IoClose className="w-7 h-7 text-gray-900 dark:text-gray-100" />
    </Link>
  );
}

export default function Header({
  showLogo = false,
  title,
  showBackButton = false,
  action,
}: IHeader) {
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanGoBack(window.history.length > 1);
    }
  }, []);

  return (
    <>
      {/* <InstallPrompt /> */}

      <div className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black px-4 py-2">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <BackOrCloseButton showBackButton={showBackButton} canGoBack={canGoBack} />
            {showLogo && (
              <ImageByTheme
                srcDark="/img/logo-dark.png"
                srcLight="/img/logo-light.png"
                width={50}
                height={50}
                classNameLight="block dark:hidden"
                classNameDark="hidden dark:block"
              />
            )}
            <span className={`text-xl font-bold text-gray-900 dark:text-gray-100 ${inter.className}`}>
              {title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {action}
            <Link href="/settings">
              <IoPersonCircleOutline
                className="w-11 h-11 text-gray-400 dark:text-gray-600 cursor-pointer"
                aria-label="Perfil do usuário"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
