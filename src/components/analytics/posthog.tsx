'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';

// Initialize PostHog
if (typeof window !== 'undefined' && POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: false, // We'll handle this manually
    capture_pageleave: true,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') {
        posthog.debug();
      }
    },
  });
}

// Page view tracking component
function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && POSTHOG_KEY) {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture('$pageview', { $current_url: url });
    }
  }, [pathname, searchParams]);

  return null;
}

// Provider component
interface PostHogProviderProps {
  children: React.ReactNode;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  if (!POSTHOG_KEY) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}

// Export posthog instance for direct use
export { posthog };

// Helper functions for common events
export const posthogEvents = {
  // Identify user
  identify: (userId: string, properties?: Record<string, unknown>) => {
    if (POSTHOG_KEY) {
      posthog.identify(userId, properties);
    }
  },

  // Reset user (on logout)
  reset: () => {
    if (POSTHOG_KEY) {
      posthog.reset();
    }
  },

  // Feature flag check
  isFeatureEnabled: (flag: string): boolean => {
    if (!POSTHOG_KEY) return false;
    return posthog.isFeatureEnabled(flag) ?? false;
  },

  // Custom events
  capture: (event: string, properties?: Record<string, unknown>) => {
    if (POSTHOG_KEY) {
      posthog.capture(event, properties);
    }
  },
};
