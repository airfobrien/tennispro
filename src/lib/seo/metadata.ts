import type { Metadata } from 'next';

const siteConfig = {
  name: 'TennisProPlus',
  description:
    'Professional tennis coaching platform with AI-powered video analysis and comprehensive student management.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://tennisproplus.com',
  ogImage: '/og-image.jpg',
  twitterHandle: '@tennisproplus',
};

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  pathname?: string;
}

export function generateMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
  pathname = '',
}: GenerateMetadataOptions = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name;

  const url = `${siteConfig.url}${pathname}`;
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title ?? siteConfig.name,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: siteConfig.twitterHandle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function generateArticleMetadata({
  title,
  description,
  image,
  pathname,
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: GenerateMetadataOptions & {
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}): Metadata {
  const baseMetadata = generateMetadata({ title, description, image, pathname });

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors,
      tags,
    },
  };
}

export { siteConfig };
