import { NextRequest } from 'next/server';

import {
  errors,
  success,
  requireAuth,
  withErrorHandling,
} from '@/lib/api';
import prisma from '@/lib/db';

type RouteParams = { params: Promise<{ targetId: string }> };

/**
 * GET /api/conversations/with/[targetId]
 * Get or create a conversation with a specific user
 * For coaches: targetId is studentId
 * For students: targetId is coachId (usually their assigned coach)
 */
export const GET = withErrorHandling(async (_request: NextRequest, { params }: RouteParams) => {
  const session = await requireAuth();
  const { targetId } = await params;
  const coachId = session.user.coachId;
  const studentId = session.user.studentId;

  if (!coachId && !studentId) {
    throw errors.forbidden('You must be logged in as a coach or student');
  }

  let conversation;

  if (coachId) {
    // Coach looking for conversation with a student
    // Verify the student belongs to this coach
    const student = await prisma.student.findFirst({
      where: { id: targetId, coachId },
      select: { id: true, name: true },
    });

    if (!student) {
      throw errors.notFound('Student');
    }

    // Find or create conversation
    conversation = await prisma.conversation.upsert({
      where: {
        coachId_studentId: {
          coachId,
          studentId: targetId,
        },
      },
      update: {},
      create: {
        coachId,
        studentId: targetId,
      },
      include: {
        coach: {
          select: { id: true, name: true, email: true },
        },
        student: {
          select: { id: true, name: true, email: true, photoUrl: true },
        },
      },
    });
  } else {
    // Student looking for conversation with their coach
    // Verify this is the student's coach
    const student = await prisma.student.findUnique({
      where: { id: studentId! },
      select: { coachId: true },
    });

    if (!student || student.coachId !== targetId) {
      throw errors.forbidden('You can only message your assigned coach');
    }

    // Find or create conversation
    conversation = await prisma.conversation.upsert({
      where: {
        coachId_studentId: {
          coachId: targetId,
          studentId: studentId!,
        },
      },
      update: {},
      create: {
        coachId: targetId,
        studentId: studentId!,
      },
      include: {
        coach: {
          select: { id: true, name: true, email: true },
        },
        student: {
          select: { id: true, name: true, email: true, photoUrl: true },
        },
      },
    });
  }

  return success(conversation);
});
