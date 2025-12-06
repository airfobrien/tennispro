'use client';

import { Filter, Plus, Search, Grid, List, MoreHorizontal, Play, Eye, Trash2, Tag } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Video {
  id: string;
  title: string;
  studentName: string;
  studentId: string;
  thumbnail: string;
  duration: string;
  uploadedAt: string;
  status: 'processing' | 'ready' | 'analyzed' | 'failed';
  strokeType: 'forehand' | 'backhand' | 'serve' | 'volley' | 'overhead' | 'movement';
  tags: string[];
}

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Forehand Practice Session',
    studentName: 'Sarah Johnson',
    studentId: '1',
    thumbnail: '/api/placeholder/320/180',
    duration: '2:34',
    uploadedAt: '2 hours ago',
    status: 'analyzed',
    strokeType: 'forehand',
    tags: ['technique', 'groundstroke'],
  },
  {
    id: '2',
    title: 'Serve Development',
    studentName: 'Mike Chen',
    studentId: '2',
    thumbnail: '/api/placeholder/320/180',
    duration: '4:12',
    uploadedAt: '1 day ago',
    status: 'analyzed',
    strokeType: 'serve',
    tags: ['power', 'toss'],
  },
  {
    id: '3',
    title: 'Match Point Rally',
    studentName: 'Emily Davis',
    studentId: '3',
    thumbnail: '/api/placeholder/320/180',
    duration: '1:45',
    uploadedAt: '2 days ago',
    status: 'ready',
    strokeType: 'forehand',
    tags: ['match-play'],
  },
  {
    id: '4',
    title: 'Backhand Crosscourt',
    studentName: 'Sarah Johnson',
    studentId: '1',
    thumbnail: '/api/placeholder/320/180',
    duration: '3:20',
    uploadedAt: '3 days ago',
    status: 'processing',
    strokeType: 'backhand',
    tags: ['technique'],
  },
  {
    id: '5',
    title: 'Net Approach Volley',
    studentName: 'Mike Chen',
    studentId: '2',
    thumbnail: '/api/placeholder/320/180',
    duration: '2:15',
    uploadedAt: '1 week ago',
    status: 'analyzed',
    strokeType: 'volley',
    tags: ['net-game', 'footwork'],
  },
  {
    id: '6',
    title: 'Overhead Smash',
    studentName: 'Alex Thompson',
    studentId: '4',
    thumbnail: '/api/placeholder/320/180',
    duration: '1:30',
    uploadedAt: '1 week ago',
    status: 'failed',
    strokeType: 'overhead',
    tags: ['power'],
  },
];

const statusColors: Record<Video['status'], string> = {
  processing: 'bg-yellow-500/10 text-yellow-500',
  ready: 'bg-blue-500/10 text-blue-500',
  analyzed: 'bg-green-500/10 text-green-500',
  failed: 'bg-red-500/10 text-red-500',
};

const strokeColors: Record<Video['strokeType'], string> = {
  forehand: 'bg-blue-500/10 text-blue-500',
  backhand: 'bg-purple-500/10 text-purple-500',
  serve: 'bg-orange-500/10 text-orange-500',
  volley: 'bg-green-500/10 text-green-500',
  overhead: 'bg-red-500/10 text-red-500',
  movement: 'bg-gray-500/10 text-gray-500',
};

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [strokeFilter, setStrokeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [videos] = useState<Video[]>(mockVideos);

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStroke = strokeFilter === 'all' || video.strokeType === strokeFilter;
    const matchesStatus = statusFilter === 'all' || video.status === statusFilter;
    return matchesSearch && matchesStroke && matchesStatus;
  });

  const analyzedCount = videos.filter((v) => v.status === 'analyzed').length;
  const processingCount = videos.filter((v) => v.status === 'processing').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Video Library</h1>
          <p className="text-muted-foreground">
            Manage and analyze student videos
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/videos/upload">
            <Plus className="mr-2 h-4 w-4" />
            Upload Video
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Videos</CardDescription>
            <CardTitle className="text-3xl">{videos.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Analyzed</CardDescription>
            <CardTitle className="text-3xl">{analyzedCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Processing</CardDescription>
            <CardTitle className="text-3xl">{processingCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>This Week</CardDescription>
            <CardTitle className="text-3xl">+4</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Videos</CardTitle>
              <CardDescription>
                {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} found
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={strokeFilter} onValueChange={setStrokeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Stroke Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Strokes</SelectItem>
                <SelectItem value="forehand">Forehand</SelectItem>
                <SelectItem value="backhand">Backhand</SelectItem>
                <SelectItem value="serve">Serve</SelectItem>
                <SelectItem value="volley">Volley</SelectItem>
                <SelectItem value="overhead">Overhead</SelectItem>
                <SelectItem value="movement">Movement</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="analyzed">Analyzed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Video Grid/List */}
          {filteredVideos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Play className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-semibold">No videos found</h3>
              <p className="text-muted-foreground">
                Upload a video to get started with analysis
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="relative aspect-video bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                      {video.duration}
                    </div>
                    <Badge
                      className={cn(
                        'absolute left-2 top-2 text-xs',
                        statusColors[video.status]
                      )}
                    >
                      {video.status}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <Link
                          href={`/dashboard/videos/${video.id}`}
                          className="font-medium hover:underline line-clamp-1"
                        >
                          {video.title}
                        </Link>
                        <Link
                          href={`/dashboard/students/${video.studentId}`}
                          className="text-sm text-muted-foreground hover:underline"
                        >
                          {video.studentName}
                        </Link>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/videos/${video.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Tag className="mr-2 h-4 w-4" />
                            Edit Tags
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={cn('text-xs capitalize', strokeColors[video.strokeType])}
                      >
                        {video.strokeType}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{video.uploadedAt}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="flex items-center gap-4 rounded-lg border p-4"
                >
                  <div className="relative aspect-video w-32 shrink-0 rounded bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-xs text-white">
                      {video.duration}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/dashboard/videos/${video.id}`}
                      className="font-medium hover:underline"
                    >
                      {video.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">{video.studentName}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge className={cn('text-xs', statusColors[video.status])}>
                        {video.status}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={cn('text-xs capitalize', strokeColors[video.strokeType])}
                      >
                        {video.strokeType}
                      </Badge>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{video.uploadedAt}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/videos/${video.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Tag className="mr-2 h-4 w-4" />
                        Edit Tags
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
