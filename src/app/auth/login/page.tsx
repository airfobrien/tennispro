'use client';

import { useSearchParams } from 'next/navigation';

import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard';
  const error = searchParams.get('error');

  return (
    <div className="mt-8">
      <LoginForm callbackUrl={callbackUrl} error={error} />
    </div>
  );
}
