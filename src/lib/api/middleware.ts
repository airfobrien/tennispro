import { NextRequest } from 'next/server';
import { z } from 'zod';

import { auth } from '@/lib/auth';

import { errors } from './response';

/**
 * Get the authenticated session from a request
 * Returns null if not authenticated
 */
export async function getSession() {
  const session = await auth();
  return session;
}

/**
 * Require authentication for an API route
 * Returns the session if authenticated, or throws an error response
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session?.user) {
    throw errors.unauthorized();
  }

  return session;
}

/**
 * Require a specific coach ID for an API route
 * Ensures the authenticated user is the coach they're trying to access
 */
export async function requireCoach(coachId: string) {
  const session = await requireAuth();

  if (session.user.coachId !== coachId) {
    throw errors.forbidden();
  }

  return session;
}

/**
 * Validate request body against a Zod schema
 */
export async function validateBody<T extends z.ZodType>(
  request: NextRequest,
  schema: T
): Promise<z.infer<T>> {
  try {
    const body = await request.json();
    return schema.parse(body);
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw errors.validationError(err.issues);
    }
    throw errors.badRequest('Invalid JSON body');
  }
}

/**
 * Validate query parameters against a Zod schema
 */
export function validateQuery<T extends z.ZodType>(
  request: NextRequest,
  schema: T
): z.infer<T> {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());

  try {
    return schema.parse(params);
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw errors.validationError(err.issues);
    }
    throw errors.badRequest('Invalid query parameters');
  }
}

/**
 * Parse pagination parameters
 */
export function getPagination(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

/**
 * Wrapper for API route handlers with error handling
 */
export function withErrorHandling<T>(
  handler: (request: NextRequest, context: T) => Promise<Response>
) {
  return async (request: NextRequest, context: T): Promise<Response> => {
    try {
      return await handler(request, context);
    } catch (err) {
      // If it's already a NextResponse (from our error helpers), return it
      if (err instanceof Response) {
        return err;
      }

      // Log unexpected errors
      console.error('API Error:', err);

      // Return generic error for unexpected exceptions
      return errors.internal();
    }
  };
}
