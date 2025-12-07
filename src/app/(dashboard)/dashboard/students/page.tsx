'use client';

import { Filter, Plus, Search, Upload, MoreHorizontal, Mail, Archive, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';

import { StudentRatingsSummary } from '@/components/ratings';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCoachId } from '@/lib/auth/hooks';
import { getStudentsByCoachId, type MockStudent } from '@/lib/mock-data';
import { getStudentRatings } from '@/lib/ratings';
import { cn } from '@/lib/utils';

const skillLevelColors: Record<MockStudent['skillLevel'], string> = {
  beginner: 'bg-green-500/15 text-green-600 dark:text-green-400',
  intermediate: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  advanced: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
  professional: 'bg-orange-500/15 text-orange-600 dark:text-orange-400',
};

const statusColors: Record<MockStudent['status'], string> = {
  active: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  inactive: 'bg-gray-500/15 text-gray-600 dark:text-gray-400',
  invited: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400',
  archived: 'bg-red-500/15 text-red-600 dark:text-red-400',
};

export default function StudentsPage() {
  const coachId = useCoachId();
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Get students for the current coach
  const students = useMemo(() => {
    if (!coachId) return [];
    return getStudentsByCoachId(coachId);
  }, [coachId]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSkill = skillFilter === 'all' || student.skillLevel === skillFilter;
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      return matchesSearch && matchesSkill && matchesStatus;
    });
  }, [students, searchQuery, skillFilter, statusFilter]);

  const activeCount = students.filter((s) => s.status === 'active').length;
  const invitedCount = students.filter((s) => s.status === 'invited').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            Manage your students and track their progress
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/students/import">
              <Upload className="mr-2 h-4 w-4" />
              Import CSV
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/students/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Students</CardDescription>
            <CardTitle className="text-3xl">{students.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active</CardDescription>
            <CardTitle className="text-3xl">{activeCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Invites</CardDescription>
            <CardTitle className="text-3xl">{invitedCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>This Month</CardDescription>
            <CardTitle className="text-3xl">+{Math.min(2, students.length)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>
            {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Skill Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="invited">Invited</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Ratings</TableHead>
                  <TableHead>Skill Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Lesson</TableHead>
                  <TableHead className="text-right">Lessons</TableHead>
                  <TableHead className="text-right">Videos</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      {students.length === 0
                        ? 'No students yet. Add your first student to get started.'
                        : 'No students found matching your filters.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => {
                    const ratings = student.ratingStudentId
                      ? getStudentRatings(student.ratingStudentId)
                      : null;

                    return (
                    <TableRow key={student.id}>
                      <TableCell>
                        <Link
                          href={`/dashboard/students/${student.id}`}
                          className="flex items-center gap-3 hover:underline"
                        >
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>
                              {student.firstName[0]}
                              {student.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {student.firstName} {student.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {student.email}
                            </p>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <StudentRatingsSummary ratings={ratings} />
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={cn('capitalize', skillLevelColors[student.skillLevel])}
                        >
                          {student.skillLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={cn('capitalize', statusColors[student.status])}
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {student.lastLesson ?? 'Never'}
                      </TableCell>
                      <TableCell className="text-right">{student.totalLessons}</TableCell>
                      <TableCell className="text-right">{student.totalVideos}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/students/${student.id}`}>
                                <UserCheck className="mr-2 h-4 w-4" />
                                View Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/students/${student.id}/edit`}>
                                Edit Student
                              </Link>
                            </DropdownMenuItem>
                            {student.status === 'invited' && (
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Resend Invite
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Archive className="mr-2 h-4 w-4" />
                              Archive Student
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
