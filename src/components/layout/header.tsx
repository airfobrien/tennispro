'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { AuthModal } from '@/components/auth/auth-modal';
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
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

// Tennis ball component with seam detail
function TennisBall({ className }: { className?: string }) {
  return (
    <span className={cn('relative inline-block', className)}>
      {/* Ball body - uses secondary color for complement */}
      <span className="block h-5 w-5 rounded-full bg-secondary shadow-sm" />
      {/* Seam curve - creates the tennis ball line effect */}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="h-3.5 w-3.5 rounded-full border-[1.5px] border-secondary-foreground/30 border-l-transparent border-r-transparent rotate-45" />
      </span>
    </span>
  );
}

export function Header({ navigation = defaultNavigation, showAuth = true }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const pathname = usePathname();

  const openLoginModal = () => {
    setAuthModalTab('login');
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const openSignupModal = () => {
    setAuthModalTab('signup');
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-16 items-center justify-between">
          {/* Logo - uses theme primary color */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-xl font-bold text-primary transition-colors group-hover:text-primary/80">
              TennisPro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative flex flex-col items-center px-4 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <span className={cn(isActive && 'mb-1')}>{item.label}</span>
                  {/* Tennis ball indicator below active item */}
                  <span
                    className={cn(
                      'absolute -bottom-3 transition-all duration-300',
                      isActive
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-75'
                    )}
                  >
                    <TennisBall />
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <SlamSwitcher />

            {showAuth && (
              <div className="hidden md:flex md:items-center md:gap-2">
                <Button variant="ghost" onClick={openLoginModal}>
                  Coaches Log In
                </Button>
                <Button onClick={openSignupModal}>
                  Get Started
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
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium transition-all duration-200',
                      isActive
                        ? 'bg-secondary/20 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                    {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {/* Tennis ball for active item on mobile */}
                    {isActive && <TennisBall className="scale-90" />}
                    {item.label}
                  </Link>
                );
              })}

              {showAuth && (
                <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                  <Button variant="outline" className="w-full" onClick={openLoginModal}>
                    Coaches Log In
                  </Button>
                  <Button className="w-full" onClick={openSignupModal}>
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultTab={authModalTab}
      />
    </>
  );
}
