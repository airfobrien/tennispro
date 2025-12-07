'use client';

import {
  Calendar,
  Clock,
  Filter,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  User,
  FileText,
  Video,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';

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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCoachId } from '@/lib/auth/hooks';
import { getStudentsByCoachId } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

// Types
interface Lesson {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  date: string;
  time: string;
  type: 'private' | 'semi-private' | 'group' | 'clinic';
  location: string;
  duration: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  coachNotes?: string;
  privateNotes?: string;
  videos?: string[];
}

// Helper to format date as YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0] ?? '';
};

const upcomingTimes = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] as const;
const upcomingTypes = ['private', 'semi-private', 'private', 'group'] as const;
const pastTimes = ['10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] as const;
const coachNotesOptions = [
  'Worked on forehand topspin. Good progress on follow-through.',
  'Serve development session. Trophy position improved significantly.',
  'Backhand slice practice. Need more work on footwork.',
  'Net game drills. Volley technique showing improvement.',
] as const;

// Mock lessons data - this would come from API in production
const getMockLessons = (coachId: string): Lesson[] => {
  const students = getStudentsByCoachId(coachId);
  if (students.length === 0) return [];

  const lessons: Lesson[] = [];
  const today = new Date();

  // Generate upcoming lessons
  students.slice(0, 3).forEach((student, idx) => {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + (idx + 1) * 2);

    lessons.push({
      id: `upcoming-${idx}`,
      studentId: student.id,
      studentName: `${student.firstName} ${student.lastName}`,
      studentAvatar: student.avatar,
      date: formatDate(futureDate),
      time: upcomingTimes[idx % 4] ?? '9:00 AM',
      type: upcomingTypes[idx % 4] as Lesson['type'],
      location: `Court ${(idx % 4) + 1}`,
      duration: '1 hour',
      status: 'scheduled',
    });
  });

  // Generate past lessons
  students.forEach((student, idx) => {
    const pastDate1 = new Date(today);
    pastDate1.setDate(today.getDate() - (idx + 1) * 3);

    lessons.push({
      id: `past-${idx}-1`,
      studentId: student.id,
      studentName: `${student.firstName} ${student.lastName}`,
      studentAvatar: student.avatar,
      date: formatDate(pastDate1),
      time: pastTimes[idx % 4] ?? '10:00 AM',
      type: 'private',
      location: `Court ${(idx % 4) + 1}`,
      duration: '1 hour',
      status: 'completed',
      coachNotes: coachNotesOptions[idx % 4] ?? 'Lesson completed.',
      videos: idx % 2 === 0 ? ['v1'] : undefined,
    });

    if (idx < 2) {
      const pastDate2 = new Date(today);
      pastDate2.setDate(today.getDate() - (idx + 1) * 7);

      lessons.push({
        id: `past-${idx}-2`,
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
        studentAvatar: student.avatar,
        date: formatDate(pastDate2),
        time: '2:00 PM',
        type: 'semi-private',
        location: 'Court 2',
        duration: '90 min',
        status: idx === 0 ? 'completed' : 'cancelled',
        coachNotes: idx === 0 ? 'Doubles strategy session with partner.' : undefined,
      });
    }
  });

  return lessons.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const lessonTypeColors: Record<Lesson['type'], string> = {
  private: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  'semi-private': 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
  group: 'bg-green-500/15 text-green-600 dark:text-green-400',
  clinic: 'bg-orange-500/15 text-orange-600 dark:text-orange-400',
};

const statusColors: Record<Lesson['status'], string> = {
  scheduled: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  completed: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  cancelled: 'bg-red-500/15 text-red-600 dark:text-red-400',
  'no-show': 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400',
};

export default function LessonsPage() {
  const coachId = useCoachId();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [studentFilter, setStudentFilter] = useState<string>('all');

  const students = useMemo(() => {
    if (!coachId) return [];
    return getStudentsByCoachId(coachId);
  }, [coachId]);

  const lessons = useMemo(() => {
    if (!coachId) return [];
    return getMockLessons(coachId);
  }, [coachId]);

  const today = formatDate(new Date());

  const upcomingLessons = useMemo(() => {
    return lessons.filter((lesson) => lesson.date >= today && lesson.status === 'scheduled');
  }, [lessons, today]);

  const pastLessons = useMemo(() => {
    return lessons.filter((lesson) => lesson.date < today || lesson.status !== 'scheduled');
  }, [lessons, today]);

  const filteredPastLessons = useMemo(() => {
    return pastLessons.filter((lesson) => {
      const matchesSearch = lesson.studentName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'all' || lesson.type === typeFilter;
      const matchesStudent = studentFilter === 'all' || lesson.studentId === studentFilter;
      return matchesSearch && matchesType && matchesStudent;
    });
  }, [pastLessons, searchQuery, typeFilter, studentFilter]);

  const thisWeekCount = upcomingLessons.filter((lesson) => {
    const lessonDate = new Date(lesson.date);
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return lessonDate <= weekFromNow;
  }).length;

  const completedThisMonth = pastLessons.filter((lesson) => {
    const lessonDate = new Date(lesson.date);
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    return lesson.status === 'completed' && lessonDate >= monthAgo;
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lessons</h1>
          <p className="text-muted-foreground">
            Schedule and manage your coaching sessions
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/lessons/new">
            <Plus className="mr-2 h-4 w-4" />
            Schedule Lesson
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Upcoming</CardDescription>
            <CardTitle className="text-3xl">{upcomingLessons.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>This Week</CardDescription>
            <CardTitle className="text-3xl">{thisWeekCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed (30d)</CardDescription>
            <CardTitle className="text-3xl">{completedThisMonth}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Students</CardDescription>
            <CardTitle className="text-3xl">{students.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingLessons.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastLessons.length})
          </TabsTrigger>
        </TabsList>

        {/* Upcoming Lessons Tab */}
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingLessons.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">No upcoming lessons</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Schedule a lesson to get started
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/dashboard/lessons/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Lesson
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingLessons.map((lesson) => (
                <Card key={lesson.id} className="border-primary/30 bg-primary/5">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge className={cn('capitalize', statusColors[lesson.status])}>
                        {lesson.status}
                      </Badge>
                      <Badge variant="outline" className={cn('capitalize', lessonTypeColors[lesson.type])}>
                        {lesson.type.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Student Info */}
                    <Link
                      href={`/dashboard/students/${lesson.studentId}`}
                      className="flex items-center gap-3 hover:underline"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={lesson.studentAvatar} />
                        <AvatarFallback>
                          {lesson.studentName.split(' ').map((n) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{lesson.studentName}</p>
                        <p className="text-sm text-muted-foreground">Student</p>
                      </div>
                    </Link>

                    <Separator />

                    {/* Date/Time */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{lesson.date}</span>
                        <span className="text-muted-foreground">at</span>
                        <span className="font-medium">{lesson.time}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {lesson.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {lesson.duration}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/dashboard/lessons/${lesson.id}`}>
                          View Details
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit Lesson</DropdownMenuItem>
                          <DropdownMenuItem>Reschedule</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Cancel Lesson
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Past Lessons Tab */}
        <TabsContent value="past" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by student name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={studentFilter} onValueChange={setStudentFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <User className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.firstName} {student.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="semi-private">Semi-Private</SelectItem>
                    <SelectItem value="group">Group</SelectItem>
                    <SelectItem value="clinic">Clinic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Past Lessons List */}
          {filteredPastLessons.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No past lessons found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredPastLessons.map((lesson) => (
                <Card key={lesson.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={lesson.studentAvatar} />
                          <AvatarFallback>
                            {lesson.studentName.split(' ').map((n) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">
                            <Link
                              href={`/dashboard/students/${lesson.studentId}`}
                              className="hover:underline"
                            >
                              {lesson.studentName}
                            </Link>
                          </CardTitle>
                          <CardDescription className="flex flex-wrap items-center gap-2">
                            <span>{lesson.date}</span>
                            <span>·</span>
                            <span>{lesson.time}</span>
                            <span>·</span>
                            <span>{lesson.location}</span>
                            <span>·</span>
                            <span>{lesson.duration}</span>
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={cn('capitalize', lessonTypeColors[lesson.type])}
                        >
                          {lesson.type.replace('-', ' ')}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={cn('capitalize', statusColors[lesson.status])}
                        >
                          {lesson.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  {(lesson.coachNotes || lesson.videos) && (
                    <CardContent className="space-y-3">
                      {lesson.coachNotes && (
                        <div className="rounded-lg bg-muted/50 p-3">
                          <div className="mb-1 flex items-center gap-2 text-sm font-medium">
                            <FileText className="h-4 w-4" />
                            Lesson Notes
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {lesson.coachNotes}
                          </p>
                        </div>
                      )}
                      {lesson.videos && lesson.videos.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {lesson.videos.length} video{lesson.videos.length !== 1 ? 's' : ''} attached
                          </span>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/lessons/${lesson.id}`}>
                              View
                            </Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
