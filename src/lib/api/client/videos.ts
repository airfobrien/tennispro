'use client';

import { fetcher, fetcherWithMeta, buildQueryString, PaginatedResponse } from './fetcher';
import type {
  Video,
  VideoDetails,
  CreateVideoRequest,
  UpdateVideoRequest,
  StrokeType,
} from './types';

const BASE_URL = '/api/videos';

export interface ListVideosParams {
  page?: number;
  limit?: number;
  studentId?: string;
  strokeType?: StrokeType;
  status?: 'uploaded' | 'processing' | 'analyzed';
}

/**
 * Video API client functions
 */
export const videosApi = {
  /**
   * List videos with pagination and filters
   */
  list: async (params: ListVideosParams = {}): Promise<PaginatedResponse<Video>> => {
    const query = buildQueryString(params as Record<string, string | number | boolean | undefined | null>);
    return fetcherWithMeta<Video>(`${BASE_URL}${query}`);
  },

  /**
   * Get a single video by ID
   */
  get: async (id: string): Promise<VideoDetails> => {
    return fetcher<VideoDetails>(`${BASE_URL}/${id}`);
  },

  /**
   * Create a video record (after uploading to S3)
   */
  create: async (data: CreateVideoRequest): Promise<Video> => {
    return fetcher<Video>(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update a video
   */
  update: async (id: string, data: UpdateVideoRequest): Promise<Video> => {
    return fetcher<Video>(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete a video
   */
  delete: async (id: string): Promise<{ deleted: boolean }> => {
    return fetcher<{ deleted: boolean }>(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  },
};
