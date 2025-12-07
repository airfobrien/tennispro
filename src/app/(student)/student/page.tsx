'use client';

import {
  ArrowRight,
  Calendar,
  MessageSquare,
  Target,
  Trophy,
  Upload,
  Video,
} from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { RatingCard } from '@/components/ratings';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getMonthlyChange, getStudentRatings } from '@/lib/ratings';

// Mock data
const mockStudent = {
  name: 'Alex Thompson',
  currentLevel: 'Intermediate - Level 2',
  overallProgress: 65,
};

const mockCoach = {
  name: 'John Smith',
  title: 'USPTA Elite Professional',
  image: null,
  unreadMessages: 2,
};

const mockAchievements = [
  { id: '1', name: 'Forehand Consistency', date: '2024-01-15', level: 'Level 1' },
  { id: '2', name: 'Serve Motion', date: '2024-01-10', level: 'Level 1' },
  { id: '3', name: 'Ready Position', date: '2024-01-05', level: 'Level 1' },
];

const mockGoals = [
  { id: '1', name: 'Improve serve speed', progress: 60, deadline: '2024-02-15' },
  { id: '2', name: 'Master topspin forehand', progress: 35, deadline: '2024-03-01' },
];

const mockVideos = [
  { id: '1', title: 'Forehand Practice', status: 'analyzed', date: '2024-01-18' },
  { id: '2', title: 'Serve Session', status: 'processing', date: '2024-01-17' },
  { id: '3', title: 'Match Highlights', status: 'uploaded', date: '2024-01-15' },
];

const mockUpcomingLesson = {
  date: 'Tomorrow at 3:00 PM',
  type: 'Private Lesson',
  location: 'Court 3',
};

export default function StudentDashboard() {
  const { data: session } = useSession();
  const studentId = session?.user?.studentId;
  const ratings = studentId ? getStudentRatings(studentId) : null;
  const monthlyChange = ratings ? getMonthlyChange(ratings) : null;

  const coachInitials = mockCoach.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="container space-y-6 py-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {session?.user?.name?.split(' ')[0] || mockStudent.name.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Track your tennis journey and improve your game
          </p>
        </div>
        <Button asChild>
          <Link href="/student/videos/upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Video
          </Link>
        </Button>
      </div>

      {/* Rating Cards - Always show all three */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RatingCard
          type="utr"
          singles={ratings?.utr?.singles}
          doubles={ratings?.utr?.doubles}
          reliability={ratings?.utr?.singlesReliability}
          lastUpdated={ratings?.utr?.lastUpdated}
          profileUrl={ratings?.utr?.profileUrl}
          monthlyChange={monthlyChange?.utr}
        />
        <RatingCard
          type="wtn"
          singles={ratings?.wtn?.singles}
          doubles={ratings?.wtn?.doubles}
          confidence={ratings?.wtn?.confidence}
          lastUpdated={ratings?.wtn?.lastUpdated}
          profileUrl={ratings?.wtn?.profileUrl}
          monthlyChange={monthlyChange?.wtn}
        />
        <RatingCard
          type="ntrp"
          singles={ratings?.ntrp?.rating}
          ratingType={ratings?.ntrp?.type}
          lastUpdated={ratings?.ntrp?.lastUpdated}
          expirationDate={ratings?.ntrp?.expirationDate}
          profileUrl={ratings?.ntrp?.profileUrl}
          monthlyChange={monthlyChange?.ntrp}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Current Progress */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Your Progress</CardTitle>
            <CardDescription>{mockStudent.currentLevel}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Overall Completion</span>
                <span className="font-medium">{mockStudent.overallProgress}%</span>
              </div>
              <Progress value={mockStudent.overallProgress} />
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/student/progress">
                <Target className="mr-2 h-4 w-4" />
                View Full Progress
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Coach Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Your Coach</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mockCoach.image ?? undefined} />
                <AvatarFallback>{coachInitials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{mockCoach.name}</p>
                <p className="text-sm text-muted-foreground">{mockCoach.title}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/student/messages">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message Coach
                {mockCoach.unreadMessages > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {mockCoach.unreadMessages}
                  </Badge>
                )}
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Lesson */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Next Lesson</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium">{mockUpcomingLesson.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {mockUpcomingLesson.type} - {mockUpcomingLesson.location}
              </p>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/student/lessons">View All Lessons</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Achievements */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent Achievements</CardTitle>
              <CardDescription>Your latest milestones</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/student/achievements">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {achievement.level} - {achievement.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Goals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Active Goals</CardTitle>
              <CardDescription>Track your objectives</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/student/goals">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockGoals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{goal.name}</p>
                    <span className="text-sm text-muted-foreground">
                      Due {goal.deadline}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Videos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Recent Videos</CardTitle>
            <CardDescription>Your uploaded practice videos</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/student/videos">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockVideos.map((video) => (
              <Link
                key={video.id}
                href={`/student/videos/${video.id}`}
                className="group rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="mb-3 flex aspect-video items-center justify-center rounded-md bg-muted">
                  <Video className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium group-hover:text-primary">
                    {video.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {video.date}
                    </span>
                    <Badge
                      variant={
                        video.status === 'analyzed'
                          ? 'default'
                          : video.status === 'processing'
                            ? 'secondary'
                            : 'outline'
                      }
                      className="text-xs"
                    >
                      {video.status}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
