'use client';

import { ArrowLeft, Download, Upload, FileSpreadsheet, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useState, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';


type ImportStatus = 'idle' | 'parsing' | 'preview' | 'importing' | 'complete' | 'error';

interface ParsedStudent {
  row: number;
  firstName: string;
  lastName: string;
  email: string;
  skillLevel: string;
  status: 'valid' | 'error' | 'warning';
  errors: string[];
}

const mockParsedStudents: ParsedStudent[] = [
  { row: 1, firstName: 'John', lastName: 'Smith', email: 'john.smith@email.com', skillLevel: 'Beginner', status: 'valid', errors: [] },
  { row: 2, firstName: 'Emma', lastName: 'Wilson', email: 'emma.w@email.com', skillLevel: 'Intermediate', status: 'valid', errors: [] },
  { row: 3, firstName: 'Michael', lastName: 'Brown', email: 'invalid-email', skillLevel: 'Advanced', status: 'error', errors: ['Invalid email format'] },
  { row: 4, firstName: 'Sophia', lastName: 'Garcia', email: 'sophia.g@email.com', skillLevel: 'Unknown', status: 'warning', errors: ['Unknown skill level, will use "Beginner"'] },
  { row: 5, firstName: 'James', lastName: 'Lee', email: 'james.lee@email.com', skillLevel: 'Professional', status: 'valid', errors: [] },
];

export default function ImportStudentsPage() {
  const [status, setStatus] = useState<ImportStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [parsedStudents, setParsedStudents] = useState<ParsedStudent[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const processFile = async (_file: File) => {
    setStatus('parsing');
    setProgress(0);

    // Simulate parsing - in real implementation, parse the CSV file
    for (let i = 0; i <= 100; i += 20) {
      await new Promise((r) => setTimeout(r, 200));
      setProgress(i);
    }

    setParsedStudents(mockParsedStudents);
    setStatus('preview');
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      processFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      processFile(files[0]);
    }
  };

  const handleImport = async () => {
    setStatus('importing');
    setProgress(0);

    const validStudents = parsedStudents.filter((s) => s.status !== 'error');
    const total = validStudents.length;

    for (let i = 0; i <= total; i++) {
      await new Promise((r) => setTimeout(r, 300));
      setProgress(Math.round((i / total) * 100));
    }

    setStatus('complete');
  };

  const validCount = parsedStudents.filter((s) => s.status === 'valid').length;
  const warningCount = parsedStudents.filter((s) => s.status === 'warning').length;
  const errorCount = parsedStudents.filter((s) => s.status === 'error').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/students">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Import Students</h1>
          <p className="text-muted-foreground">
            Bulk import students from a CSV file
          </p>
        </div>
      </div>

      {status === 'idle' && (
        <>
          {/* Upload Area */}
          <Card>
            <CardHeader>
              <CardTitle>Upload CSV File</CardTitle>
              <CardDescription>
                Upload a CSV file with student information
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
                  Drag and drop your CSV file here
                </p>
                <p className="mb-4 text-sm text-muted-foreground">
                  or click to browse
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileInput}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                <Button variant="outline" type="button">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Select File
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Template Download */}
          <Card>
            <CardHeader>
              <CardTitle>CSV Template</CardTitle>
              <CardDescription>
                Download our template to ensure your data is formatted correctly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="mb-2 text-sm font-medium">Required columns:</p>
                <code className="text-sm text-muted-foreground">
                  first_name, last_name, email
                </code>
                <p className="mt-2 text-sm font-medium">Optional columns:</p>
                <code className="text-sm text-muted-foreground">
                  phone, date_of_birth, skill_level, playing_style, handed, backhand, notes
                </code>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {status === 'parsing' && (
        <Card>
          <CardHeader>
            <CardTitle>Parsing CSV File...</CardTitle>
            <CardDescription>Please wait while we process your file</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progress} />
            <p className="text-center text-sm text-muted-foreground">
              Reading and validating data...
            </p>
          </CardContent>
        </Card>
      )}

      {status === 'preview' && (
        <>
          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Valid Records
                </CardDescription>
                <CardTitle className="text-3xl text-green-500">{validCount}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  Warnings
                </CardDescription>
                <CardTitle className="text-3xl text-yellow-500">{warningCount}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  Errors
                </CardDescription>
                <CardTitle className="text-3xl text-red-500">{errorCount}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Preview Table */}
          <Card>
            <CardHeader>
              <CardTitle>Preview Import</CardTitle>
              <CardDescription>
                Review the data before importing. Records with errors will be skipped.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">Row</TableHead>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Skill Level</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parsedStudents.map((student) => (
                      <TableRow
                        key={student.row}
                        className={cn(
                          student.status === 'error' && 'bg-red-500/5',
                          student.status === 'warning' && 'bg-yellow-500/5'
                        )}
                      >
                        <TableCell>{student.row}</TableCell>
                        <TableCell>{student.firstName}</TableCell>
                        <TableCell>{student.lastName}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.skillLevel}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {student.status === 'valid' && (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            )}
                            {student.status === 'warning' && (
                              <AlertCircle className="h-4 w-4 text-yellow-500" />
                            )}
                            {student.status === 'error' && (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            {student.errors.length > 0 && (
                              <span className="text-sm text-muted-foreground">
                                {student.errors[0]}
                              </span>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex justify-end gap-4">
                <Button variant="outline" onClick={() => setStatus('idle')}>
                  Cancel
                </Button>
                <Button onClick={handleImport} disabled={validCount + warningCount === 0}>
                  Import {validCount + warningCount} Students
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {status === 'importing' && (
        <Card>
          <CardHeader>
            <CardTitle>Importing Students...</CardTitle>
            <CardDescription>Creating student records</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progress} />
            <p className="text-center text-sm text-muted-foreground">
              {Math.round((progress / 100) * (validCount + warningCount))} of {validCount + warningCount} students imported
            </p>
          </CardContent>
        </Card>
      )}

      {status === 'complete' && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <CardTitle>Import Complete!</CardTitle>
                <CardDescription>
                  Successfully imported {validCount + warningCount} students
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button asChild>
              <Link href="/dashboard/students">View Students</Link>
            </Button>
            <Button variant="outline" onClick={() => setStatus('idle')}>
              Import More
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
