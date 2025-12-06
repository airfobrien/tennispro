import { NextRequest } from 'next/server';
import { z } from 'zod';

import {
  errors,
  success,
  paginated,
  requireAuth,
  validateBody,
  validateQuery,
  getPagination,
  withErrorHandling,
} from '@/lib/api';
import prisma from '@/lib/db';

// Query schema for listing paths
const listPathsSchema = z.object({
  includeSystem: z.enum(['true', 'false']).optional(),
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

// Schema for creating a progression path
const createPathSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(1000).optional().nullable(),
  playerCategory: z.enum([
    'recreational',
    'competitive_junior',
    'collegiate_track',
    'professional_track',
    'senior',
  ]),
  isTemplate: z.boolean().optional(),
  templateSource: z.enum(['uspta', 'ptr', 'custom']).optional(),
});

/**
 * GET /api/progression/paths
 * List all progression paths (coach's own + system templates)
 */
export const GET = withErrorHandling(async (request: NextRequest) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  const { page, limit, skip } = getPagination(request);
  const filters = validateQuery(request, listPathsSchema);

  const includeSystem = filters.includeSystem !== 'false';

  // Build where clause
  const where = {
    OR: [{ coachId }, ...(includeSystem ? [{ isSystem: true }] : [])],
    ...(filters.playerCategory && { playerCategory: filters.playerCategory }),
  };

  const [paths, total] = await Promise.all([
    prisma.progressionPath.findMany({
      where,
      skip,
      take: limit,
      orderBy: [{ isSystem: 'desc' }, { name: 'asc' }],
      select: {
        id: true,
        name: true,
        description: true,
        playerCategory: true,
        isTemplate: true,
        templateSource: true,
        isSystem: true,
        createdAt: true,
        _count: {
          select: {
            levels: true,
            students: true,
          },
        },
      },
    }),
    prisma.progressionPath.count({ where }),
  ]);

  return paginated(paths, page, limit, total);
});

/**
 * POST /api/progression/paths
 * Create a new progression path
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  const data = await validateBody(request, createPathSchema);

  const path = await prisma.progressionPath.create({
    data: {
      ...data,
      coachId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      playerCategory: true,
      isTemplate: true,
      templateSource: true,
      createdAt: true,
    },
  });

  return success(path);
});
