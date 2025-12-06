'use client';

import { ArrowLeft, Play, Pause, RefreshCw, Download, Eye, EyeOff, ZoomIn, ZoomOut, RotateCcw, Crosshair, Move } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// MediaPipe landmark indices for tennis-relevant joints
const LANDMARKS = {
  nose: 0,
  leftShoulder: 11,
  rightShoulder: 12,
  leftElbow: 13,
  rightElbow: 14,
  leftWrist: 15,
  rightWrist: 16,
  leftHip: 23,
  rightHip: 24,
  leftKnee: 25,
  rightKnee: 26,
  leftAnkle: 27,
  rightAnkle: 28,
};

// Mock landmark data for a frame
const mockLandmarks = [
  { id: 0, x: 50, y: 15, name: 'Nose', visible: true },
  { id: 11, x: 42, y: 30, name: 'Left Shoulder', visible: true },
  { id: 12, x: 58, y: 30, name: 'Right Shoulder', visible: true },
  { id: 13, x: 35, y: 45, name: 'Left Elbow', visible: true },
  { id: 14, x: 70, y: 40, name: 'Right Elbow', visible: true },
  { id: 15, x: 30, y: 55, name: 'Left Wrist', visible: true },
  { id: 16, x: 80, y: 35, name: 'Right Wrist', visible: true },
  { id: 23, x: 45, y: 55, name: 'Left Hip', visible: true },
  { id: 24, x: 55, y: 55, name: 'Right Hip', visible: true },
  { id: 25, x: 43, y: 75, name: 'Left Knee', visible: true },
  { id: 26, x: 57, y: 75, name: 'Right Knee', visible: true },
  { id: 27, x: 42, y: 95, name: 'Left Ankle', visible: true },
  { id: 28, x: 58, y: 95, name: 'Right Ankle', visible: true },
];

const jointAngles = [
  { name: 'Right Elbow', angle: 145, optimal: '140-160°' },
  { name: 'Right Shoulder', angle: 92, optimal: '85-100°' },
  { name: 'Right Hip', angle: 168, optimal: '160-175°' },
  { name: 'Right Knee', angle: 172, optimal: '165-180°' },
  { name: 'Hip-Shoulder Separation', angle: 42, optimal: '40-50°' },
  { name: 'Trunk Rotation', angle: 38, optimal: '35-45°' },
];

export default function AnalysisPage() {
  const params = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(45);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showAngles, setShowAngles] = useState(true);
  const [showTrajectory, setShowTrajectory] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedLandmark, setSelectedLandmark] = useState<number | null>(null);
  const [zoom, setZoom] = useState(100);

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
            <h1 className="text-2xl font-bold tracking-tight">Video Analysis</h1>
            <p className="text-muted-foreground">
              Forehand Practice Session - Sarah Johnson
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Re-analyze
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Analysis View */}
        <div className="lg:col-span-2 space-y-4">
          {/* Canvas with Skeleton Overlay */}
          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-black">
              {/* Video/Image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <span className="text-muted-foreground">Video Frame {currentFrame}</span>
              </div>

              {/* Skeleton Overlay - SVG representation */}
              {showSkeleton && (
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                  {/* Connection lines */}
                  <g stroke="rgb(59, 130, 246)" strokeWidth="0.5" fill="none">
                    {/* Spine */}
                    <line x1="50" y1="15" x2="50" y2="30" />
                    <line x1="50" y1="30" x2="50" y2="55" />
                    {/* Shoulders */}
                    <line x1="42" y1="30" x2="58" y2="30" />
                    {/* Left arm */}
                    <line x1="42" y1="30" x2="35" y2="45" />
                    <line x1="35" y1="45" x2="30" y2="55" />
                    {/* Right arm */}
                    <line x1="58" y1="30" x2="70" y2="40" />
                    <line x1="70" y1="40" x2="80" y2="35" />
                    {/* Hips */}
                    <line x1="45" y1="55" x2="55" y2="55" />
                    {/* Left leg */}
                    <line x1="45" y1="55" x2="43" y2="75" />
                    <line x1="43" y1="75" x2="42" y2="95" />
                    {/* Right leg */}
                    <line x1="55" y1="55" x2="57" y2="75" />
                    <line x1="57" y1="75" x2="58" y2="95" />
                  </g>

                  {/* Landmark points */}
                  {mockLandmarks.map((landmark) => (
                    <circle
                      key={landmark.id}
                      cx={landmark.x}
                      cy={landmark.y}
                      r={selectedLandmark === landmark.id ? 2 : 1.5}
                      className={cn(
                        'cursor-pointer transition-all',
                        selectedLandmark === landmark.id
                          ? 'fill-yellow-400'
                          : editMode
                          ? 'fill-green-400 hover:fill-yellow-400'
                          : 'fill-blue-400'
                      )}
                      onClick={() => editMode && setSelectedLandmark(landmark.id)}
                    />
                  ))}

                  {/* Angle arcs */}
                  {showAngles && (
                    <g className="text-[2px]" fill="rgba(255,255,255,0.8)">
                      <text x="72" y="42">145°</text>
                      <text x="56" y="57">42°</text>
                    </g>
                  )}
                </svg>
              )}

              {/* Toolbar */}
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                <Button
                  variant={editMode ? 'default' : 'secondary'}
                  size="icon"
                  onClick={() => setEditMode(!editMode)}
                  title="Edit landmarks"
                >
                  {editMode ? <Move className="h-4 w-4" /> : <Crosshair className="h-4 w-4" />}
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setZoom(Math.min(200, zoom + 25))}
                  title="Zoom in"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setZoom(Math.max(50, zoom - 25))}
                  title="Zoom out"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setZoom(100)}
                  title="Reset view"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* Visibility toggles */}
              <div className="absolute right-4 top-4 flex flex-col gap-2">
                <Button
                  variant={showSkeleton ? 'default' : 'secondary'}
                  size="icon"
                  onClick={() => setShowSkeleton(!showSkeleton)}
                  title="Toggle skeleton"
                >
                  {showSkeleton ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </div>

              {/* Playback controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4">
                <Slider
                  value={[currentFrame]}
                  max={1200}
                  step={1}
                  onValueChange={(value) => setCurrentFrame(value[0] ?? 0)}
                  className="mb-2"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white"
                      onClick={() => setCurrentFrame(Math.max(0, currentFrame - 1))}
                    >
                      <span className="text-xs">-1</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white"
                      onClick={() => setCurrentFrame(Math.min(1200, currentFrame + 1))}
                    >
                      <span className="text-xs">+1</span>
                    </Button>
                    <span className="ml-2 text-sm text-white">
                      Frame {currentFrame} / 1200
                    </span>
                  </div>
                  <span className="text-sm text-white">Zoom: {zoom}%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Edit Mode Panel */}
          {editMode && selectedLandmark !== null && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Editing: {mockLandmarks.find((l) => l.id === selectedLandmark)?.name}
                </CardTitle>
                <CardDescription>
                  Drag the landmark or use controls to adjust position
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>X Position</Label>
                    <Slider defaultValue={[50]} max={100} step={0.1} />
                  </div>
                  <div className="space-y-2">
                    <Label>Y Position</Label>
                    <Slider defaultValue={[50]} max={100} step={0.1} />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setSelectedLandmark(null)}>
                    Cancel
                  </Button>
                  <Button size="sm">Save Correction</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Analysis Sidebar */}
        <div className="space-y-4">
          <Tabs defaultValue="angles" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="angles" className="flex-1">Angles</TabsTrigger>
              <TabsTrigger value="metrics" className="flex-1">Metrics</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="angles" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Joint Angles</CardTitle>
                  <CardDescription>Frame {currentFrame}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {jointAngles.map((joint) => {
                    const isOptimal = joint.name === 'Hip-Shoulder Separation'
                      ? joint.angle >= 40 && joint.angle <= 50
                      : true;
                    return (
                      <div key={joint.name} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{joint.name}</span>
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              'font-mono text-sm font-medium',
                              isOptimal ? 'text-green-500' : 'text-yellow-500'
                            )}>
                              {joint.angle}°
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {joint.optimal}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-2xl font-bold text-green-500">78</p>
                      <p className="text-xs text-muted-foreground">mph racket speed</p>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-2xl font-bold text-blue-500">42°</p>
                      <p className="text-xs text-muted-foreground">hip-shoulder sep</p>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-2xl font-bold text-yellow-500">38&quot;</p>
                      <p className="text-xs text-muted-foreground">contact height</p>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-2xl font-bold text-green-500">85%</p>
                      <p className="text-xs text-muted-foreground">follow through</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button variant="outline" className="w-full" asChild>
                <Link href={`/dashboard/videos/${params.id}/compare`}>
                  Compare to Previous
                </Link>
              </Button>
            </TabsContent>

            <TabsContent value="settings" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Display Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-skeleton">Show Skeleton</Label>
                    <Switch
                      id="show-skeleton"
                      checked={showSkeleton}
                      onCheckedChange={setShowSkeleton}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-angles">Show Angles</Label>
                    <Switch
                      id="show-angles"
                      checked={showAngles}
                      onCheckedChange={setShowAngles}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-trajectory">Show Trajectory</Label>
                    <Switch
                      id="show-trajectory"
                      checked={showTrajectory}
                      onCheckedChange={setShowTrajectory}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Landmark Visibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(LANDMARKS).map(([name, id]) => (
                      <div key={id} className="flex items-center gap-2">
                        <Switch defaultChecked id={`landmark-${id}`} />
                        <Label htmlFor={`landmark-${id}`} className="text-xs capitalize">
                          {name.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
