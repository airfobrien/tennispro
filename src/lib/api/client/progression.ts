'use client';

import { fetcher, fetcherWithMeta, buildQueryString, PaginatedResponse } from './fetcher';
import type {
  ProgressionPath,
  ProgressionPathDetails,
  CreateProgressionPathRequest,
  UpdateProgressionPathRequest,
  PlayerCategory,
} from './types';

const BASE_URL = '/api/progression/paths';

export interface ListProgressionPathsParams {
  page?: number;
  limit?: number;
  playerCategory?: PlayerCategory;
  includeSystem?: boolean;
  templatesOnly?: boolean;
}

/**
 * Progression Paths API client functions
 */
export const progressionApi = {
  /**
   * List progression paths with pagination and filters
   */
  list: async (
    params: ListProgressionPathsParams = {}
  ): Promise<PaginatedResponse<ProgressionPath>> => {
    const query = buildQueryString(params as Record<string, string | number | boolean | undefined | null>);
    return fetcherWithMeta<ProgressionPath>(`${BASE_URL}${query}`);
  },

  /**
   * Get a single progression path by ID with full hierarchy
   */
  get: async (id: string): Promise<ProgressionPathDetails> => {
    return fetcher<ProgressionPathDetails>(`${BASE_URL}/${id}`);
  },

  /**
   * Create a new progression path (optionally from a template)
   */
  create: async (data: CreateProgressionPathRequest): Promise<ProgressionPath> => {
    return fetcher<ProgressionPath>(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update a progression path
   */
  update: async (id: string, data: UpdateProgressionPathRequest): Promise<ProgressionPath> => {
    return fetcher<ProgressionPath>(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete a progression path
   */
  delete: async (id: string): Promise<{ deleted: boolean }> => {
    return fetcher<{ deleted: boolean }>(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  },
};
