import {
  Video,
  Users,
  TrendingUp,
  Brain,
  Calendar,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Smartphone,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { CTA } from '@/components/marketing';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Discover the powerful features of TennisProPlus - AI video analysis, student management, progress tracking, and more.',
};

const mainFeatures = [
  {
    icon: Video,
    title: 'AI Video Analysis',
    description:
      'Upload videos and get instant biomechanical analysis using MediaPipe pose estimation. Track joint angles, identify stroke phases, and compare technique over time.',
    benefits: [
      'Automatic pose detection with 33 body landmarks',
      'Frame-by-frame analysis with slow motion',
      'Hip-shoulder separation measurement',
      'Stroke phase identification',
      'Side-by-side comparison views',
    ],
  },
  {
    icon: Users,
    title: 'Student Management',
    description:
      'Keep all your student information organized in one place. Track profiles, lesson history, progress notes, and communication.',
    benefits: [
      'Comprehensive student profiles',
      'Lesson history and notes',
      'Parent/guardian contacts',
      'Custom tags and categories',
      'Bulk import from spreadsheets',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description:
      'Visual progression paths with milestones. See exactly where each student stands and what they need to work on next.',
    benefits: [
      'Customizable skill frameworks',
      'Visual progress dashboards',
      'Milestone achievements',
      'Historical progress views',
      'Exportable progress reports',
    ],
  },
  {
    icon: Brain,
    title: 'AI Coaching Insights',
    description:
      'Get intelligent recommendations based on video analysis. Compare student technique against professional benchmarks.',
    benefits: [
      'Automated technique suggestions',
      'Professional comparison overlays',
      'Personalized drill recommendations',
      'Trend analysis over time',
      'Focus area identification',
    ],
  },
  {
    icon: Calendar,
    title: 'Lesson Scheduling',
    description:
      'Integrated calendar for booking and managing lessons. Students can book available slots directly.',
    benefits: [
      'Online booking portal',
      'Automatic reminders',
      'Calendar sync (Google, iCal)',
      'Recurring lesson support',
      'Waitlist management',
    ],
  },
  {
    icon: BarChart3,
    title: 'Business Analytics',
    description:
      'Track revenue, student retention, and coaching metrics. Make data-driven decisions to grow your practice.',
    benefits: [
      'Revenue tracking',
      'Student retention metrics',
      'Lesson completion rates',
      'Growth trends',
      'Custom report builder',
    ],
  },
];

const additionalFeatures = [
  {
    icon: Smartphone,
    title: 'Mobile Ready',
    description: 'Access your dashboard from any device with our responsive PWA.',
  },
  {
    icon: Globe,
    title: 'Multi-Language',
    description: 'Available in English, Spanish, French, and Portuguese.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Enterprise-grade security with encrypted data storage.',
  },
  {
    icon: Zap,
    title: 'Fast & Reliable',
    description: 'Built on AWS for 99.9% uptime and global performance.',
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Powerful Features for Modern Tennis Coaches
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Everything you need to analyze technique, manage students, and grow
              your coaching business in one integrated platform.
            </p>
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="container">
          <div className="space-y-24">
            {mainFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`flex flex-col gap-12 lg:flex-row lg:items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h2 className="mb-4 text-3xl font-bold">{feature.title}</h2>
                  <p className="mb-6 text-lg text-muted-foreground">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image placeholder */}
                <div className="flex-1">
                  <div className="aspect-video rounded-xl border bg-muted/50">
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      <feature.icon className="h-16 w-16" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">And Much More</h2>
            <p className="text-lg text-muted-foreground">
              Built with modern technology for the best coaching experience
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {additionalFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border bg-background p-6 text-center"
              >
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
