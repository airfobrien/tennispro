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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStudentRatings } from '@/lib/ratings';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your tennis coaching practice',
};

// Mock data - replace with real data fetching
const stats = [
  {
    title: 'Active Students',
    value: '24',
    change: '+3 this month',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    title: 'Videos Analyzed',
    value: '156',
    change: '+12 this week',
    changeType: 'positive' as const,
    icon: Video,
  },
  {
    title: 'Upcoming Lessons',
    value: '8',
    change: 'Next 7 days',
    changeType: 'neutral' as const,
    icon: Calendar,
  },
  {
    title: 'Avg Progress',
    value: '87%',
    change: '+5% from last month',
    changeType: 'positive' as const,
    icon: TrendingUp,
  },
];

const recentStudents = [
  {
    id: '1',
    name: 'Alex Thompson',
    avatar: null,
    lastLesson: '2 days ago',
    progress: 85,
    ratingStudentId: 'student-uuid-001', // Adult - UTR, WTN, NTRP
  },
  {
    id: '2',
    name: 'Jordan Williams',
    avatar: null,
    lastLesson: '3 days ago',
    progress: 72,
    ratingStudentId: 'student-uuid-002', // Junior - UTR, WTN only
  },
  {
    id: '3',
    name: 'Casey Martinez',
    avatar: null,
    lastLesson: '5 days ago',
    progress: 91,
    ratingStudentId: 'student-uuid-003', // Senior - NTRP only
  },
  {
    id: '4',
    name: 'Riley Johnson',
    avatar: null,
    lastLesson: '1 week ago',
    progress: 68,
    ratingStudentId: 'student-uuid-004', // College - UTR, WTN, NTRP
  },
];

const upcomingLessons = [
  {
    id: '1',
    student: 'Sarah Johnson',
    type: 'Private',
    time: 'Today, 2:00 PM',
    duration: '1 hour',
  },
  {
    id: '2',
    student: 'Mike Chen',
    type: 'Private',
    time: 'Today, 4:00 PM',
    duration: '1 hour',
  },
  {
    id: '3',
    student: 'Group Session',
    type: 'Group',
    time: 'Tomorrow, 10:00 AM',
    duration: '2 hours',
  },
];

const recentVideos = [
  {
    id: '1',
    title: 'Serve Analysis',
    student: 'Sarah Johnson',
    status: 'analyzed',
    date: '1 hour ago',
  },
  {
    id: '2',
    title: 'Forehand Drill',
    student: 'Mike Chen',
    status: 'processing',
    date: '3 hours ago',
  },
  {
    id: '3',
    title: 'Backhand Practice',
    student: 'Emma Williams',
    status: 'analyzed',
    date: 'Yesterday',
  },
];

export default function DashboardPage() {
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
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/students">
                View all
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStudents.map((student) => {
                const ratings = student.ratingStudentId
                  ? getStudentRatings(student.ratingStudentId)
                  : null;

                return (
                  <div
                    key={student.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={student.avatar ?? undefined} />
                        <AvatarFallback>
                          {student.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Last lesson: {student.lastLesson}
                        </p>
                        <StudentRatingsSummary ratings={ratings} className="mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-medium">{student.progress}%</p>
                        <p className="text-xs text-muted-foreground">Progress</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Lessons */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Lessons</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/lessons">
                View all
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between"
                >
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
                  <Badge variant={lesson.type === 'Private' ? 'default' : 'secondary'}>
                    {lesson.type}
                  </Badge>
                </div>
              ))}
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
              {recentVideos.map((video) => (
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
                  <Badge
                    variant={video.status === 'analyzed' ? 'default' : 'secondary'}
                  >
                    {video.status === 'analyzed' ? 'Analyzed' : 'Processing'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
