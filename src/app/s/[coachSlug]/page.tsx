'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { StudentLoginForm } from '@/components/auth/student-login-form';

// Mock coach data for development - maps slug to coach info
// In production, this would be fetched from the database
const mockCoachData: Record<string, { name: string; coachId: string }> = {
  'demo-coach': {
    name: 'Demo Coach',
    coachId: 'coach-uuid-001',
  },
  'starter-coach': {
    name: 'Starter Coach',
    coachId: 'coach-uuid-003',
  },
};

interface StudentLoginPageProps {
  params: Promise<{ coachSlug: string }>;
}

export default function StudentLoginPage({ params }: StudentLoginPageProps) {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  // Use React.use() pattern for async params in Next.js 15+
  const { coachSlug } = params as unknown as { coachSlug: string };

  const coachData = mockCoachData[coachSlug];

  if (!coachData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="mx-auto w-full max-w-md space-y-8 p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Coach Not Found</h1>
            <p className="mt-2 text-muted-foreground">
              The coach link you followed may be incorrect.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block text-primary hover:text-primary/80"
            >
              Return to homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold text-primary">TennisPro</span>
          </Link>
          <h2 className="mt-4 text-xl font-semibold text-foreground">
            Student Portal
          </h2>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <StudentLoginForm
            coachName={coachData.name}
            callbackUrl="/student"
            error={error}
          />
        </div>

        <p className="text-center text-xs text-muted-foreground">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="text-primary hover:text-primary/80">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-primary hover:text-primary/80">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
