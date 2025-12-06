import { Check, CreditCard, Calendar, AlertCircle } from 'lucide-react';
import type { Metadata } from 'next';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Subscription',
  description: 'Manage your subscription plan',
};

const currentPlan = {
  name: 'Professional',
  price: 99,
  interval: 'month',
  features: [
    'Up to 50 active students',
    '200 video analyses/month',
    'Advanced progress frameworks',
    'AI coaching insights',
    'Student messaging',
    'Custom branding',
    'Priority support',
  ],
};

const plans = [
  {
    name: 'Starter',
    price: 49,
    interval: 'month',
    description: 'For independent coaches',
    features: ['15 active students', '50 video analyses/month', 'Basic progress tracking'],
    current: false,
  },
  {
    name: 'Professional',
    price: 99,
    interval: 'month',
    description: 'For growing practices',
    features: ['50 active students', '200 video analyses/month', 'AI coaching insights'],
    current: true,
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: 199,
    interval: 'month',
    description: 'For academies',
    features: ['Unlimited students', 'Unlimited analyses', 'Multi-coach support'],
    current: false,
  },
];

const paymentHistory = [
  {
    id: '1',
    date: 'Dec 1, 2024',
    amount: '$99.00',
    status: 'Paid',
    invoice: '#INV-2024-012',
  },
  {
    id: '2',
    date: 'Nov 1, 2024',
    amount: '$99.00',
    status: 'Paid',
    invoice: '#INV-2024-011',
  },
  {
    id: '3',
    date: 'Oct 1, 2024',
    amount: '$99.00',
    status: 'Paid',
    invoice: '#INV-2024-010',
  },
];

export default function SubscriptionSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                You are currently on the {currentPlan.name} plan
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg">
              ${currentPlan.price}/{currentPlan.interval}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {currentPlan.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Usage This Month</CardTitle>
          <CardDescription>
            Your current usage against plan limits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Active Students</span>
              <span className="font-medium">24 / 50</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary"
                style={{ width: '48%' }}
              />
            </div>
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Video Analyses</span>
              <span className="font-medium">156 / 200</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary"
                style={{ width: '78%' }}
              />
            </div>
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Storage Used</span>
              <span className="font-medium">12.4 GB / 50 GB</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary"
                style={{ width: '25%' }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>
            Choose the plan that best fits your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'relative rounded-lg border p-4',
                  plan.current && 'border-primary'
                )}
              >
                {plan.recommended && (
                  <Badge className="absolute -top-2 right-4">Recommended</Badge>
                )}
                <h3 className="font-semibold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <p className="mt-2 text-2xl font-bold">
                  ${plan.price}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{plan.interval}
                  </span>
                </p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-4 w-full"
                  variant={plan.current ? 'outline' : 'default'}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : 'Upgrade'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Manage your payment information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-14 items-center justify-center rounded bg-muted">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Next billing date: January 1, 2025</span>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            Download past invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentHistory.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{payment.invoice}</p>
                  <p className="text-sm text-muted-foreground">{payment.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">{payment.status}</Badge>
                  <span className="font-medium">{payment.amount}</span>
                  <Button variant="ghost" size="sm">Download</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cancel Subscription */}
      <Card className="border-destructive/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle>Cancel Subscription</CardTitle>
          </div>
          <CardDescription>
            Cancel your subscription at any time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            If you cancel, you&apos;ll lose access to premium features at the end of
            your current billing period. Your data will be preserved for 30 days.
          </p>
          <Button variant="destructive">Cancel Subscription</Button>
        </CardContent>
      </Card>
    </div>
  );
}
