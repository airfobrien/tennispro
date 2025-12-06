import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement, ReactNode } from 'react';

// Mock providers wrapper
function AllProviders({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// Custom render function that wraps with providers
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllProviders, ...options }),
  };
}

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render with custom render
export { customRender as render };

// Utility to wait for async updates
export async function waitForLoadingToFinish() {
  // Wait for any pending promises
  await new Promise((resolve) => setTimeout(resolve, 0));
}

// Mock data factories
export function createMockStudent(overrides = {}) {
  return {
    id: '1',
    name: 'Test Student',
    email: 'student@test.com',
    phone: '555-0100',
    level: 'intermediate',
    status: 'active',
    joinDate: '2024-01-15',
    ...overrides,
  };
}

export function createMockVideo(overrides = {}) {
  return {
    id: '1',
    title: 'Test Video',
    studentId: '1',
    studentName: 'Test Student',
    strokeType: 'forehand',
    status: 'analyzed',
    uploadDate: '2024-01-20',
    duration: '00:45',
    ...overrides,
  };
}

export function createMockNotification(overrides = {}) {
  return {
    id: '1',
    type: 'video' as const,
    title: 'Test Notification',
    description: 'This is a test notification',
    time: '5 minutes ago',
    read: false,
    ...overrides,
  };
}

export function createMockProgressPath(overrides = {}) {
  return {
    id: '1',
    name: 'Test Path',
    description: 'A test progression path',
    category: 'recreational' as const,
    levels: 4,
    studentsAssigned: 5,
    isTemplate: false,
    progress: 50,
    ...overrides,
  };
}
