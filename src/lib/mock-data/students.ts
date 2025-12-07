// Centralized mock student data with coach relationships
// Each student belongs to exactly one coach (1:1 student-to-coach)

export interface MockStudent {
  id: string;
  coachId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  status: 'active' | 'inactive' | 'invited' | 'archived';
  lastLesson?: string;
  totalLessons: number;
  totalVideos: number;
  joinedAt: string;
  ratingStudentId?: string;
  progress?: number;
}

// Coach IDs (from src/lib/auth/config.ts)
export const COACH_IDS = {
  DEMO_COACH: 'coach-uuid-001',     // coach@demo.com - Demo Coach
  ADMIN_COACH: 'coach-uuid-002',    // admin@demo.com - Admin Coach
  STARTER_COACH: 'coach-uuid-003',  // starter@demo.com - Starter Coach
} as const;

// All mock students with their coach assignments
export const mockStudents: MockStudent[] = [
  // ============================================
  // DEMO COACH (coach@demo.com) - 4 students
  // ============================================
  {
    id: 'student-1',
    coachId: COACH_IDS.DEMO_COACH,
    firstName: 'Alex',
    lastName: 'Thompson',
    email: 'alex.t@email.com',
    skillLevel: 'intermediate',
    status: 'active',
    lastLesson: '2 days ago',
    totalLessons: 24,
    totalVideos: 15,
    joinedAt: '2024-06-15',
    ratingStudentId: 'student-uuid-001',
    progress: 85,
  },
  {
    id: 'student-2',
    coachId: COACH_IDS.DEMO_COACH,
    firstName: 'Jordan',
    lastName: 'Williams',
    email: 'jordan.w@email.com',
    skillLevel: 'advanced',
    status: 'active',
    lastLesson: '3 days ago',
    totalLessons: 48,
    totalVideos: 32,
    joinedAt: '2024-01-10',
    ratingStudentId: 'student-uuid-002',
    progress: 72,
  },
  {
    id: 'student-3',
    coachId: COACH_IDS.DEMO_COACH,
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@email.com',
    skillLevel: 'professional',
    status: 'active',
    lastLesson: '1 week ago',
    totalLessons: 86,
    totalVideos: 54,
    joinedAt: '2023-08-20',
    progress: 92,
  },
  {
    id: 'student-4',
    coachId: COACH_IDS.DEMO_COACH,
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'mike.c@email.com',
    skillLevel: 'beginner',
    status: 'invited',
    totalLessons: 0,
    totalVideos: 0,
    joinedAt: '2024-12-01',
    progress: 0,
  },

  // ============================================
  // STARTER COACH (starter@demo.com) - 3 students
  // ============================================
  {
    id: 'student-5',
    coachId: COACH_IDS.STARTER_COACH,
    firstName: 'Casey',
    lastName: 'Martinez',
    email: 'casey.m@email.com',
    skillLevel: 'intermediate',
    status: 'active',
    lastLesson: '5 days ago',
    totalLessons: 36,
    totalVideos: 18,
    joinedAt: '2024-03-01',
    ratingStudentId: 'student-uuid-003',
    progress: 91,
  },
  {
    id: 'student-6',
    coachId: COACH_IDS.STARTER_COACH,
    firstName: 'Riley',
    lastName: 'Johnson',
    email: 'riley.j@email.com',
    skillLevel: 'professional',
    status: 'active',
    lastLesson: '1 week ago',
    totalLessons: 96,
    totalVideos: 64,
    joinedAt: '2023-03-15',
    ratingStudentId: 'student-uuid-004',
    progress: 68,
  },
  {
    id: 'student-7',
    coachId: COACH_IDS.STARTER_COACH,
    firstName: 'Taylor',
    lastName: 'Brown',
    email: 'taylor.b@email.com',
    skillLevel: 'beginner',
    status: 'active',
    lastLesson: 'Yesterday',
    totalLessons: 8,
    totalVideos: 4,
    joinedAt: '2024-10-15',
    progress: 45,
  },

  // ============================================
  // ADMIN COACH (admin@demo.com) - 5 students
  // ============================================
  {
    id: 'student-8',
    coachId: COACH_IDS.ADMIN_COACH,
    firstName: 'Emma',
    lastName: 'Williams',
    email: 'emma.w@email.com',
    skillLevel: 'advanced',
    status: 'active',
    lastLesson: '2 days ago',
    totalLessons: 52,
    totalVideos: 38,
    joinedAt: '2024-02-01',
    progress: 88,
  },
  {
    id: 'student-9',
    coachId: COACH_IDS.ADMIN_COACH,
    firstName: 'Liam',
    lastName: 'Davis',
    email: 'liam.d@email.com',
    skillLevel: 'intermediate',
    status: 'active',
    lastLesson: '4 days ago',
    totalLessons: 30,
    totalVideos: 22,
    joinedAt: '2024-05-10',
    progress: 76,
  },
  {
    id: 'student-10',
    coachId: COACH_IDS.ADMIN_COACH,
    firstName: 'Olivia',
    lastName: 'Garcia',
    email: 'olivia.g@email.com',
    skillLevel: 'professional',
    status: 'active',
    lastLesson: '1 day ago',
    totalLessons: 120,
    totalVideos: 85,
    joinedAt: '2022-11-01',
    progress: 95,
  },
  {
    id: 'student-11',
    coachId: COACH_IDS.ADMIN_COACH,
    firstName: 'Noah',
    lastName: 'Miller',
    email: 'noah.m@email.com',
    skillLevel: 'beginner',
    status: 'active',
    lastLesson: '1 week ago',
    totalLessons: 12,
    totalVideos: 6,
    joinedAt: '2024-09-01',
    progress: 35,
  },
  {
    id: 'student-12',
    coachId: COACH_IDS.ADMIN_COACH,
    firstName: 'Ava',
    lastName: 'Wilson',
    email: 'ava.w@email.com',
    skillLevel: 'intermediate',
    status: 'inactive',
    lastLesson: '1 month ago',
    totalLessons: 18,
    totalVideos: 10,
    joinedAt: '2024-04-15',
    progress: 62,
  },
];

// Helper: Get students for a specific coach
export function getStudentsByCoachId(coachId: string): MockStudent[] {
  return mockStudents.filter((student) => student.coachId === coachId);
}

// Helper: Get a single student by ID (validates coach ownership)
export function getStudentById(studentId: string, coachId: string): MockStudent | null {
  const student = mockStudents.find((s) => s.id === studentId);
  if (!student || student.coachId !== coachId) {
    return null;
  }
  return student;
}

// Helper: Get recent students for a coach (sorted by last lesson)
export function getRecentStudents(coachId: string, limit: number = 4): MockStudent[] {
  const students = getStudentsByCoachId(coachId);
  // Simple sort by lastLesson recency (in real app, would use actual dates)
  const sortOrder: Record<string, number> = {
    'Yesterday': 1,
    '1 day ago': 1,
    '2 days ago': 2,
    '3 days ago': 3,
    '4 days ago': 4,
    '5 days ago': 5,
    '1 week ago': 7,
    '1 month ago': 30,
  };

  return students
    .filter((s) => s.status === 'active')
    .sort((a, b) => {
      const aOrder = sortOrder[a.lastLesson ?? ''] ?? 999;
      const bOrder = sortOrder[b.lastLesson ?? ''] ?? 999;
      return aOrder - bOrder;
    })
    .slice(0, limit);
}

// Helper: Get student stats for a coach
export function getStudentStats(coachId: string) {
  const students = getStudentsByCoachId(coachId);
  return {
    total: students.length,
    active: students.filter((s) => s.status === 'active').length,
    inactive: students.filter((s) => s.status === 'inactive').length,
    invited: students.filter((s) => s.status === 'invited').length,
    archived: students.filter((s) => s.status === 'archived').length,
  };
}
