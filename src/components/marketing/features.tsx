import {
  Video,
  Users,
  TrendingUp,
  Brain,
  Calendar,
  BarChart3,
} from 'lucide-react';

const features = [
  {
    icon: Video,
    title: 'AI Video Analysis',
    description:
      'Advanced pose estimation using MediaPipe technology. Automatically detect stroke phases, measure angles, and identify technique improvements.',
  },
  {
    icon: Users,
    title: 'Student Management',
    description:
      'Comprehensive profiles, progress tracking, and communication tools. Manage all your students from a single dashboard.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description:
      'Visual progression paths with milestones. Track skill development over time with detailed analytics and reports.',
  },
  {
    icon: Brain,
    title: 'AI Coaching Insights',
    description:
      'Get intelligent recommendations based on video analysis. Compare technique against professional benchmarks.',
  },
  {
    icon: Calendar,
    title: 'Lesson Scheduling',
    description:
      'Integrated calendar for booking and managing lessons. Sync with your favorite calendar apps.',
  },
  {
    icon: BarChart3,
    title: 'Business Analytics',
    description:
      'Track revenue, student retention, and coaching metrics. Make data-driven decisions to grow your practice.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Excel
          </h2>
          <p className="text-lg text-muted-foreground">
            A complete platform designed specifically for tennis coaches. From
            video analysis to business management, we&apos;ve got you covered.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border bg-background p-6 transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
