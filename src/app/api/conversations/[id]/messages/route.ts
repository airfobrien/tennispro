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

// Schema for sending a message
const sendMessageSchema = z.object({
  content: z.string().min(1).max(5000),
  attachments: z.array(z.object({
    type: z.enum(['image', 'video', 'file']),
    url: z.string().url(),
    name: z.string().optional(),
    size: z.number().optional(),
  })).optional(),
});

/**
 * POST /api/conversations/[id]/messages
 * Send a message in a conversation
 */
export const POST = withErrorHandling(async (request: NextRequest, { params }: RouteParams) => {
  const session = await requireAuth();
  const { id } = await params;
  const coachId = session.user.coachId;
  const studentId = session.user.studentId;

  if (!coachId && !studentId) {
    throw errors.forbidden('You must be logged in as a coach or student');
  }

  // Get conversation
  const conversation = await prisma.conversation.findUnique({
    where: { id },
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

  const data = await validateBody(request, sendMessageSchema);

  // Determine sender info
  const senderType = coachId ? 'coach' : 'student';
  const senderId = coachId || studentId!;

  // Create message and update conversation
  const [message] = await prisma.$transaction([
    prisma.message.create({
      data: {
        conversationId: id,
        senderId,
        senderType,
        content: data.content,
        attachments: data.attachments || undefined,
      },
      select: {
        id: true,
        content: true,
        senderId: true,
        senderType: true,
        attachments: true,
        createdAt: true,
      },
    }),
    prisma.conversation.update({
      where: { id },
      data: { lastMessageAt: new Date() },
    }),
  ]);

  return success(message);
});
