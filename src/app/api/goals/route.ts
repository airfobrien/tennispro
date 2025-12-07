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

// Query schema for listing goals
const listGoalsSchema = z.object({
  status: z.enum(['in_progress', 'achieved', 'paused', 'abandoned']).optional(),
  category: z.enum(['skill_improvement', 'competition', 'rating', 'fitness', 'custom']).optional(),
});

// Schema for creating a goal
const createGoalSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional().nullable(),
  category: z.enum(['skill_improvement', 'competition', 'rating', 'fitness', 'custom']),
  targetDate: z.string().datetime().optional().nullable(),
  linkedMilestoneId: z.string().uuid().optional().nullable(),
  coachVisible: z.boolean().optional().default(true),
});

/**
 * GET /api/goals
 * List all goals for the authenticated student
 */
export const GET = withErrorHandling(async (request: NextRequest) => {
  const session = await requireAuth();
  const studentId = session.user.studentId;

  if (!studentId) {
    throw errors.forbidden('Only students can access goals');
  }

  const { page, limit, skip } = getPagination(request);
  const filters = validateQuery(request, listGoalsSchema);

  // Build where clause
  const where = {
    studentId,
    ...(filters.status && { status: filters.status }),
    ...(filters.category && { category: filters.category }),
  };

  // Get goals and total count
  const [goals, total] = await Promise.all([
    prisma.studentGoal.findMany({
      where,
      skip,
      take: limit,
      orderBy: [{ status: 'asc' }, { targetDate: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        targetDate: true,
        status: true,
        progress: true,
        coachNotes: true,
        coachVisible: true,
        linkedMilestone: {
          select: {
            id: true,
            name: true,
            skill: {
              select: { id: true, name: true },
            },
          },
        },
        achievedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.studentGoal.count({ where }),
  ]);

  return paginated(goals, page, limit, total);
});

/**
 * POST /api/goals
 * Create a new goal for the authenticated student
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  const session = await requireAuth();
  const studentId = session.user.studentId;

  if (!studentId) {
    throw errors.forbidden('Only students can create goals');
  }

  const data = await validateBody(request, createGoalSchema);

  // If linked to a milestone, verify it exists
  if (data.linkedMilestoneId) {
    const milestone = await prisma.milestone.findUnique({
      where: { id: data.linkedMilestoneId },
    });
    if (!milestone) {
      throw errors.notFound('Milestone');
    }
  }

  const goal = await prisma.studentGoal.create({
    data: {
      ...data,
      studentId,
      targetDate: data.targetDate ? new Date(data.targetDate) : null,
    },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      targetDate: true,
      status: true,
      progress: true,
      coachVisible: true,
      linkedMilestone: {
        select: {
          id: true,
          name: true,
        },
      },
      createdAt: true,
    },
  });

  return success(goal);
});
