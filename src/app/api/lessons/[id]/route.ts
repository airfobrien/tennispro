import { NextRequest } from 'next/server';
import { z } from 'zod';

import { errors, success, requireAuth, validateBody, withErrorHandling } from '@/lib/api';
import prisma from '@/lib/db';

type RouteContext = { params: Promise<{ id: string }> };

// Schema for updating a lesson
const updateLessonSchema = z.object({
  date: z.string().datetime().optional(),
  duration: z.number().int().positive().max(480).optional(),
  type: z.enum(['private', 'semi_private', 'group', 'clinic']).optional(),
  location: z.string().max(200).optional().nullable(),
  notes: z.string().max(5000).optional().nullable(),
  skillsWorked: z.array(z.string().max(100)).max(20).optional(),
  videoIds: z.array(z.string().uuid()).max(10).optional(),
});

/**
 * Verify the lesson belongs to the authenticated coach
 */
async function verifyLessonOwnership(lessonId: string, coachId: string) {
  const lesson = await prisma.lesson.findFirst({
    where: { id: lessonId, coachId },
  });

  if (!lesson) {
    throw errors.notFound('Lesson');
  }

  return lesson;
}

/**
 * GET /api/lessons/[id]
 * Get a specific lesson with details
 */
export const GET = withErrorHandling(async (_request: NextRequest, context: RouteContext) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;
  const { id } = await context.params;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  const lesson = await prisma.lesson.findFirst({
    where: { id, coachId },
    select: {
      id: true,
      date: true,
      duration: true,
      type: true,
      location: true,
      notes: true,
      skillsWorked: true,
      createdAt: true,
      updatedAt: true,
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          photoUrl: true,
          playerCategory: true,
        },
      },
      videos: {
        select: {
          video: {
            select: {
              id: true,
              title: true,
              filename: true,
              thumbnailUrl: true,
              strokeType: true,
              duration: true,
            },
          },
        },
      },
    },
  });

  if (!lesson) {
    throw errors.notFound('Lesson');
  }

  // Flatten videos array
  return success({
    ...lesson,
    videos: lesson.videos.map((v) => v.video),
  });
});

/**
 * PATCH /api/lessons/[id]
 * Update a lesson
 */
export const PATCH = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;
  const { id } = await context.params;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  await verifyLessonOwnership(id, coachId);

  const data = await validateBody(request, updateLessonSchema);

  // If video IDs provided, verify they belong to this coach
  if (data.videoIds) {
    if (data.videoIds.length > 0) {
      const videoCount = await prisma.video.count({
        where: {
          id: { in: data.videoIds },
          coachId,
        },
      });

      if (videoCount !== data.videoIds.length) {
        throw errors.badRequest('One or more videos not found');
      }
    }
  }

  // Update lesson and manage video associations
  const lesson = await prisma.$transaction(async (tx) => {
    // If videoIds provided, delete existing and create new associations
    if (data.videoIds !== undefined) {
      await tx.lessonVideo.deleteMany({ where: { lessonId: id } });

      if (data.videoIds.length > 0) {
        await tx.lessonVideo.createMany({
          data: data.videoIds.map((videoId) => ({ lessonId: id, videoId })),
        });
      }
    }

    return tx.lesson.update({
      where: { id },
      data: {
        ...(data.date && { date: new Date(data.date) }),
        ...(data.duration !== undefined && { duration: data.duration }),
        ...(data.type !== undefined && { type: data.type }),
        ...(data.location !== undefined && { location: data.location }),
        ...(data.notes !== undefined && { notes: data.notes }),
        ...(data.skillsWorked !== undefined && { skillsWorked: data.skillsWorked }),
      },
      select: {
        id: true,
        date: true,
        duration: true,
        type: true,
        location: true,
        skillsWorked: true,
        updatedAt: true,
        _count: {
          select: { videos: true },
        },
      },
    });
  });

  return success(lesson);
});

/**
 * DELETE /api/lessons/[id]
 * Delete a lesson
 */
export const DELETE = withErrorHandling(async (_request: NextRequest, context: RouteContext) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;
  const { id } = await context.params;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  await verifyLessonOwnership(id, coachId);

  await prisma.lesson.delete({ where: { id } });

  return success({ deleted: true });
});
