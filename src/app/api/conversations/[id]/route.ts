import { NextRequest } from 'next/server';

import {
  errors,
  success,
  requireAuth,
  getPagination,
  withErrorHandling,
} from '@/lib/api';
import prisma from '@/lib/db';

type RouteParams = { params: Promise<{ id: string }> };

/**
 * GET /api/conversations/[id]
 * Get a conversation with its messages
 */
export const GET = withErrorHandling(async (request: NextRequest, { params }: RouteParams) => {
  const session = await requireAuth();
  const { id } = await params;
  const coachId = session.user.coachId;
  const studentId = session.user.studentId;

  if (!coachId && !studentId) {
    throw errors.forbidden('You must be logged in as a coach or student');
  }

  const { page, limit, skip } = getPagination(request);

  // Get conversation
  const conversation = await prisma.conversation.findUnique({
    where: { id },
    include: {
      coach: {
        select: { id: true, name: true, email: true },
      },
      student: {
        select: { id: true, name: true, email: true, photoUrl: true },
      },
    },
  });

  if (!conversation) {
    throw errors.notFound('Conversation');
  }

  // Check authorization
  const isCoach = coachId === conversation.coachId;
  const isStudent = studentId === conversation.studentId;

  if (!isCoach && !isStudent) {
    throw errors.forbidden('You do not have access to this conversation');
  }

  // Get messages with pagination
  const [messages, total] = await Promise.all([
    prisma.message.findMany({
      where: { conversationId: id },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        content: true,
        senderId: true,
        senderType: true,
        attachments: true,
        readAt: true,
        createdAt: true,
      },
    }),
    prisma.message.count({ where: { conversationId: id } }),
  ]);

  // Mark unread messages as read
  const currentSenderType = coachId ? 'coach' : 'student';
  const unreadMessageIds = messages
    .filter((m) => m.senderType !== currentSenderType && !m.readAt)
    .map((m) => m.id);

  if (unreadMessageIds.length > 0) {
    await prisma.message.updateMany({
      where: { id: { in: unreadMessageIds } },
      data: { readAt: new Date() },
    });
  }

  return success({
    conversation: {
      id: conversation.id,
      coach: conversation.coach,
      student: conversation.student,
      lastMessageAt: conversation.lastMessageAt,
      createdAt: conversation.createdAt,
    },
    messages: messages.reverse(), // Return in chronological order
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});
