'use client';

import { Award, ExternalLink, Mail, MessageSquare, Phone } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock coach data
const mockCoach = {
  name: 'John Smith',
  title: 'USPTA Elite Professional',
  bio: 'With over 15 years of experience coaching players of all levels, I specialize in developing junior players for competitive tennis. My teaching philosophy focuses on building a strong technical foundation while nurturing mental toughness.',
  image: null,
  email: 'john@tennisproplus.com',
  phone: '(555) 123-4567',
  publicProfileUrl: '/coach/john-smith',
  certifications: [
    'USPTA Elite Professional',
    'PTR Professional',
    'USTA High Performance Coach',
  ],
  specialties: [
    'Junior Development',
    'Stroke Mechanics',
    'Match Strategy',
    'Mental Game',
  ],
};

export default function StudentCoachPage() {
  const initials = mockCoach.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="container space-y-6 py-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Coach</h1>
        <p className="text-muted-foreground">Your coaching team information</p>
      </div>

      {/* Coach Profile */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src={mockCoach.image ?? undefined} />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-bold">{mockCoach.name}</h2>
              <p className="text-muted-foreground">{mockCoach.title}</p>
              <p className="mt-4 text-sm">{mockCoach.bio}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/student/messages">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={mockCoach.publicProfileUrl} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Public Profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Contact Information</CardTitle>
            <CardDescription>Ways to reach your coach</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{mockCoach.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Phone className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{mockCoach.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Certifications</CardTitle>
            <CardDescription>Professional credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockCoach.certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-3">
                <Award className="h-5 w-5 text-primary" />
                <span>{cert}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Specialties */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Coaching Specialties</CardTitle>
          <CardDescription>Areas of expertise</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {mockCoach.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-sm">
                {specialty}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
