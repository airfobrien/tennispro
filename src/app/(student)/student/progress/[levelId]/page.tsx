'use client';

import { ArrowLeft, CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Mock level data
const mockLevelData = {
  id: '2',
  name: 'Intermediate',
  description: 'Develop consistent strokes and build rally skills',
  progress: 65,
  skills: [
    {
      id: 's1',
      name: 'Forehand Topspin',
      description: 'Generate consistent topspin on forehand',
      status: 'completed' as const,
      milestones: [
        { id: 'm1', name: 'Grip and stance', status: 'completed' as const },
        { id: 'm2', name: 'Low-to-high swing path', status: 'completed' as const },
        { id: 'm3', name: '80% consistency in rallies', status: 'completed' as const },
      ],
      validationVideo: '1',
    },
    {
      id: 's2',
      name: 'Backhand Slice',
      description: 'Develop reliable slice backhand',
      status: 'completed' as const,
      milestones: [
        { id: 'm4', name: 'Continental grip', status: 'completed' as const },
        { id: 'm5', name: 'High-to-low motion', status: 'completed' as const },
        { id: 'm6', name: 'Depth control', status: 'completed' as const },
      ],
      validationVideo: '2',
    },
    {
      id: 's3',
      name: 'First Serve',
      description: 'Build a reliable first serve',
      status: 'in_progress' as const,
      milestones: [
        { id: 'm7', name: 'Consistent toss', status: 'completed' as const },
        { id: 'm8', name: 'Trophy position', status: 'completed' as const },
        { id: 'm9', name: '60% first serve percentage', status: 'in_progress' as const },
      ],
      validationVideo: null,
    },
    {
      id: 's4',
      name: 'Second Serve',
      description: 'Develop a kick second serve',
      status: 'not_started' as const,
      milestones: [
        { id: 'm10', name: 'Toss placement', status: 'not_started' as const },
        { id: 'm11', name: 'Brush up motion', status: 'not_started' as const },
        { id: 'm12', name: '90% second serve in', status: 'not_started' as const },
      ],
      validationVideo: null,
    },
  ],
};

export default function LevelDetailPage() {
  const params = useParams();

  const completedSkills = mockLevelData.skills.filter(
    (s) => s.status === 'completed'
  ).length;

  return (
    <div className="container space-y-6 py-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/student/progress">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Progress
        </Link>
      </Button>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Level {params.levelId}: {mockLevelData.name}
          </h1>
          <Badge>In Progress</Badge>
        </div>
        <p className="text-muted-foreground">{mockLevelData.description}</p>
      </div>

      {/* Progress Summary */}
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Level Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedSkills} of {mockLevelData.skills.length} skills
                completed
              </span>
            </div>
            <Progress value={mockLevelData.progress} className="h-3" />
          </div>
          <div className="text-3xl font-bold">{mockLevelData.progress}%</div>
        </CardContent>
      </Card>

      {/* Skills */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Skills</h2>
        <div className="space-y-4">
          {mockLevelData.skills.map((skill) => (
            <Card key={skill.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{skill.name}</CardTitle>
                    <CardDescription>{skill.description}</CardDescription>
                  </div>
                  <Badge
                    variant={
                      skill.status === 'completed'
                        ? 'default'
                        : skill.status === 'in_progress'
                          ? 'secondary'
                          : 'outline'
                    }
                  >
                    {skill.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Milestones */}
                <div className="space-y-2">
                  {skill.milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="flex items-center gap-3 rounded-lg bg-muted/50 p-2"
                    >
                      <div
                        className={cn(
                          'flex h-6 w-6 items-center justify-center rounded-full',
                          milestone.status === 'completed'
                            ? 'bg-green-500/10 text-green-500'
                            : milestone.status === 'in_progress'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {milestone.status === 'completed' ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                      <span
                        className={cn(
                          'text-sm',
                          milestone.status === 'completed' &&
                            'text-muted-foreground line-through'
                        )}
                      >
                        {milestone.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Validation Video Link */}
                {skill.validationVideo && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/student/videos/${skill.validationVideo}`}>
                      <PlayCircle className="mr-2 h-4 w-4" />
                      View Validation Video
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
