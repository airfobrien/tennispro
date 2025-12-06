'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const settingsNav = [
  {
    title: 'Profile',
    href: '/settings/profile',
    description: 'Manage your public profile',
  },
  {
    title: 'Account',
    href: '/settings/account',
    description: 'Account settings and security',
  },
  {
    title: 'Notifications',
    href: '/settings/notifications',
    description: 'Email and push notifications',
  },
  {
    title: 'Subscription',
    href: '/settings/subscription',
    description: 'Manage your subscription plan',
  },
];

interface SettingsLayoutProps {
  children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Settings Navigation */}
        <nav className="lg:w-64">
          <ul className="space-y-1">
            {settingsNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'block rounded-lg px-3 py-2 text-sm transition-colors',
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Settings Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
