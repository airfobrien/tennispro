'use client';

import { Filter, Grid, List, Plus, Video } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Mock videos data
const mockVideos = [
  {
    id: '1',
    title: 'Forehand Practice Session',
    strokeType: 'forehand',
    status: 'analyzed' as const,
    uploadedBy: 'student' as const,
    date: '2024-01-18',
    duration: '2:34',
  },
  {
    id: '2',
    title: 'Serve Development',
    strokeType: 'serve',
    status: 'processing' as const,
    uploadedBy: 'student' as const,
    date: '2024-01-17',
    duration: '1:45',
  },
  {
    id: '3',
    title: 'Match Highlights vs Jake',
    strokeType: 'match',
    status: 'analyzed' as const,
    uploadedBy: 'coach' as const,
    date: '2024-01-15',
    duration: '5:12',
  },
  {
    id: '4',
    title: 'Backhand Technique',
    strokeType: 'backhand',
    status: 'analyzed' as const,
    uploadedBy: 'coach' as const,
    date: '2024-01-12',
    duration: '3:20',
  },
  {
    id: '5',
    title: 'Volley Practice',
    strokeType: 'volley',
    status: 'uploaded' as const,
    uploadedBy: 'student' as const,
    date: '2024-01-10',
    duration: '1:58',
  },
];

const statusColors = {
  analyzed: 'bg-green-500/10 text-green-500',
  processing: 'bg-yellow-500/10 text-yellow-500',
  uploaded: 'bg-blue-500/10 text-blue-500',
  failed: 'bg-red-500/10 text-red-500',
};

export default function StudentVideosPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [strokeFilter, setStrokeFilter] = useState<string>('all');
  const [uploaderFilter, setUploaderFilter] = useState<string>('all');

  const filteredVideos = mockVideos.filter((video) => {
    if (strokeFilter !== 'all' && video.strokeType !== strokeFilter)
      return false;
    if (uploaderFilter !== 'all' && video.uploadedBy !== uploaderFilter)
      return false;
    return true;
  });

  return (
    <div className="container space-y-6 py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Videos</h1>
          <p className="text-muted-foreground">
            View and manage your practice videos
          </p>
        </div>
        <Button asChild>
          <Link href="/student/videos/upload">
            <Plus className="mr-2 h-4 w-4" />
            Upload Video
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={strokeFilter} onValueChange={setStrokeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Stroke type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All strokes</SelectItem>
              <SelectItem value="forehand">Forehand</SelectItem>
              <SelectItem value="backhand">Backhand</SelectItem>
              <SelectItem value="serve">Serve</SelectItem>
              <SelectItem value="volley">Volley</SelectItem>
              <SelectItem value="match">Match</SelectItem>
            </SelectContent>
          </Select>

          <Select value={uploaderFilter} onValueChange={setUploaderFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Uploaded by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All uploads</SelectItem>
              <SelectItem value="student">My uploads</SelectItem>
              <SelectItem value="coach">Coach uploads</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant={view === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setView('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setView('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Videos Grid/List */}
      {filteredVideos.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Video className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">No videos found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or upload a new video
            </p>
          </CardContent>
        </Card>
      ) : view === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video) => (
            <Link key={video.id} href={`/student/videos/${video.id}`}>
              <Card className="group overflow-hidden transition-colors hover:border-primary/50">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <Video className="h-12 w-12 text-muted-foreground" />
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium line-clamp-1 group-hover:text-primary">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{video.date}</span>
                      <span className="text-muted-foreground">
                        {video.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {video.strokeType}
                      </Badge>
                      <Badge
                        className={cn('text-xs', statusColors[video.status])}
                      >
                        {video.status}
                      </Badge>
                      {video.uploadedBy === 'coach' && (
                        <Badge variant="secondary" className="text-xs">
                          Coach
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredVideos.map((video) => (
                <Link
                  key={video.id}
                  href={`/student/videos/${video.id}`}
                  className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded bg-muted">
                    <Video className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-medium">{video.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{video.date}</span>
                      <span>-</span>
                      <span>{video.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {video.strokeType}
                    </Badge>
                    <Badge className={cn('text-xs', statusColors[video.status])}>
                      {video.status}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
