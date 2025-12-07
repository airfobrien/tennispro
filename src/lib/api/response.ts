import { NextResponse } from 'next/server';

/**
 * Standard API response format
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    hasMore?: boolean;
  };
}

/**
 * Create a successful response
 */
export function success<T>(data: T, meta?: ApiResponse['meta']): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    ...(meta && { meta }),
  });
}

/**
 * Create a paginated response
 */
export function paginated<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): NextResponse<ApiResponse<T[]>> {
  return NextResponse.json({
    success: true,
    data,
    meta: {
      page,
      limit,
      total,
      hasMore: page * limit < total,
    },
  });
}

/**
 * Create an error response
 */
export function error(
  code: string,
  message: string,
  status: number = 400,
  details?: unknown
): NextResponse<ApiResponse<never>> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(details !== undefined ? { details } : {}),
      },
    },
    { status }
  );
}

/**
 * Common error responses
 */
export const errors = {
  unauthorized: () => error('UNAUTHORIZED', 'Authentication required', 401),

  forbidden: (message: string = 'You do not have permission to access this resource') =>
    error('FORBIDDEN', message, 403),

  notFound: (resource: string = 'Resource') =>
    error('NOT_FOUND', `${resource} not found`, 404),

  badRequest: (message: string, details?: unknown) =>
    error('BAD_REQUEST', message, 400, details),

  validationError: (details: unknown) =>
    error('VALIDATION_ERROR', 'Invalid request data', 400, details),

  conflict: (message: string) => error('CONFLICT', message, 409),

  internal: (message: string = 'An unexpected error occurred') =>
    error('INTERNAL_ERROR', message, 500),

  rateLimit: () => error('RATE_LIMIT_EXCEEDED', 'Too many requests', 429),
};
