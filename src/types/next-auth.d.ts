import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    coachId?: string;
    role?: string;
    tier?: string;
  }

  interface Session {
    user: User & {
      id: string;
      coachId?: string;
      role?: string;
      tier?: string;
    };
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    cognitoUserId?: string;
    coachId?: string;
    role?: string;
    tier?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}
