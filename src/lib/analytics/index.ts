// Analytics utilities for event tracking
// Supports PostHog for product analytics

export type AnalyticsEvent =
  // Video events
  | 'video_uploaded'
  | 'video_viewed'
  | 'video_analyzed'
  | 'video_comparison_viewed'
  // Student events
  | 'student_created'
  | 'student_updated'
  | 'student_deleted'
  | 'student_imported'
  // Progress events
  | 'progression_path_created'
  | 'progression_path_updated'
  | 'milestone_completed'
  | 'skill_achieved'
  // Lesson events
  | 'lesson_scheduled'
  | 'lesson_completed'
  | 'lesson_cancelled'
  // Coach events
  | 'coach_profile_updated'
  | 'coach_service_added'
  // Auth events
  | 'user_signed_up'
  | 'user_logged_in'
  | 'user_logged_out'
  // Feature usage
  | 'feature_used'
  | 'search_performed'
  | 'filter_applied';

export interface AnalyticsProperties {
  [key: string]: string | number | boolean | undefined;
}

// Track an analytics event
export function trackEvent(
  event: AnalyticsEvent,
  properties?: AnalyticsProperties
): void {
  if (typeof window === 'undefined') return;

  // PostHog tracking (if available)
  const posthog = (window as unknown as { posthog?: { capture: (event: string, props?: AnalyticsProperties) => void } }).posthog;
  if (posthog?.capture) {
    posthog.capture(event, properties);
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, properties);
  }
}

// Identify a user for analytics
export function identifyUser(
  userId: string,
  traits?: AnalyticsProperties
): void {
  if (typeof window === 'undefined') return;

  const posthog = (window as unknown as { posthog?: { identify: (id: string, traits?: AnalyticsProperties) => void } }).posthog;
  if (posthog?.identify) {
    posthog.identify(userId, traits);
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Identify:', userId, traits);
  }
}

// Reset user identity (on logout)
export function resetAnalytics(): void {
  if (typeof window === 'undefined') return;

  const posthog = (window as unknown as { posthog?: { reset: () => void } }).posthog;
  if (posthog?.reset) {
    posthog.reset();
  }
}

// Track page views
export function trackPageView(path?: string): void {
  if (typeof window === 'undefined') return;

  const pagePath = path || window.location.pathname;

  const posthog = (window as unknown as { posthog?: { capture: (event: string, props?: AnalyticsProperties) => void } }).posthog;
  if (posthog?.capture) {
    posthog.capture('$pageview', { path: pagePath });
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Page view:', pagePath);
  }
}

// Feature flag check (PostHog)
export function isFeatureEnabled(featureKey: string): boolean {
  if (typeof window === 'undefined') return false;

  const posthog = (window as unknown as { posthog?: { isFeatureEnabled: (key: string) => boolean } }).posthog;
  if (posthog?.isFeatureEnabled) {
    return posthog.isFeatureEnabled(featureKey);
  }

  return false;
}

// Timing helper for performance tracking
export function trackTiming(
  category: string,
  name: string,
  duration: number
): void {
  trackEvent('feature_used', {
    category,
    name,
    duration_ms: duration,
    type: 'timing',
  });
}
