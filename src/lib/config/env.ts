import { z } from 'zod';

const envSchema = z.object({
  // App
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // AWS
  AWS_REGION: z.string().default('us-east-1'),
  AWS_ACCOUNT_ID: z.string().optional(),

  // Cognito
  COGNITO_USER_POOL_ID: z.string().optional(),
  COGNITO_CLIENT_ID: z.string().optional(),

  // Database
  DATABASE_URL: z.string().optional(),

  // S3
  S3_VIDEOS_BUCKET: z.string().optional(),
  S3_ASSETS_BUCKET: z.string().optional(),
  S3_EXPORTS_BUCKET: z.string().optional(),

  // CloudFront
  CLOUDFRONT_DOMAIN: z.string().optional(),
  CLOUDFRONT_KEY_PAIR_ID: z.string().optional(),
  CLOUDFRONT_PRIVATE_KEY: z.string().optional(),

  // Sanity
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_SANITY_DATASET: z.string().default('production'),
  SANITY_API_TOKEN: z.string().optional(),

  // Modal
  MODAL_TOKEN_ID: z.string().optional(),
  MODAL_TOKEN_SECRET: z.string().optional(),

  // Analytics
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),

  // App URLs
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}

// Lazily validated environment (call validateEnv() for strict validation)
export const env = {
  get NODE_ENV() {
    return (process.env.NODE_ENV as 'development' | 'production' | 'test') ?? 'development';
  },
  get AWS_REGION() {
    return process.env.AWS_REGION ?? 'us-east-1';
  },
  get AWS_ACCOUNT_ID() {
    return process.env.AWS_ACCOUNT_ID;
  },
  get S3_VIDEOS_BUCKET() {
    return process.env.S3_VIDEOS_BUCKET ?? '';
  },
  get S3_ASSETS_BUCKET() {
    return process.env.S3_ASSETS_BUCKET ?? '';
  },
  get S3_EXPORTS_BUCKET() {
    return process.env.S3_EXPORTS_BUCKET ?? '';
  },
  get CLOUDFRONT_DOMAIN() {
    return process.env.CLOUDFRONT_DOMAIN;
  },
  get CLOUDFRONT_KEY_PAIR_ID() {
    return process.env.CLOUDFRONT_KEY_PAIR_ID;
  },
  get CLOUDFRONT_PRIVATE_KEY() {
    return process.env.CLOUDFRONT_PRIVATE_KEY;
  },
  get DATABASE_URL() {
    return process.env.DATABASE_URL;
  },
};

// For client-side (only NEXT_PUBLIC_ vars)
export function getPublicEnv() {
  return {
    sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  };
}
