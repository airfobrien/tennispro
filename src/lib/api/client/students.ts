'use client';

import { fetcher, fetcherWithMeta, buildQueryString, PaginatedResponse } from './fetcher';
import type {
  Student,
  StudentSummary,
  CreateStudentRequest,
  UpdateStudentRequest,
  PlayerCategory,
} from './types';

const BASE_URL = '/api/students';

export interface ListStudentsParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'inactive' | 'archived';
  playerCategory?: PlayerCategory;
  search?: string;
}

/**
 * Student API client functions
 */
export const studentsApi = {
  /**
   * List students with pagination and filters
   */
  list: async (params: ListStudentsParams = {}): Promise<PaginatedResponse<StudentSummary>> => {
    const query = buildQueryString(params as Record<string, string | number | boolean | undefined | null>);
    return fetcherWithMeta<StudentSummary>(`${BASE_URL}${query}`);
  },

  /**
   * Get a single student by ID
   */
  get: async (id: string): Promise<Student> => {
    return fetcher<Student>(`${BASE_URL}/${id}`);
  },

  /**
   * Create a new student
   */
  create: async (data: CreateStudentRequest): Promise<StudentSummary> => {
    return fetcher<StudentSummary>(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update a student
   */
  update: async (id: string, data: UpdateStudentRequest): Promise<StudentSummary> => {
    return fetcher<StudentSummary>(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete (archive) a student
   */
  delete: async (id: string): Promise<{ deleted: boolean }> => {
    return fetcher<{ deleted: boolean }>(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  },
};
