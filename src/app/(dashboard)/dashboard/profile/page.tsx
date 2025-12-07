'use client';

import { Camera, Mail, Phone, MapPin, Award } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/auth/hooks';

export default function ProfilePage() {
  const { user } = useAuth();

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'TC';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and coaching profile
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Picture */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
              This will be displayed on your public coaching profile
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={user?.image ?? undefined} />
              <AvatarFallback className="text-3xl">{userInitials}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <Camera className="mr-2 h-4 w-4" />
              Change Photo
            </Button>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  defaultValue={user?.name?.split(' ')[0] ?? ''}
                  placeholder="Enter first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  defaultValue={user?.name?.split(' ')[1] ?? ''}
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  className="pl-9"
                  defaultValue={user?.email ?? ''}
                  placeholder="Enter email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  className="pl-9"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="location"
                  className="pl-9"
                  placeholder="City, State"
                />
              </div>
            </div>
            <div className="pt-4">
              <Button disabled>Save Changes</Button>
              <p className="mt-2 text-xs text-muted-foreground">
                Profile editing will be enabled in a future update
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Coaching Credentials */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Coaching Credentials
            </CardTitle>
            <CardDescription>
              Add your certifications and qualifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="certification">Primary Certification</Label>
                <Input
                  id="certification"
                  placeholder="e.g., USPTA Professional"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  placeholder="e.g., 10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell students about your coaching philosophy and experience..."
                rows={4}
              />
            </div>
            <Separator />
            <div className="pt-2">
              <Button disabled>Save Credentials</Button>
              <p className="mt-2 text-xs text-muted-foreground">
                Credential management will be enabled in a future update
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
