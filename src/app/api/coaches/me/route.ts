import { NextRequest } from 'next/server';
import { z } from 'zod';

import { errors, success, requireAuth, validateBody, withErrorHandling } from '@/lib/api';
import prisma from '@/lib/db';

// Schema for updating coach profile
const updateCoachSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens')
    .optional(),
});

/**
 * GET /api/coaches/me
 * Get the current authenticated coach's profile
 */
export const GET = withErrorHandling(async () => {
  const session = await requireAuth();
  const coachId = session.user.coachId;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  const coach = await prisma.coach.findUnique({
    where: { id: coachId },
    select: {
      id: true,
      email: true,
      name: true,
      slug: true,
      tier: true,
      studentLimit: true,
      storageLimit: true,
      analysisLimit: true,
      analysisCount: true,
      storageUsed: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          students: true,
          videos: true,
          progressionPaths: true,
        },
      },
    },
  });

  if (!coach) {
    throw errors.notFound('Coach');
  }

  return success(coach);
});

/**
 * PATCH /api/coaches/me
 * Update the current authenticated coach's profile
 */
export const PATCH = withErrorHandling(async (request: NextRequest) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  const data = await validateBody(request, updateCoachSchema);

  // Check if slug is unique if being updated
  if (data.slug) {
    const existing = await prisma.coach.findFirst({
      where: {
        slug: data.slug,
        NOT: { id: coachId },
      },
    });

    if (existing) {
      throw errors.conflict('This URL slug is already taken');
    }
  }

  const coach = await prisma.coach.update({
    where: { id: coachId },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      slug: true,
      tier: true,
      updatedAt: true,
    },
  });

  return success(coach);
});
