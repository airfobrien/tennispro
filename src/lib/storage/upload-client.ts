'use client';

import { fetcher } from '@/lib/api/client';
import type { StrokeType } from '@/lib/api/client/types';

/**
 * Upload progress callback type
 */
export type UploadProgressCallback = (progress: UploadProgress) => void;

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
  status: 'preparing' | 'uploading' | 'completing' | 'complete' | 'error';
  error?: string;
}

export interface UploadOptions {
  file: File;
  studentId: string;
  title?: string;
  strokeType?: StrokeType;
  onProgress?: UploadProgressCallback;
  abortSignal?: AbortSignal;
}

export interface PresignedResponse {
  uploadUrl: string;
  s3Key: string;
  s3Bucket: string;
  expiresIn: number;
  metadata: {
    studentId: string;
    filename: string;
    contentType: string;
    fileSize: number;
    title?: string;
    strokeType?: StrokeType;
  };
}

export interface UploadResult {
  id: string;
  title: string | null;
  filename: string;
  s3Key: string;
  strokeType: StrokeType | null;
  status: string;
  createdAt: string;
  student: { id: string; name: string };
}

/**
 * Upload a video file to S3 using presigned URLs
 *
 * Steps:
 * 1. Request a presigned URL from the API
 * 2. Upload the file directly to S3 using the presigned URL
 * 3. Complete the upload by calling the complete endpoint
 */
export async function uploadVideo(options: UploadOptions): Promise<UploadResult> {
  const { file, studentId, title, strokeType, onProgress, abortSignal } = options;

  const updateProgress = (update: Partial<UploadProgress>) => {
    if (onProgress) {
      onProgress({
        loaded: 0,
        total: file.size,
        percentage: 0,
        status: 'preparing',
        ...update,
      });
    }
  };

  try {
    // Step 1: Get presigned URL
    updateProgress({ status: 'preparing', percentage: 0 });

    const presignResponse = await fetcher<PresignedResponse>('/api/uploads/presign', {
      method: 'POST',
      body: JSON.stringify({
        studentId,
        filename: file.name,
        contentType: file.type,
        fileSize: file.size,
        title,
        strokeType,
      }),
      signal: abortSignal,
    });

    // Step 2: Upload to S3
    updateProgress({ status: 'uploading', percentage: 0 });

    await uploadToS3({
      url: presignResponse.uploadUrl,
      file,
      onProgress: (loaded, total) => {
        updateProgress({
          status: 'uploading',
          loaded,
          total,
          percentage: Math.round((loaded / total) * 100),
        });
      },
      abortSignal,
    });

    // Step 3: Complete upload
    updateProgress({ status: 'completing', percentage: 100 });

    const video = await fetcher<UploadResult>('/api/uploads/complete', {
      method: 'POST',
      body: JSON.stringify({
        s3Key: presignResponse.s3Key,
        s3Bucket: presignResponse.s3Bucket,
        studentId,
        filename: file.name,
        contentType: file.type,
        fileSize: file.size,
        title,
        strokeType,
      }),
      signal: abortSignal,
    });

    updateProgress({ status: 'complete', percentage: 100 });

    return video;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Upload failed';
    updateProgress({ status: 'error', error: errorMessage });
    throw error;
  }
}

/**
 * Upload a file to S3 using a presigned URL with progress tracking
 */
async function uploadToS3(options: {
  url: string;
  file: File;
  onProgress?: (loaded: number, total: number) => void;
  abortSignal?: AbortSignal;
}): Promise<void> {
  const { url, file, onProgress, abortSignal } = options;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(event.loaded, event.total);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed due to network error'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('Upload was aborted'));
    });

    // Handle abort signal
    if (abortSignal) {
      abortSignal.addEventListener('abort', () => {
        xhr.abort();
      });
    }

    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });
}

/**
 * Create an abort controller for canceling uploads
 */
export function createUploadAbortController(): AbortController {
  return new AbortController();
}

/**
 * Validate a file before upload
 */
export function validateVideoFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = [
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/webm',
    'video/x-m4v',
  ];

  const maxSize = 500 * 1024 * 1024; // 500MB

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type: ${file.type}. Allowed types: MP4, MOV, AVI, WebM`,
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size is 500MB`,
    };
  }

  return { valid: true };
}

/**
 * Format bytes to human-readable string
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

/**
 * Format upload progress for display
 */
export function formatProgress(progress: UploadProgress): string {
  switch (progress.status) {
    case 'preparing':
      return 'Preparing upload...';
    case 'uploading':
      return `Uploading: ${progress.percentage}% (${formatBytes(progress.loaded)} / ${formatBytes(progress.total)})`;
    case 'completing':
      return 'Completing upload...';
    case 'complete':
      return 'Upload complete!';
    case 'error':
      return `Error: ${progress.error}`;
    default:
      return 'Unknown status';
  }
}
