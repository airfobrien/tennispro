import { MapPin, Star, Clock, Award, CheckCircle2, Calendar, MessageCircle } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface CoachPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Mock coach data - in production, this would come from Sanity CMS
const mockCoach = {
  slug: 'john-smith',
  name: 'John Smith',
  title: 'USPTA Elite Professional',
  location: 'San Francisco, CA',
  rating: 4.9,
  reviewCount: 127,
  yearsExperience: 15,
  studentsCoached: 500,
  bio: `John Smith is an elite tennis professional with over 15 years of experience coaching players of all levels. A former ATP tour player, John brings world-class expertise to every lesson.

His teaching philosophy focuses on building a strong technical foundation while developing tactical awareness and mental toughness. John has helped hundreds of students achieve their tennis goals, from beginners learning their first strokes to competitive juniors ranking nationally.`,
  specialties: [
    'Junior Development',
    'Adult Beginners',
    'Competitive Training',
    'Stroke Mechanics',
    'Mental Game',
  ],
  certifications: [
    'USPTA Elite Professional',
    'PTR Professional',
    'USTA High Performance Coach',
  ],
  services: [
    { name: 'Private Lesson', duration: '1 hour', price: 120, description: 'One-on-one coaching tailored to your needs' },
    { name: 'Semi-Private', duration: '1 hour', price: 80, description: '2 students per session' },
    { name: 'Group Clinic', duration: '90 min', price: 45, description: 'Small group instruction (4-6 players)' },
    { name: 'Video Analysis', duration: '45 min', price: 75, description: 'Detailed stroke analysis with AI insights' },
  ],
  testimonials: [
    {
      author: 'Sarah M.',
      role: 'Junior Player',
      content: 'Coach John transformed my game completely. His attention to detail and patient teaching style helped me improve my ranking by 200 spots in just 6 months.',
      rating: 5,
    },
    {
      author: 'Michael R.',
      role: 'Adult Student',
      content: 'As an adult picking up tennis, I was nervous about learning a new sport. John made the process enjoyable and I now play regularly with friends.',
      rating: 5,
    },
    {
      author: 'Jennifer L.',
      role: 'Parent',
      content: 'John has been coaching my daughter for 2 years. His professionalism and dedication to her development has been outstanding.',
      rating: 5,
    },
  ],
  gallery: [
    { url: '/api/placeholder/400/300', alt: 'Coaching session' },
    { url: '/api/placeholder/400/300', alt: 'Group clinic' },
    { url: '/api/placeholder/400/300', alt: 'Junior lesson' },
    { url: '/api/placeholder/400/300', alt: 'Court facilities' },
  ],
  availability: 'Mon-Sat, 7am-7pm',
};

export async function generateMetadata({ params }: CoachPageProps): Promise<Metadata> {
  const { slug } = await params;
  // In production, fetch coach data from Sanity by slug
  const coach = slug === mockCoach.slug ? mockCoach : null;

  if (!coach) {
    return { title: 'Coach Not Found' };
  }

  return {
    title: `${coach.name} - Tennis Coach`,
    description: coach.bio.substring(0, 160),
  };
}

export default async function CoachProfilePage({ params }: CoachPageProps) {
  const { slug } = await params;

  // In production, fetch from Sanity CMS
  const coach = mockCoach;

  if (slug !== coach.slug) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-muted/50 py-12">
        <div className="container">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            {/* Profile Image */}
            <div className="shrink-0">
              <div className="relative h-48 w-48 overflow-hidden rounded-xl bg-muted">
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-muted-foreground">
                  {coach.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold">{coach.name}</h1>
                <p className="text-lg text-muted-foreground">{coach.title}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {coach.location}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {coach.rating} ({coach.reviewCount} reviews)
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {coach.availability}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {coach.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3">
                <Button size="lg" asChild>
                  <Link href={`/coach/${slug}/book`}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Book a Lesson
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={`/coach/${slug}/contact`}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Send Message
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 md:w-48">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">{coach.yearsExperience}</p>
                  <p className="text-xs text-muted-foreground">Years Experience</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">{coach.studentsCoached}+</p>
                  <p className="text-xs text-muted-foreground">Students Coached</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Bio & Gallery */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section>
              <h2 className="mb-4 text-2xl font-bold">About</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {coach.bio.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="mb-4 text-2xl font-bold">Certifications</h2>
              <div className="flex flex-wrap gap-3">
                {coach.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2 rounded-lg border p-3">
                    <Award className="h-5 w-5 text-primary" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section>
              <h2 className="mb-4 text-2xl font-bold">Gallery</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {coach.gallery.map((image, i) => (
                  <div key={i} className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      {image.alt}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section>
              <h2 className="mb-4 text-2xl font-bold">Student Reviews</h2>
              <div className="space-y-4">
                {coach.testimonials.map((testimonial, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="mb-3 flex items-center gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="mb-4 text-muted-foreground">&quot;{testimonial.content}&quot;</p>
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Services */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Services & Pricing</CardTitle>
                <CardDescription>Choose the lesson type that fits your needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {coach.services.map((service, i) => (
                  <div key={i}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                        <p className="text-xs text-muted-foreground">{service.duration}</p>
                      </div>
                      <p className="text-lg font-bold">${service.price}</p>
                    </div>
                    {i < coach.services.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
                <Button className="w-full" size="lg" asChild>
                  <Link href={`/coach/${slug}/book`}>Book Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Student Signup CTA */}
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Ready to Improve Your Game?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Access video analysis tools
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Track your progress over time
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Get personalized feedback
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/coach/${slug}/signup`}>Sign Up as Student</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
