import type { ReactNode } from 'react';

import { StudentHeader } from '@/components/student/navigation/student-header';
import { StudentMobileNav } from '@/components/student/navigation/student-mobile-nav';
import { StudentSidebar } from '@/components/student/navigation/student-sidebar';

interface StudentLayoutProps {
  children: ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <StudentSidebar className="hidden lg:flex" />

      {/* Main Content */}
      <div className="lg:pl-64">
        <StudentHeader />
        <main className="pb-20 lg:pb-6">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <StudentMobileNav className="lg:hidden" />
    </div>
  );
}
