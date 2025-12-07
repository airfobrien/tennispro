'use client';

import { ArrowLeft, Calendar, CheckCircle2, MessageSquare, Plus, Target } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type GoalStatus = 'in_progress' | 'achieved' | 'paused' | 'abandoned';
type GoalCategory = 'skill_improvement' | 'competition' | 'rating' | 'fitness' | 'custom';

interface StudentGoal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  progress: number;
  targetDate: string;
  status: GoalStatus;
  coachNotes: string | null;
  linkedMilestone: { name: string } | null;
  createdAt: string;
}

// Mock student data
const mockStudent = {
  id: '1',
  name: 'Alex Thompson',
};

// Mock goals data
const mockGoals: StudentGoal[] = [
  {
    id: '1',
    title: 'Improve serve speed to 90mph',
    description: 'Develop a faster first serve while maintaining accuracy',
    category: 'skill_improvement',
    progress: 60,
    targetDate: '2024-02-15',
    status: 'in_progress',
    coachNotes: 'Great progress! Focus on leg drive.',
    linkedMilestone: { name: 'First Serve Mastery' },
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    title: 'Master topspin forehand',
    description: 'Consistently generate heavy topspin on forehand groundstrokes',
    category: 'skill_improvement',
    progress: 35,
    targetDate: '2024-03-01',
    status: 'in_progress',
    coachNotes: null,
    linkedMilestone: { name: 'Forehand Topspin' },
    createdAt: '2024-01-05',
  },
  {
    id: '3',
    title: 'Win 3 tournament matches',
    description: 'Compete in local tournaments and win at least 3 matches',
    category: 'competition',
    progress: 33,
    targetDate: '2024-04-30',
    status: 'in_progress',
    coachNotes: null,
    linkedMilestone: null,
    createdAt: '2024-01-01',
  },
];

const statusColors = {
  in_progress: 'bg-blue-500/10 text-blue-500',
  achieved: 'bg-green-500/10 text-green-500',
  paused: 'bg-yellow-500/10 text-yellow-500',
  abandoned: 'bg-red-500/10 text-red-500',
};

const categoryLabels = {
  skill_improvement: 'Skill',
  competition: 'Competition',
  rating: 'Rating',
  fitness: 'Fitness',
  custom: 'Custom',
};

export default function StudentGoalsPage() {
  const params = useParams();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleAddNote = async () => {
    setIsSaving(true);
    // In production, call API
    await new Promise((r) => setTimeout(r, 500));
    setIsSaving(false);
    setNoteDialogOpen(false);
    setNote('');
    setSelectedGoal(null);
  };

  const openNoteDialog = (goalId: string, existingNote: string | null) => {
    setSelectedGoal(goalId);
    setNote(existingNote || '');
    setNoteDialogOpen(true);
  };

  const activeGoals = mockGoals.filter((g) => g.status === 'in_progress').length;
  const achievedGoals = mockGoals.filter((g) => g.status === 'achieved').length;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild>
        <Link href={`/dashboard/students/${params.id}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {mockStudent.name}
        </Link>
      </Button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{mockStudent.name}&apos;s Goals</h1>
        <p className="text-muted-foreground">View and add notes to student goals</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Goals</CardDescription>
            <CardTitle className="text-3xl">{mockGoals.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active</CardDescription>
            <CardTitle className="text-3xl">{activeGoals}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Achieved</CardDescription>
            <CardTitle className="text-3xl">{achievedGoals}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Goals List */}
      {mockGoals.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Target className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">No goals shared</h3>
            <p className="text-sm text-muted-foreground">
              This student hasn&apos;t shared any goals yet
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {mockGoals.map((goal) => (
            <Card key={goal.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'mt-0.5 flex h-10 w-10 items-center justify-center rounded-full',
                        goal.status === 'achieved' ? 'bg-green-500/10' : 'bg-primary/10'
                      )}
                    >
                      {goal.status === 'achieved' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <Target className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-base">{goal.title}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {categoryLabels[goal.category]}
                    </Badge>
                    <Badge className={cn('text-xs', statusColors[goal.status])}>
                      {goal.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>

                {/* Details */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {goal.targetDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due {goal.targetDate}</span>
                    </div>
                  )}
                  {goal.linkedMilestone && (
                    <Badge variant="secondary" className="text-xs">
                      Linked: {goal.linkedMilestone.name}
                    </Badge>
                  )}
                </div>

                {/* Coach Notes */}
                <div className="rounded-lg border bg-muted/50 p-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <MessageSquare className="h-4 w-4" />
                      Coach Notes
                    </span>
                    <Dialog open={noteDialogOpen && selectedGoal === goal.id} onOpenChange={(open) => {
                      if (!open) {
                        setNoteDialogOpen(false);
                        setSelectedGoal(null);
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openNoteDialog(goal.id, goal.coachNotes)}
                        >
                          {goal.coachNotes ? 'Edit Note' : <><Plus className="mr-1 h-3 w-3" />Add Note</>}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Coach Note for Goal</DialogTitle>
                          <DialogDescription>
                            Add a note or feedback for this goal. The student will see this.
                          </DialogDescription>
                        </DialogHeader>
                        <Textarea
                          placeholder="Enter your note..."
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          rows={4}
                        />
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setNoteDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddNote} disabled={isSaving}>
                            {isSaving ? 'Saving...' : 'Save Note'}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  {goal.coachNotes ? (
                    <p className="mt-2 text-sm text-muted-foreground">{goal.coachNotes}</p>
                  ) : (
                    <p className="mt-2 text-sm italic text-muted-foreground">No notes added yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
