import {
  Book,
  FileQuestion,
  Mail,
  MessageCircle,
  Play,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = {
  title: 'Help & Support',
  description: 'Get help with TennisPro',
};

const faqs = [
  {
    question: 'How do I upload a video for analysis?',
    answer:
      'Navigate to the Videos section from the sidebar, then click "Upload Video". Select your video file (MP4, MOV, or AVI format recommended), choose the student and stroke type, then click upload. The AI will automatically analyze the video within a few minutes.',
  },
  {
    question: 'What video formats are supported?',
    answer:
      'TennisPro supports MP4, MOV, AVI, and WebM formats. For best results, we recommend recording at 60fps with a side view of the player at 3-5 meters distance.',
  },
  {
    question: 'How do I add a new student?',
    answer:
      'Go to the Students section and click "Add Student". Fill in their basic information and send them an invitation. Once they accept, they\'ll appear in your student roster.',
  },
  {
    question: 'Can students upload their own videos?',
    answer:
      'Yes! Students can upload videos through their Student Portal. As their coach, you\'ll receive a notification and can review and analyze the video.',
  },
  {
    question: 'How does the progression tracking work?',
    answer:
      'TennisPro uses customizable progression paths based on skill levels. You can assign students to paths, track milestone completion, and validate achievements through video analysis or manual assessment.',
  },
  {
    question: 'How do I change my subscription plan?',
    answer:
      'Go to Account from your profile menu to view available plans and manage your subscription. Upgrades take effect immediately, while downgrades apply at the next billing cycle.',
  },
];

const resources = [
  {
    title: 'Getting Started Guide',
    description: 'Learn the basics of TennisPro in 5 minutes',
    icon: Play,
    href: '#',
  },
  {
    title: 'Video Analysis Tips',
    description: 'Best practices for recording and analyzing tennis videos',
    icon: Book,
    href: '#',
  },
  {
    title: 'API Documentation',
    description: 'For developers integrating with TennisPro',
    icon: FileQuestion,
    href: '#',
  },
];

export default function HelpPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers to common questions or get in touch with our team
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative max-w-xl">
            <Input
              placeholder="Search help articles..."
              className="pr-10"
            />
            <Button
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-4"
                >
                  <h3 className="font-medium flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground pl-7">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Contact & Resources */}
        <div className="space-y-6">
          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Can&apos;t find what you&apos;re looking for?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Email Support
              </Button>
              <Button className="w-full" variant="outline">
                <MessageCircle className="mr-2 h-4 w-4" />
                Live Chat
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Support hours: Mon-Fri, 9am-5pm EST
              </p>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>
                Learn more about TennisPro
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {resources.map((resource) => (
                <Link
                  key={resource.title}
                  href={resource.href}
                  className="flex items-start gap-3 rounded-lg p-2 -mx-2 transition-colors hover:bg-accent/15"
                >
                  <resource.icon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{resource.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {resource.description}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
