'use client';

import { Calendar, Clock, MapPin, PlayCircle, FileText } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Mock lessons data
const mockUpcomingLessons = [
  {
    id: 'u1',
    date: '2024-01-20',
    time: '3:00 PM',
    type: 'Private Lesson',
    location: 'Court 3',
    duration: '1 hour',
  },
  {
    id: 'u2',
    date: '2024-01-23',
    time: '4:00 PM',
    type: 'Semi-Private',
    location: 'Court 1',
    duration: '1 hour',
  },
];

const mockPastLessons = [
  {
    id: '1',
    date: '2024-01-17',
    time: '3:00 PM',
    type: 'Private Lesson',
    location: 'Court 3',
    duration: '1 hour',
    notes: 'Worked on forehand topspin. Good progress on low-to-high swing path. Focus on follow-through next session.',
    videos: ['1', '2'],
  },
  {
    id: '2',
    date: '2024-01-14',
    time: '2:00 PM',
    type: 'Group Clinic',
    location: 'Courts 1-2',
    duration: '90 min',
    notes: 'Doubles strategy session. Covered poaching and communication.',
    videos: [],
  },
  {
    id: '3',
    date: '2024-01-10',
    time: '4:00 PM',
    type: 'Private Lesson',
    location: 'Court 2',
    duration: '1 hour',
    notes: 'Serve development. Trophy position improved. Need to work on toss consistency.',
    videos: ['3'],
  },
];

export default function StudentLessonsPage() {
  return (
    <div className="container space-y-6 py-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Lessons</h1>
        <p className="text-muted-foreground">
          View your upcoming and past lessons
        </p>
      </div>

      {/* Upcoming Lessons */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Upcoming</h2>
        {mockUpcomingLessons.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No upcoming lessons scheduled</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {mockUpcomingLessons.map((lesson) => (
              <Card key={lesson.id} className="border-primary/50 bg-primary/5">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge>Upcoming</Badge>
                    <Badge variant="outline">{lesson.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-lg font-medium">
                    <Calendar className="h-5 w-5 text-primary" />
                    {lesson.date} at {lesson.time}
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
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Past Lessons */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Past Lessons</h2>
        {mockPastLessons.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No past lessons</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {mockPastLessons.map((lesson) => (
              <Card key={lesson.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">
                        {lesson.date} at {lesson.time}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        <span>{lesson.type}</span>
                        <span>-</span>
                        <span>{lesson.location}</span>
                        <span>-</span>
                        <span>{lesson.duration}</span>
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lesson.notes && (
                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="mb-1 flex items-center gap-2 text-sm font-medium">
                        <FileText className="h-4 w-4" />
                        Coach Notes
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {lesson.notes}
                      </p>
                    </div>
                  )}

                  {lesson.videos.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Related Videos:
                      </span>
                      {lesson.videos.map((videoId) => (
                        <Button key={videoId} variant="ghost" size="sm" asChild>
                          <Link href={`/student/videos/${videoId}`}>
                            <PlayCircle className="mr-1 h-4 w-4" />
                            Video {videoId}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
