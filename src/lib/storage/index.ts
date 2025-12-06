/**
 * Storage utilities - centralized exports
 */

// S3 Client and utilities
export { getS3Client, storageBuckets, generateVideoS3Key, generateThumbnailS3Key, parseVideoS3Key } from './s3-client';

// Presigned URLs
export {
  getPresignedUploadUrl,
  getPresignedDownloadUrl,
  getPresignedThumbnailUrl,
  batchGetPresignedDownloadUrls,
  URL_EXPIRATION,
  ALLOWED_VIDEO_TYPES,
  MAX_VIDEO_SIZE,
} from './presigned-urls';
export type { PresignedUploadResult, PresignedDownloadResult } from './presigned-urls';

// CloudFront signed URLs
export {
  getCloudFrontSignedUrl,
  getSignedVideoUrl,
  getSignedThumbnailUrl,
  generateCacheKey,
} from './cloudfront-signed';

// Multipart uploads
export {
  createMultipartUpload,
  uploadPart,
  completeMultipartUpload,
  abortMultipartUpload,
  splitFileIntoParts,
  performMultipartUpload,
  shouldUseMultipartUpload,
  MULTIPART_CONFIG,
} from './multipart-upload';
export type { MultipartUploadProgress, MultipartProgressCallback } from './multipart-upload';

// Thumbnails
export {
  uploadThumbnail,
  extractVideoMetadata,
  generateClientThumbnail,
  requestThumbnailGeneration,
  THUMBNAIL_CONFIG,
} from './thumbnails';
export type { ThumbnailGenerationJob } from './thumbnails';
