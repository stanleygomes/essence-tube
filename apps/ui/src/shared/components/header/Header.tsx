"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ImageByTheme from "../../ui/image-by-theme/ImageByTheme";
import Image from "next/image";

import BackButton from "@shared/components/back-button/BackButton";
import { getUser } from "@services/userStorageService";
import Typography from "@shared/ui/typography/Typography";

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
      {/* <InstallPrompt /> */}

      <div className="fixed top-0 left-0 w-full z-50 px-6 py-2 bg-theme header-top-safe-area">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            {canGoBack && (
              <BackButton
                showBackButton={showBackButton}
                backButtonText={backButtonText}
                backRoute={backButtonRoute}
              />
            )}
            <div
              className="flex items-center justify-center gap-3 min-h-[40px]"
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
              <Typography
                variant="h1"
                className="font-bold text-2xl sm:text-3xl"
              >
                {title}
              </Typography>
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
                    className="object-cover cursor-pointer active:scale-95 transition shadow-[4px_4px_0_#7a6a4f] active:shadow-none"
                  />
                ) : (
                  <Image
                    src="/img/emoji-cool.png"
                    alt=""
                    width={40}
                    height={40}
                    className="cursor-pointer active:scale-95 transition shadow-[4px_4px_0_#7a6a4f] active:shadow-none"
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
