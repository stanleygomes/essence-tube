'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AuthRedirect from '@modules/auth-redirect/page';

function AuthRedirectInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <AuthRedirect sessionToken={token?.toString()} />
  );
}

export default function AuthRedirectPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <AuthRedirectInner />
    </Suspense>
  );
}
