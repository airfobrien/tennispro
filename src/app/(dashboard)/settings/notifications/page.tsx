'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  email: boolean;
  push: boolean;
}

const defaultSettings: NotificationSetting[] = [
  {
    id: 'new-video',
    label: 'New Video Uploads',
    description: 'When a student uploads a new video',
    email: true,
    push: true,
  },
  {
    id: 'analysis-complete',
    label: 'Analysis Complete',
    description: 'When video analysis is ready',
    email: true,
    push: true,
  },
  {
    id: 'lesson-reminder',
    label: 'Lesson Reminders',
    description: 'Reminder before scheduled lessons',
    email: true,
    push: true,
  },
  {
    id: 'student-progress',
    label: 'Student Progress',
    description: 'Weekly progress updates for your students',
    email: true,
    push: false,
  },
  {
    id: 'new-message',
    label: 'New Messages',
    description: 'When you receive a message from a student',
    email: false,
    push: true,
  },
  {
    id: 'billing',
    label: 'Billing Updates',
    description: 'Payment confirmations and billing alerts',
    email: true,
    push: false,
  },
];

export default function NotificationsSettingsPage() {
  const [settings, setSettings] = useState<NotificationSetting[]>(defaultSettings);

  const toggleSetting = (id: string, type: 'email' | 'push') => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id
          ? { ...setting, [type]: !setting[type] }
          : setting
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose how you want to be notified about activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-end gap-8">
              <span className="w-16 text-center text-sm font-medium">Email</span>
              <span className="w-16 text-center text-sm font-medium">Push</span>
            </div>

            <Separator />

            {/* Settings */}
            {settings.map((setting, index) => (
              <div key={setting.id}>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">{setting.label}</Label>
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="flex w-16 justify-center">
                      <Switch
                        checked={setting.email}
                        onCheckedChange={() => toggleSetting(setting.id, 'email')}
                      />
                    </div>
                    <div className="flex w-16 justify-center">
                      <Switch
                        checked={setting.push}
                        onCheckedChange={() => toggleSetting(setting.id, 'push')}
                      />
                    </div>
                  </div>
                </div>
                {index < settings.length - 1 && <Separator className="mt-6" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Digest */}
      <Card>
        <CardHeader>
          <CardTitle>Email Digest</CardTitle>
          <CardDescription>
            Get a summary of activity instead of individual emails
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Daily Digest</Label>
              <p className="text-sm text-muted-foreground">
                Receive a daily summary of all activity at 9:00 AM
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Weekly Report</Label>
              <p className="text-sm text-muted-foreground">
                Get a weekly analytics report every Monday
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button>Save preferences</Button>
      </div>
    </div>
  );
}
