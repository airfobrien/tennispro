import { NextRequest } from 'next/server';

import {
  errors,
  paginated,
  requireAuth,
  getPagination,
  withErrorHandling,
} from '@/lib/api';
import prisma from '@/lib/db';

/**
 * GET /api/conversations
 * List all conversations for the authenticated user (coach or student)
 */
export const GET = withErrorHandling(async (request: NextRequest) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;
  const studentId = session.user.studentId;

  if (!coachId && !studentId) {
    throw errors.forbidden('You must be logged in as a coach or student');
  }

  const { page, limit, skip } = getPagination(request);

  // Build where clause based on user type
  const where = coachId ? { coachId } : { studentId: studentId! };

  // Get conversations and total count
  const [conversations, total] = await Promise.all([
    prisma.conversation.findMany({
      where,
      skip,
      take: limit,
      orderBy: { lastMessageAt: 'desc' },
      include: {
        coach: {
          select: { id: true, name: true, email: true },
        },
        student: {
          select: { id: true, name: true, email: true, photoUrl: true },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            content: true,
            senderType: true,
            readAt: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            messages: {
              where: {
                readAt: null,
                // Unread by the current user
                senderType: coachId ? 'student' : 'coach',
              },
            },
          },
        },
      },
    }),
    prisma.conversation.count({ where }),
  ]);

  // Format response
  const formattedConversations = conversations.map((conv) => ({
    id: conv.id,
    coach: conv.coach,
    student: conv.student,
    lastMessage: conv.messages[0] || null,
    unreadCount: conv._count.messages,
    lastMessageAt: conv.lastMessageAt,
    createdAt: conv.createdAt,
  }));

  return paginated(formattedConversations, page, limit, total);
});
