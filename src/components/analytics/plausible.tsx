'use client';

import Script from 'next/script';

interface PlausibleAnalyticsProps {
  domain?: string;
  enabled?: boolean;
}

export function PlausibleAnalytics({
  domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  enabled = process.env.NODE_ENV === 'production',
}: PlausibleAnalyticsProps) {
  if (!domain || !enabled) {
    return null;
  }

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}

// Plausible custom event tracking
declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> }
    ) => void;
  }
}

export function trackEvent(
  event: string,
  props?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(event, { props });
  }
}

// Common events
export const analyticsEvents = {
  // Auth events
  signUp: (method: string) => trackEvent('Sign Up', { method }),
  login: (method: string) => trackEvent('Login', { method }),
  logout: () => trackEvent('Logout'),

  // Conversion events
  startTrial: (plan: string) => trackEvent('Start Trial', { plan }),
  subscribe: (plan: string, interval: string) =>
    trackEvent('Subscribe', { plan, interval }),

  // Feature usage
  uploadVideo: (strokeType: string) =>
    trackEvent('Upload Video', { stroke_type: strokeType }),
  analyzeVideo: () => trackEvent('Analyze Video'),
  addStudent: () => trackEvent('Add Student'),

  // Engagement
  viewPricing: () => trackEvent('View Pricing'),
  viewFeatures: () => trackEvent('View Features'),
  contactSales: () => trackEvent('Contact Sales'),
};
