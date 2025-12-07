import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import type { Metadata } from 'next';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Manage your subscription and billing',
};

export default async function AccountPage() {
  const session = await auth();
  const tier = session?.user?.tier ?? 'starter';

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$49',
      period: '/month',
      description: 'Perfect for individual coaches just getting started',
      features: [
        'Up to 10 students',
        '50 video analyses/month',
        'Basic progress tracking',
        'Email support',
      ],
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'For growing coaching practices',
      features: [
        'Up to 50 students',
        '200 video analyses/month',
        'Advanced analytics',
        'Priority support',
        'Custom branding',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      description: 'For tennis academies and large operations',
      features: [
        'Unlimited students',
        'Unlimited video analyses',
        'Multi-coach support',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing settings
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Plan
          </CardTitle>
          <CardDescription>
            You are currently on the {tier.charAt(0).toUpperCase() + tier.slice(1)} plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm capitalize">
              {tier}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Next billing date: January 15, 2025
            </span>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          <AlertCircle className="mr-2 h-4 w-4" />
          Payment processing will be available when Stripe integration is complete
        </CardFooter>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={plan.id === tier ? 'border-primary' : ''}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.popular && (
                    <Badge>Popular</Badge>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.id === tier ? 'outline' : 'default'}
                  disabled={plan.id === tier}
                >
                  {plan.id === tier ? 'Current Plan' : 'Upgrade'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing History Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No billing history available yet. Payment history will appear here once Stripe integration is complete.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
