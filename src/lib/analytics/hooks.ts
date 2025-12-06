'use client';

import { useCallback } from 'react';

import {
  trackEvent,
  identifyUser,
  type AnalyticsEvent,
  type AnalyticsProperties,
} from './index';

// Hook for tracking events
export function useAnalytics() {
  const track = useCallback(
    (event: AnalyticsEvent, properties?: AnalyticsProperties) => {
      trackEvent(event, properties);
    },
    []
  );

  const identify = useCallback(
    (userId: string, traits?: AnalyticsProperties) => {
      identifyUser(userId, traits);
    },
    []
  );

  // Pre-built tracking functions for common events
  const trackVideoUpload = useCallback(
    (videoId: string, studentId?: string) => {
      track('video_uploaded', { video_id: videoId, student_id: studentId });
    },
    [track]
  );

  const trackVideoAnalysis = useCallback(
    (videoId: string, strokeType?: string) => {
      track('video_analyzed', { video_id: videoId, stroke_type: strokeType });
    },
    [track]
  );

  const trackStudentCreated = useCallback(
    (studentId: string, source?: string) => {
      track('student_created', { student_id: studentId, source });
    },
    [track]
  );

  const trackMilestoneCompleted = useCallback(
    (studentId: string, pathId: string, milestoneName: string) => {
      track('milestone_completed', {
        student_id: studentId,
        path_id: pathId,
        milestone_name: milestoneName,
      });
    },
    [track]
  );

  const trackLessonScheduled = useCallback(
    (lessonId: string, studentId: string) => {
      track('lesson_scheduled', {
        lesson_id: lessonId,
        student_id: studentId,
      });
    },
    [track]
  );

  const trackFeatureUsed = useCallback(
    (featureName: string, properties?: AnalyticsProperties) => {
      track('feature_used', { feature: featureName, ...properties });
    },
    [track]
  );

  return {
    track,
    identify,
    trackVideoUpload,
    trackVideoAnalysis,
    trackStudentCreated,
    trackMilestoneCompleted,
    trackLessonScheduled,
    trackFeatureUsed,
  };
}
