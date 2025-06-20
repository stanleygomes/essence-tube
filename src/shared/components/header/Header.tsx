'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import ImageByTheme from '../../ui/image-by-theme/ImageByTheme';
import Image from "next/image";
import BackButton from "@shared/components/back-button/BackButton";
import { getUser } from "@services/userStorageService";

const inter = Inter({ subsets: ["latin"], weight: ["700"] });

export interface IHeader {
  showLogo?: boolean,
  title: string,
  showBackButton?: boolean,
  backButtonText?: string,
  actionButton?: React.ReactNode,
  showUserPhoto?: boolean,
}

export default function Header({
  showLogo = false,
  title,
  showBackButton = false,
  backButtonText,
  actionButton,
  showUserPhoto = true,
}: IHeader) {
  const [canGoBack, setCanGoBack] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanGoBack(window.history.length > 1);

      const user = getUser();
      if (user && user.photo_url) {
        setUserPhoto(user.photo_url);
      } else {
        setUserPhoto(null);
      }
    }
  }, []);

  return (
    <>
      {/* <InstallPrompt /> */}

      <div className="fixed top-0 left-0 w-full z-50 px-6 py-2 bg-white/80 dark:bg-black/80 backdrop-blur glass-effect header-top-safe-area shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.10)]">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            {canGoBack && (
              <BackButton showBackButton={showBackButton} backButtonText={backButtonText} />
            )}
            <div
              className="flex items-center gap-2"
              tabIndex={0}
              role="button"
              aria-label={title}
            >
              {showLogo && (
                <ImageByTheme
                  srcDark="/img/logo-dark.png"
                  srcLight="/img/logo-light.png"
                  width={25}
                  height={25}
                  classNameLight="block dark:hidden"
                  classNameDark="hidden dark:block"
                />
              )}
              <span className={`text-xl font-bold text-gray-900 dark:text-gray-100 ${inter.className}`}>
                {title}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {actionButton}
            {showUserPhoto && (
              <Link href="/settings">
                {userPhoto ? (
                  <Image
                    src={userPhoto}
                    alt="Foto do usuário"
                    width={40}
                    height={40}
                    className="rounded-full object-cover cursor-pointer active:scale-95 transition border-2 border-red-500"
                  />
                ) : (
                  <Image
                    src="/img/emoji-cool.png"
                    alt=""
                    width={40}
                    height={40}
                    className="cursor-pointer active:scale-95 transition"
                  />
                )}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
