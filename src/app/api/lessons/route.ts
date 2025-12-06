import { NextRequest } from 'next/server';
import { z } from 'zod';

import { errors, success, requireAuth, validateBody, withErrorHandling } from '@/lib/api';
import prisma from '@/lib/db';

// Schema for creating a lesson
const createLessonSchema = z.object({
  studentId: z.string().uuid(),
  date: z.string().datetime(),
  duration: z.number().int().positive().max(480), // max 8 hours
  type: z.enum(['private', 'semi_private', 'group', 'clinic']),
  location: z.string().max(200).optional(),
  notes: z.string().max(5000).optional(),
  skillsWorked: z.array(z.string().max(100)).max(20).optional(),
  videoIds: z.array(z.string().uuid()).max(10).optional(),
});

/**
 * GET /api/lessons
 * List lessons for the authenticated coach
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
  const type = searchParams.get('type');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const where = {
    coachId,
    ...(studentId && { studentId }),
    ...(type && { type: type as 'private' | 'semi_private' | 'group' | 'clinic' }),
    ...(startDate || endDate
      ? {
          date: {
            ...(startDate && { gte: new Date(startDate) }),
            ...(endDate && { lte: new Date(endDate) }),
          },
        }
      : {}),
  };

  const [lessons, total] = await Promise.all([
    prisma.lesson.findMany({
      where,
      skip,
      take: limit,
      orderBy: { date: 'desc' },
      select: {
        id: true,
        date: true,
        duration: true,
        type: true,
        location: true,
        skillsWorked: true,
        student: {
          select: {
            id: true,
            name: true,
            photoUrl: true,
          },
        },
        _count: {
          select: { videos: true },
        },
      },
    }),
    prisma.lesson.count({ where }),
  ]);

  return success(lessons, {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
});

/**
 * POST /api/lessons
 * Create a new lesson
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  const session = await requireAuth();
  const coachId = session.user.coachId;

  if (!coachId) {
    throw errors.notFound('Coach profile');
  }

  const data = await validateBody(request, createLessonSchema);

  // Verify the student belongs to this coach
  const student = await prisma.student.findFirst({
    where: { id: data.studentId, coachId },
  });

  if (!student) {
    throw errors.notFound('Student');
  }

  // If video IDs provided, verify they belong to this coach
  if (data.videoIds && data.videoIds.length > 0) {
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

  const lesson = await prisma.lesson.create({
    data: {
      coachId,
      studentId: data.studentId,
      date: new Date(data.date),
      duration: data.duration,
      type: data.type,
      location: data.location,
      notes: data.notes,
      skillsWorked: data.skillsWorked ?? [],
      ...(data.videoIds && data.videoIds.length > 0
        ? {
            videos: {
              create: data.videoIds.map((videoId) => ({ videoId })),
            },
          }
        : {}),
    },
    select: {
      id: true,
      date: true,
      duration: true,
      type: true,
      location: true,
      skillsWorked: true,
      createdAt: true,
      student: {
        select: { id: true, name: true },
      },
      _count: {
        select: { videos: true },
      },
    },
  });

  return success(lesson);
});
