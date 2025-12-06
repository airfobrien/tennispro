import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about TennisProPlus and our mission to revolutionize tennis coaching with AI-powered technology.',
};

const stats = [
  { value: '500+', label: 'Tennis Coaches' },
  { value: '10,000+', label: 'Students Trained' },
  { value: '50,000+', label: 'Videos Analyzed' },
  { value: '15+', label: 'Countries' },
];

const values = [
  {
    title: 'Coach-First Design',
    description:
      'Every feature is built with input from real tennis coaches. We understand the unique challenges you face.',
  },
  {
    title: 'Data-Driven Insights',
    description:
      'We believe in the power of objective analysis. Our AI provides measurable insights, not guesswork.',
  },
  {
    title: 'Continuous Innovation',
    description:
      'Tennis coaching is evolving, and so are we. We constantly improve our technology to stay ahead.',
  },
  {
    title: 'Privacy & Security',
    description:
      'Your data and your students\' data are protected with enterprise-grade security measures.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Revolutionizing Tennis Coaching
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              We&apos;re on a mission to give every tennis coach access to the
              same advanced analysis tools used by top professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold md:text-4xl">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                TennisProPlus was born from a simple observation: professional
                tennis players have access to incredible biomechanical analysis
                technology, but independent coaches and their students often
                rely on intuition alone.
              </p>
              <p>
                We set out to change that. By combining advances in computer
                vision, particularly MediaPipe pose estimation, with
                tennis-specific biomechanical knowledge, we created a platform
                that makes professional-level analysis accessible to every coach.
              </p>
              <p>
                Today, TennisProPlus serves hundreds of coaches worldwide,
                helping them deliver better results for their students through
                objective, data-driven insights. But we&apos;re just getting
                started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Values</h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value.title} className="rounded-lg border bg-background p-6">
                  <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to Transform Your Coaching?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join hundreds of coaches already using TennisProPlus to deliver
              better results.
            </p>
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
