import { NextRequest } from 'next/server';
import { z } from 'zod';

import { errors, success, requireAuth, validateBody, withErrorHandling } from '@/lib/api';
import prisma from '@/lib/db';
import { parseVideoS3Key } from '@/lib/storage/s3-client';

// Schema for completing an upload
const completeUploadSchema = z.object({
  s3Key: z.string(),
  s3Bucket: z.string(),
  studentId: z.string().uuid(),
  filename: z.string(),
  contentType: z.string(),
  fileSize: z.number().positive(),
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
    .optional(),
  duration: z.number().positive().optional(),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  recordedAt: z.string().datetime().optional(),
});

/**
 * POST /api/uploads/complete
 * Complete the upload process and create a video record
 * Called after the client successfully uploads to S3
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  const data = await validateBody(request, completeUploadSchema);

  // Verify the S3 key belongs to this coach
  const keyInfo = parseVideoS3Key(data.s3Key);
  if (!keyInfo || keyInfo.coachId !== coachId) {
    throw errors.forbidden();
  }

  // Verify the student belongs to this coach
  const student = await prisma.student.findFirst({
    where: { id: data.studentId, coachId },
  });

  if (!student) {
    throw errors.notFound('Student');
  }

  // Check storage limit again (in case another upload happened in between)
  const coach = await prisma.coach.findUnique({
    where: { id: coachId },
    select: { storageUsed: true, storageLimit: true },
  });

  if (!coach) {
    throw errors.notFound('Coach profile');
  }

  const newStorageUsed = Number(coach.storageUsed) + data.fileSize;
  if (newStorageUsed > Number(coach.storageLimit)) {
    throw errors.badRequest(
      'Storage limit exceeded. Please upgrade your plan or delete some videos.'
    );
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
        s3Key: true,
        strokeType: true,
        status: true,
        createdAt: true,
        student: {
          select: { id: true, name: true },
        },
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
