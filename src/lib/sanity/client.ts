import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

/**
 * Sanity client for fetching content
 * Uses CDN for production, no CDN for preview
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

/**
 * Client for preview mode (no CDN, includes drafts)
 */
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'previewDrafts',
});

/**
 * Get the appropriate client based on preview mode
 */
export function getClient(preview = false) {
  return preview ? previewClient : client;
}
