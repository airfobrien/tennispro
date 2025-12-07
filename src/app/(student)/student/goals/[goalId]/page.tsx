'use client';

import { ArrowLeft, Calendar, CheckCircle2, MessageSquare, Pencil, Target, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

type GoalStatus = 'in_progress' | 'achieved' | 'paused' | 'abandoned';

// Mock goal data
const mockGoal: {
  id: string;
  title: string;
  description: string;
  category: 'skill_improvement' | 'competition' | 'rating' | 'fitness' | 'custom';
  targetDate: string;
  status: GoalStatus;
  progress: number;
  coachVisible: boolean;
  coachNotes: string | null;
  linkedMilestone: { id: string; name: string; skill: { id: string; name: string } } | null;
  createdAt: string;
  updatedAt: string;
} = {
  id: '1',
  title: 'Improve serve speed to 90mph',
  description: 'Develop a faster first serve while maintaining accuracy. Focus on proper technique, body rotation, and follow-through.',
  category: 'skill_improvement',
  targetDate: '2024-02-15',
  status: 'in_progress',
  progress: 60,
  coachVisible: true,
  coachNotes: 'Great progress so far! Focus on the leg drive for more power. We\'ll work on this in the next session.',
  linkedMilestone: {
    id: 'm1',
    name: 'Consistent 85mph+ first serve',
    skill: { id: 's1', name: 'First Serve' },
  },
  createdAt: '2024-01-10',
  updatedAt: '2024-01-18',
};

const statusColors = {
  in_progress: 'bg-blue-500/10 text-blue-500',
  achieved: 'bg-green-500/10 text-green-500',
  paused: 'bg-yellow-500/10 text-yellow-500',
  abandoned: 'bg-red-500/10 text-red-500',
};

const categoryLabels = {
  skill_improvement: 'Skill Improvement',
  competition: 'Competition',
  rating: 'Rating Goal',
  fitness: 'Fitness',
  custom: 'Custom',
};

export default function GoalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [progress, setProgress] = useState(mockGoal.progress);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleProgressUpdate = async (newProgress: number[]) => {
    setProgress(newProgress[0] ?? 0);
  };

  const handleSaveProgress = async () => {
    setIsUpdating(true);
    // In production, call API
    await new Promise((r) => setTimeout(r, 500));
    setIsUpdating(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    // In production, call API
    await new Promise((r) => setTimeout(r, 500));
    router.push('/student/goals');
  };

  const handleMarkComplete = async () => {
    setIsUpdating(true);
    // In production, call API to update status to 'achieved'
    await new Promise((r) => setTimeout(r, 500));
    setIsUpdating(false);
  };

  return (
    <div className="container max-w-2xl space-y-6 py-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/student/goals">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Goals
        </Link>
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'mt-1 flex h-12 w-12 items-center justify-center rounded-full',
              mockGoal.status === 'achieved' ? 'bg-green-500/10' : 'bg-primary/10'
            )}
          >
            {mockGoal.status === 'achieved' ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
              <Target className="h-6 w-6 text-primary" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{mockGoal.title}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge className={cn('text-xs', statusColors[mockGoal.status])}>
                {mockGoal.status.replace('_', ' ')}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {categoryLabels[mockGoal.category]}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/student/goals/${params.goalId}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Goal</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this goal? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Description */}
      {mockGoal.description && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">{mockGoal.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Progress</CardTitle>
          <CardDescription>Track your progress towards this goal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Progress</span>
              <span className="text-lg font-bold">{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Adjust Progress</span>
            <Slider
              value={[progress]}
              onValueChange={handleProgressUpdate}
              max={100}
              step={5}
              className="py-2"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSaveProgress}
              disabled={isUpdating || progress === mockGoal.progress}
              className="flex-1"
            >
              {isUpdating ? 'Saving...' : 'Save Progress'}
            </Button>
            {mockGoal.status !== 'achieved' && (
              <Button
                variant="outline"
                onClick={handleMarkComplete}
                disabled={isUpdating}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark Complete
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Target Date</span>
            </div>
            <span className="font-medium">{mockGoal.targetDate || 'Not set'}</span>
          </div>

          {mockGoal.linkedMilestone && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Target className="h-4 w-4" />
                <span className="text-sm">Linked Milestone</span>
              </div>
              <span className="font-medium">
                {mockGoal.linkedMilestone.skill.name} - {mockGoal.linkedMilestone.name}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Visible to Coach</span>
            <Badge variant={mockGoal.coachVisible ? 'default' : 'secondary'}>
              {mockGoal.coachVisible ? 'Yes' : 'No'}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Created</span>
            <span className="text-sm">{mockGoal.createdAt}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Updated</span>
            <span className="text-sm">{mockGoal.updatedAt}</span>
          </div>
        </CardContent>
      </Card>

      {/* Coach Notes */}
      {mockGoal.coachVisible && mockGoal.coachNotes && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4" />
              Coach Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{mockGoal.coachNotes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
