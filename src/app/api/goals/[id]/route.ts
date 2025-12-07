import { NextRequest } from 'next/server';
import { z } from 'zod';

import {
  errors,
  success,
  requireAuth,
  validateBody,
  withErrorHandling,
} from '@/lib/api';
import prisma from '@/lib/db';

type RouteParams = { params: Promise<{ id: string }> };

// Schema for updating a goal
const updateGoalSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional().nullable(),
  category: z.enum(['skill_improvement', 'competition', 'rating', 'fitness', 'custom']).optional(),
  targetDate: z.string().datetime().optional().nullable(),
  status: z.enum(['in_progress', 'achieved', 'paused', 'abandoned']).optional(),
  progress: z.number().min(0).max(100).optional(),
  coachVisible: z.boolean().optional(),
  linkedMilestoneId: z.string().uuid().optional().nullable(),
});

// Schema for adding coach notes
const coachNoteSchema = z.object({
  coachNotes: z.string().max(2000),
});

/**
 * GET /api/goals/[id]
 * Get a specific goal
 */
export const GET = withErrorHandling(async (_request: NextRequest, { params }: RouteParams) => {
  const session = await requireAuth();
  const { id } = await params;
  const studentId = session.user.studentId;
  const coachId = session.user.coachId;

  const goal = await prisma.studentGoal.findUnique({
    where: { id },
    include: {
      student: {
        select: { id: true, name: true, coachId: true },
      },
      linkedMilestone: {
        select: {
          id: true,
          name: true,
          skill: {
            select: { id: true, name: true, level: { select: { id: true, name: true } } },
          },
        },
      },
    },
  });

  if (!goal) {
    throw errors.notFound('Goal');
  }

  // Check authorization: student owns it, or coach of the student
  const isOwner = studentId === goal.studentId;
  const isCoach = coachId === goal.student.coachId;

  if (!isOwner && !isCoach) {
    throw errors.forbidden('You do not have access to this goal');
  }

  // Students can only see coach-visible goals of others (edge case)
  if (studentId && !isOwner && !goal.coachVisible) {
    throw errors.forbidden('This goal is private');
  }

  return success(goal);
});

/**
 * PUT /api/goals/[id]
 * Update a goal (student only for their own goals)
 */
export const PUT = withErrorHandling(async (request: NextRequest, { params }: RouteParams) => {
  const session = await requireAuth();
  const { id } = await params;
  const studentId = session.user.studentId;

  if (!studentId) {
    throw errors.forbidden('Only students can update their goals');
  }

  const goal = await prisma.studentGoal.findUnique({
    where: { id },
    select: { id: true, studentId: true, status: true },
  });

  if (!goal) {
    throw errors.notFound('Goal');
  }

  if (goal.studentId !== studentId) {
    throw errors.forbidden('You can only update your own goals');
  }

  const data = await validateBody(request, updateGoalSchema);

  // If changing to achieved, set achievedAt
  const achievedAt =
    data.status === 'achieved' && goal.status !== 'achieved'
      ? new Date()
      : data.status !== 'achieved' && goal.status === 'achieved'
        ? null
        : undefined;

  // If linked to a milestone, verify it exists
  if (data.linkedMilestoneId) {
    const milestone = await prisma.milestone.findUnique({
      where: { id: data.linkedMilestoneId },
    });
    if (!milestone) {
      throw errors.notFound('Milestone');
    }
  }

  const updatedGoal = await prisma.studentGoal.update({
    where: { id },
    data: {
      ...data,
      targetDate: data.targetDate !== undefined
        ? (data.targetDate ? new Date(data.targetDate) : null)
        : undefined,
      ...(achievedAt !== undefined && { achievedAt }),
    },
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
        select: { id: true, name: true },
      },
      achievedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return success(updatedGoal);
});

/**
 * DELETE /api/goals/[id]
 * Delete a goal (student only for their own goals)
 */
export const DELETE = withErrorHandling(async (_request: NextRequest, { params }: RouteParams) => {
  const session = await requireAuth();
  const { id } = await params;
  const studentId = session.user.studentId;

  if (!studentId) {
    throw errors.forbidden('Only students can delete their goals');
  }

  const goal = await prisma.studentGoal.findUnique({
    where: { id },
    select: { id: true, studentId: true },
  });

  if (!goal) {
    throw errors.notFound('Goal');
  }

  if (goal.studentId !== studentId) {
    throw errors.forbidden('You can only delete your own goals');
  }

  await prisma.studentGoal.delete({ where: { id } });

  return success({ deleted: true });
});

/**
 * PATCH /api/goals/[id]
 * Add coach note to a goal (coach only)
 */
export const PATCH = withErrorHandling(async (request: NextRequest, { params }: RouteParams) => {
  const session = await requireAuth();
  const { id } = await params;
  const coachId = session.user.coachId;

  if (!coachId) {
    throw errors.forbidden('Only coaches can add notes to goals');
  }

  const goal = await prisma.studentGoal.findUnique({
    where: { id },
    include: {
      student: {
        select: { coachId: true },
      },
    },
  });

  if (!goal) {
    throw errors.notFound('Goal');
  }

  if (goal.student.coachId !== coachId) {
    throw errors.forbidden('You can only add notes to your students\' goals');
  }

  const data = await validateBody(request, coachNoteSchema);

  const updatedGoal = await prisma.studentGoal.update({
    where: { id },
    data: {
      coachNotes: data.coachNotes,
    },
    select: {
      id: true,
      title: true,
      coachNotes: true,
      updatedAt: true,
    },
  });

  return success(updatedGoal);
});
