'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginFormProps {
  callbackUrl?: string;
  error?: string | null;
  onSwitchToSignup?: () => void;
}

export function LoginForm({
  callbackUrl = '/dashboard',
  error: externalError,
  onSwitchToSignup,
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await signIn('credentials', {
      email,
      password,
      callbackUrl,
    });

    setIsLoading(false);
  };

  const handleCognitoLogin = async () => {
    setIsLoading(true);
    await signIn('cognito', { callbackUrl });
  };

  const errorMessage = externalError
    ? externalError === 'CredentialsSignin'
      ? 'Invalid email or password'
      : 'An error occurred during sign in'
    : null;

  return (
    <div className="space-y-6">
      {errorMessage && (
        <div className="rounded-md bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleCredentialsLogin} className="space-y-4">
        <div>
          <Label htmlFor="login-email">Email address</Label>
          <Input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="mt-1"
            placeholder="coach@example.com"
          />
        </div>

        <div>
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="mt-1"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary hover:text-primary/80"
          >
            Forgot your password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Coaches Log In'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleCognitoLogin}
        disabled={isLoading}
      >
        Sign in with Cognito
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        {onSwitchToSignup ? (
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign up
          </button>
        ) : (
          <Link
            href="/auth/signup"
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign up
          </Link>
        )}
      </p>
    </div>
  );
}
