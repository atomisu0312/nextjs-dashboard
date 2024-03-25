import type { NextAuthConfig } from 'next-auth';

// 認証に関する設定が詰まっている
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: { // 画面遷移しようとした時に呼び出されるという認識でおk
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;