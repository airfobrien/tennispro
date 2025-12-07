import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold tracking-tight text-foreground hover:text-primary transition-colors">
              TennisPro
            </h1>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            Professional Tennis Coaching Platform
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
