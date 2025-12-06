import {
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
  type CompletedPart,
} from '@aws-sdk/client-s3';

import { getS3Client, storageBuckets } from './s3-client';

/**
 * Multipart upload configuration
 */
export const MULTIPART_CONFIG = {
  /** Minimum file size for multipart upload (5MB - S3 minimum) */
  MIN_FILE_SIZE: 5 * 1024 * 1024,
  /** Part size (10MB) */
  PART_SIZE: 10 * 1024 * 1024,
  /** Maximum concurrent uploads */
  MAX_CONCURRENT: 4,
  /** Maximum file size (5GB) */
  MAX_FILE_SIZE: 5 * 1024 * 1024 * 1024,
} as const;

export interface MultipartUploadProgress {
  uploadId: string;
  partNumber: number;
  totalParts: number;
  uploadedBytes: number;
  totalBytes: number;
  percentage: number;
}

export type MultipartProgressCallback = (progress: MultipartUploadProgress) => void;

/**
 * Start a multipart upload
 */
export async function createMultipartUpload(
  s3Key: string,
  contentType: string
): Promise<string> {
  const client = getS3Client();

  const command = new CreateMultipartUploadCommand({
    Bucket: storageBuckets.videos,
    Key: s3Key,
    ContentType: contentType,
  });

  const response = await client.send(command);

  if (!response.UploadId) {
    throw new Error('Failed to create multipart upload');
  }

  return response.UploadId;
}

/**
 * Upload a single part
 */
export async function uploadPart(
  s3Key: string,
  uploadId: string,
  partNumber: number,
  body: Blob
): Promise<CompletedPart> {
  const client = getS3Client();

  // Convert Blob to ArrayBuffer for SDK
  const arrayBuffer = await body.arrayBuffer();

  const command = new UploadPartCommand({
    Bucket: storageBuckets.videos,
    Key: s3Key,
    UploadId: uploadId,
    PartNumber: partNumber,
    Body: new Uint8Array(arrayBuffer),
  });

  const response = await client.send(command);

  if (!response.ETag) {
    throw new Error(`Failed to upload part ${partNumber}`);
  }

  return {
    ETag: response.ETag,
    PartNumber: partNumber,
  };
}

/**
 * Complete a multipart upload
 */
export async function completeMultipartUpload(
  s3Key: string,
  uploadId: string,
  parts: CompletedPart[]
): Promise<void> {
  const client = getS3Client();

  // Sort parts by part number
  const sortedParts = [...parts].sort((a, b) => (a.PartNumber ?? 0) - (b.PartNumber ?? 0));

  const command = new CompleteMultipartUploadCommand({
    Bucket: storageBuckets.videos,
    Key: s3Key,
    UploadId: uploadId,
    MultipartUpload: {
      Parts: sortedParts,
    },
  });

  await client.send(command);
}

/**
 * Abort a multipart upload
 */
export async function abortMultipartUpload(s3Key: string, uploadId: string): Promise<void> {
  const client = getS3Client();

  const command = new AbortMultipartUploadCommand({
    Bucket: storageBuckets.videos,
    Key: s3Key,
    UploadId: uploadId,
  });

  await client.send(command);
}

/**
 * Split a file into parts for multipart upload
 */
export function* splitFileIntoParts(
  file: File,
  partSize: number = MULTIPART_CONFIG.PART_SIZE
): Generator<{ partNumber: number; blob: Blob; start: number; end: number }> {
  const totalParts = Math.ceil(file.size / partSize);

  for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
    const start = (partNumber - 1) * partSize;
    const end = Math.min(start + partSize, file.size);
    const blob = file.slice(start, end);

    yield { partNumber, blob, start, end };
  }
}

/**
 * Perform a complete multipart upload with progress tracking
 * This is a server-side function - client should use the API endpoint
 */
export async function performMultipartUpload(
  s3Key: string,
  file: File,
  contentType: string,
  onProgress?: MultipartProgressCallback
): Promise<void> {
  if (file.size < MULTIPART_CONFIG.MIN_FILE_SIZE) {
    throw new Error(
      `File too small for multipart upload. Minimum size: ${MULTIPART_CONFIG.MIN_FILE_SIZE / (1024 * 1024)}MB`
    );
  }

  if (file.size > MULTIPART_CONFIG.MAX_FILE_SIZE) {
    throw new Error(
      `File too large. Maximum size: ${MULTIPART_CONFIG.MAX_FILE_SIZE / (1024 * 1024 * 1024)}GB`
    );
  }

  const totalParts = Math.ceil(file.size / MULTIPART_CONFIG.PART_SIZE);
  let uploadId: string | null = null;

  try {
    // Start multipart upload
    uploadId = await createMultipartUpload(s3Key, contentType);

    const parts: CompletedPart[] = [];
    let uploadedBytes = 0;

    // Upload parts with limited concurrency
    const partsGenerator = splitFileIntoParts(file);
    const activeParts: Promise<CompletedPart>[] = [];

    for (const part of partsGenerator) {
      // Start uploading part
      const partPromise = uploadPart(s3Key, uploadId, part.partNumber, part.blob).then(
        (completedPart) => {
          uploadedBytes += part.blob.size;

          if (onProgress) {
            onProgress({
              uploadId: uploadId!,
              partNumber: part.partNumber,
              totalParts,
              uploadedBytes,
              totalBytes: file.size,
              percentage: Math.round((uploadedBytes / file.size) * 100),
            });
          }

          return completedPart;
        }
      );

      activeParts.push(partPromise);

      // Limit concurrent uploads
      if (activeParts.length >= MULTIPART_CONFIG.MAX_CONCURRENT) {
        const completed = await Promise.race(activeParts);
        parts.push(completed);
        activeParts.splice(activeParts.indexOf(partPromise), 1);
      }
    }

    // Wait for remaining parts
    const remainingParts = await Promise.all(activeParts);
    parts.push(...remainingParts);

    // Complete the upload
    await completeMultipartUpload(s3Key, uploadId, parts);
  } catch (error) {
    // Abort on error
    if (uploadId) {
      try {
        await abortMultipartUpload(s3Key, uploadId);
      } catch {
        console.error('Failed to abort multipart upload');
      }
    }
    throw error;
  }
}

/**
 * Determine if a file should use multipart upload
 */
export function shouldUseMultipartUpload(fileSize: number): boolean {
  return fileSize >= MULTIPART_CONFIG.MIN_FILE_SIZE;
}
