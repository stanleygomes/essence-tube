'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AuthRedirect from '@modules/auth-redirect/page';

function AuthRedirectInner() {
  const searchParams = useSearchParams();
  const uuid = searchParams.get('uuid');

  return (
    <AuthRedirect sessionId={uuid?.toString()} />
  );
}

export default function AuthRedirectPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <AuthRedirectInner />
    </Suspense>
  );
}
