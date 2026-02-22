'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setAuth } from "@services/authStorageService";
import Loading from "@shared/ui/loading/Loading";
import { jwtDecode } from "jwt-decode";
import { IUser, setUser } from "@services/userStorageService";

export interface IAuthRedirect {
  sessionToken?: string,
}

export default function AuthRedirect({ sessionToken }: IAuthRedirect) {
  const router = useRouter();

  useEffect(() => {
    if (sessionToken) {
      const payload = jwtDecode<IUser>(sessionToken);

      setAuth({
        token: sessionToken,
      });

      setUser(payload);

      router.replace("/home");
    }
  }, [sessionToken, router]);

  if (!sessionToken) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black">
        <div className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Invalid session. Please try again.
        </div>
        <Link
          href="/login"
          className="px-4 py-2 rounded bg-red-600 text-white font-medium hover:bg-red-700 transition"
        >
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <Loading
      title="Authenticating... Please wait a moment."
    />
  );
}
