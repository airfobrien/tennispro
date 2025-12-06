'use client';

import { ArrowLeft, Play, Pause, Link2, Link2Off, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface ComparisonMetric {
  label: string;
  videoA: number;
  videoB: number;
  unit: string;
  improvement: number;
}

const comparisonMetrics: ComparisonMetric[] = [
  { label: 'Hip-Shoulder Separation', videoA: 38, videoB: 42, unit: '°', improvement: 10.5 },
  { label: 'Racket Speed', videoA: 72, videoB: 78, unit: 'mph', improvement: 8.3 },
  { label: 'Contact Height', videoA: 35, videoB: 38, unit: 'in', improvement: 8.6 },
  { label: 'Follow Through', videoA: 78, videoB: 85, unit: '%', improvement: 9.0 },
  { label: 'Weight Transfer', videoA: 68, videoB: 72, unit: '%', improvement: 5.9 },
  { label: 'Wrist Lag', videoA: 20, videoB: 25, unit: '°', improvement: 25.0 },
];

const previousVideos = [
  { id: 'prev-1', title: 'Forehand Practice - Nov 28', date: '1 week ago' },
  { id: 'prev-2', title: 'Forehand Rally - Nov 20', date: '2 weeks ago' },
  { id: 'prev-3', title: 'Match Footage - Nov 15', date: '3 weeks ago' },
];

export default function CompareVideosPage() {
  const params = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [linkedPlayback, setLinkedPlayback] = useState(true);
  const [currentFrameA, setCurrentFrameA] = useState(45);
  const [currentFrameB, setCurrentFrameB] = useState(45);
  const [selectedComparison, setSelectedComparison] = useState('prev-1');

  const handleFrameChange = (value: number[], side: 'A' | 'B') => {
    if (linkedPlayback) {
      setCurrentFrameA(value[0] ?? 0);
      setCurrentFrameB(value[0] ?? 0);
    } else if (side === 'A') {
      setCurrentFrameA(value[0] ?? 0);
    } else {
      setCurrentFrameB(value[0] ?? 0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/dashboard/videos/${params.id}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Compare Videos</h1>
            <p className="text-muted-foreground">
              Side-by-side analysis comparison
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedComparison} onValueChange={setSelectedComparison}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select comparison video" />
            </SelectTrigger>
            <SelectContent>
              {previousVideos.map((video) => (
                <SelectItem key={video.id} value={video.id}>
                  {video.title} ({video.date})
                </SelectItem>
              ))}
              <SelectItem value="pro">Pro Reference: Federer Forehand</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Comparison View */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Video A (Current) */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Current Video</CardTitle>
              <Badge>Dec 4, 2025</Badge>
            </div>
            <CardDescription>Forehand Practice Session</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative aspect-video bg-black">
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <span className="text-muted-foreground">Frame {currentFrameA}</span>
              </div>
              {/* Skeleton overlay placeholder */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                <g stroke="rgb(59, 130, 246)" strokeWidth="0.5" fill="none">
                  <line x1="50" y1="15" x2="50" y2="30" />
                  <line x1="50" y1="30" x2="50" y2="55" />
                  <line x1="42" y1="30" x2="58" y2="30" />
                  <line x1="42" y1="30" x2="35" y2="45" />
                  <line x1="35" y1="45" x2="30" y2="55" />
                  <line x1="58" y1="30" x2="70" y2="40" />
                  <line x1="70" y1="40" x2="80" y2="35" />
                </g>
              </svg>
            </div>
            <div className="p-4">
              <Slider
                value={[currentFrameA]}
                max={1200}
                step={1}
                onValueChange={(value) => handleFrameChange(value, 'A')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Video B (Comparison) */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Previous Video</CardTitle>
              <Badge variant="secondary">Nov 28, 2025</Badge>
            </div>
            <CardDescription>
              {previousVideos.find((v) => v.id === selectedComparison)?.title ?? 'Select a video'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative aspect-video bg-black">
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <span className="text-muted-foreground">Frame {currentFrameB}</span>
              </div>
              {/* Skeleton overlay placeholder - slightly different position */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                <g stroke="rgb(234, 179, 8)" strokeWidth="0.5" fill="none">
                  <line x1="50" y1="15" x2="50" y2="30" />
                  <line x1="50" y1="30" x2="50" y2="55" />
                  <line x1="44" y1="30" x2="56" y2="30" />
                  <line x1="44" y1="30" x2="38" y2="45" />
                  <line x1="38" y1="45" x2="35" y2="55" />
                  <line x1="56" y1="30" x2="65" y2="42" />
                  <line x1="65" y1="42" x2="75" y2="40" />
                </g>
              </svg>
            </div>
            <div className="p-4">
              <Slider
                value={[currentFrameB]}
                max={1200}
                step={1}
                onValueChange={(value) => handleFrameChange(value, 'B')}
                disabled={linkedPlayback}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Playback Controls */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setCurrentFrameA(Math.max(0, currentFrameA - 1));
                if (linkedPlayback) setCurrentFrameB(Math.max(0, currentFrameB - 1));
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setCurrentFrameA(Math.min(1200, currentFrameA + 1));
                if (linkedPlayback) setCurrentFrameB(Math.min(1200, currentFrameB + 1));
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="mx-4 h-6 w-px bg-border" />
            <Button
              variant={linkedPlayback ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLinkedPlayback(!linkedPlayback)}
            >
              {linkedPlayback ? (
                <>
                  <Link2 className="mr-2 h-4 w-4" />
                  Linked
                </>
              ) : (
                <>
                  <Link2Off className="mr-2 h-4 w-4" />
                  Unlinked
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Metrics Comparison</CardTitle>
          <CardDescription>
            See how the current video compares to the previous recording
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {comparisonMetrics.map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.label}</span>
                  <Badge
                    variant={metric.improvement > 0 ? 'default' : 'destructive'}
                    className={cn(
                      metric.improvement > 0
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-red-500/10 text-red-500'
                    )}
                  >
                    {metric.improvement > 0 ? '+' : ''}{metric.improvement.toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Previous</span>
                      <span>{metric.videoA}{metric.unit}</span>
                    </div>
                    <div className="h-2 rounded-full bg-yellow-500/20">
                      <div
                        className="h-full rounded-full bg-yellow-500"
                        style={{ width: `${(metric.videoA / Math.max(metric.videoA, metric.videoB)) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Current</span>
                      <span>{metric.videoB}{metric.unit}</span>
                    </div>
                    <div className="h-2 rounded-full bg-blue-500/20">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${(metric.videoB / Math.max(metric.videoA, metric.videoB)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
