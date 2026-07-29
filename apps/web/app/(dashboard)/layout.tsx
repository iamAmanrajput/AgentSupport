import { AuthWrapper } from "@/components/auth/ui/components/AuthWrapper"
import { OrganizationWrapper } from "@/components/auth/ui/components/OrganizationWrapper"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthWrapper>
      <OrganizationWrapper>{children}</OrganizationWrapper>
    </AuthWrapper>
  )
}

export default Layout
