'use client';

import { ArrowLeft, Edit, Users, CheckCircle2, Circle, Lock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface Level {
  id: string;
  number: number;
  name: string;
  description: string;
  skills: Skill[];
}

interface Skill {
  id: string;
  name: string;
  description: string;
  targetMetric?: string;
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  name: string;
  completed: boolean;
}

interface StudentProgress {
  id: string;
  name: string;
  avatar?: string;
  currentLevel: number;
  progress: number;
  lastActivity: string;
}

// Mock data
const path = {
  id: '1',
  name: 'Junior Development',
  description: 'Complete pathway for junior players ages 8-14. Focuses on fundamental technique development, game understanding, and competitive readiness.',
  category: 'competitive_junior' as const,
};

const levels: Level[] = [
  {
    id: '1',
    number: 1,
    name: 'Foundation',
    description: 'Basic grip, stance, and ball tracking',
    skills: [
      {
        id: '1-1',
        name: 'Forehand Grip',
        description: 'Eastern forehand grip',
        targetMetric: '90% consistency',
        milestones: [
          { id: 'm1', name: 'Proper hand placement', completed: true },
          { id: 'm2', name: 'Consistent grip during rally', completed: true },
        ],
      },
      {
        id: '1-2',
        name: 'Ready Position',
        description: 'Athletic stance and split step',
        milestones: [
          { id: 'm3', name: 'Proper stance width', completed: true },
          { id: 'm4', name: 'Consistent split step timing', completed: false },
        ],
      },
    ],
  },
  {
    id: '2',
    number: 2,
    name: 'Stroke Development',
    description: 'Building reliable groundstrokes',
    skills: [
      {
        id: '2-1',
        name: 'Forehand',
        description: 'Full forehand swing path',
        targetMetric: '70% in-play rate',
        milestones: [
          { id: 'm5', name: 'Unit turn', completed: true },
          { id: 'm6', name: 'Low-to-high swing', completed: false },
          { id: 'm7', name: 'Follow through', completed: false },
        ],
      },
    ],
  },
  {
    id: '3',
    number: 3,
    name: 'Rally Building',
    description: 'Consistency and placement',
    skills: [
      {
        id: '3-1',
        name: 'Cross-court Rally',
        description: 'Sustained cross-court rallies',
        targetMetric: '10 ball rallies',
        milestones: [
          { id: 'm8', name: '5 ball rally', completed: false },
          { id: 'm9', name: '10 ball rally', completed: false },
        ],
      },
    ],
  },
];

const students: StudentProgress[] = [
  { id: '1', name: 'Sarah Johnson', currentLevel: 2, progress: 65, lastActivity: '2 days ago' },
  { id: '2', name: 'Mike Chen', currentLevel: 3, progress: 80, lastActivity: 'Yesterday' },
  { id: '3', name: 'Emily Davis', currentLevel: 1, progress: 45, lastActivity: '1 week ago' },
];

export default function ProgressionPathDetailPage() {
  const params = useParams();
  const pathId = params.id;

  const totalMilestones = levels.reduce(
    (acc, level) => acc + level.skills.reduce((s, skill) => s + skill.milestones.length, 0),
    0
  );
  const completedMilestones = levels.reduce(
    (acc, level) =>
      acc + level.skills.reduce((s, skill) => s + skill.milestones.filter((m) => m.completed).length, 0),
    0
  );
  const overallProgress = Math.round((completedMilestones / totalMilestones) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/progress">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{path.name}</h1>
              <Badge className="bg-blue-500/10 text-blue-500">Competitive Junior</Badge>
            </div>
            <p className="text-muted-foreground">{students.length} students enrolled</p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/dashboard/progress/${pathId}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Path
          </Link>
        </Button>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>About This Path</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{path.description}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">Levels</p>
              <p className="text-2xl font-bold">{levels.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Skills</p>
              <p className="text-2xl font-bold">
                {levels.reduce((acc, l) => acc + l.skills.length, 0)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Milestones</p>
              <p className="text-2xl font-bold">{totalMilestones}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Progress</p>
              <p className="text-2xl font-bold">{overallProgress}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Levels and Skills */}
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-lg font-semibold">Levels & Skills</h2>
          {levels.map((level, levelIndex) => {
            const levelMilestones = level.skills.reduce((acc, s) => acc + s.milestones.length, 0);
            const levelCompleted = level.skills.reduce(
              (acc, s) => acc + s.milestones.filter((m) => m.completed).length,
              0
            );
            const levelProgress = Math.round((levelCompleted / levelMilestones) * 100);
            const prevLevel = levelIndex > 0 ? levels[levelIndex - 1] : undefined;
            const isLocked = prevLevel?.skills.some((s) => s.milestones.some((m) => !m.completed)) ?? false;

            return (
              <Card key={level.id} className={cn(isLocked && 'opacity-60')}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-full font-semibold',
                          levelProgress === 100
                            ? 'bg-green-500 text-white'
                            : levelProgress > 0
                            ? 'bg-blue-500 text-white'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {levelProgress === 100 ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : isLocked ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          level.number
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-base">{level.name}</CardTitle>
                        <CardDescription>{level.description}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{levelProgress}%</p>
                      <p className="text-xs text-muted-foreground">
                        {levelCompleted}/{levelMilestones} milestones
                      </p>
                    </div>
                  </div>
                  <Progress value={levelProgress} className="mt-2 h-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {level.skills.map((skill, skillIndex) => (
                    <div key={skill.id}>
                      {skillIndex > 0 && <Separator className="mb-4" />}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{skill.name}</p>
                            <p className="text-sm text-muted-foreground">{skill.description}</p>
                          </div>
                          {skill.targetMetric && (
                            <Badge variant="outline">{skill.targetMetric}</Badge>
                          )}
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {skill.milestones.map((milestone) => (
                            <div
                              key={milestone.id}
                              className="flex items-center gap-2 rounded-md border p-2"
                            >
                              {milestone.completed ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span
                                className={cn(
                                  'text-sm',
                                  milestone.completed && 'text-muted-foreground line-through'
                                )}
                              >
                                {milestone.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Students */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Enrolled Students</h2>
            <Button variant="ghost" size="sm">
              <Users className="mr-2 h-4 w-4" />
              Assign
            </Button>
          </div>
          <Card>
            <CardContent className="divide-y p-0">
              {students.map((student) => (
                <Link
                  key={student.id}
                  href={`/dashboard/students/${student.id}`}
                  className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>
                      {student.name.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Level {student.currentLevel} • {student.progress}%
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
