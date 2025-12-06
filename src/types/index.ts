// ============================================
// COACH & AUTHENTICATION
// ============================================

export interface Coach {
  id: string;
  cognitoUserId: string;
  email: string;
  name: string;
  slug: string;
  tier: SubscriptionTier;
  createdAt: Date;
  updatedAt: Date;
}

export type SubscriptionTier = 'starter' | 'professional' | 'enterprise';

// ============================================
// STUDENTS
// ============================================

export interface Student {
  id: string;
  coachId: string;
  name: string;
  email?: string;
  phone?: string;
  photoUrl?: string;
  playerCategory: PlayerCategory;
  currentPathId?: string;
  currentLevelId?: string;
  status: StudentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type PlayerCategory =
  | 'recreational'
  | 'competitive_junior'
  | 'collegiate_track'
  | 'professional_track'
  | 'senior';

export type StudentStatus = 'active' | 'inactive' | 'archived';

// ============================================
// PROGRESSION FRAMEWORK
// ============================================

export interface ProgressionPath {
  id: string;
  coachId: string;
  name: string;
  description?: string;
  playerCategory: PlayerCategory;
  isTemplate: boolean;
  templateSource?: 'uspta' | 'ptr' | 'custom';
  createdAt: Date;
  updatedAt: Date;
}

export interface Level {
  id: string;
  pathId: string;
  name: string;
  description?: string;
  order: number;
  createdAt: Date;
}

export interface Skill {
  id: string;
  levelId: string;
  name: string;
  description?: string;
  category: SkillCategory;
  order: number;
  createdAt: Date;
}

export type SkillCategory =
  | 'serve'
  | 'forehand'
  | 'backhand'
  | 'volley'
  | 'overhead'
  | 'movement'
  | 'strategy'
  | 'mental';

export interface Milestone {
  id: string;
  skillId: string;
  name: string;
  description?: string;
  targetMetrics?: TargetMetric[];
  order: number;
  createdAt: Date;
}

export interface TargetMetric {
  metricKey: string;
  operator: 'gte' | 'lte' | 'between' | 'equals';
  value: number;
  maxValue?: number; // For 'between' operator
  unit?: string;
}

// ============================================
// PROGRESS TRACKING
// ============================================

export interface StudentProgress {
  id: string;
  studentId: string;
  milestoneId: string;
  status: ProgressStatus;
  achievedAt?: Date;
  validationMethod?: ValidationMethod;
  validationVideoId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProgressStatus = 'not_started' | 'in_progress' | 'achieved';
export type ValidationMethod = 'coach_assessment' | 'ai_validation' | 'match_result';

// ============================================
// VIDEO
// ============================================

export interface Video {
  id: string;
  coachId: string;
  studentId: string;
  title?: string;
  s3Key: string;
  s3Bucket: string;
  duration?: number;
  strokeType?: StrokeType;
  recordedAt?: Date;
  status: VideoStatus;
  uploadedBy: VideoUploadedBy;
  studentNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type VideoUploadedBy = 'coach' | 'student';

export type StrokeType =
  | 'serve'
  | 'forehand'
  | 'backhand_1h'
  | 'backhand_2h'
  | 'volley'
  | 'overhead'
  | 'movement'
  | 'rally'
  | 'match';

export type VideoStatus = 'uploading' | 'uploaded' | 'processing' | 'analyzed' | 'failed';

// ============================================
// ANALYSIS
// ============================================

export interface Analysis {
  id: string;
  videoId: string;
  coachId: string;
  studentId: string;
  strokeType: StrokeType;
  status: AnalysisStatus;
  metrics?: Record<string, AnalysisMetric>;
  skeletonData?: SkeletonFrame[];
  insights?: string[];
  processedAt?: Date;
  createdAt: Date;
}

export type AnalysisStatus = 'pending' | 'processing' | 'complete' | 'failed';

export interface AnalysisMetric {
  key: string;
  name: string;
  value: number;
  unit: string;
  frameIndex?: number;
}

export interface SkeletonFrame {
  frameIndex: number;
  timestamp: number;
  landmarks: Landmark[];
}

export interface Landmark {
  name: string;
  x: number;
  y: number;
  z?: number;
  visibility?: number;
}

// ============================================
// LESSONS
// ============================================

export interface Lesson {
  id: string;
  coachId: string;
  studentId: string;
  date: Date;
  duration: number; // minutes
  type: LessonType;
  location?: string;
  notes?: string;
  skillsWorked?: string[];
  videoIds?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type LessonType = 'private' | 'semi_private' | 'group' | 'clinic';

// ============================================
// STUDENT GOALS
// ============================================

export interface StudentGoal {
  id: string;
  studentId: string;
  title: string;
  description?: string;
  category: GoalCategory;
  targetDate?: Date;
  status: GoalStatus;
  coachNotes?: string;
  linkedMilestoneId?: string;
  createdAt: Date;
  updatedAt: Date;
  achievedAt?: Date;
}

export type GoalCategory = 'skill_improvement' | 'competition' | 'rating' | 'fitness' | 'custom';

export type GoalStatus = 'in_progress' | 'achieved' | 'paused' | 'abandoned';

// ============================================
// MESSAGING
// ============================================

export interface Conversation {
  id: string;
  coachId: string;
  studentId: string;
  lastMessageAt?: Date;
  createdAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: SenderType;
  content: string;
  attachments?: MessageAttachment[];
  readAt?: Date;
  createdAt: Date;
}

export type SenderType = 'coach' | 'student';

export interface MessageAttachment {
  type: 'image' | 'link';
  url: string;
  name?: string;
  previewUrl?: string;
}

// ============================================
// API TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  pagination?: PaginationMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
