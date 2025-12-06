'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

export default function NewStudentPage() {
  const router = useRouter();
  const [sendInvite, setSendInvite] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push('/dashboard/students');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/students">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Student</h1>
          <p className="text-muted-foreground">
            Enter student details and send an invitation
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the student&apos;s personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input id="dateOfBirth" type="date" />
              </div>
            </CardContent>
          </Card>

          {/* Tennis Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Tennis Profile</CardTitle>
              <CardDescription>
                Configure the student&apos;s tennis details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skillLevel">Skill Level *</Label>
                <Select defaultValue="beginner">
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
                <Select>
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
                <Select defaultValue="right">
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
                <Select defaultValue="two-handed">
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
                  placeholder="Student's goals, areas to focus on, etc."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Invitation Settings */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Invitation Settings</CardTitle>
              <CardDescription>
                Configure how the student will be invited to the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Send Invitation Email</Label>
                  <p className="text-sm text-muted-foreground">
                    The student will receive an email to create their account
                  </p>
                </div>
                <Switch checked={sendInvite} onCheckedChange={setSendInvite} />
              </div>

              {sendInvite && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="message">Personal Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Add a personal message to the invitation email..."
                      rows={3}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link href="/dashboard/students">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding Student...' : sendInvite ? 'Add & Send Invite' : 'Add Student'}
          </Button>
        </div>
      </form>
    </div>
  );
}
