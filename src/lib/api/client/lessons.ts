'use client';

import { fetcher, fetcherWithMeta, buildQueryString, PaginatedResponse } from './fetcher';
import type {
  Lesson,
  LessonDetails,
  CreateLessonRequest,
  UpdateLessonRequest,
} from './types';

const BASE_URL = '/api/lessons';

export interface ListLessonsParams {
  page?: number;
  limit?: number;
  studentId?: string;
  type?: 'private' | 'semi_private' | 'group' | 'clinic';
  startDate?: string;
  endDate?: string;
}

/**
 * Lesson API client functions
 */
export const lessonsApi = {
  /**
   * List lessons with pagination and filters
   */
  list: async (params: ListLessonsParams = {}): Promise<PaginatedResponse<Lesson>> => {
    const query = buildQueryString(params as Record<string, string | number | boolean | undefined | null>);
    return fetcherWithMeta<Lesson>(`${BASE_URL}${query}`);
  },

  /**
   * Get a single lesson by ID
   */
  get: async (id: string): Promise<LessonDetails> => {
    return fetcher<LessonDetails>(`${BASE_URL}/${id}`);
  },

  /**
   * Create a new lesson
   */
  create: async (data: CreateLessonRequest): Promise<Lesson> => {
    return fetcher<Lesson>(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update a lesson
   */
  update: async (id: string, data: UpdateLessonRequest): Promise<Lesson> => {
    return fetcher<Lesson>(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete a lesson
   */
  delete: async (id: string): Promise<{ deleted: boolean }> => {
    return fetcher<{ deleted: boolean }>(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  },
};
