'use client';

// import InstallPrompt from '@shared/components/install-prompt/InstallPrompt';
import Link from "next/link";
import { useEffect, useState } from "react";

import { Inter } from "next/font/google";
import ImageByTheme from '../../ui/image-by-theme/ImageByTheme';
import Image from "next/image";
import BackButton from "@shared/components/back-button/BackButton";
const inter = Inter({ subsets: ["latin"], weight: ["700"] });

export interface IHeader {
  showLogo?: boolean,
  title: string,
  showBackButton?: boolean,
  backButtonText?: string,
  actionButton?: React.ReactNode,
}

export default function Header({
  showLogo = false,
  title,
  showBackButton = false,
  backButtonText,
  actionButton,
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

      <div className="fixed top-0 left-0 w-full z-50 px-6 py-2 bg-white dark:bg-black">
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
            <Link href="/settings">
              <Image
                src="/img/emoji-cool.png"
                alt={''}
                width={40}
                height={40}
                className="cursor-pointer active:scale-95 transition"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
