'use client';

import { ArrowLeft, Target } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const categories = [
  { value: 'skill_improvement', label: 'Skill Improvement' },
  { value: 'competition', label: 'Competition' },
  { value: 'rating', label: 'Rating Goal' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'custom', label: 'Custom' },
];

export default function NewGoalPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'skill_improvement',
    targetDate: '',
    coachVisible: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In production, this would call the API
    await new Promise((r) => setTimeout(r, 1000));

    router.push('/student/goals');
  };

  return (
    <div className="container max-w-2xl space-y-6 py-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/student/goals">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Goals
        </Link>
      </Button>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Target className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create New Goal</h1>
          <p className="text-muted-foreground">Set a personal goal to track your progress</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Goal Details</CardTitle>
          <CardDescription>Fill in the information about your goal</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Goal Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Improve serve speed to 90mph"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your goal in more detail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetDate">Target Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={formData.targetDate}
                  onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label>Share with Coach</Label>
                <p className="text-sm text-muted-foreground">
                  Your coach will be able to see this goal and add notes
                </p>
              </div>
              <Switch
                checked={formData.coachVisible}
                onCheckedChange={(checked) => setFormData({ ...formData, coachVisible: checked })}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" type="button" asChild>
                <Link href="/student/goals">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting || !formData.title}>
                {isSubmitting ? 'Creating...' : 'Create Goal'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
