import 'next-auth';

/**
 * User roles in the application
 */
export type UserRole = 'coach' | 'student' | 'admin';

/**
 * Subscription tier for coaches
 */
export type SubscriptionTier = 'free' | 'starter' | 'professional' | 'enterprise';

/**
 * Extended session user with custom claims from Cognito
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      coachId?: string;
      role?: string;
      tier?: string;
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    coachId?: string;
    role?: string;
    tier?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    cognitoUserId?: string;
    coachId?: string;
    role?: string;
    tier?: string;
  }
}
