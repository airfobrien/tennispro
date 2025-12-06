import { S3Client } from '@aws-sdk/client-s3';

import { env } from '@/lib/config/env';

/**
 * S3 Client singleton for AWS operations
 * Uses environment variables for configuration
 */
let s3Client: S3Client | null = null;

export function getS3Client(): S3Client {
  if (!s3Client) {
    s3Client = new S3Client({
      region: env.AWS_REGION,
      // Credentials are loaded automatically from environment variables or IAM role
      // AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY for local development
      // IAM role for production (Lambda, EC2, etc.)
    });
  }

  return s3Client;
}

/**
 * Storage bucket configuration
 */
export const storageBuckets = {
  videos: env.S3_VIDEOS_BUCKET,
  assets: env.S3_ASSETS_BUCKET,
  exports: env.S3_EXPORTS_BUCKET,
} as const;

/**
 * Generate a unique S3 key for a coach's video upload
 */
export function generateVideoS3Key(coachId: string, studentId: string, filename: string): string {
  const timestamp = Date.now();
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `coaches/${coachId}/students/${studentId}/videos/${timestamp}-${sanitizedFilename}`;
}

/**
 * Generate S3 key for a video thumbnail
 */
export function generateThumbnailS3Key(videoS3Key: string): string {
  // Replace extension with jpg for thumbnail
  const basePath = videoS3Key.replace(/\.[^/.]+$/, '');
  return `${basePath}-thumbnail.jpg`;
}

/**
 * Parse video S3 key to extract coach and student IDs
 */
export function parseVideoS3Key(s3Key: string): { coachId: string; studentId: string } | null {
  const match = s3Key.match(/^coaches\/([^/]+)\/students\/([^/]+)\/videos\//);
  if (!match) return null;
  return { coachId: match[1]!, studentId: match[2]! };
}
