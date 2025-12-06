import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Webhook endpoint for Sanity content updates
 * Configure in Sanity: Settings > API > Webhooks
 *
 * URL: https://your-domain.com/api/revalidate
 * Secret: (set SANITY_WEBHOOK_SECRET in env)
 * Trigger on: Create, Update, Delete
 */

interface SanityWebhookPayload {
  _type: string;
  _id: string;
  slug?: { current: string };
}

const REVALIDATE_PATHS: Record<string, string[]> = {
  page: ['/'],
  post: ['/blog'],
  category: ['/blog'],
  faq: ['/help'],
  testimonial: ['/'],
  pricingPlan: ['/pricing'],
  coachProfile: ['/coaches'],
  coachBlogPost: ['/coaches'],
  progressionTemplate: [],
  siteSettings: ['/'],
};

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const secret = request.headers.get('x-sanity-webhook-secret');
    const expectedSecret = process.env.SANITY_WEBHOOK_SECRET;

    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    const body = (await request.json()) as SanityWebhookPayload;
    const { _type, slug } = body;

    // Get paths to revalidate for this content type
    const paths = REVALIDATE_PATHS[_type] ?? [];

    // Revalidate base paths
    for (const path of paths) {
      revalidatePath(path);
    }

    // Revalidate specific slug path if available
    if (slug?.current) {
      switch (_type) {
        case 'page':
          revalidatePath(`/${slug.current}`);
          break;
        case 'post':
          revalidatePath(`/blog/${slug.current}`);
          break;
        case 'coachProfile':
          revalidatePath(`/coaches/${slug.current}`);
          break;
        case 'coachBlogPost':
          revalidatePath(`/coaches/${slug.current}`);
          break;
        case 'category':
          revalidatePath(`/blog/category/${slug.current}`);
          break;
      }
    }

    return NextResponse.json({
      revalidated: true,
      type: _type,
      paths: [...paths, slug?.current ? `/${slug.current}` : null].filter(Boolean),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
