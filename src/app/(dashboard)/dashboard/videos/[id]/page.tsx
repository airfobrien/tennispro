'use client';

import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, Maximize, Download, Share2, ChevronLeft, ChevronRight, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Mock video data
const video = {
  id: '1',
  title: 'Forehand Practice Session',
  studentName: 'Sarah Johnson',
  studentId: '1',
  uploadedAt: 'December 4, 2025',
  duration: '2:34',
  status: 'analyzed' as const,
  strokeType: 'forehand',
  tags: ['technique', 'groundstroke'],
  notes: 'Focus on following through and keeping the racket head up.',
};

type MetricStatus = 'excellent' | 'good' | 'needs-work';

const analysisMetrics: { label: string; value: number; unit: string; benchmark: number; status: MetricStatus }[] = [
  { label: 'Hip-Shoulder Separation', value: 42, unit: '°', benchmark: 45, status: 'good' },
  { label: 'Racket Speed', value: 78, unit: 'mph', benchmark: 75, status: 'excellent' },
  { label: 'Contact Height', value: 38, unit: 'in', benchmark: 40, status: 'needs-work' },
  { label: 'Follow Through', value: 85, unit: '%', benchmark: 80, status: 'excellent' },
  { label: 'Weight Transfer', value: 72, unit: '%', benchmark: 75, status: 'good' },
  { label: 'Wrist Lag', value: 25, unit: '°', benchmark: 30, status: 'needs-work' },
];

const strokePhases = [
  { name: 'Ready Position', time: '0:00', duration: '0:02' },
  { name: 'Unit Turn', time: '0:02', duration: '0:04' },
  { name: 'Backswing', time: '0:06', duration: '0:08' },
  { name: 'Forward Swing', time: '0:14', duration: '0:06' },
  { name: 'Contact', time: '0:20', duration: '0:02' },
  { name: 'Follow Through', time: '0:22', duration: '0:12' },
];

const aiRecommendations = [
  {
    priority: 'high',
    title: 'Increase wrist lag',
    description: 'Focus on keeping the wrist relaxed longer during the forward swing to generate more racket head speed at contact.',
  },
  {
    priority: 'medium',
    title: 'Adjust contact point',
    description: 'Contact is slightly low. Try to make contact at shoulder height for better power and consistency.',
  },
  {
    priority: 'low',
    title: 'Extend follow through',
    description: 'Good follow through, but extending it even more across the body will help with consistency.',
  },
];

const statusColors: Record<MetricStatus, string> = {
  excellent: 'text-green-500',
  good: 'text-blue-500',
  'needs-work': 'text-yellow-500',
};

export default function VideoDetailPage() {
  const params = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/videos">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{video.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Link
                href={`/dashboard/students/${video.studentId}`}
                className="hover:underline"
              >
                {video.studentName}
              </Link>
              <span>•</span>
              <span>{video.uploadedAt}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Video Player */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-black">
              {/* Video Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="h-16 w-16 text-white/50" />
              </div>

              {/* Skeleton Overlay Toggle */}
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-4 top-4"
                onClick={() => setShowSkeleton(!showSkeleton)}
              >
                {showSkeleton ? 'Hide' : 'Show'} Skeleton
              </Button>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4">
                <div className="mb-2">
                  <Slider
                    value={[currentTime]}
                    max={154}
                    step={1}
                    onValueChange={(value) => setCurrentTime(value[0] ?? 0)}
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-white"
                      onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-white"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-white"
                      onClick={() => setCurrentTime(Math.min(154, currentTime + 10))}
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                    <span className="ml-2 text-sm text-white">
                      {Math.floor(currentTime / 60)}:{String(currentTime % 60).padStart(2, '0')} / {video.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-white"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-white"
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Frame Navigation */}
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Prev Frame
                </Button>
                <span className="text-sm text-muted-foreground">
                  Frame 45 of 1200
                </span>
                <Button variant="outline" size="sm">
                  Next Frame
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stroke Phases Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Stroke Phases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-1">
                {strokePhases.map((phase, index) => (
                  <button
                    key={phase.name}
                    className={cn(
                      'flex-1 rounded p-2 text-center transition-colors hover:bg-muted',
                      index === 3 && 'bg-primary/10'
                    )}
                    onClick={() => setCurrentTime(parseInt(phase.time.split(':')[1] ?? '0'))}
                  >
                    <p className="text-xs font-medium truncate">{phase.name}</p>
                    <p className="text-xs text-muted-foreground">{phase.time}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Panel */}
        <div className="space-y-4">
          <Tabs defaultValue="metrics" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="metrics" className="flex-1">Metrics</TabsTrigger>
              <TabsTrigger value="recommendations" className="flex-1">AI Insights</TabsTrigger>
              <TabsTrigger value="info" className="flex-1">Info</TabsTrigger>
            </TabsList>

            <TabsContent value="metrics" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Analysis Metrics</CardTitle>
                  <CardDescription>Key measurements from this stroke</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisMetrics.map((metric) => (
                    <div key={metric.label} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{metric.label}</span>
                        <span className={cn('text-sm font-medium', statusColors[metric.status])}>
                          {metric.value}{metric.unit}
                        </span>
                      </div>
                      <div className="relative">
                        <Progress
                          value={(metric.value / (metric.benchmark * 1.2)) * 100}
                          className="h-2"
                        />
                        <div
                          className="absolute top-0 h-2 w-0.5 bg-muted-foreground"
                          style={{ left: `${(metric.benchmark / (metric.benchmark * 1.2)) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Benchmark: {metric.benchmark}{metric.unit}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">AI Recommendations</CardTitle>
                  <CardDescription>Personalized coaching insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiRecommendations.map((rec, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            rec.priority === 'high'
                              ? 'destructive'
                              : rec.priority === 'medium'
                              ? 'default'
                              : 'secondary'
                          }
                          className="text-xs"
                        >
                          {rec.priority}
                        </Badge>
                        <span className="font-medium">{rec.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                      {index < aiRecommendations.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="info" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Video Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={undefined} />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href={`/dashboard/students/${video.studentId}`}
                        className="font-medium hover:underline"
                      >
                        {video.studentName}
                      </Link>
                      <p className="text-sm text-muted-foreground">Student</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Stroke Type</p>
                      <p className="font-medium capitalize">{video.strokeType}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{video.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Uploaded</p>
                      <p className="font-medium">{video.uploadedAt}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <Badge variant="secondary" className="capitalize">
                        {video.status}
                      </Badge>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground">Tags</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {video.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p className="mt-1 text-sm">{video.notes}</p>
                  </div>
                </CardContent>
              </Card>

              <Button variant="outline" className="w-full" asChild>
                <Link href={`/dashboard/videos/${params.id}/compare`}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Compare with Previous
                </Link>
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
