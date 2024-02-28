//This is a next.js specific file convention.
import NextAuth from "next-auth";

import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);
// this function gets run if it meets the route matcher in the config.
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  //We do not want to protect any routes wtih the apiAuthPrefix because nextauth requires /api/auth
  if (isApiAuthRoute) {
    return;
  }

  //do not allow logged in users to view the auth routes, login or register pages. instead redirect them.
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)
      );
    }
    return;
  }
  // if not logged in and not a puclic route redirect to login page
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    console.log(
      "File: ~/Documents/Projects/Tutorials/auth-tutorial/middleware.ts, Line: 44",
      encodedCallbackUrl
    );

    return Response.redirect(
      new URL(
        `/auth/login?callbackUrl=${encodedCallbackUrl}`,
        nextUrl
      )
    );
  }
  //Do not protect public routes

  return;
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
