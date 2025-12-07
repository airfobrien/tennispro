import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-primary-foreground md:px-12 md:py-24">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Transform Your Coaching?
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Join thousands of tennis coaches using TennisPro to deliver
              better results for their students. Start your free trial today.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="/auth/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/20 bg-transparent text-white hover:bg-white/10 sm:w-auto"
                asChild
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm opacity-75">
              No credit card required. 14-day free trial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
