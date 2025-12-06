import imageUrlBuilder from '@sanity/image-url';

import { client } from './client';

// Sanity image source type
type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0];

const builder = imageUrlBuilder(client);

/**
 * Generate optimized image URLs from Sanity images
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Common image size presets
 */
export const imageSizes = {
  thumbnail: { width: 150, height: 150 },
  avatar: { width: 80, height: 80 },
  card: { width: 400, height: 300 },
  hero: { width: 1200, height: 600 },
  og: { width: 1200, height: 630 },
  full: { width: 1920 },
} as const;

/**
 * Get a thumbnail URL
 */
export function thumbnailUrl(source: SanityImageSource) {
  return urlFor(source)
    .width(imageSizes.thumbnail.width)
    .height(imageSizes.thumbnail.height)
    .fit('crop')
    .url();
}

/**
 * Get an avatar URL
 */
export function avatarUrl(source: SanityImageSource) {
  return urlFor(source)
    .width(imageSizes.avatar.width)
    .height(imageSizes.avatar.height)
    .fit('crop')
    .url();
}

/**
 * Get a card image URL
 */
export function cardImageUrl(source: SanityImageSource) {
  return urlFor(source)
    .width(imageSizes.card.width)
    .height(imageSizes.card.height)
    .fit('crop')
    .url();
}

/**
 * Get a hero image URL
 */
export function heroImageUrl(source: SanityImageSource) {
  return urlFor(source)
    .width(imageSizes.hero.width)
    .height(imageSizes.hero.height)
    .fit('crop')
    .url();
}

/**
 * Get an Open Graph image URL
 */
export function ogImageUrl(source: SanityImageSource) {
  return urlFor(source)
    .width(imageSizes.og.width)
    .height(imageSizes.og.height)
    .fit('crop')
    .url();
}
