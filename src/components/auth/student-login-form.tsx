'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StudentLoginFormProps {
  callbackUrl?: string;
  coachName?: string;
  error?: string | null;
}

export function StudentLoginForm({
  callbackUrl = '/student',
  coachName,
  error: externalError,
}: StudentLoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await signIn('credentials', {
      email,
      password,
      callbackUrl,
    });

    setIsLoading(false);
  };

  const errorMessage = externalError
    ? externalError === 'CredentialsSignin'
      ? 'Invalid email or password'
      : 'An error occurred during sign in'
    : null;

  return (
    <div className="space-y-6">
      {coachName && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Student portal for
          </p>
          <p className="text-lg font-semibold text-foreground">{coachName}</p>
        </div>
      )}

      {errorMessage && (
        <div className="rounded-md bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="student-email">Email address</Label>
          <Input
            id="student-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="mt-1"
            placeholder="student@example.com"
          />
        </div>

        <div>
          <Label htmlFor="student-password">Password</Label>
          <Input
            id="student-password"
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Student Log In'}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Having trouble? Contact your coach for assistance.
      </p>
    </div>
  );
}
