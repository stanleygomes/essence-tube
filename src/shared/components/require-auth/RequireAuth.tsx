'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "@services/authStorageService";
import Loading from "@shared/ui/loading/Loading";

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
        <Loading title="Autenticando..." />
      </div>
    );
  }

  return <>{children}</>;
}
