import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { client, allPostsQuery, urlFor } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Tips, insights, and best practices for tennis coaches. Learn how to improve your coaching with AI-powered analysis.',
};

interface Post {
  _id: string;
  title: { en: string };
  slug: { current: string };
  excerpt?: { en: string };
  mainImage?: {
    asset: { _ref: string };
    alt?: string;
  };
  publishedAt: string;
  author?: {
    name: string;
    image?: { asset: { _ref: string } };
  };
  categories?: Array<{
    _id: string;
    title: { en: string };
    slug: { current: string };
    color?: string;
  }>;
}

async function getPosts(): Promise<Post[]> {
  try {
    return await client.fetch(allPostsQuery);
  } catch {
    return [];
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Tennis Coaching Insights
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Tips, techniques, and best practices for modern tennis coaches
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container">
          {posts.length === 0 ? (
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-lg text-muted-foreground">
                No blog posts yet. Check back soon for tennis coaching insights!
              </p>
            </div>
          ) : (
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="group overflow-hidden rounded-2xl border bg-background transition-shadow hover:shadow-lg"
                >
                  <Link href={`/blog/${post.slug.current}`}>
                    {/* Image */}
                    <div className="aspect-video overflow-hidden bg-muted">
                      {post.mainImage ? (
                        <Image
                          src={urlFor(post.mainImage).width(600).height(340).url()}
                          alt={post.mainImage.alt ?? post.title.en}
                          width={600}
                          height={340}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                          <span>No image</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Categories */}
                      {post.categories && post.categories.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                          {post.categories.map((category) => (
                            <span
                              key={category._id}
                              className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                            >
                              {category.title.en}
                            </span>
                          ))}
                        </div>
                      )}

                      <h2 className="mb-2 text-xl font-semibold group-hover:text-primary">
                        {post.title.en}
                      </h2>

                      {post.excerpt?.en && (
                        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                          {post.excerpt.en}
                        </p>
                      )}

                      <div className="flex items-center gap-3">
                        {post.author?.image && (
                          <Image
                            src={urlFor(post.author.image).width(32).height(32).url()}
                            alt={post.author.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        )}
                        <div className="text-sm">
                          {post.author && (
                            <p className="font-medium">{post.author.name}</p>
                          )}
                          <p className="text-muted-foreground">
                            {formatDate(post.publishedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
