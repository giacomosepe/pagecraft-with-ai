import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isPublicRoute = createRouteMatcher([
  "/", // landing page — public
  "/sign-in(.*)", // sign in page — public
  "/sign-up(.*)", // sign up page — public
]);

export const onRequest = clerkMiddleware((auth, context) => {
  const { userId } = auth();

  // If not logged in and trying to access a protected route → redirect to sign in
  if (!userId && !isPublicRoute(context.request)) {
    return auth().redirectToSignIn();
  }
});
