'use client';

import {
  BookOpen,
  Calendar,
  Home,
  MessageSquare,
  Settings,
  Target,
  Trophy,
  User,
  Video,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const navItems = [
  { href: '/student', label: 'Dashboard', icon: Home },
  { href: '/student/progress', label: 'My Progress', icon: Target },
  { href: '/student/videos', label: 'Videos', icon: Video },
  { href: '/student/achievements', label: 'Achievements', icon: Trophy },
  { href: '/student/lessons', label: 'Lessons', icon: Calendar },
  { href: '/student/goals', label: 'Goals', icon: Target },
  { href: '/student/messages', label: 'Messages', icon: MessageSquare },
  { href: '/student/blog', label: 'Coach Blog', icon: BookOpen },
];

const secondaryItems = [
  { href: '/student/coach', label: 'My Coach', icon: User },
  { href: '/student/settings', label: 'Settings', icon: Settings },
];

interface StudentSidebarProps {
  className?: string;
}

export function StudentSidebar({ className }: StudentSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/student') {
      return pathname === '/student';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 w-64 flex-col border-r bg-card',
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/student" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">TP</span>
          </div>
          <span className="text-lg font-semibold">TennisPro</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="my-4 border-t" />

        <div className="space-y-1">
          {secondaryItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
}
