// types/next-auth.d.ts

import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    userId?: string; // Add this line to extend the session type
  }
}
