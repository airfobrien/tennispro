import { createHash, createSign } from 'crypto';

import { env } from '@/lib/config/env';

/**
 * CloudFront signed URL configuration
 */
const CLOUDFRONT_EXPIRATION = {
  video: 60 * 60 * 24, // 24 hours for videos
  thumbnail: 60 * 60 * 24 * 7, // 7 days for thumbnails
} as const;

interface CloudFrontSignedUrlOptions {
  url: string;
  expiresIn?: number;
}

/**
 * Generate a CloudFront signed URL for secure video streaming
 * This provides better performance than S3 presigned URLs for video delivery
 */
export function getCloudFrontSignedUrl(options: CloudFrontSignedUrlOptions): string | null {
  const { url, expiresIn = CLOUDFRONT_EXPIRATION.video } = options;

  const keyPairId = env.CLOUDFRONT_KEY_PAIR_ID;
  const privateKey = env.CLOUDFRONT_PRIVATE_KEY;

  if (!keyPairId || !privateKey) {
    // Fall back to S3 presigned URLs if CloudFront signing not configured
    console.warn('CloudFront signing not configured. Falling back to S3 presigned URLs.');
    return null;
  }

  const expires = Math.floor(Date.now() / 1000) + expiresIn;

  // Create the policy
  const policy = JSON.stringify({
    Statement: [
      {
        Resource: url,
        Condition: {
          DateLessThan: {
            'AWS:EpochTime': expires,
          },
        },
      },
    ],
  });

  // Base64 encode the policy (CloudFront-safe encoding)
  const encodedPolicy = Buffer.from(policy)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  // Sign the policy with RSA-SHA1
  const signer = createSign('RSA-SHA1');
  signer.update(policy);
  const signature = signer
    .sign(privateKey, 'base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  // Build the signed URL with custom policy
  // Custom policies require Policy parameter, canned policies use Expires
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}Policy=${encodedPolicy}&Signature=${signature}&Key-Pair-Id=${keyPairId}`;
}

/**
 * Generate a CloudFront signed URL for a video using its S3 key
 */
export function getSignedVideoUrl(s3Key: string): string | null {
  const cloudFrontDomain = env.CLOUDFRONT_DOMAIN;

  if (!cloudFrontDomain) {
    return null;
  }

  const url = `https://${cloudFrontDomain}/${s3Key}`;
  return getCloudFrontSignedUrl({ url, expiresIn: CLOUDFRONT_EXPIRATION.video });
}

/**
 * Generate a CloudFront signed URL for a thumbnail
 */
export function getSignedThumbnailUrl(s3Key: string): string | null {
  const cloudFrontDomain = env.CLOUDFRONT_DOMAIN;

  if (!cloudFrontDomain) {
    return null;
  }

  const url = `https://${cloudFrontDomain}/${s3Key}`;
  return getCloudFrontSignedUrl({ url, expiresIn: CLOUDFRONT_EXPIRATION.thumbnail });
}

/**
 * Generate a cache key for CloudFront URL caching
 * This helps avoid regenerating signed URLs too frequently
 */
export function generateCacheKey(s3Key: string): string {
  const hash = createHash('sha256').update(s3Key).digest('hex').slice(0, 16);
  const bucket = Math.floor(Date.now() / (1000 * 60 * 60)); // Hourly buckets
  return `cf:${hash}:${bucket}`;
}
