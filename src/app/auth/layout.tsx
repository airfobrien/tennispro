import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 hover:text-primary dark:text-white dark:hover:text-primary transition-colors">
              TennisPro
            </h1>
          </Link>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Professional Tennis Coaching Platform
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
