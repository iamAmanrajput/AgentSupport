import { AuthLayout } from "@/components/auth/ui/layouts/AuthLayout"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>
}

export default Layout
