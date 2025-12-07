import type { NextAuthConfig } from 'next-auth';
import Cognito from 'next-auth/providers/cognito';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

// Validation schema for credentials
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Mock coaches for development mode
// Use these credentials when AUTH_DEV_MODE=true
const mockCoaches = [
  {
    id: 'dev-coach-001',
    email: 'coach@demo.com',
    password: 'demo1234',
    name: 'Demo Coach',
    coachId: 'coach-uuid-001',
    role: 'coach',
    tier: 'professional',
  },
  {
    id: 'dev-coach-002',
    email: 'admin@demo.com',
    password: 'admin1234',
    name: 'Admin Coach',
    coachId: 'coach-uuid-002',
    role: 'admin',
    tier: 'enterprise',
  },
  {
    id: 'dev-coach-003',
    email: 'starter@demo.com',
    password: 'starter1234',
    name: 'Starter Coach',
    coachId: 'coach-uuid-003',
    role: 'coach',
    tier: 'starter',
  },
];

// Mock students for development mode
// Each student is associated with a coach (1:1 relationship for now)
const mockStudents = [
  // Students for Demo Coach (coach@demo.com)
  {
    id: 'dev-student-001',
    email: 'student1@demo.com',
    password: 'student1234',
    name: 'Alex Thompson',
    studentId: 'student-uuid-001',
    coachId: 'coach-uuid-001', // Demo Coach
    role: 'student',
    playerCategory: 'competitive_junior',
  },
  {
    id: 'dev-student-002',
    email: 'student2@demo.com',
    password: 'student1234',
    name: 'Jordan Williams',
    studentId: 'student-uuid-002',
    coachId: 'coach-uuid-001', // Demo Coach
    role: 'student',
    playerCategory: 'recreational',
  },
  // Students for Starter Coach (starter@demo.com)
  {
    id: 'dev-student-003',
    email: 'student3@demo.com',
    password: 'student1234',
    name: 'Casey Martinez',
    studentId: 'student-uuid-003',
    coachId: 'coach-uuid-003', // Starter Coach
    role: 'student',
    playerCategory: 'senior',
  },
  {
    id: 'dev-student-004',
    email: 'student4@demo.com',
    password: 'student1234',
    name: 'Riley Johnson',
    studentId: 'student-uuid-004',
    coachId: 'coach-uuid-003', // Starter Coach
    role: 'student',
    playerCategory: 'collegiate_track',
  },
];

const isDevMode = process.env.AUTH_DEV_MODE === 'true';

export const authConfig: NextAuthConfig = {
  providers: [
    // Cognito OAuth provider (production)
    Cognito({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
    }),
    // Credentials provider for direct email/password login
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        // Development mode: use mock coaches and students
        if (isDevMode) {
          // Check coaches first
          const mockCoach = mockCoaches.find(
            (c) => c.email === email && c.password === password
          );

          if (mockCoach) {
            console.log(`[DEV MODE] Authenticated as coach: ${mockCoach.name}`);
            return {
              id: mockCoach.id,
              email: mockCoach.email,
              name: mockCoach.name,
              coachId: mockCoach.coachId,
              role: mockCoach.role,
              tier: mockCoach.tier,
            };
          }

          // Check students
          const mockStudent = mockStudents.find(
            (s) => s.email === email && s.password === password
          );

          if (mockStudent) {
            console.log(`[DEV MODE] Authenticated as student: ${mockStudent.name}`);
            return {
              id: mockStudent.id,
              email: mockStudent.email,
              name: mockStudent.name,
              studentId: mockStudent.studentId,
              coachId: mockStudent.coachId, // Student's assigned coach
              role: mockStudent.role,
            };
          }

          console.log(`[DEV MODE] Invalid credentials for: ${email}`);
          return null;
        }

        // Production mode: use Cognito's InitiateAuth API
        // This will be implemented when we connect to AWS
        console.log('Credentials auth attempted - implement Cognito InitiateAuth');
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    newUser: '/onboarding',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isCoach = auth?.user?.role === 'coach' || auth?.user?.role === 'admin';
      const isStudent = auth?.user?.role === 'student';
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnStudentPortal = nextUrl.pathname.startsWith('/student');
      const isOnAuth = nextUrl.pathname.startsWith('/auth');
      const isOnOnboarding = nextUrl.pathname.startsWith('/onboarding');

      // Coach dashboard requires coach login
      if (isOnDashboard || isOnOnboarding) {
        if (isLoggedIn && isCoach) return true;
        if (isLoggedIn && isStudent) {
          // Student trying to access coach dashboard - redirect to student portal
          return Response.redirect(new URL('/student', nextUrl));
        }
        return false; // Redirect to login
      }

      // Student portal requires student login
      if (isOnStudentPortal) {
        if (isLoggedIn && isStudent) return true;
        if (isLoggedIn && isCoach) {
          // Coach trying to access student portal - redirect to dashboard
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return false; // Redirect to login
      }

      // Logged in users on auth pages - redirect to appropriate portal
      if (isOnAuth && isLoggedIn) {
        if (isStudent) {
          return Response.redirect(new URL('/student', nextUrl));
        }
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        // Handle both OAuth (account) and Credentials (user only) flows
        return {
          ...token,
          accessToken: account?.access_token ?? 'dev-token',
          refreshToken: account?.refresh_token,
          accessTokenExpires: account?.expires_at
            ? account.expires_at * 1000
            : Date.now() + 24 * 60 * 60 * 1000, // 24 hours for dev mode
          cognitoUserId: user.id,
          // Custom claims - from user object (credentials) or Cognito
          coachId: (user as unknown as Record<string, unknown>).coachId as string | undefined,
          studentId: (user as unknown as Record<string, unknown>).studentId as string | undefined,
          role: (user as unknown as Record<string, unknown>).role as string | undefined,
          tier: (user as unknown as Record<string, unknown>).tier as string | undefined,
        };
      }

      // Return previous token if the access token has not expired
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token expired, try to refresh
      // TODO: Implement token refresh with Cognito
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.cognitoUserId as string;
        session.user.coachId = token.coachId as string | undefined;
        session.user.studentId = token.studentId as string | undefined;
        session.user.role = token.role as string | undefined;
        session.user.tier = token.tier as string | undefined;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
};
