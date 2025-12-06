import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { getS3Client, storageBuckets } from './s3-client';

/**
 * URL expiration times in seconds
 */
export const URL_EXPIRATION = {
  upload: 60 * 60, // 1 hour for uploads
  download: 60 * 60 * 24, // 24 hours for downloads
  thumbnail: 60 * 60 * 24 * 7, // 7 days for thumbnails
} as const;

/**
 * Allowed video content types
 */
export const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/quicktime',
  'video/x-msvideo',
  'video/webm',
  'video/x-m4v',
] as const;

/**
 * Maximum file size for uploads (500MB)
 */
export const MAX_VIDEO_SIZE = 500 * 1024 * 1024;

export interface PresignedUploadResult {
  uploadUrl: string;
  s3Key: string;
  s3Bucket: string;
  expiresIn: number;
}

/**
 * Generate a presigned URL for uploading a video to S3
 */
export async function getPresignedUploadUrl(
  s3Key: string,
  contentType: string,
  contentLength: number
): Promise<PresignedUploadResult> {
  if (!ALLOWED_VIDEO_TYPES.includes(contentType as (typeof ALLOWED_VIDEO_TYPES)[number])) {
    throw new Error(`Invalid content type: ${contentType}. Allowed types: ${ALLOWED_VIDEO_TYPES.join(', ')}`);
  }

  if (contentLength > MAX_VIDEO_SIZE) {
    throw new Error(`File too large. Maximum size is ${MAX_VIDEO_SIZE / (1024 * 1024)}MB`);
  }

  const client = getS3Client();
  const bucket = storageBuckets.videos;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: s3Key,
    ContentType: contentType,
    ContentLength: contentLength,
  });

  const uploadUrl = await getSignedUrl(client, command, {
    expiresIn: URL_EXPIRATION.upload,
  });

  return {
    uploadUrl,
    s3Key,
    s3Bucket: bucket,
    expiresIn: URL_EXPIRATION.upload,
  };
}

export interface PresignedDownloadResult {
  downloadUrl: string;
  expiresIn: number;
}

/**
 * Generate a presigned URL for downloading/viewing a video from S3
 */
export async function getPresignedDownloadUrl(
  s3Key: string,
  bucket?: string
): Promise<PresignedDownloadResult> {
  const client = getS3Client();
  const targetBucket = bucket ?? storageBuckets.videos;

  const command = new GetObjectCommand({
    Bucket: targetBucket,
    Key: s3Key,
  });

  const downloadUrl = await getSignedUrl(client, command, {
    expiresIn: URL_EXPIRATION.download,
  });

  return {
    downloadUrl,
    expiresIn: URL_EXPIRATION.download,
  };
}

/**
 * Generate a presigned URL for a thumbnail
 */
export async function getPresignedThumbnailUrl(
  s3Key: string,
  bucket?: string
): Promise<PresignedDownloadResult> {
  const client = getS3Client();
  const targetBucket = bucket ?? storageBuckets.videos;

  const command = new GetObjectCommand({
    Bucket: targetBucket,
    Key: s3Key,
  });

  const downloadUrl = await getSignedUrl(client, command, {
    expiresIn: URL_EXPIRATION.thumbnail,
  });

  return {
    downloadUrl,
    expiresIn: URL_EXPIRATION.thumbnail,
  };
}

/**
 * Batch generate presigned download URLs for multiple videos
 */
export async function batchGetPresignedDownloadUrls(
  videos: Array<{ id: string; s3Key: string; s3Bucket: string }>
): Promise<Map<string, string>> {
  const urlMap = new Map<string, string>();

  await Promise.all(
    videos.map(async (video) => {
      try {
        const result = await getPresignedDownloadUrl(video.s3Key, video.s3Bucket);
        urlMap.set(video.id, result.downloadUrl);
      } catch {
        // Skip failed URLs
        console.error(`Failed to generate presigned URL for video ${video.id}`);
      }
    })
  );

  return urlMap;
}
