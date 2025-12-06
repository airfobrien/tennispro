import { NextRequest } from 'next/server';
import { z } from 'zod';

import { errors, success, requireAuth, validateBody, withErrorHandling } from '@/lib/api';
import prisma from '@/lib/db';

type RouteContext = { params: Promise<{ id: string }> };

// Schema for updating a student
const updateStudentSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
  photoUrl: z.string().url().optional().nullable(),
  playerCategory: z
    .enum([
      'recreational',
      'competitive_junior',
      'collegiate_track',
      'professional_track',
      'senior',
    ])
    .optional(),
  status: z.enum(['active', 'inactive', 'archived']).optional(),
  currentPathId: z.string().uuid().optional().nullable(),
  currentLevelId: z.string().uuid().optional().nullable(),
  notes: z.string().max(5000).optional().nullable(),
});

/**
 * Verify the student belongs to the authenticated coach
 */
async function verifyStudentOwnership(studentId: string, coachId: string) {
  const student = await prisma.student.findFirst({
    where: { id: studentId, coachId },
  });

  if (!student) {
    throw errors.notFound('Student');
  }

  return student;
}

/**
 * GET /api/students/[id]
 * Get a specific student
 */
export const GET = withErrorHandling(async (_request: NextRequest, context: RouteContext) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;
  const { id } = await context.params;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  const student = await prisma.student.findFirst({
    where: { id, coachId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      photoUrl: true,
      playerCategory: true,
      status: true,
      notes: true,
      currentPath: {
        select: {
          id: true,
          name: true,
          description: true,
          playerCategory: true,
        },
      },
      currentLevel: {
        select: {
          id: true,
          name: true,
          description: true,
          order: true,
        },
      },
      progress: {
        select: {
          id: true,
          status: true,
          achievedAt: true,
          milestone: {
            select: {
              id: true,
              name: true,
              skill: {
                select: { id: true, name: true, category: true },
              },
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
        take: 10,
      },
      _count: {
        select: {
          videos: true,
          analyses: true,
          lessons: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!student) {
    throw errors.notFound('Student');
  }

  return success(student);
});

/**
 * PATCH /api/students/[id]
 * Update a student
 */
export const PATCH = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;
  const { id } = await context.params;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  await verifyStudentOwnership(id, coachId);

  const data = await validateBody(request, updateStudentSchema);

  // If archiving, set archivedAt timestamp
  const updateData = {
    ...data,
    ...(data.status === 'archived' && { archivedAt: new Date() }),
    ...(data.status === 'active' && { archivedAt: null }),
  };

  const student = await prisma.student.update({
    where: { id },
    data: updateData,
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
      currentLevel: {
        select: { id: true, name: true },
      },
      updatedAt: true,
    },
  });

  return success(student);
});

/**
 * DELETE /api/students/[id]
 * Delete a student (soft delete by setting status to archived)
 */
export const DELETE = withErrorHandling(async (_request: NextRequest, context: RouteContext) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;
  const { id } = await context.params;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  await verifyStudentOwnership(id, coachId);

  // Soft delete - archive the student
  await prisma.student.update({
    where: { id },
    data: {
      status: 'archived',
      archivedAt: new Date(),
    },
  });

  return success({ deleted: true });
});
