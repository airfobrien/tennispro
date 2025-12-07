import { NextRequest } from 'next/server';

import {
  errors,
  paginated,
  requireAuth,
  getPagination,
  withErrorHandling,
} from '@/lib/api';
import prisma from '@/lib/db';

type RouteParams = { params: Promise<{ id: string }> };

/**
 * GET /api/students/[id]/goals
 * Get all goals for a specific student (coach only)
 */
export const GET = withErrorHandling(async (request: NextRequest, { params }: RouteParams) => {
  const session = await requireAuth();
  const { id: studentId } = await params;
  const coachId = session.user.coachId;

  if (!coachId) {
    throw errors.forbidden('Only coaches can view student goals');
  }

  // Verify the student belongs to this coach
  const student = await prisma.student.findFirst({
    where: { id: studentId, coachId },
    select: { id: true, name: true },
  });

  if (!student) {
    throw errors.notFound('Student');
  }

  const { page, limit, skip } = getPagination(request);

  // Get only coach-visible goals
  const where = {
    studentId,
    coachVisible: true,
  };

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
