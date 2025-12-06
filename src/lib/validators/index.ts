import { z } from 'zod';

// ============================================
// ENUMS
// ============================================

export const subscriptionTierSchema = z.enum(['starter', 'professional', 'enterprise']);
export const playerCategorySchema = z.enum([
  'recreational',
  'competitive_junior',
  'collegiate_track',
  'professional_track',
  'senior',
]);
export const studentStatusSchema = z.enum(['active', 'inactive', 'archived']);
export const strokeTypeSchema = z.enum([
  'serve',
  'forehand',
  'backhand_1h',
  'backhand_2h',
  'volley',
  'overhead',
  'movement',
  'rally',
  'match',
]);
export const skillCategorySchema = z.enum([
  'serve',
  'forehand',
  'backhand',
  'volley',
  'overhead',
  'movement',
  'strategy',
  'mental',
]);
export const lessonTypeSchema = z.enum(['private', 'semi_private', 'group', 'clinic']);
export const goalCategorySchema = z.enum([
  'skill_improvement',
  'competition',
  'rating',
  'fitness',
  'custom',
]);
export const goalStatusSchema = z.enum(['in_progress', 'achieved', 'paused', 'abandoned']);

// ============================================
// STUDENT SCHEMAS
// ============================================

export const createStudentSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  playerCategory: playerCategorySchema,
  notes: z.string().max(1000).optional(),
});

export const updateStudentSchema = createStudentSchema.partial();

// ============================================
// PROGRESSION SCHEMAS
// ============================================

export const createProgressionPathSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  playerCategory: playerCategorySchema,
  templateSource: z.enum(['uspta', 'ptr', 'custom']).optional(),
});

export const createLevelSchema = z.object({
  pathId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  order: z.number().int().min(0),
});

export const createSkillSchema = z.object({
  levelId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  category: skillCategorySchema,
  order: z.number().int().min(0),
});

export const createMilestoneSchema = z.object({
  skillId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  targetMetrics: z
    .array(
      z.object({
        metricKey: z.string(),
        operator: z.enum(['gte', 'lte', 'between', 'equals']),
        value: z.number(),
        maxValue: z.number().optional(),
        unit: z.string().optional(),
      })
    )
    .optional(),
  order: z.number().int().min(0),
});

export const updateProgressSchema = z.object({
  milestoneId: z.string().uuid(),
  status: z.enum(['not_started', 'in_progress', 'achieved']),
  notes: z.string().max(1000).optional(),
  validationVideoId: z.string().uuid().optional(),
});

// ============================================
// LESSON SCHEMAS
// ============================================

export const createLessonSchema = z.object({
  studentId: z.string().uuid(),
  date: z.coerce.date(),
  duration: z.number().int().min(15).max(480),
  type: lessonTypeSchema,
  location: z.string().max(200).optional(),
  notes: z.string().max(2000).optional(),
  skillsWorked: z.array(z.string()).optional(),
  videoIds: z.array(z.string().uuid()).optional(),
});

// ============================================
// VIDEO SCHEMAS
// ============================================

export const requestVideoUploadSchema = z.object({
  studentId: z.string().uuid(),
  filename: z.string(),
  contentType: z.string(),
  strokeType: strokeTypeSchema.optional(),
});

export const requestAnalysisSchema = z.object({
  videoId: z.string().uuid(),
  strokeType: strokeTypeSchema,
  focusAreas: z.array(z.string()).optional(),
});

// ============================================
// GOAL SCHEMAS
// ============================================

export const createGoalSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  category: goalCategorySchema,
  targetDate: z.coerce.date().optional(),
  linkedMilestoneId: z.string().uuid().optional(),
});

export const updateGoalSchema = createGoalSchema.partial().extend({
  status: goalStatusSchema.optional(),
  coachNotes: z.string().max(1000).optional(),
});

// ============================================
// MESSAGING SCHEMAS
// ============================================

export const sendMessageSchema = z.object({
  conversationId: z.string().uuid().optional(),
  studentId: z.string().uuid(), // Required if no conversationId
  content: z.string().min(1).max(5000),
  attachments: z
    .array(
      z.object({
        type: z.enum(['image', 'link']),
        url: z.string().url(),
        name: z.string().optional(),
      })
    )
    .optional(),
});

// ============================================
// PAGINATION
// ============================================

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// ============================================
// TYPE EXPORTS FROM SCHEMAS
// ============================================

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
export type CreateProgressionPathInput = z.infer<typeof createProgressionPathSchema>;
export type CreateLevelInput = z.infer<typeof createLevelSchema>;
export type CreateSkillInput = z.infer<typeof createSkillSchema>;
export type CreateMilestoneInput = z.infer<typeof createMilestoneSchema>;
export type UpdateProgressInput = z.infer<typeof updateProgressSchema>;
export type CreateLessonInput = z.infer<typeof createLessonSchema>;
export type RequestVideoUploadInput = z.infer<typeof requestVideoUploadSchema>;
export type RequestAnalysisInput = z.infer<typeof requestAnalysisSchema>;
export type CreateGoalInput = z.infer<typeof createGoalSchema>;
export type UpdateGoalInput = z.infer<typeof updateGoalSchema>;
export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
