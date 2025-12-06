import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { client, postBySlugQuery, urlFor } from '@/lib/sanity';

interface Post {
  _id: string;
  title: { en: string };
  slug: { current: string };
  excerpt?: { en: string };
  mainImage?: {
    asset: { _ref: string };
    alt?: string;
  };
  body?: { en: PortableTextBlock[] };
  publishedAt: string;
  author?: {
    _id: string;
    name: string;
    slug: { current: string };
    image?: { asset: { _ref: string } };
    bio?: { en: string };
  };
  categories?: Array<{
    _id: string;
    title: { en: string };
    slug: { current: string };
    color?: string;
  }>;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: { asset: { _ref: string } };
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    return await client.fetch(postBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const title = post.seo?.metaTitle ?? post.title.en;
  const description = post.seo?.metaDescription ?? post.excerpt?.en ?? '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
      images: post.seo?.ogImage
        ? [urlFor(post.seo.ogImage).width(1200).height(630).url()]
        : post.mainImage
          ? [urlFor(post.mainImage).width(1200).height(630).url()]
          : undefined,
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      {/* Header */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-12">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <Button variant="ghost" size="sm" className="mb-6" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/blog/category/${category.slug.current}`}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20"
                  >
                    {category.title.en}
                  </Link>
                ))}
              </div>
            )}

            <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {post.title.en}
            </h1>

            {/* Author & Date */}
            <div className="flex items-center gap-4">
              {post.author?.image && (
                <Image
                  src={urlFor(post.author.image).width(48).height(48).url()}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                {post.author && (
                  <p className="font-medium">{post.author.name}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.publishedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.mainImage && (
        <section className="py-8">
          <div className="container">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl">
              <Image
                src={urlFor(post.mainImage).width(1200).height(630).url()}
                alt={post.mainImage.alt ?? post.title.en}
                width={1200}
                height={630}
                className="w-full"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="container">
          <div className="prose prose-lg mx-auto max-w-3xl dark:prose-invert">
            {post.body?.en ? (
              <PortableText value={post.body.en} />
            ) : (
              <p className="text-muted-foreground">No content available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Author Bio */}
      {post.author && (
        <section className="border-t py-12">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-start gap-6 rounded-2xl border bg-muted/30 p-6">
                {post.author.image && (
                  <Image
                    src={urlFor(post.author.image).width(80).height(80).url()}
                    alt={post.author.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">
                    Written by
                  </p>
                  <p className="mb-2 text-xl font-semibold">{post.author.name}</p>
                  {post.author.bio?.en && (
                    <p className="text-muted-foreground">{post.author.bio.en}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
