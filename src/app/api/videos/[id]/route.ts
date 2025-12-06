import { NextRequest } from 'next/server';
import { z } from 'zod';

import { errors, success, requireAuth, validateBody, withErrorHandling } from '@/lib/api';
import prisma from '@/lib/db';

type RouteContext = { params: Promise<{ id: string }> };

// Schema for updating a video
const updateVideoSchema = z.object({
  title: z.string().max(200).optional(),
  strokeType: z
    .enum([
      'serve',
      'forehand',
      'backhand_1h',
      'backhand_2h',
      'volley',
      'overhead',
      'movement',
      'rally',
      'match',
    ])
    .optional()
    .nullable(),
  recordedAt: z.string().datetime().optional().nullable(),
});

/**
 * Verify the video belongs to the authenticated coach
 */
async function verifyVideoOwnership(videoId: string, coachId: string) {
  const video = await prisma.video.findFirst({
    where: { id: videoId, coachId },
  });

  if (!video) {
    throw errors.notFound('Video');
  }

  return video;
}

/**
 * GET /api/videos/[id]
 * Get a specific video with its analyses
 */
export const GET = withErrorHandling(async (_request: NextRequest, context: RouteContext) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;
  const { id } = await context.params;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  const video = await prisma.video.findFirst({
    where: { id, coachId },
    select: {
      id: true,
      title: true,
      s3Key: true,
      s3Bucket: true,
      filename: true,
      contentType: true,
      fileSize: true,
      duration: true,
      width: true,
      height: true,
      strokeType: true,
      recordedAt: true,
      status: true,
      thumbnailUrl: true,
      createdAt: true,
      updatedAt: true,
      student: {
        select: {
          id: true,
          name: true,
          photoUrl: true,
        },
      },
      analyses: {
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          strokeType: true,
          status: true,
          metrics: true,
          insights: true,
          processedAt: true,
          createdAt: true,
        },
      },
    },
  });

  if (!video) {
    throw errors.notFound('Video');
  }

  // Convert BigInt to number for JSON serialization
  return success({
    ...video,
    fileSize: Number(video.fileSize),
  });
});

/**
 * PATCH /api/videos/[id]
 * Update a video
 */
export const PATCH = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;
  const { id } = await context.params;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  await verifyVideoOwnership(id, coachId);

  const data = await validateBody(request, updateVideoSchema);

  const video = await prisma.video.update({
    where: { id },
    data: {
      ...data,
      recordedAt: data.recordedAt ? new Date(data.recordedAt) : data.recordedAt === null ? null : undefined,
    },
    select: {
      id: true,
      title: true,
      strokeType: true,
      recordedAt: true,
      updatedAt: true,
    },
  });

  return success(video);
});

/**
 * DELETE /api/videos/[id]
 * Delete a video
 */
export const DELETE = withErrorHandling(async (_request: NextRequest, context: RouteContext) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;
  const { id } = await context.params;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  const video = await verifyVideoOwnership(id, coachId);

  // Delete video and update storage usage in a transaction
  await prisma.$transaction(async (tx) => {
    await tx.video.delete({ where: { id } });

    await tx.coach.update({
      where: { id: coachId },
      data: {
        storageUsed: {
          decrement: video.fileSize,
        },
      },
    });
  });

  // Note: S3 cleanup would be handled by a separate cleanup job or Lambda trigger

  return success({ deleted: true });
});
