'use client';

import { ArrowLeft, Upload, Video, CheckCircle2, AlertCircle, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface UploadFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
}

export default function UploadVideoPage() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [strokeType, setStrokeType] = useState<string>('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const simulateUpload = async (file: File) => {
    const fileId = `${Date.now()}-${file.name}`;
    const uploadFile: UploadFile = {
      id: fileId,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      progress: 0,
      status: 'uploading',
    };

    setFiles((prev) => [...prev, uploadFile]);

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((r) => setTimeout(r, 200));
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, progress, status: progress === 100 ? 'processing' : 'uploading' } : f
        )
      );
    }

    // Simulate processing
    await new Promise((r) => setTimeout(r, 1000));
    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileId ? { ...f, status: 'complete' } : f
      )
    );
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('video/')
    );
    droppedFiles.forEach((file) => simulateUpload(file));
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []).filter((file) =>
      file.type.startsWith('video/')
    );
    selectedFiles.forEach((file) => simulateUpload(file));
  };

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard/videos');
  };

  const completedFiles = files.filter((f) => f.status === 'complete');
  const canSubmit = completedFiles.length > 0 && selectedStudent && strokeType;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/videos">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Upload Video</h1>
          <p className="text-muted-foreground">
            Upload videos for analysis and feedback
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload Area */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Video Files</CardTitle>
              <CardDescription>
                Upload one or more video files. Supported formats: MP4, MOV, AVI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors',
                  dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="mb-2 text-lg font-medium">
                  Drag and drop video files here
                </p>
                <p className="mb-4 text-sm text-muted-foreground">
                  or click to browse (max 500MB per file)
                </p>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleFileInput}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                <Button variant="outline" type="button">
                  <Video className="mr-2 h-4 w-4" />
                  Select Files
                </Button>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-4 rounded-lg border p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-muted">
                        <Video className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{file.name}</p>
                          <span className="text-sm text-muted-foreground">{file.size}</span>
                        </div>
                        {file.status === 'uploading' && (
                          <div className="mt-2">
                            <Progress value={file.progress} className="h-2" />
                            <p className="mt-1 text-xs text-muted-foreground">
                              Uploading... {file.progress}%
                            </p>
                          </div>
                        )}
                        {file.status === 'processing' && (
                          <p className="mt-2 text-xs text-yellow-600">Processing video...</p>
                        )}
                        {file.status === 'complete' && (
                          <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle2 className="h-3 w-3" />
                            Upload complete
                          </div>
                        )}
                        {file.status === 'error' && (
                          <div className="mt-2 flex items-center gap-1 text-xs text-red-600">
                            <AlertCircle className="h-3 w-3" />
                            {file.error ?? 'Upload failed'}
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Video Details */}
          <Card>
            <CardHeader>
              <CardTitle>Video Details</CardTitle>
              <CardDescription>Add information about the uploaded video</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student">Student *</Label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger id="student">
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Sarah Johnson</SelectItem>
                    <SelectItem value="2">Mike Chen</SelectItem>
                    <SelectItem value="3">Emily Davis</SelectItem>
                    <SelectItem value="4">Alex Thompson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stroke">Stroke Type *</Label>
                <Select value={strokeType} onValueChange={setStrokeType}>
                  <SelectTrigger id="stroke">
                    <SelectValue placeholder="Select stroke type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="forehand">Forehand</SelectItem>
                    <SelectItem value="backhand">Backhand</SelectItem>
                    <SelectItem value="serve">Serve</SelectItem>
                    <SelectItem value="volley">Volley</SelectItem>
                    <SelectItem value="overhead">Overhead</SelectItem>
                    <SelectItem value="movement">Movement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g., Forehand Practice Session" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about this video..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Analysis Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis Settings</CardTitle>
              <CardDescription>Configure how the video should be analyzed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="focus">Focus Area</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="focus">
                    <SelectValue placeholder="Select focus area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Full Analysis</SelectItem>
                    <SelectItem value="technique">Technique Only</SelectItem>
                    <SelectItem value="footwork">Footwork Only</SelectItem>
                    <SelectItem value="power">Power Generation</SelectItem>
                    <SelectItem value="timing">Timing & Rhythm</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comparison">Compare To</Label>
                <Select>
                  <SelectTrigger id="comparison">
                    <SelectValue placeholder="Select comparison (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Comparison</SelectItem>
                    <SelectItem value="previous">Previous Video</SelectItem>
                    <SelectItem value="pro">Pro Reference</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <h4 className="mb-2 font-medium">Analysis includes:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Pose estimation with 33 body landmarks</li>
                  <li>• Stroke phase detection</li>
                  <li>• Joint angle measurements</li>
                  <li>• Hip-shoulder separation metrics</li>
                  <li>• AI-powered recommendations</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link href="/dashboard/videos">Cancel</Link>
          </Button>
          <Button type="submit" disabled={!canSubmit}>
            Upload & Analyze
          </Button>
        </div>
      </form>
    </div>
  );
}
