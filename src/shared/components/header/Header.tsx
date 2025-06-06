'use client';

import InstallPrompt from '@shared/components/install-prompt/InstallPrompt';
import Link from "next/link";

import Image from "next/image";
import { Inter } from "next/font/google";
import ImageByTheme from '../image-by-theme/ImageByTheme';
const inter = Inter({ subsets: ["latin"], weight: ["700"] });

export interface IHeader {
  title: string,
  photoUrl: string,
}

export default function Header({
  title,
  photoUrl,
}: IHeader) {
  return (
    <>
      <InstallPrompt />

      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <ImageByTheme
            srcDark="/img/logo-dark.png"
            srcLight="/img/logo-light.png"
            width={50}
            height={50}
            classNameLight="block dark:hidden"
            classNameDark="hidden dark:block"
          />
          <span className={`text-xl font-bold text-gray-900 dark:text-gray-100 ${inter.className}`}>
            {title}
          </span>
        </div>
        <Link href="/settings">
          <Image
            src={photoUrl}
            alt="user photo"
            width={45}
            height={45}
            className="rounded-full border-2 border-gray-300 dark:border-gray-700 cursor-pointer"
          />
        </Link>
      </div>
    </>
  );
}
