import {
  Users,
  Video,
  Calendar,
  TrendingUp,
  Plus,
  Upload,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { StudentRatingsSummary } from '@/components/ratings';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { getRecentStudents, getStudentStats, getStudentsByCoachId } from '@/lib/mock-data';
import { getStudentRatings } from '@/lib/ratings';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your tennis coaching practice',
};

// Generate upcoming lessons based on coach's students
function getUpcomingLessons(coachId: string) {
  const students = getStudentsByCoachId(coachId);
  const activeStudents = students.filter((s) => s.status === 'active');

  // Generate mock lessons from the coach's actual students
  const lessons = [];

  if (activeStudents[0]) {
    lessons.push({
      id: '1',
      studentId: activeStudents[0].id,
      student: `${activeStudents[0].firstName} ${activeStudents[0].lastName}`,
      type: 'Private' as const,
      time: 'Today, 2:00 PM',
      duration: '1 hour',
    });
  }

  if (activeStudents[1]) {
    lessons.push({
      id: '2',
      studentId: activeStudents[1].id,
      student: `${activeStudents[1].firstName} ${activeStudents[1].lastName}`,
      type: 'Private' as const,
      time: 'Today, 4:00 PM',
      duration: '1 hour',
    });
  }

  // Always add a group session
  lessons.push({
    id: '3',
    studentId: null,
    student: 'Group Session',
    type: 'Group' as const,
    time: 'Tomorrow, 10:00 AM',
    duration: '2 hours',
  });

  return lessons;
}

// Generate recent videos based on coach's students
function getRecentVideos(coachId: string) {
  const students = getStudentsByCoachId(coachId);
  const activeStudents = students.filter((s) => s.status === 'active');

  const videos = [];

  if (activeStudents[0]) {
    videos.push({
      id: '1',
      title: 'Serve Analysis',
      student: `${activeStudents[0].firstName} ${activeStudents[0].lastName}`,
      status: 'analyzed' as const,
      date: '1 hour ago',
    });
  }

  if (activeStudents[1]) {
    videos.push({
      id: '2',
      title: 'Forehand Drill',
      student: `${activeStudents[1].firstName} ${activeStudents[1].lastName}`,
      status: 'processing' as const,
      date: '3 hours ago',
    });
  }

  if (activeStudents[2]) {
    videos.push({
      id: '3',
      title: 'Backhand Practice',
      student: `${activeStudents[2].firstName} ${activeStudents[2].lastName}`,
      status: 'analyzed' as const,
      date: 'Yesterday',
    });
  }

  return videos;
}

export default async function DashboardPage() {
  const session = await auth();
  const coachId = session?.user?.coachId ?? '';

  // Get coach-specific data
  const studentStats = getStudentStats(coachId);
  const recentStudents = getRecentStudents(coachId, 4);
  const upcomingLessons = getUpcomingLessons(coachId);
  const recentVideos = getRecentVideos(coachId);

  // Calculate total videos from students
  const allStudents = getStudentsByCoachId(coachId);
  const totalVideos = allStudents.reduce((sum, s) => sum + s.totalVideos, 0);
  const avgProgress = allStudents.length > 0
    ? Math.round(allStudents.reduce((sum, s) => sum + (s.progress ?? 0), 0) / allStudents.length)
    : 0;

  const stats = [
    {
      title: 'Active Students',
      value: studentStats.active.toString(),
      change: studentStats.invited > 0 ? `${studentStats.invited} pending invite${studentStats.invited !== 1 ? 's' : ''}` : 'All confirmed',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Videos Analyzed',
      value: totalVideos.toString(),
      change: '+12 this week',
      changeType: 'positive' as const,
      icon: Video,
    },
    {
      title: 'Upcoming Lessons',
      value: upcomingLessons.length.toString(),
      change: 'Next 7 days',
      changeType: 'neutral' as const,
      icon: Calendar,
    },
    {
      title: 'Avg Progress',
      value: `${avgProgress}%`,
      change: '+5% from last month',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your coaching practice.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/students/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/videos/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload Video
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.changeType === 'positive'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-muted-foreground'
                }`}
              >
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Students */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Students</CardTitle>
            <Button variant="ghost" size="sm" className="hover:bg-accent/15" asChild>
              <Link href="/dashboard/students">
                View all
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStudents.length === 0 ? (
                <p className="text-sm text-muted-foreground">No students yet. Add your first student to get started.</p>
              ) : (
                recentStudents.map((student) => {
                  const ratings = student.ratingStudentId
                    ? getStudentRatings(student.ratingStudentId)
                    : null;

                  return (
                    <Link
                      key={student.id}
                      href={`/dashboard/students/${student.id}`}
                      className="flex items-center justify-between rounded-lg p-2 -m-2 transition-colors hover:bg-accent/15"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={student.avatar ?? undefined} />
                          <AvatarFallback>
                            {student.firstName[0]}
                            {student.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.firstName} {student.lastName}</p>
                          <p className="text-sm text-muted-foreground">
                            Last lesson: {student.lastLesson ?? 'Never'}
                          </p>
                          <StudentRatingsSummary ratings={ratings} className="mt-1" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-sm font-medium">{student.progress ?? 0}%</p>
                          <p className="text-xs text-muted-foreground">Progress</p>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Lessons */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Lessons</CardTitle>
            <Button variant="ghost" size="sm" className="hover:bg-accent/15" asChild>
              <Link href="/dashboard/lessons">
                View all
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingLessons.map((lesson) => {
                const content = (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{lesson.student}</p>
                        <p className="text-sm text-muted-foreground">
                          {lesson.time} · {lesson.duration}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium shadow-sm ${
                        lesson.type === 'Private'
                          ? 'bg-blue-600 text-white'
                          : 'bg-purple-600 text-white'
                      }`}
                    >
                      {lesson.type}
                    </span>
                  </>
                );

                return lesson.studentId ? (
                  <Link
                    key={lesson.id}
                    href={`/dashboard/students/${lesson.studentId}`}
                    className="flex items-center justify-between rounded-lg p-2 -m-2 transition-colors hover:bg-accent/15"
                  >
                    {content}
                  </Link>
                ) : (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-2 -m-2"
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Videos */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Videos</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/videos">
                View all
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentVideos.length === 0 ? (
                <p className="text-sm text-muted-foreground">No videos yet. Upload a video to get started with analysis.</p>
              ) : (
                recentVideos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-muted">
                        <Video className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{video.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {video.student} · {video.date}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium shadow-sm ${
                        video.status === 'analyzed'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {video.status === 'analyzed' ? 'Analyzed' : 'Processing'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
