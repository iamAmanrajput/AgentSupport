import { AuthWrapper } from "@/components/auth/ui/components/AuthWrapper";
import { OrganizationWrapper } from "@/components/auth/ui/components/OrganizationWrapper";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { cookies } from "next/headers";
import React from "react";
import DashboardSidebar from "../components/dashboard-sidebar";
import StoreProvider from "@/components/StoreProvider";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <AuthWrapper>
      <OrganizationWrapper>
        <StoreProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <DashboardSidebar />
            <main className="flex flex-1 flex-col">{children}</main>
          </SidebarProvider>
        </StoreProvider>
      </OrganizationWrapper>
    </AuthWrapper>
  );
};

export default DashboardLayout;
