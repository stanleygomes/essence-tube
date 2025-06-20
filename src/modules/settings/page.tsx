"use client";

import Header from "@shared/components/header/Header";
import { removeAuth } from "@services/authStorageService";
import { getUser } from "@services/userStorageService";
import Image from "next/image";
import { useEffect, useState } from "react";
import pkg from '../../../package.json';

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
      <Header
        title="Settings"
        showBackButton={true}
        showUserPhoto={false}
      />
      <div className="min-h-screen flex flex-col bg-white dark:bg-black">
        <div className="max-w-md w-full mx-auto flex-1 flex flex-col gap-8 py-8 px-4">
          {user && (
            <section className="flex flex-row items-center gap-4 mb-6 bg-white dark:bg-neutral-900 rounded-xl shadow p-4">
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
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">{user.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 truncate">{user.email}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 select-all truncate">{user.uuid}</div>
                <div className="mt-2 flex items-center gap-2 text-xs text-green-600 dark:text-green-400 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 15.172l8.95-8.95 1.414 1.414L10 18 3.636 11.636l1.414-1.414z"/>
                  </svg>
                  Conta conectada ao YouTube
                </div>
              </div>
            </section>
          )}

          <section>
            <h2 className="text-sm mb-5 mx-4 text-gray-900 dark:text-gray-100">More links</h2>
            <ul className="rounded-xl shadow-sm divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-neutral-900">
              <li>
                <a
                  href="/terms"
                  className="block py-4 px-4 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-t-xl transition"
                >
                  <span className="text-base text-gray-900 dark:text-gray-100">Terms of Service</span>
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="block py-4 px-4 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-b-xl transition"
                >
                  <span className="text-base text-gray-900 dark:text-gray-100">Privacy Policy</span>
                </a>
              </li>
            </ul>
          </section>

          <section className="mt-8">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white text-base py-3 rounded-lg font-semibold shadow hover:bg-red-700 transition"
            >
              Logout
            </button>
          </section>

          <section className="mt-8">
            <div className="w-full text-center text-xs text-gray-400 dark:text-gray-600 pb-4">
              Versão do app: {pkg.version}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
