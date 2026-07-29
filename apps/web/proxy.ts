import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Routes that anyone can access without signing in
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"])

// Routes that do not require an organization to be selected
const isOrgFreeRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/org-selection(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  // Get the currently signed-in user and selected organization
  const { userId, orgId } = await auth()

  // Protect all routes except public routes
  // If the user is not signed in, Clerk will redirect them to sign in
  if (!isPublicRoute(req)) {
    await auth.protect()
  }

  // If the user is signed in but has not selected an organization,
  // redirect them to the organization selection page
  if (userId && !orgId && !isOrgFreeRoute(req)) {
    // Save the current URL so we can redirect back after org selection
    const searchParams = new URLSearchParams({
      redirectUrl: req.url,
    })

    // Create the organization selection URL
    const orgSelection = new URL(
      `/org-selection?${searchParams.toString()}`,
      req.url
    )

    return NextResponse.redirect(orgSelection)
  }
})

export const config = {
  matcher: [
    // Run middleware on app routes, but skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Always run middleware for Clerk's proxy routes
    "/__clerk/:path*",

    // Always run middleware for API and tRPC routes
    "/(api|trpc)(.*)",
  ],
}
