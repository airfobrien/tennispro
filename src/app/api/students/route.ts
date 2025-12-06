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

// Query schema for listing students
const listStudentsSchema = z.object({
  status: z.enum(['active', 'inactive', 'archived']).optional(),
  search: z.string().optional(),
  pathId: z.string().uuid().optional(),
});

// Schema for creating a student
const createStudentSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
  playerCategory: z.enum([
    'recreational',
    'competitive_junior',
    'collegiate_track',
    'professional_track',
    'senior',
  ]),
  currentPathId: z.string().uuid().optional().nullable(),
  notes: z.string().max(5000).optional().nullable(),
});

/**
 * GET /api/students
 * List all students for the authenticated coach
 */
export const GET = withErrorHandling(async (request: NextRequest) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  const { page, limit, skip } = getPagination(request);
  const filters = validateQuery(request, listStudentsSchema);

  // Build where clause
  const where = {
    coachId,
    ...(filters.status && { status: filters.status }),
    ...(filters.pathId && { currentPathId: filters.pathId }),
    ...(filters.search && {
      OR: [
        { name: { contains: filters.search, mode: 'insensitive' as const } },
        { email: { contains: filters.search, mode: 'insensitive' as const } },
      ],
    }),
  };

  // Get students and total count
  const [students, total] = await Promise.all([
    prisma.student.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        photoUrl: true,
        playerCategory: true,
        status: true,
        currentPath: {
          select: { id: true, name: true },
        },
        currentLevel: {
          select: { id: true, name: true, order: true },
        },
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.student.count({ where }),
  ]);

  return paginated(students, page, limit, total);
});

/**
 * POST /api/students
 * Create a new student
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  // Check student limit
  const coach = await prisma.coach.findUnique({
    where: { id: coachId },
    select: { studentLimit: true, _count: { select: { students: true } } },
  });

  if (!coach) {
    throw errors.notFound('Coach');
  }

  if (coach._count.students >= coach.studentLimit) {
    throw errors.badRequest(
      `Student limit reached (${coach.studentLimit}). Upgrade your plan for more students.`
    );
  }

  const data = await validateBody(request, createStudentSchema);

  const student = await prisma.student.create({
    data: {
      ...data,
      coachId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      playerCategory: true,
      status: true,
      currentPath: {
        select: { id: true, name: true },
      },
      createdAt: true,
    },
  });

  return success(student);
});
