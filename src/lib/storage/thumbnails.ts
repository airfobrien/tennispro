import { PutObjectCommand } from '@aws-sdk/client-s3';

import { getS3Client, storageBuckets, generateThumbnailS3Key } from './s3-client';

/**
 * Thumbnail configuration
 */
export const THUMBNAIL_CONFIG = {
  width: 320,
  height: 180,
  quality: 80,
  format: 'image/jpeg' as const,
} as const;

/**
 * Upload a thumbnail to S3
 * This is called after thumbnail generation (which happens server-side or via Lambda)
 */
export async function uploadThumbnail(
  videoS3Key: string,
  thumbnailBlob: Blob
): Promise<string> {
  const client = getS3Client();
  const thumbnailKey = generateThumbnailS3Key(videoS3Key);

  const arrayBuffer = await thumbnailBlob.arrayBuffer();

  const command = new PutObjectCommand({
    Bucket: storageBuckets.videos,
    Key: thumbnailKey,
    Body: new Uint8Array(arrayBuffer),
    ContentType: 'image/jpeg',
    CacheControl: 'max-age=31536000', // 1 year cache
  });

  await client.send(command);

  return thumbnailKey;
}

/**
 * Extract video metadata from a File object (client-side)
 * Uses HTML5 video element to get duration and dimensions
 */
export function extractVideoMetadata(
  file: File
): Promise<{ duration: number; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      resolve({
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
      });
    };

    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error('Failed to load video metadata'));
    };

    video.src = URL.createObjectURL(file);
  });
}

/**
 * Generate a thumbnail from a video file (client-side)
 * Captures a frame at the specified time (default: 1 second)
 */
export function generateClientThumbnail(
  file: File,
  captureTime: number = 1
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;

    video.onloadedmetadata = () => {
      // Seek to capture time (or middle of video if too short)
      video.currentTime = Math.min(captureTime, video.duration / 2);
    };

    video.onseeked = () => {
      // Create canvas and draw video frame
      const canvas = document.createElement('canvas');
      canvas.width = THUMBNAIL_CONFIG.width;
      canvas.height = THUMBNAIL_CONFIG.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(video.src);
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Scale video to fit canvas while maintaining aspect ratio
      const videoAspect = video.videoWidth / video.videoHeight;
      const canvasAspect = canvas.width / canvas.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (videoAspect > canvasAspect) {
        drawHeight = canvas.width / videoAspect;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * videoAspect;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      // Fill background (for letterboxing)
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw video frame
      ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(video.src);
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to generate thumbnail'));
          }
        },
        THUMBNAIL_CONFIG.format,
        THUMBNAIL_CONFIG.quality / 100
      );
    };

    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error('Failed to load video for thumbnail generation'));
    };

    video.src = URL.createObjectURL(file);
  });
}

/**
 * Placeholder for server-side thumbnail generation
 * In production, this would be handled by AWS Lambda with FFmpeg
 */
export interface ThumbnailGenerationJob {
  videoId: string;
  s3Key: string;
  status: 'pending' | 'processing' | 'complete' | 'failed';
  thumbnailS3Key?: string;
  error?: string;
}

/**
 * Request thumbnail generation for a video
 * This would trigger a Lambda function in production
 */
export async function requestThumbnailGeneration(
  _videoId: string,
  _s3Key: string
): Promise<ThumbnailGenerationJob> {
  // In production, this would:
  // 1. Send message to SQS or trigger Step Function
  // 2. Lambda would download video from S3
  // 3. Use FFmpeg to extract frame
  // 4. Upload thumbnail to S3
  // 5. Update video record with thumbnail URL

  // For now, return a placeholder that indicates client-side generation should be used
  return {
    videoId: _videoId,
    s3Key: _s3Key,
    status: 'pending',
  };
}
