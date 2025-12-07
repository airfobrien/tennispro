'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { SlamSwitcher } from '@/components/layout/slam-switcher';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

interface HeaderProps {
  navigation?: NavItem[];
  showAuth?: boolean;
}

const defaultNavigation: NavItem[] = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export function Header({ navigation = defaultNavigation, showAuth = true }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">TennisPro</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
              {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <SlamSwitcher />

          {showAuth && (
            <div className="hidden md:flex md:items-center md:gap-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t md:hidden">
          <div className="container space-y-1 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block rounded-md px-3 py-2 text-base font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
                {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {item.label}
              </Link>
            ))}

            {showAuth && (
              <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/auth/login">Log in</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
