'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

/**
 * Hook to get the current user session
 * Returns the session data and loading state
 */
export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isAuthenticated: !!session?.user,
    isLoading: status === 'loading',
    accessToken: session?.accessToken,
  };
}

/**
 * Hook to require authentication
 * Redirects to login if not authenticated
 */
export function useRequireAuth(redirectTo = '/auth/login') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  return { isAuthenticated, isLoading };
}

/**
 * Hook to get the current coach ID
 * Useful for data fetching that requires coach context
 */
export function useCoachId() {
  const { user } = useAuth();
  return user?.coachId;
}

/**
 * Hook to check if user has a specific role
 */
export function useHasRole(role: string) {
  const { user } = useAuth();
  return user?.role === role;
}

/**
 * Hook to check subscription tier
 */
export function useTier() {
  const { user } = useAuth();
  return user?.tier;
}
