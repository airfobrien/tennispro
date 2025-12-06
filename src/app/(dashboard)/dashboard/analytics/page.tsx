'use client';

import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Download,
  TrendingUp,
  Users,
  Video,
  Clock,
  Target,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface MetricCard {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: typeof Users;
}

const metrics: MetricCard[] = [
  {
    title: 'Active Students',
    value: '27',
    change: 12.5,
    changeLabel: 'vs last month',
    icon: Users,
  },
  {
    title: 'Videos Analyzed',
    value: '156',
    change: 23.1,
    changeLabel: 'vs last month',
    icon: Video,
  },
  {
    title: 'Lessons Completed',
    value: '89',
    change: -5.2,
    changeLabel: 'vs last month',
    icon: Calendar,
  },
  {
    title: 'Avg. Session Time',
    value: '24m',
    change: 8.3,
    changeLabel: 'vs last month',
    icon: Clock,
  },
];

interface StudentProgress {
  id: string;
  name: string;
  initials: string;
  level: string;
  progress: number;
  videosThisMonth: number;
  lastActive: string;
}

const topStudents: StudentProgress[] = [
  { id: '1', name: 'Sarah Johnson', initials: 'SJ', level: 'Advanced', progress: 92, videosThisMonth: 8, lastActive: '2h ago' },
  { id: '2', name: 'Mike Chen', initials: 'MC', level: 'Intermediate', progress: 87, videosThisMonth: 6, lastActive: '1d ago' },
  { id: '3', name: 'Emily Davis', initials: 'ED', level: 'Advanced', progress: 85, videosThisMonth: 5, lastActive: '3h ago' },
  { id: '4', name: 'John Smith', initials: 'JS', level: 'Beginner', progress: 78, videosThisMonth: 4, lastActive: '5h ago' },
  { id: '5', name: 'Alex Thompson', initials: 'AT', level: 'Intermediate', progress: 75, videosThisMonth: 4, lastActive: '1d ago' },
];

interface PopularPath {
  id: string;
  name: string;
  category: string;
  studentsEnrolled: number;
  avgCompletion: number;
}

const popularPaths: PopularPath[] = [
  { id: '1', name: 'Junior Development', category: 'competitive_junior', studentsEnrolled: 12, avgCompletion: 68 },
  { id: '2', name: 'Adult Beginner', category: 'recreational', studentsEnrolled: 8, avgCompletion: 45 },
  { id: '3', name: 'Serve Mastery', category: 'skill', studentsEnrolled: 6, avgCompletion: 72 },
];

interface ActivityItem {
  id: string;
  type: 'video' | 'lesson' | 'milestone';
  description: string;
  time: string;
}

const recentActivity: ActivityItem[] = [
  { id: '1', type: 'video', description: 'Sarah Johnson uploaded a serve video', time: '2h ago' },
  { id: '2', type: 'milestone', description: 'Mike Chen completed Level 2 forehand', time: '3h ago' },
  { id: '3', type: 'lesson', description: 'Lesson with Emily Davis completed', time: '5h ago' },
  { id: '4', type: 'video', description: 'Video analysis for John Smith ready', time: '6h ago' },
  { id: '5', type: 'lesson', description: 'Upcoming lesson with Alex in 2 hours', time: '8h ago' },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your coaching performance and student progress
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs">
                {metric.change >= 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span
                  className={cn(
                    metric.change >= 0 ? 'text-green-500' : 'text-red-500'
                  )}
                >
                  {Math.abs(metric.change)}%
                </span>
                <span className="ml-1 text-muted-foreground">
                  {metric.changeLabel}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Students */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Performing Students
            </CardTitle>
            <CardDescription>
              Students with highest engagement this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStudents.map((student, index) => (
                <div
                  key={student.id}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    {student.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {student.level} • {student.videosThisMonth} videos this month
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{student.progress}%</p>
                        <p className="text-xs text-muted-foreground">
                          {student.lastActive}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events from your students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div
                    className={cn(
                      'mt-1 h-2 w-2 rounded-full',
                      activity.type === 'video' && 'bg-blue-500',
                      activity.type === 'lesson' && 'bg-green-500',
                      activity.type === 'milestone' && 'bg-yellow-500'
                    )}
                  />
                  <div className="flex-1">
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Paths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Popular Progression Paths
          </CardTitle>
          <CardDescription>
            Most enrolled paths by your students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularPaths.map((path) => (
              <div
                key={path.id}
                className="rounded-lg border p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{path.name}</h4>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {path.category.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{path.studentsEnrolled}</p>
                    <p className="text-xs text-muted-foreground">enrolled</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Avg. completion</span>
                    <span className="font-medium">{path.avgCompletion}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${path.avgCompletion}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Video Analytics Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Videos Uploaded</CardDescription>
            <CardTitle className="text-3xl">42</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              +12 this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Analyses Completed</CardDescription>
            <CardTitle className="text-3xl">38</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              90% completion rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Analysis Time</CardDescription>
            <CardTitle className="text-3xl">2.3m</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Processing speed improved 15%
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
