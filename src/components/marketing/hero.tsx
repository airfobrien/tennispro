import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border bg-background px-4 py-1.5 text-sm">
            <span className="mr-2 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              New
            </span>
            AI-Powered Video Analysis Now Available
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Elevate Your{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Tennis Coaching
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            AI-powered biomechanical video analysis and comprehensive student
            management for professional tennis coaches. Track progress, analyze
            technique, and grow your coaching business.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#demo">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Social proof */}
          <p className="mt-8 text-sm text-muted-foreground">
            Trusted by 500+ tennis coaches worldwide
          </p>
        </div>

        {/* Hero image placeholder */}
        <div className="mt-16 rounded-xl border bg-muted/50 p-4 shadow-2xl">
          <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-muted to-muted/50">
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Play className="mx-auto mb-2 h-16 w-16" />
                <p>Product Demo Video</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
