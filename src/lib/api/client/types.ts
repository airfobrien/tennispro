/**
 * API client types - mirrors backend response shapes
 */

// Coach
export interface Coach {
  id: string;
  email: string;
  name: string;
  slug: string;
  tier: 'starter' | 'professional' | 'enterprise';
  studentLimit: number;
  storageLimit: number;
  analysisLimit: number;
  analysisCount: number;
  storageUsed: number;
  createdAt: string;
}

// Student
export interface Student {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  photoUrl: string | null;
  playerCategory: PlayerCategory;
  status: 'active' | 'inactive' | 'archived';
  notes: string | null;
  currentPath: { id: string; name: string } | null;
  currentLevel: { id: string; name: string } | null;
  createdAt: string;
  updatedAt: string;
}

export interface StudentSummary {
  id: string;
  name: string;
  email: string | null;
  photoUrl: string | null;
  playerCategory: PlayerCategory;
  status: 'active' | 'inactive' | 'archived';
  currentPath: { id: string; name: string } | null;
  currentLevel: { id: string; name: string } | null;
  updatedAt: string;
}

export type PlayerCategory =
  | 'recreational'
  | 'competitive_junior'
  | 'collegiate_track'
  | 'professional_track'
  | 'senior';

// Video
export interface Video {
  id: string;
  title: string | null;
  filename: string;
  thumbnailUrl: string | null;
  strokeType: StrokeType | null;
  status: 'uploading' | 'uploaded' | 'processing' | 'analyzed' | 'failed';
  duration: number | null;
  createdAt: string;
  student: { id: string; name: string };
}

export interface VideoDetails extends Omit<Video, 'student'> {
  s3Key: string;
  s3Bucket: string;
  contentType: string;
  fileSize: number;
  width: number | null;
  height: number | null;
  recordedAt: string | null;
  updatedAt: string;
  student: { id: string; name: string; photoUrl: string | null };
  analyses: Analysis[];
}

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

// Analysis
export interface Analysis {
  id: string;
  strokeType: StrokeType;
  status: 'pending' | 'processing' | 'complete' | 'failed';
  metrics: Record<string, unknown> | null;
  insights: string[];
  processedAt: string | null;
  createdAt: string;
}

// Lesson
export interface Lesson {
  id: string;
  date: string;
  duration: number;
  type: 'private' | 'semi_private' | 'group' | 'clinic';
  location: string | null;
  skillsWorked: string[];
  student: { id: string; name: string; photoUrl?: string | null };
  _count: { videos: number };
}

export interface LessonDetails extends Omit<Lesson, 'student' | '_count'> {
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  student: {
    id: string;
    name: string;
    email: string | null;
    photoUrl: string | null;
    playerCategory: PlayerCategory;
  };
  videos: {
    id: string;
    title: string | null;
    filename: string;
    thumbnailUrl: string | null;
    strokeType: StrokeType | null;
    duration: number | null;
  }[];
}

// Progression
export interface ProgressionPath {
  id: string;
  name: string;
  description: string | null;
  playerCategory: PlayerCategory;
  isTemplate: boolean;
  isSystem: boolean;
  _count: { levels: number; students: number };
  createdAt: string;
}

export interface ProgressionPathDetails extends Omit<ProgressionPath, '_count'> {
  templateSource: 'uspta' | 'ptr' | 'custom' | null;
  updatedAt: string;
  levels: Level[];
  _count: { students: number };
}

export interface Level {
  id: string;
  name: string;
  description: string | null;
  order: number;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  description: string | null;
  category: string;
  order: number;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  name: string;
  description: string | null;
  order: number;
  targetMetrics: unknown;
}

// Request types
export interface CreateStudentRequest {
  name: string;
  email?: string | null;
  phone?: string | null;
  photoUrl?: string | null;
  playerCategory: PlayerCategory;
  currentPathId?: string | null;
  notes?: string | null;
}

export interface UpdateStudentRequest {
  name?: string;
  email?: string | null;
  phone?: string | null;
  photoUrl?: string | null;
  playerCategory?: PlayerCategory;
  status?: 'active' | 'inactive' | 'archived';
  currentPathId?: string | null;
  currentLevelId?: string | null;
  notes?: string | null;
}

export interface CreateVideoRequest {
  studentId: string;
  title?: string;
  s3Key: string;
  s3Bucket: string;
  filename: string;
  contentType: string;
  fileSize: number;
  duration?: number;
  width?: number;
  height?: number;
  strokeType?: StrokeType;
  recordedAt?: string;
}

export interface UpdateVideoRequest {
  title?: string;
  strokeType?: StrokeType | null;
  recordedAt?: string | null;
}

export interface CreateLessonRequest {
  studentId: string;
  date: string;
  duration: number;
  type: 'private' | 'semi_private' | 'group' | 'clinic';
  location?: string;
  notes?: string;
  skillsWorked?: string[];
  videoIds?: string[];
}

export interface UpdateLessonRequest {
  date?: string;
  duration?: number;
  type?: 'private' | 'semi_private' | 'group' | 'clinic';
  location?: string | null;
  notes?: string | null;
  skillsWorked?: string[];
  videoIds?: string[];
}

export interface CreateProgressionPathRequest {
  name: string;
  description?: string | null;
  playerCategory: PlayerCategory;
  fromTemplateId?: string;
}

export interface UpdateProgressionPathRequest {
  name?: string;
  description?: string | null;
  playerCategory?: PlayerCategory;
}
