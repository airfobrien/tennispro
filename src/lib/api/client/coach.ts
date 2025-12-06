'use client';

import { fetcher } from './fetcher';
import type { Coach } from './types';

const BASE_URL = '/api/coaches';

/**
 * Coach API client functions
 */
export const coachApi = {
  /**
   * Get the current coach's profile
   */
  getMe: async (): Promise<Coach> => {
    return fetcher<Coach>(`${BASE_URL}/me`);
  },

  /**
   * Update the current coach's profile
   */
  updateMe: async (data: { name?: string; slug?: string }): Promise<Coach> => {
    return fetcher<Coach>(`${BASE_URL}/me`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};
