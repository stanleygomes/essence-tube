"use client";

import Header from "@shared/components/header/Header";
import { removeAuth } from "@services/authService";

export default function Settings() {
  const handleLogout = () => {
    removeAuth();
    window.location.href = "/login";
  };

  return (
    <>
      <Header
        title="Settings"
        showBackButton={true}
      />
      <div className="min-h-screen flex flex-col bg-white dark:bg-black safe-page-content">
        <div className="max-w-md w-full mx-auto flex-1 flex flex-col gap-8 py-8 px-4">
          <section>
            <ul className="rounded-xl shadow-sm divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-neutral-900">
              <li>
                <a
                  href="/terms"
                  className="block py-4 px-4 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-t-xl transition"
                >
                  <span className="text-base text-gray-900 dark:text-gray-100">Termos de Serviço</span>
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="block py-4 px-4 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-b-xl transition"
                >
                  <span className="text-base text-gray-900 dark:text-gray-100">Política de Privacidade</span>
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
        </div>
      </div>
    </>
  );
}
