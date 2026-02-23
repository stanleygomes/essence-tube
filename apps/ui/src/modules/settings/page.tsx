"use client";

import Header from "@shared/components/header/Header";
import Typography from "@shared/ui/typography/Typography";
import Button from "@shared/ui/button/Button";
import { removeAuth } from "@services/authStorageService";
import { getUser } from "@services/userStorageService";
import Image from "next/image";
import { useEffect, useState } from "react";
import pkg from '../../../package.json';
import Card from "@shared/ui/card/Card";

export default function Settings() {
  const [user, setUser] = useState<{
    uuid: string;
    name: string;
    email: string;
    photo_url: string;
  } | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    removeAuth();
    window.location.href = "/login";
  };

  return (
    <>
      <Header title="Settings" showBackButton={true} showUserPhoto={false} />
      <div className="min-h-screen flex flex-col">
        <div className="max-w-md w-full mx-auto flex-1 flex flex-col gap-8 py-8 px-4">
          {user && (
            <Card className="gap-4 mb-6 p-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
                {user.photo_url ? (
                  <Image
                    src={user.photo_url}
                    alt={user.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Image
                    src="/img/emoji-cool.png"
                    alt=""
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <Typography variant="h3" className="truncate mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {user.name}
                </Typography>
                <Typography variant="span" className="truncate text-sm text-gray-600 dark:text-gray-300">
                  {user.email}
                </Typography>
                <Typography variant="span" className="mt-1 select-all truncate text-xs text-gray-400 dark:text-gray-500">
                  {user.uuid}
                </Typography>
                <div className="mt-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-green-600 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 15.172l8.95-8.95 1.414 1.414L10 18 3.636 11.636l1.414-1.414z" />
                  </svg>
                  <Typography variant="span" className="font-medium text-green-600 dark:text-green-400">
                    YouTube account connected!
                  </Typography>
                </div>
              </div>
            </Card>
          )}

          <section>
            <Typography variant="h4" className="mb-5 mx-4 text-sm text-gray-900 dark:text-gray-100">
              More links
            </Typography>
            <ul className="divide-y divide-[#3a2c1a] dark:divide-[#3a2c1a] bg-white text-[#3a2c1a] shadow-[4px_4px_0_#c2b8a3] dark:bg-[#3a2c1a] dark:text-[#f7ecd7] dark:shadow-[4px_4px_0_#7a6a4f]">
              <li>
                <a
                  href="/terms"
                  className="block py-4 px-4 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-t-xl transition"
                >
                  <Typography variant="span" className="text-base text-gray-900 dark:text-gray-100">
                    Terms of Service
                  </Typography>
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="block py-4 px-4 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-b-xl transition"
                >
                  <Typography variant="span" className="text-base text-gray-900 dark:text-gray-100">
                    Privacy Policy
                  </Typography>
                </a>
              </li>
            </ul>
          </section>

          <section className="mt-8">
            <Button
              onClick={handleLogout}
              color="red"
              className="w-full text-base py-3 rounded-lg font-semibold shadow"
            >
              Logout
            </Button>
          </section>

          <section className="mt-8">
            <Typography variant="span" className="w-full text-center text-xs text-gray-400 dark:text-gray-600 pb-4">
              Versão do app: {pkg.version}
            </Typography>
          </section>
        </div>
      </div>
    </>
  );
}
