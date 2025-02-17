import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const isPublicRoute = createRouteMatcher(['/hero', '/login', '/register', '/reset-password', '/verify-email'])

export default clerkMiddleware(async (auth, request) => {
    const { userId } = await auth()

    if(!userId && !isPublicRoute(request)) return NextResponse.redirect(new URL('/hero', request.url))
    if(userId && isPublicRoute(request)) return NextResponse.redirect(new URL('/', request.url))
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};