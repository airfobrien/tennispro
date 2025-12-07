'use client';

import { useState } from 'react';

import { LoginForm } from '@/components/auth/login-form';
import { SignupForm } from '@/components/auth/signup-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type AuthTab = 'login' | 'signup';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: AuthTab;
}

export function AuthModal({
  open,
  onOpenChange,
  defaultTab = 'login',
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>(defaultTab);

  const handleSwitchToSignup = () => setActiveTab('signup');
  const handleSwitchToLogin = () => setActiveTab('login');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md max-sm:h-full max-sm:max-h-full max-sm:w-full max-sm:rounded-none max-sm:border-0"
        showCloseButton={true}
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-primary">
            TennisPro
          </DialogTitle>
          <DialogDescription>
            Professional Tennis Coaching Platform
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as AuthTab)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Coaches Log In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-4">
            <LoginForm
              callbackUrl="/dashboard"
              onSwitchToSignup={handleSwitchToSignup}
            />
          </TabsContent>

          <TabsContent value="signup" className="mt-4">
            <SignupForm
              callbackUrl="/onboarding"
              onSwitchToLogin={handleSwitchToLogin}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
