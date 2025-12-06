'use client';

import { CheckCircle2, Circle, Lock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Mock progression path data
const mockPath = {
  name: 'Junior Development',
  description: 'Complete pathway for competitive junior players',
  currentLevelId: '2',
  levels: [
    {
      id: '1',
      name: 'Foundations',
      description: 'Build your tennis basics',
      status: 'completed' as const,
      progress: 100,
      skills: 4,
      completedSkills: 4,
    },
    {
      id: '2',
      name: 'Intermediate',
      description: 'Develop consistent strokes',
      status: 'in_progress' as const,
      progress: 65,
      skills: 6,
      completedSkills: 4,
    },
    {
      id: '3',
      name: 'Advanced Technique',
      description: 'Master advanced mechanics',
      status: 'locked' as const,
      progress: 0,
      skills: 5,
      completedSkills: 0,
    },
    {
      id: '4',
      name: 'Competition Ready',
      description: 'Prepare for tournaments',
      status: 'locked' as const,
      progress: 0,
      skills: 6,
      completedSkills: 0,
    },
  ],
};

const statusIcons = {
  completed: CheckCircle2,
  in_progress: Circle,
  locked: Lock,
};

const statusColors = {
  completed: 'text-green-500 bg-green-500/10',
  in_progress: 'text-primary bg-primary/10',
  locked: 'text-muted-foreground bg-muted',
};

export default function StudentProgressPage() {
  const totalSkills = mockPath.levels.reduce((acc, l) => acc + l.skills, 0);
  const completedSkills = mockPath.levels.reduce((acc, l) => acc + l.completedSkills, 0);
  const overallProgress = Math.round((completedSkills / totalSkills) * 100);

  return (
    <div className="container space-y-6 py-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Progress</h1>
        <p className="text-muted-foreground">{mockPath.name}</p>
      </div>

      {/* Overall Progress Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Overall Progress</CardTitle>
          <CardDescription>{mockPath.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{overallProgress}%</p>
              <p className="text-sm text-muted-foreground">
                {completedSkills} of {totalSkills} skills completed
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Level {mockPath.levels.findIndex((l) => l.id === mockPath.currentLevelId) + 1} of {mockPath.levels.length}
            </Badge>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* Levels */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Levels</h2>
        <div className="space-y-3">
          {mockPath.levels.map((level, index) => {
            const StatusIcon = statusIcons[level.status];
            const isCurrentLevel = level.id === mockPath.currentLevelId;

            return (
              <Link
                key={level.id}
                href={level.status !== 'locked' ? `/student/progress/${level.id}` : '#'}
                className={cn(
                  'block',
                  level.status === 'locked' && 'pointer-events-none'
                )}
              >
                <Card
                  className={cn(
                    'transition-colors',
                    level.status !== 'locked' && 'hover:border-primary/50',
                    isCurrentLevel && 'border-primary ring-1 ring-primary/20'
                  )}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
                        statusColors[level.status]
                      )}
                    >
                      <StatusIcon className="h-6 w-6" />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          Level {index + 1}: {level.name}
                        </span>
                        {isCurrentLevel && (
                          <Badge className="text-xs">You Are Here</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {level.description}
                      </p>
                      {level.status !== 'locked' && (
                        <div className="flex items-center gap-4">
                          <Progress
                            value={level.progress}
                            className="h-2 flex-1"
                          />
                          <span className="text-sm text-muted-foreground">
                            {level.completedSkills}/{level.skills} skills
                          </span>
                        </div>
                      )}
                    </div>

                    {level.status !== 'locked' && (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
