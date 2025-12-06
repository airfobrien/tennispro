'use client';

import { BookOpen, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock blog posts
const mockPosts = [
  {
    id: '1',
    slug: 'mastering-the-kick-serve',
    title: 'Mastering the Kick Serve',
    excerpt: 'Learn the technique behind an effective kick serve that can give you an advantage in your matches.',
    publishedAt: '2024-01-15',
    tags: ['serve', 'technique', 'advanced'],
    readTime: '5 min read',
  },
  {
    id: '2',
    slug: 'mental-game-tips',
    title: '5 Mental Game Tips for Match Day',
    excerpt: 'Stay focused and confident during your matches with these proven mental strategies.',
    publishedAt: '2024-01-12',
    tags: ['mental game', 'competition'],
    readTime: '4 min read',
  },
  {
    id: '3',
    slug: 'forehand-power',
    title: 'Generating Power on Your Forehand',
    excerpt: 'Discover the key elements to hitting a powerful forehand while maintaining consistency.',
    publishedAt: '2024-01-08',
    tags: ['forehand', 'technique', 'power'],
    readTime: '6 min read',
  },
  {
    id: '4',
    slug: 'warm-up-routine',
    title: 'The Perfect Pre-Match Warm-Up',
    excerpt: 'A complete guide to warming up before your matches to perform at your best.',
    publishedAt: '2024-01-05',
    tags: ['fitness', 'preparation'],
    readTime: '3 min read',
  },
];

export default function StudentBlogPage() {
  const [tagFilter, setTagFilter] = useState<string>('all');

  const allTags = [...new Set(mockPosts.flatMap((p) => p.tags))];

  const filteredPosts = mockPosts.filter((post) => {
    if (tagFilter !== 'all' && !post.tags.includes(tagFilter)) return false;
    return true;
  });

  return (
    <div className="container space-y-6 py-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Coach Blog</h1>
        <p className="text-muted-foreground">
          Tips, techniques, and insights from your coach
        </p>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4 text-muted-foreground" />
        <Select value={tagFilter} onValueChange={setTagFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All topics</SelectItem>
            {allTags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Posts */}
      {filteredPosts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">No posts found</h3>
            <p className="text-sm text-muted-foreground">
              Try selecting a different topic
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/student/blog/${post.slug}`}>
              <Card className="h-full transition-colors hover:border-primary/50">
                <CardHeader>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.publishedAt}
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
