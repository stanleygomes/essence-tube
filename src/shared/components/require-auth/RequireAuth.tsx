'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "@services/authService";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = getAuth();
      if (!auth) {
        router.replace("/login");
      } else {
        setChecked(true);
      }
    }
  }, [router]);

  if (!checked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}
