'use client';

import { Plus, MoreHorizontal, Users, Target, TrendingUp, Copy, Trash2, Edit, Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

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
import { cn } from '@/lib/utils';

interface ProgressionPath {
  id: string;
  name: string;
  description: string;
  category: 'recreational' | 'competitive_junior' | 'collegiate_track' | 'professional_track' | 'senior';
  levels: number;
  studentsAssigned: number;
  isTemplate: boolean;
  progress?: number;
}

const mockPaths: ProgressionPath[] = [
  {
    id: '1',
    name: 'Junior Development',
    description: 'Complete pathway for junior players ages 8-14',
    category: 'competitive_junior',
    levels: 5,
    studentsAssigned: 8,
    isTemplate: false,
    progress: 65,
  },
  {
    id: '2',
    name: 'Adult Beginner',
    description: 'Introduction to tennis fundamentals for adult beginners',
    category: 'recreational',
    levels: 4,
    studentsAssigned: 12,
    isTemplate: false,
    progress: 45,
  },
  {
    id: '3',
    name: 'High School Prep',
    description: 'Preparation for high school varsity tennis',
    category: 'collegiate_track',
    levels: 6,
    studentsAssigned: 4,
    isTemplate: false,
    progress: 80,
  },
  {
    id: '4',
    name: 'Advanced Technique',
    description: 'Refining technique for competitive players',
    category: 'professional_track',
    levels: 5,
    studentsAssigned: 3,
    isTemplate: false,
    progress: 30,
  },
];

const categoryColors: Record<ProgressionPath['category'], string> = {
  recreational: 'bg-green-500/10 text-green-500',
  competitive_junior: 'bg-blue-500/10 text-blue-500',
  collegiate_track: 'bg-purple-500/10 text-purple-500',
  professional_track: 'bg-orange-500/10 text-orange-500',
  senior: 'bg-gray-500/10 text-gray-500',
};

const categoryLabels: Record<ProgressionPath['category'], string> = {
  recreational: 'Recreational',
  competitive_junior: 'Competitive Junior',
  collegiate_track: 'Collegiate Track',
  professional_track: 'Professional Track',
  senior: 'Senior',
};

export default function ProgressionPage() {
  const [paths] = useState<ProgressionPath[]>(mockPaths);

  const totalStudents = paths.reduce((acc, p) => acc + p.studentsAssigned, 0);
  const totalPaths = paths.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Progression Paths</h1>
          <p className="text-muted-foreground">
            Create and manage student development pathways
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/progress/templates">
              <Copy className="mr-2 h-4 w-4" />
              Templates
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/progress/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Path
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Active Paths
            </CardDescription>
            <CardTitle className="text-3xl">{totalPaths}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Students Enrolled
            </CardDescription>
            <CardTitle className="text-3xl">{totalStudents}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Avg. Completion
            </CardDescription>
            <CardTitle className="text-3xl">55%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Paths Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paths.map((path) => (
          <Card key={path.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-lg">
                  <Link
                    href={`/dashboard/progress/${path.id}`}
                    className="hover:underline"
                  >
                    {path.name}
                  </Link>
                </CardTitle>
                <Badge className={cn('text-xs', categoryColors[path.category])}>
                  {categoryLabels[path.category]}
                </Badge>
              </div>
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
                    <Link href={`/dashboard/progress/${path.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Path
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/progress/${path.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Path
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                {path.description}
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{path.levels} levels</span>
                  <span className="text-muted-foreground">
                    {path.studentsAssigned} students
                  </span>
                </div>
                {path.progress !== undefined && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Average Progress</span>
                      <span className="font-medium">{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="h-2" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Create New Card */}
        <Card className="flex items-center justify-center border-dashed">
          <CardContent className="flex flex-col items-center py-8 text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mb-1 font-medium">Create New Path</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Start from scratch or use a template
            </p>
            <Button variant="outline" asChild>
              <Link href="/dashboard/progress/new">Get Started</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
