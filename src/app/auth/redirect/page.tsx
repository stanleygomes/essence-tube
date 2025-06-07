'use client'

import { useSearchParams } from "next/navigation";
import AuthRedirect from "@modules/auth-redirect/page";

export default function AuthRedirectPage() {
  const searchParams = useSearchParams();
  const uuid = searchParams.get('uuid');

  return (
    <AuthRedirect
      sessionId={uuid?.toString()}
    />
  );
}
