'use client';

import { ArrowLeft, Copy, Eye, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Template {
  id: string;
  name: string;
  description: string;
  category: 'recreational' | 'competitive_junior' | 'collegiate_track' | 'professional_track' | 'senior';
  levels: number;
  skills: number;
  featured: boolean;
  author: string;
  uses: number;
}

const templates: Template[] = [
  {
    id: 't1',
    name: 'Beginner Foundations',
    description: 'Perfect for adult beginners learning tennis fundamentals. Covers grip, stance, basic strokes, and court awareness.',
    category: 'recreational',
    levels: 4,
    skills: 12,
    featured: true,
    author: 'TennisProPlus',
    uses: 245,
  },
  {
    id: 't2',
    name: 'Junior Champion Path',
    description: 'Comprehensive development pathway for competitive juniors ages 8-14. Focuses on technique, match play, and mental game.',
    category: 'competitive_junior',
    levels: 6,
    skills: 24,
    featured: true,
    author: 'TennisProPlus',
    uses: 189,
  },
  {
    id: 't3',
    name: 'High School Varsity Prep',
    description: 'Prepare players for high school varsity tennis with advanced stroke mechanics, strategy, and competitive readiness.',
    category: 'collegiate_track',
    levels: 5,
    skills: 18,
    featured: false,
    author: 'TennisProPlus',
    uses: 127,
  },
  {
    id: 't4',
    name: 'Serve Mastery',
    description: 'Specialized path focusing on serve development from beginner to advanced. Includes flat, slice, and kick serves.',
    category: 'competitive_junior',
    levels: 4,
    skills: 8,
    featured: true,
    author: 'TennisProPlus',
    uses: 312,
  },
  {
    id: 't5',
    name: 'Senior Recreational',
    description: 'Tailored for senior players focusing on enjoyment, fitness, and safe technique progression.',
    category: 'senior',
    levels: 3,
    skills: 9,
    featured: false,
    author: 'TennisProPlus',
    uses: 78,
  },
  {
    id: 't6',
    name: 'College Prep Intensive',
    description: 'Advanced pathway for players targeting collegiate tennis programs. Emphasizes high-level competition skills.',
    category: 'collegiate_track',
    levels: 6,
    skills: 20,
    featured: false,
    author: 'TennisProPlus',
    uses: 94,
  },
];

const categoryColors: Record<Template['category'], string> = {
  recreational: 'bg-green-500/10 text-green-500',
  competitive_junior: 'bg-blue-500/10 text-blue-500',
  collegiate_track: 'bg-purple-500/10 text-purple-500',
  professional_track: 'bg-orange-500/10 text-orange-500',
  senior: 'bg-gray-500/10 text-gray-500',
};

const categoryLabels: Record<Template['category'], string> = {
  recreational: 'Recreational',
  competitive_junior: 'Competitive Junior',
  collegiate_track: 'Collegiate Track',
  professional_track: 'Professional Track',
  senior: 'Senior',
};

export default function TemplatesPage() {
  const router = useRouter();

  const handleSelectTemplate = (templateId: string) => {
    router.push(`/dashboard/progress/new?template=${templateId}`);
  };

  const featuredTemplates = templates.filter((t) => t.featured);
  const otherTemplates = templates.filter((t) => !t.featured);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/progress">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Path Templates</h1>
          <p className="text-muted-foreground">
            Start with a pre-built template and customize it for your students
          </p>
        </div>
      </div>

      {/* Featured Templates */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-semibold">Featured Templates</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTemplates.map((template) => (
            <Card key={template.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge className={cn('text-xs', categoryColors[template.category])}>
                      {categoryLabels[template.category]}
                    </Badge>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <Star className="mr-1 h-3 w-3 text-yellow-500" />
                    Featured
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {template.description}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{template.levels} levels</span>
                  <span>{template.skills} skills</span>
                  <span>{template.uses} uses</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <Link href={`/dashboard/progress/templates/${template.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Use
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Templates */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">All Templates</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherTemplates.map((template) => (
            <Card key={template.id} className="flex flex-col">
              <CardHeader>
                <div className="space-y-1">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge className={cn('text-xs', categoryColors[template.category])}>
                    {categoryLabels[template.category]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {template.description}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{template.levels} levels</span>
                  <span>{template.skills} skills</span>
                  <span>{template.uses} uses</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <Link href={`/dashboard/progress/templates/${template.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Use
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
