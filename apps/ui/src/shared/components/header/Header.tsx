"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

import BackButton from "@shared/components/back-button/BackButton";
import { getUser } from "@services/userStorageService";

export interface IHeader {
  showLogo?: boolean;
  title: string;
  showBackButton?: boolean;
  backButtonText?: string;
  actionButton?: React.ReactNode;
  backButtonRoute?: string;
  showUserPhoto?: boolean;
}

export default function Header({
  showLogo = false,
  title,
  showBackButton = false,
  backButtonText,
  backButtonRoute,
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
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-50 px-6 py-2 bg-[#fff5e1]/80 dark:bg-[#121212]/80 backdrop-blur-md border-4 border-black shadow-[8px_8px_0px_#000] header-top-safe-area rounded-2xl">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[100] mix-blend-overlay rounded-2xl" />

        <div className="flex items-center justify-between py-3 relative z-10">
          <div className="flex items-center gap-4">
            {canGoBack && (
              <BackButton
                showBackButton={showBackButton}
                backButtonText={backButtonText}
                backRoute={backButtonRoute}
              />
            )}
            <div
              className="flex items-center justify-center gap-3 min-h-[44px]"
              tabIndex={0}
              role="button"
              aria-label={title}
            >
              {showLogo && (
                <div className="bg-white border-2 border-black p-1 shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000]">
                  <Image src="/img/logo.png" width={28} height={28} alt={""} />
                </div>
              )}
              <h1 className="font-black text-2xl sm:text-4xl uppercase tracking-tighter">
                {title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {actionButton}
            {showUserPhoto && (
              <Link href="/settings">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-main opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                  {userPhoto ? (
                    <Image
                      src={userPhoto}
                      alt="User"
                      width={44}
                      height={44}
                      className="relative w-[44px] h-[44px] object-cover cursor-pointer border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all rounded-full"
                      unoptimized
                    />
                  ) : (
                    <Image
                      src="/img/emoji-cool.png"
                      alt="User"
                      width={44}
                      height={44}
                      className="relative w-[44px] h-[44px] cursor-pointer border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all rounded-full"
                    />
                  )}
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="h-[80px] sm:h-[90px]" />
    </>
  );
}
