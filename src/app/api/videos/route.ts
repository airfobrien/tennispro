import { NextRequest } from 'next/server';
import { z } from 'zod';

import { errors, success, requireAuth, validateBody, withErrorHandling } from '@/lib/api';
import prisma from '@/lib/db';

// Schema for creating a video record (after upload)
const createVideoSchema = z.object({
  studentId: z.string().uuid(),
  title: z.string().max(200).optional(),
  s3Key: z.string(),
  s3Bucket: z.string(),
  filename: z.string(),
  contentType: z.string(),
  fileSize: z.number().positive(),
  duration: z.number().positive().optional(),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
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
    .optional(),
  recordedAt: z.string().datetime().optional(),
});

/**
 * GET /api/videos
 * List videos for the authenticated coach
 */
export const GET = withErrorHandling(async (request: NextRequest) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  const searchParams = request.nextUrl.searchParams;
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)));
  const skip = (page - 1) * limit;

  // Filters
  const studentId = searchParams.get('studentId');
  const strokeType = searchParams.get('strokeType');
  const status = searchParams.get('status');

  const where = {
    coachId,
    ...(studentId && { studentId }),
    ...(strokeType && { strokeType: strokeType as 'serve' | 'forehand' }),
    ...(status && { status: status as 'uploaded' | 'processing' | 'analyzed' }),
  };

  const [videos, total] = await Promise.all([
    prisma.video.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        filename: true,
        thumbnailUrl: true,
        strokeType: true,
        status: true,
        duration: true,
        createdAt: true,
        student: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: { analyses: true },
        },
      },
    }),
    prisma.video.count({ where }),
  ]);

  return success(videos, {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
});

/**
 * POST /api/videos
 * Create a video record (called after client-side upload to S3)
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  const data = await validateBody(request, createVideoSchema);

  // Verify the student belongs to this coach
  const student = await prisma.student.findFirst({
    where: { id: data.studentId, coachId },
  });

  if (!student) {
    throw errors.notFound('Student');
  }

  // Check storage limit
  const coach = await prisma.coach.findUnique({
    where: { id: coachId },
    select: { storageUsed: true, storageLimit: true },
  });

  if (!coach) {
    throw errors.notFound('Coach profile');
  }

  const newStorageUsed = Number(coach.storageUsed) + data.fileSize;
  if (newStorageUsed > Number(coach.storageLimit)) {
    throw errors.badRequest('Storage limit exceeded. Please upgrade your plan or delete some videos.');
  }

  // Create video and update storage usage in a transaction
  const video = await prisma.$transaction(async (tx) => {
    const createdVideo = await tx.video.create({
      data: {
        coachId,
        studentId: data.studentId,
        title: data.title,
        s3Key: data.s3Key,
        s3Bucket: data.s3Bucket,
        filename: data.filename,
        contentType: data.contentType,
        fileSize: BigInt(data.fileSize),
        duration: data.duration,
        width: data.width,
        height: data.height,
        strokeType: data.strokeType,
        recordedAt: data.recordedAt ? new Date(data.recordedAt) : undefined,
        status: 'uploaded',
      },
      select: {
        id: true,
        title: true,
        filename: true,
        strokeType: true,
        status: true,
        createdAt: true,
      },
    });

    await tx.coach.update({
      where: { id: coachId },
      data: { storageUsed: BigInt(newStorageUsed) },
    });

    return createdVideo;
  });

  return success(video);
});
