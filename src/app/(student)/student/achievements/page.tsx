'use client';

import { Calendar, PlayCircle, Trophy } from 'lucide-react';
import Link from 'next/link';
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

// Mock achievements data
const mockAchievements = [
  {
    id: '1',
    milestone: 'Forehand Topspin Consistency',
    skill: 'Forehand Topspin',
    level: 'Intermediate',
    achievedAt: '2024-01-18',
    validationMethod: 'coach_assessment' as const,
    videoId: '1',
  },
  {
    id: '2',
    milestone: 'Slice Backhand Depth',
    skill: 'Backhand Slice',
    level: 'Intermediate',
    achievedAt: '2024-01-15',
    validationMethod: 'ai_validation' as const,
    videoId: '2',
  },
  {
    id: '3',
    milestone: 'Consistent Toss',
    skill: 'First Serve',
    level: 'Intermediate',
    achievedAt: '2024-01-12',
    validationMethod: 'coach_assessment' as const,
    videoId: '3',
  },
  {
    id: '4',
    milestone: 'Ready Position',
    skill: 'Court Positioning',
    level: 'Foundations',
    achievedAt: '2024-01-08',
    validationMethod: 'coach_assessment' as const,
    videoId: null,
  },
  {
    id: '5',
    milestone: 'Basic Forehand Grip',
    skill: 'Forehand Basics',
    level: 'Foundations',
    achievedAt: '2024-01-05',
    validationMethod: 'coach_assessment' as const,
    videoId: null,
  },
  {
    id: '6',
    milestone: 'Split Step Timing',
    skill: 'Movement',
    level: 'Foundations',
    achievedAt: '2024-01-02',
    validationMethod: 'ai_validation' as const,
    videoId: '4',
  },
];

const validationLabels = {
  coach_assessment: 'Coach Verified',
  ai_validation: 'AI Verified',
  match_result: 'Match Result',
};

const validationColors = {
  coach_assessment: 'bg-blue-500/10 text-blue-500',
  ai_validation: 'bg-purple-500/10 text-purple-500',
  match_result: 'bg-green-500/10 text-green-500',
};

export default function StudentAchievementsPage() {
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filteredAchievements = mockAchievements.filter((a) => {
    if (levelFilter !== 'all' && a.level !== levelFilter) return false;
    return true;
  });

  const levels = [...new Set(mockAchievements.map((a) => a.level))];

  return (
    <div className="container space-y-6 py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Achievements</h1>
          <p className="text-muted-foreground">
            Your completed milestones and accomplishments
          </p>
        </div>
        <Badge variant="secondary" className="w-fit text-lg px-4 py-2">
          <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
          {mockAchievements.length} Total
        </Badge>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All levels</SelectItem>
            {levels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Achievements Timeline */}
      <div className="space-y-4">
        {filteredAchievements.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Trophy className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No achievements yet</h3>
              <p className="text-sm text-muted-foreground">
                Complete milestones to earn achievements
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="relative space-y-4 pl-6 before:absolute before:left-2 before:top-0 before:h-full before:w-0.5 before:bg-border">
            {filteredAchievements.map((achievement) => (
              <div key={achievement.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-6 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500">
                  <Trophy className="h-2.5 w-2.5 text-white" />
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">
                          {achievement.milestone}
                        </CardTitle>
                        <CardDescription>
                          {achievement.skill} - {achievement.level}
                        </CardDescription>
                      </div>
                      <Badge
                        className={cn(
                          'text-xs',
                          validationColors[achievement.validationMethod]
                        )}
                      >
                        {validationLabels[achievement.validationMethod]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Achieved {achievement.achievedAt}</span>
                      </div>
                      {achievement.videoId && (
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/student/videos/${achievement.videoId}`}>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            View Video
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
