'use client';

import {
  Home,
  MessageSquare,
  Target,
  Trophy,
  Video,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const mobileNavItems = [
  { href: '/student', label: 'Home', icon: Home },
  { href: '/student/progress', label: 'Progress', icon: Target },
  { href: '/student/videos', label: 'Videos', icon: Video },
  { href: '/student/achievements', label: 'Awards', icon: Trophy },
  { href: '/student/messages', label: 'Chat', icon: MessageSquare },
];

interface StudentMobileNavProps {
  className?: string;
}

export function StudentMobileNav({ className }: StudentMobileNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/student') {
      return pathname === '/student';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      <div className="flex h-16 items-center justify-around">
        {mobileNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors',
              isActive(item.href)
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
