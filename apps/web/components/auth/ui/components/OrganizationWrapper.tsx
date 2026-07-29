"use client"

import { useOrganization } from "@clerk/nextjs"
import { AuthLayout } from "../layouts/AuthLayout"
import OrgSelection from "@/app/(auth)/org-selection/[[...org-selection]]/page"

export const OrganizationWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // Get the currently active organization from Clerk
  const { organization } = useOrganization()

  // If no organization is selected, show the organization selection page
  if (!organization) {
    return (
      <AuthLayout>
        <OrgSelection />
      </AuthLayout>
    )
  }

  // If an organization is selected, show the protected content
  return <>{children}</>
}
