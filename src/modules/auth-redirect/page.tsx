'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setAuth } from "@services/authService";
import Loading from "@shared/ui/loading/Loading";

export interface IAuthRedirect {
  sessionId?: string,
}

export default function AuthRedirect({ sessionId }: IAuthRedirect) {
  const router = useRouter();

  useEffect(() => {
    if (sessionId) {
      setAuth({ uuid: sessionId });
      router.replace("/home");
    }
  }, [sessionId, router]);

  if (!sessionId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black">
        <div className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Sessão inválida. Por favor, tente novamente.
        </div>
        <Link
          href="/login"
          className="px-4 py-2 rounded bg-red-600 text-white font-medium hover:bg-red-700 transition"
        >
          Ir para login
        </Link>
      </div>
    );
  }

  return (
    <Loading
      title="Autenticando... Aguarde um momento."
    />
  );
}
