'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';


// Mock data - replace with real data fetching
const student = {
  id: '1',
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@email.com',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '2005-03-15',
  skillLevel: 'intermediate',
  playStyle: 'aggressive-baseliner',
  handed: 'right',
  backhand: 'two-handed',
  goals: 'Improve serve consistency and develop net game. Preparing for high school varsity tryouts.',
};

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push(`/dashboard/students/${params.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/dashboard/students/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Student</h1>
          <p className="text-muted-foreground">
            Update {student.firstName}&apos;s profile
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Profile Photo */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
              <CardDescription>Update the student&apos;s profile picture</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={undefined} />
                <AvatarFallback className="text-2xl">
                  {student.firstName[0]}{student.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" type="button">Upload Photo</Button>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" defaultValue={student.firstName} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" defaultValue={student.lastName} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={student.email}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue={student.phone} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input id="dateOfBirth" type="date" defaultValue={student.dateOfBirth} />
              </div>
            </CardContent>
          </Card>

          {/* Tennis Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Tennis Profile</CardTitle>
              <CardDescription>
                Tennis details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skillLevel">Skill Level *</Label>
                <Select defaultValue={student.skillLevel}>
                  <SelectTrigger id="skillLevel">
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="playStyle">Playing Style</Label>
                <Select defaultValue={student.playStyle}>
                  <SelectTrigger id="playStyle">
                    <SelectValue placeholder="Select playing style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aggressive-baseliner">Aggressive Baseliner</SelectItem>
                    <SelectItem value="counterpuncher">Counterpuncher</SelectItem>
                    <SelectItem value="serve-volleyer">Serve and Volleyer</SelectItem>
                    <SelectItem value="all-court">All-Court Player</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="handed">Dominant Hand</Label>
                <Select defaultValue={student.handed}>
                  <SelectTrigger id="handed">
                    <SelectValue placeholder="Select dominant hand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="right">Right-handed</SelectItem>
                    <SelectItem value="left">Left-handed</SelectItem>
                    <SelectItem value="ambidextrous">Ambidextrous</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backhand">Backhand Type</Label>
                <Select defaultValue={student.backhand}>
                  <SelectTrigger id="backhand">
                    <SelectValue placeholder="Select backhand type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-handed">One-handed</SelectItem>
                    <SelectItem value="two-handed">Two-handed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">Goals & Notes</Label>
                <Textarea
                  id="goals"
                  defaultValue={student.goals}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link href={`/dashboard/students/${params.id}`}>Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
