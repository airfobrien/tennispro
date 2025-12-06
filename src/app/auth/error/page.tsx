'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

const errorMessages: Record<string, string> = {
  Configuration: 'There is a problem with the server configuration.',
  AccessDenied: 'You do not have permission to sign in.',
  Verification: 'The verification link may have expired or already been used.',
  OAuthSignin: 'Error in constructing an authorization URL.',
  OAuthCallback: 'Error in handling the response from OAuth provider.',
  OAuthCreateAccount: 'Could not create OAuth provider user in the database.',
  EmailCreateAccount: 'Could not create email provider user in the database.',
  Callback: 'Error in the OAuth callback handler route.',
  OAuthAccountNotLinked:
    'Email already exists with a different provider. Try signing in with the original provider.',
  EmailSignin: 'Check your email address.',
  CredentialsSignin: 'Sign in failed. Check that your credentials are correct.',
  SessionRequired: 'Please sign in to access this page.',
  Default: 'An unexpected error occurred.',
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessage = error ? errorMessages[error] ?? errorMessages.Default : errorMessages.Default;

  return (
    <div className="mt-8 space-y-6 text-center">
      <div className="rounded-md bg-red-50 p-6 dark:bg-red-900/20">
        <h2 className="text-lg font-semibold text-red-800 dark:text-red-200">
          Authentication Error
        </h2>
        <p className="mt-2 text-sm text-red-700 dark:text-red-400">{errorMessage}</p>
      </div>

      <div className="flex flex-col gap-3">
        <Button asChild>
          <Link href="/auth/login">Try again</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>

      {error && (
        <p className="text-xs text-gray-500 dark:text-gray-400">Error code: {error}</p>
      )}
    </div>
  );
}
