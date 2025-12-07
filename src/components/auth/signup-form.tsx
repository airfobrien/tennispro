'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SignupFormProps {
  callbackUrl?: string;
  onSwitchToLogin?: () => void;
}

export function SignupForm({
  callbackUrl = '/onboarding',
  onSwitchToLogin,
}: SignupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      // For now, redirect to Cognito hosted UI for signup
      // In production, we'd use Cognito's SignUp API directly
      await signIn('cognito', { callbackUrl });
    } catch {
      setError('An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCognitoSignup = async () => {
    setIsLoading(true);
    await signIn('cognito', { callbackUrl });
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="signup-name">Full name</Label>
          <Input
            id="signup-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1"
            placeholder="John Smith"
          />
        </div>

        <div>
          <Label htmlFor="signup-email">Email address</Label>
          <Input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1"
            placeholder="coach@example.com"
          />
        </div>

        <div>
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
            className="mt-1"
            placeholder="••••••••"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Must be at least 8 characters with uppercase, lowercase, and numbers
          </p>
        </div>

        <div>
          <Label htmlFor="signup-confirmPassword">Confirm password</Label>
          <Input
            id="signup-confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1"
            placeholder="••••••••"
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create account'}
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
        onClick={handleCognitoSignup}
        disabled={isLoading}
      >
        Sign up with Cognito
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        {onSwitchToLogin ? (
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign in
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign in
          </Link>
        )}
      </p>

      <p className="text-center text-xs text-muted-foreground">
        By signing up, you agree to our{' '}
        <Link href="/terms" className="text-primary hover:text-primary/80 underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-primary hover:text-primary/80 underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
