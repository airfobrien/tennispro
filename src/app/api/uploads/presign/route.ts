import { NextRequest } from 'next/server';
import { z } from 'zod';

import { errors, success, requireAuth, validateBody, withErrorHandling } from '@/lib/api';
import prisma from '@/lib/db';
import {
  getPresignedUploadUrl,
  ALLOWED_VIDEO_TYPES,
  MAX_VIDEO_SIZE,
} from '@/lib/storage/presigned-urls';
import { generateVideoS3Key } from '@/lib/storage/s3-client';

// Schema for requesting a presigned upload URL
const presignRequestSchema = z.object({
  studentId: z.string().uuid(),
  filename: z.string().min(1).max(255),
  contentType: z.enum(ALLOWED_VIDEO_TYPES as unknown as [string, ...string[]]),
  fileSize: z.number().positive().max(MAX_VIDEO_SIZE),
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
});

/**
 * POST /api/uploads/presign
 * Request a presigned URL for uploading a video to S3
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  const data = await validateBody(request, presignRequestSchema);

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
    throw errors.badRequest(
      'Storage limit exceeded. Please upgrade your plan or delete some videos.'
    );
  }

  // Generate S3 key
  const s3Key = generateVideoS3Key(coachId, data.studentId, data.filename);

  // Get presigned URL
  const presignedResult = await getPresignedUploadUrl(
    s3Key,
    data.contentType,
    data.fileSize
  );

  return success({
    ...presignedResult,
    // Include metadata for completing the upload
    metadata: {
      studentId: data.studentId,
      filename: data.filename,
      contentType: data.contentType,
      fileSize: data.fileSize,
      title: data.title,
      strokeType: data.strokeType,
    },
  });
});
