"use client"

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react"
import { AuthLayout } from "../layouts/AuthLayout"
import SignIn from "@/app/(auth)/sign-in/[[...sign-in]]/page"

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Show loading UI while Convex is checking the authentication state */}
      <AuthLoading>
        <AuthLayout>
          <p>Loading...</p>
        </AuthLayout>
      </AuthLoading>

      {/* Show the protected content when the user is authenticated */}
      <Authenticated>{children}</Authenticated>

      {/* Show the sign-in page when the user is not authenticated */}
      <Unauthenticated>
        <AuthLayout>
          <SignIn />
        </AuthLayout>
      </Unauthenticated>
    </>
  )
}
