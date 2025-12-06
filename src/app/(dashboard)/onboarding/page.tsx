'use client';

import { Check, ChevronRight, Upload, Users, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, title: 'Profile', description: 'Set up your coach profile' },
  { id: 2, title: 'Preferences', description: 'Configure your preferences' },
  { id: 3, title: 'First Student', description: 'Add your first student' },
  { id: 4, title: 'Complete', description: 'You\'re all set!' },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/dashboard');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container max-w-3xl py-10">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 font-medium',
                  currentStep > step.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : currentStep === step.id
                      ? 'border-primary text-primary'
                      : 'border-muted text-muted-foreground'
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-2 h-1 w-16 rounded lg:w-24',
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold">{steps[currentStep - 1]?.title}</h2>
          <p className="text-muted-foreground">
            {steps[currentStep - 1]?.description}
          </p>
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="pt-6">
          {currentStep === 1 && <ProfileStep />}
          {currentStep === 2 && <PreferencesStep />}
          {currentStep === 3 && <FirstStudentStep />}
          {currentStep === 4 && <CompleteStep />}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          Back
        </Button>
        <Button onClick={nextStep}>
          {currentStep === steps.length ? (
            'Go to Dashboard'
          ) : (
            <>
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function ProfileStep() {
  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={undefined} />
          <AvatarFallback className="text-2xl">TC</AvatarFallback>
        </Avatar>
        <Button variant="outline" size="sm">
          <Upload className="mr-2 h-4 w-4" />
          Upload Photo
        </Button>
      </div>

      {/* Form */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" placeholder="John" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" placeholder="Doe" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell students about your coaching experience..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="certifications">Certifications</Label>
        <Input
          id="certifications"
          placeholder="e.g., USPTA Professional, PTR Certified"
        />
      </div>
    </div>
  );
}

function PreferencesStep() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="timezone">Timezone</Label>
        <select
          id="timezone"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
        >
          <option value="America/New_York">Eastern Time (ET)</option>
          <option value="America/Chicago">Central Time (CT)</option>
          <option value="America/Denver">Mountain Time (MT)</option>
          <option value="America/Los_Angeles">Pacific Time (PT)</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Default Lesson Duration</Label>
        <div className="flex gap-2">
          {['30 min', '45 min', '1 hour', '90 min'].map((duration) => (
            <Button
              key={duration}
              variant="outline"
              className="flex-1"
            >
              {duration}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Focus Areas</Label>
        <p className="text-sm text-muted-foreground">
          Select the areas you specialize in
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {[
            'Serve',
            'Forehand',
            'Backhand',
            'Volley',
            'Footwork',
            'Strategy',
            'Mental Game',
            'Fitness',
            'Junior Development',
          ].map((area) => (
            <Button key={area} variant="outline" className="justify-start">
              {area}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FirstStudentStep() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">
          Add your first student to get started, or skip this step for now.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="studentFirstName">First name</Label>
          <Input id="studentFirstName" placeholder="Sarah" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentLastName">Last name</Label>
          <Input id="studentLastName" placeholder="Johnson" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="studentEmail">Email</Label>
        <Input
          id="studentEmail"
          type="email"
          placeholder="sarah@example.com"
        />
        <p className="text-sm text-muted-foreground">
          We&apos;ll send them an invitation to join your coaching platform
        </p>
      </div>

      <div className="space-y-2">
        <Label>Skill Level</Label>
        <div className="flex gap-2">
          {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
            <Button key={level} variant="outline" className="flex-1">
              {level}
            </Button>
          ))}
        </div>
      </div>

      <Button variant="ghost" className="w-full">
        Skip for now
      </Button>
    </div>
  );
}

function CompleteStep() {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <Check className="h-10 w-10 text-primary" />
      </div>

      <div>
        <h3 className="text-2xl font-semibold">You&apos;re all set!</h3>
        <p className="mt-2 text-muted-foreground">
          Your coach profile is ready. Here are some things you can do next:
        </p>
      </div>

      <div className="grid gap-4 text-left sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <Users className="h-8 w-8 text-primary" />
            <CardTitle className="text-lg">Add Students</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Invite students to join your coaching platform
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <Video className="h-8 w-8 text-primary" />
            <CardTitle className="text-lg">Upload Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Start analyzing technique with AI-powered insights
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
