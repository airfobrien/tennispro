'use client';

import { ArrowLeft, Calendar, Edit, Mail, MoreHorizontal, TrendingUp, Video, Archive, UserMinus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { RatingsProgressChart, StudentRatingsSummary } from '@/components/ratings';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getStudentRatings } from '@/lib/ratings';



// Mock data - replace with real data fetching
// Mapping student IDs to rating student IDs (in real app this would be in the database)
const studentRatingMapping: Record<string, string> = {
  '1': 'student-uuid-001', // Alex Thompson
  '2': 'student-uuid-002', // Jordan Williams
  '3': 'student-uuid-003', // Casey Martinez
  '4': 'student-uuid-004', // Riley Johnson
};

interface StudentData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  playStyle: string;
  handed: string;
  backhand: string;
  status: 'active' | 'inactive' | 'invited' | 'archived';
  joinedAt: string;
  goals: string;
  stats: {
    totalLessons: number;
    totalVideos: number;
    hoursCoached: number;
    lastLesson: string;
  };
  recentVideos: { id: string; title: string; date: string; status: string }[];
  upcomingLessons: { id: string; date: string; duration: string; focus: string }[];
  progressionPath: {
    name: string;
    currentLevel: number;
    totalLevels: number;
    progress: number;
    currentMilestone: string;
  };
}

const studentDatabase: Record<string, StudentData> = {
  '1': {
    id: '1',
    firstName: 'Alex',
    lastName: 'Thompson',
    email: 'alex.t@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1999-03-15',
    skillLevel: 'intermediate' as const,
    playStyle: 'Aggressive Baseliner',
    handed: 'Right-handed',
    backhand: 'Two-handed',
    status: 'active' as const,
    joinedAt: 'June 15, 2024',
    goals: 'Improve serve consistency and develop net game. Preparing for league competition.',
    stats: {
      totalLessons: 24,
      totalVideos: 15,
      hoursCoached: 36,
      lastLesson: '2 days ago',
    },
    recentVideos: [
      { id: '1', title: 'Forehand practice', date: '2 days ago', status: 'analyzed' },
      { id: '2', title: 'Serve technique', date: '1 week ago', status: 'analyzed' },
      { id: '3', title: 'Match footage', date: '2 weeks ago', status: 'pending' },
    ],
    upcomingLessons: [
      { id: '1', date: 'Tomorrow, 3:00 PM', duration: '1 hour', focus: 'Serve practice' },
      { id: '2', date: 'Saturday, 10:00 AM', duration: '90 min', focus: 'Match play' },
    ],
    progressionPath: {
      name: 'Intermediate Development',
      currentLevel: 3,
      totalLevels: 5,
      progress: 65,
      currentMilestone: 'Net Approach Mastery',
    },
  },
  '2': {
    id: '2',
    firstName: 'Jordan',
    lastName: 'Williams',
    email: 'jordan.w@email.com',
    phone: '+1 (555) 234-5678',
    dateOfBirth: '2008-07-20',
    skillLevel: 'advanced' as const,
    playStyle: 'All-Court Player',
    handed: 'Right-handed',
    backhand: 'Two-handed',
    status: 'active' as const,
    joinedAt: 'January 10, 2024',
    goals: 'Compete in junior nationals. Work on mental game and consistency under pressure.',
    stats: {
      totalLessons: 48,
      totalVideos: 32,
      hoursCoached: 72,
      lastLesson: '1 week ago',
    },
    recentVideos: [
      { id: '1', title: 'Tournament match', date: '1 week ago', status: 'analyzed' },
      { id: '2', title: 'Backhand drill', date: '2 weeks ago', status: 'analyzed' },
    ],
    upcomingLessons: [
      { id: '1', date: 'Wednesday, 4:00 PM', duration: '1.5 hours', focus: 'Tournament prep' },
    ],
    progressionPath: {
      name: 'Junior Competitive',
      currentLevel: 4,
      totalLevels: 5,
      progress: 78,
      currentMilestone: 'Tournament Strategy',
    },
  },
};

// Default student for unknown IDs
const baseStudent: StudentData = {
  id: '1',
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@email.com',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '2005-03-15',
  skillLevel: 'intermediate',
  playStyle: 'Aggressive Baseliner',
  handed: 'Right-handed',
  backhand: 'Two-handed',
  status: 'active',
  joinedAt: 'June 15, 2024',
  goals: 'Improve serve consistency and develop net game. Preparing for high school varsity tryouts.',
  stats: {
    totalLessons: 24,
    totalVideos: 15,
    hoursCoached: 36,
    lastLesson: '2 days ago',
  },
  recentVideos: [
    { id: '1', title: 'Forehand practice', date: '2 days ago', status: 'analyzed' },
    { id: '2', title: 'Serve technique', date: '1 week ago', status: 'analyzed' },
    { id: '3', title: 'Match footage', date: '2 weeks ago', status: 'pending' },
  ],
  upcomingLessons: [
    { id: '1', date: 'Tomorrow, 3:00 PM', duration: '1 hour', focus: 'Serve practice' },
    { id: '2', date: 'Saturday, 10:00 AM', duration: '90 min', focus: 'Match play' },
  ],
  progressionPath: {
    name: 'Intermediate Development',
    currentLevel: 3,
    totalLevels: 5,
    progress: 65,
    currentMilestone: 'Net Approach Mastery',
  },
};

const skillLevelColors = {
  beginner: 'bg-green-500/10 text-green-500',
  intermediate: 'bg-blue-500/10 text-blue-500',
  advanced: 'bg-purple-500/10 text-purple-500',
  professional: 'bg-orange-500/10 text-orange-500',
};

export default function StudentProfilePage() {
  const params = useParams();
  const studentId = params.id as string;

  // Get student data from database (fallback to base student for unknown IDs)
  const student = studentDatabase[studentId] || baseStudent;

  // Get ratings for this student
  const ratingStudentId = studentRatingMapping[studentId];
  const ratings = ratingStudentId ? getStudentRatings(ratingStudentId) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/students">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <Avatar className="h-16 w-16">
            <AvatarImage src={undefined} />
            <AvatarFallback className="text-xl">
              {student.firstName[0]}{student.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">
                {student.firstName} {student.lastName}
              </h1>
              <Badge className={skillLevelColors[student.skillLevel]}>
                {student.skillLevel}
              </Badge>
            </div>
            <p className="text-muted-foreground">{student.email}</p>
            <div className="mt-2">
              <StudentRatingsSummary ratings={ratings} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/students/${studentId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Lesson
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Video className="mr-2 h-4 w-4" />
                Request Video
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserMinus className="mr-2 h-4 w-4" />
                Mark Inactive
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Archive className="mr-2 h-4 w-4" />
                Archive Student
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Lessons</CardDescription>
            <CardTitle className="text-3xl">{student.stats.totalLessons}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Videos</CardDescription>
            <CardTitle className="text-3xl">{student.stats.totalVideos}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Hours Coached</CardDescription>
            <CardTitle className="text-3xl">{student.stats.hoursCoached}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Last Lesson</CardDescription>
            <CardTitle className="text-xl">{student.stats.lastLesson}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Profile Details */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{student.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                    <p className="font-medium">{student.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Playing Style</p>
                    <p className="font-medium">{student.playStyle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dominant Hand</p>
                    <p className="font-medium">{student.handed}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Backhand</p>
                    <p className="font-medium">{student.backhand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">{student.joinedAt}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Goals & Notes</p>
                  <p className="mt-1">{student.goals}</p>
                </div>
              </CardContent>
            </Card>

            {/* Current Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Current Progress Path</CardTitle>
                <CardDescription>{student.progressionPath.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Level {student.progressionPath.currentLevel} of {student.progressionPath.totalLevels}
                  </span>
                  <span className="text-sm font-medium">{student.progressionPath.progress}%</span>
                </div>
                <Progress value={student.progressionPath.progress} />
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm text-muted-foreground">Current Milestone</p>
                  <p className="font-medium">{student.progressionPath.currentMilestone}</p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/dashboard/students/${studentId}/progress`}>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Full Progress
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Videos */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Videos</CardTitle>
                  <CardDescription>Latest video uploads</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/students/${studentId}/videos`}>View all</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {student.recentVideos.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Video className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{video.title}</p>
                          <p className="text-sm text-muted-foreground">{video.date}</p>
                        </div>
                      </div>
                      <Badge variant={video.status === 'analyzed' ? 'default' : 'secondary'}>
                        {video.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Lessons */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Lessons</CardTitle>
                  <CardDescription>Scheduled sessions</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/lessons">View all</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {student.upcomingLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{lesson.date}</p>
                          <p className="text-sm text-muted-foreground">
                            {lesson.duration} - {lesson.focus}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle>Video Library</CardTitle>
              <CardDescription>All videos for this student</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Video library content coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          {/* Ratings Progress Chart */}
          {ratings && (
            <RatingsProgressChart
              history={ratings.history}
              currentRatings={{
                utr: ratings.utr?.singles,
                wtn: ratings.wtn?.singles,
                ntrp: ratings.ntrp?.rating,
              }}
            />
          )}

          {/* Skill Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Skill Progress</CardTitle>
              <CardDescription>{student.progressionPath.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Level {student.progressionPath.currentLevel} of {student.progressionPath.totalLevels}
                </span>
                <span className="text-sm font-medium">{student.progressionPath.progress}%</span>
              </div>
              <Progress value={student.progressionPath.progress} />
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm text-muted-foreground">Current Milestone</p>
                <p className="font-medium">{student.progressionPath.currentMilestone}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lessons">
          <Card>
            <CardHeader>
              <CardTitle>Lesson History</CardTitle>
              <CardDescription>Past and upcoming lessons</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Lesson history content coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
