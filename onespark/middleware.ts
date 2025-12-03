import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/sparks(.*)',
  '/api/sparks(.*)',
])

const publicRoutes = ['/', '/sign-in', '/sign-up']

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect()
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!auth().userId && !publicRoutes.includes(req.nextUrl.pathname) && isProtectedRoute(req)) {
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', req.url)
    return NextResponse.redirect(signInUrl)
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for these paths
    '/(sign-in|sign-up|api/auth|api/sparks)/?.*',
  ],
}

