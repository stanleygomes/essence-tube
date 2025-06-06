'use client';

// import InstallPrompt from '@shared/components/install-prompt/InstallPrompt';
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";

import Image from "next/image";
import { Inter } from "next/font/google";
import ImageByTheme from '../image-by-theme/ImageByTheme';
const inter = Inter({ subsets: ["latin"], weight: ["700"] });

export interface IHeader {
  showLogo?: boolean,
  title: string,
  showBackButton?: boolean,
}

export default function Header({
  showLogo = false,
  title,
  showBackButton = false,
}: IHeader) {
  return (
    <>
      {/* <InstallPrompt /> */}

      <div className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black px-4 py-2">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            {showBackButton && (
              <Link href="/home" className="mr-2 flex items-center justify-center">
                <IoChevronBack className="w-7 h-7 text-gray-900 dark:text-gray-100" />
              </Link>
            )}
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
          <Link href="/settings">
            <Image
              src="https://lh3.googleusercontent.com/ogw/AF2bZyg_DHRXSZz975sqymrYvwo1e41gardmy-QpJ2mvG6M6YDnM=s32-c-mo"
              alt="user photo"
              width={45}
              height={45}
              className="rounded-full border-2 border-gray-300 dark:border-gray-700 cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
