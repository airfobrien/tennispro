import { NextRequest } from 'next/server';
import { z } from 'zod';

import { errors, success, requireAuth, validateBody, withErrorHandling } from '@/lib/api';
import prisma from '@/lib/db';

type RouteContext = { params: Promise<{ id: string }> };

// Schema for updating a path
const updatePathSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(1000).optional().nullable(),
  playerCategory: z
    .enum([
      'recreational',
      'competitive_junior',
      'collegiate_track',
      'professional_track',
      'senior',
    ])
    .optional(),
});

/**
 * Verify the path belongs to the authenticated coach (or is a system path for reading)
 */
async function verifyPathAccess(pathId: string, coachId: string, allowSystem = true) {
  const path = await prisma.progressionPath.findFirst({
    where: {
      id: pathId,
      OR: [{ coachId }, ...(allowSystem ? [{ isSystem: true }] : [])],
    },
  });

  if (!path) {
    throw errors.notFound('Progression path');
  }

  return path;
}

/**
 * GET /api/progression/paths/[id]
 * Get a progression path with full hierarchy (levels, skills, milestones)
 */
export const GET = withErrorHandling(async (_request: NextRequest, context: RouteContext) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;
  const { id } = await context.params;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  const path = await prisma.progressionPath.findFirst({
    where: {
      id,
      OR: [{ coachId }, { isSystem: true }],
    },
    select: {
      id: true,
      name: true,
      description: true,
      playerCategory: true,
      isTemplate: true,
      templateSource: true,
      isSystem: true,
      createdAt: true,
      updatedAt: true,
      levels: {
        orderBy: { order: 'asc' },
        select: {
          id: true,
          name: true,
          description: true,
          order: true,
          skills: {
            orderBy: { order: 'asc' },
            select: {
              id: true,
              name: true,
              description: true,
              category: true,
              order: true,
              milestones: {
                orderBy: { order: 'asc' },
                select: {
                  id: true,
                  name: true,
                  description: true,
                  order: true,
                  targetMetrics: true,
                },
              },
            },
          },
        },
      },
      _count: {
        select: { students: true },
      },
    },
  });

  if (!path) {
    throw errors.notFound('Progression path');
  }

  return success(path);
});

/**
 * PATCH /api/progression/paths/[id]
 * Update a progression path (only coach's own paths)
 */
export const PATCH = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;
  const { id } = await context.params;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  const path = await verifyPathAccess(id, coachId, false);

  if (path.isSystem) {
    throw errors.forbidden();
  }

  const data = await validateBody(request, updatePathSchema);

  const updated = await prisma.progressionPath.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      description: true,
      playerCategory: true,
      updatedAt: true,
    },
  });

  return success(updated);
});

/**
 * DELETE /api/progression/paths/[id]
 * Delete a progression path (only coach's own paths with no students)
 */
export const DELETE = withErrorHandling(async (_request: NextRequest, context: RouteContext) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;
  const { id } = await context.params;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  const path = await prisma.progressionPath.findFirst({
    where: { id, coachId },
    select: { isSystem: true, _count: { select: { students: true } } },
  });

  if (!path) {
    throw errors.notFound('Progression path');
  }

  if (path.isSystem) {
    throw errors.forbidden();
  }

  if (path._count.students > 0) {
    throw errors.badRequest('Cannot delete a path with assigned students');
  }

  await prisma.progressionPath.delete({ where: { id } });

  return success({ deleted: true });
});
