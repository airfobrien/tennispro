'use client';

import { Calendar, CheckCircle2, Plus, Target } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Mock goals data
const mockGoals = [
  {
    id: '1',
    title: 'Improve serve speed to 90mph',
    description: 'Develop a faster first serve while maintaining accuracy',
    progress: 60,
    deadline: '2024-02-15',
    status: 'in_progress' as const,
    coachVisible: true,
  },
  {
    id: '2',
    title: 'Master topspin forehand',
    description: 'Consistently generate heavy topspin on forehand groundstrokes',
    progress: 35,
    deadline: '2024-03-01',
    status: 'in_progress' as const,
    coachVisible: true,
  },
  {
    id: '3',
    title: 'Win 3 tournament matches',
    description: 'Compete in local tournaments and win at least 3 matches',
    progress: 33,
    deadline: '2024-04-30',
    status: 'in_progress' as const,
    coachVisible: true,
  },
  {
    id: '4',
    title: 'Practice 4x per week',
    description: 'Maintain consistent practice schedule',
    progress: 100,
    deadline: '2024-01-31',
    status: 'completed' as const,
    coachVisible: false,
  },
];

const statusColors = {
  in_progress: 'bg-blue-500/10 text-blue-500',
  completed: 'bg-green-500/10 text-green-500',
  overdue: 'bg-red-500/10 text-red-500',
};

export default function StudentGoalsPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredGoals = mockGoals.filter((goal) => {
    if (filter === 'active') return goal.status === 'in_progress';
    if (filter === 'completed') return goal.status === 'completed';
    return true;
  });

  const activeGoals = mockGoals.filter((g) => g.status === 'in_progress').length;
  const completedGoals = mockGoals.filter((g) => g.status === 'completed').length;

  return (
    <div className="container space-y-6 py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Goals</h1>
          <p className="text-muted-foreground">
            Track your personal tennis goals
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="cursor-pointer" onClick={() => setFilter('all')}>
          <CardHeader className="pb-2">
            <CardDescription>Total Goals</CardDescription>
            <CardTitle className="text-3xl">{mockGoals.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="cursor-pointer" onClick={() => setFilter('active')}>
          <CardHeader className="pb-2">
            <CardDescription>Active</CardDescription>
            <CardTitle className="text-3xl">{activeGoals}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="cursor-pointer" onClick={() => setFilter('completed')}>
          <CardHeader className="pb-2">
            <CardDescription>Completed</CardDescription>
            <CardTitle className="text-3xl">{completedGoals}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
        </div>

        {filteredGoals.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Target className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No goals found</h3>
              <p className="text-sm text-muted-foreground">
                Create a new goal to get started
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredGoals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          'mt-0.5 flex h-8 w-8 items-center justify-center rounded-full',
                          goal.status === 'completed'
                            ? 'bg-green-500/10'
                            : 'bg-primary/10'
                        )}
                      >
                        {goal.status === 'completed' ? (
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
                    <Badge className={cn('text-xs', statusColors[goal.status])}>
                      {goal.status === 'completed' ? 'Completed' : 'In Progress'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Due {goal.deadline}</span>
                      </div>
                      {goal.coachVisible && (
                        <Badge variant="outline" className="text-xs">
                          Visible to Coach
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
