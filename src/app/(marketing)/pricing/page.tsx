import { Check } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for TennisPro. Choose the plan that fits your coaching practice.',
};

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for independent coaches just getting started',
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      'Up to 15 active students',
      '50 video analyses/month',
      'Basic progress tracking',
      'Student portal access',
      'Email support',
      'Mobile app access',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Professional',
    description: 'For established coaches growing their practice',
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      'Up to 50 active students',
      '200 video analyses/month',
      'Advanced progress frameworks',
      'AI coaching insights',
      'Student messaging',
      'Custom branding',
      'Priority support',
      'API access',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    description: 'For academies and coaching organizations',
    monthlyPrice: 199,
    yearlyPrice: 159,
    features: [
      'Unlimited students',
      'Unlimited video analyses',
      'Multi-coach support',
      'White-label options',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
      'On-premise deployment option',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const faqs = [
  {
    question: 'Can I switch plans later?',
    answer:
      'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, American Express) and can arrange invoicing for Enterprise plans.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes! All plans come with a 14-day free trial. No credit card required to start.',
  },
  {
    question: 'What counts as an "active student"?',
    answer:
      'An active student is anyone who has had a lesson or video analyzed in the last 30 days. Inactive students don\'t count toward your limit.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Absolutely. You can cancel your subscription at any time with no cancellation fees. Your data remains accessible for 30 days after cancellation.',
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer:
      'Yes! You save 20% when you choose annual billing compared to monthly payments.',
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Choose the plan that fits your coaching practice. All plans include
              a 14-day free trial.
            </p>

            {/* Billing toggle placeholder */}
            <div className="inline-flex items-center gap-4 rounded-full border bg-background p-1">
              <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Monthly
              </button>
              <button className="px-4 py-2 text-sm font-medium text-muted-foreground">
                Yearly (Save 20%)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'relative rounded-2xl border bg-background p-8',
                  plan.highlighted && 'border-primary shadow-lg'
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.monthlyPrice}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <Button
                  className="mb-6 w-full"
                  variant={plan.highlighted ? 'default' : 'outline'}
                  asChild
                >
                  <Link
                    href={
                      plan.name === 'Enterprise'
                        ? '/contact'
                        : '/auth/signup'
                    }
                  >
                    {plan.cta}
                  </Link>
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-lg border bg-background p-6">
                  <h3 className="mb-2 font-semibold">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Still Have Questions?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Our team is here to help you choose the right plan for your coaching
              practice.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth/signup">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
