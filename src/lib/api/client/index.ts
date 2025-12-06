/**
 * API Client - centralized exports
 */

// Core utilities
export { fetcher, fetcherWithMeta, buildQueryString, ApiError } from './fetcher';
export type { ApiResponse, PaginatedResponse } from './fetcher';

// Types
export type * from './types';

// API clients
export { coachApi } from './coach';
export { studentsApi } from './students';
export type { ListStudentsParams } from './students';
export { videosApi } from './videos';
export type { ListVideosParams } from './videos';
export { lessonsApi } from './lessons';
export type { ListLessonsParams } from './lessons';
export { progressionApi } from './progression';
export type { ListProgressionPathsParams } from './progression';
