import { Mail, MapPin, Phone } from 'lucide-react';
import type { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the TennisProPlus team. We\'re here to help with questions about our platform.',
};

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'support@tennisproplus.com',
    href: 'mailto:support@tennisproplus.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'San Francisco, CA',
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Have questions about TennisProPlus? We&apos;re here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-2xl border bg-background p-8">
              <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>
              <form className="space-y-6">
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
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
              <div className="mb-8 space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-primary"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border bg-muted/30 p-6">
                <h3 className="mb-2 font-semibold">Office Hours</h3>
                <p className="text-sm text-muted-foreground">
                  Monday - Friday: 9:00 AM - 6:00 PM (PST)
                </p>
                <p className="text-sm text-muted-foreground">
                  Saturday - Sunday: Closed
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  We typically respond to inquiries within 24 hours during
                  business days.
                </p>
              </div>

              <div className="mt-8 rounded-2xl border bg-muted/30 p-6">
                <h3 className="mb-2 font-semibold">Enterprise Inquiries</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Looking for custom solutions for your tennis academy or
                  organization? Our enterprise team can help.
                </p>
                <Button variant="outline" asChild>
                  <a href="mailto:enterprise@tennisproplus.com">
                    Contact Enterprise Sales
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
