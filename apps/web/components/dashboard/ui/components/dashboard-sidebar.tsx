"use client";

import React from "react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import {
  CreditCardIcon,
  InboxIcon,
  LayoutDashboardIcon,
  LibraryBigIcon,
  Mic,
  PaletteIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import SidebarHelpButton from "./sidebar-help-button";

const customerSupportItems = [
  {
    title: "Conversations",
    url: "/conversations",
    icon: InboxIcon,
  },
  {
    title: "Knowledge Base",
    url: "/files",
    icon: LibraryBigIcon,
  },
];

const configurationItems = [
  {
    title: "Widget Customization",
    url: "/customization",
    icon: PaletteIcon,
  },
  {
    title: "Integrations",
    url: "/integrations",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Voice Assistant",
    url: "/plugins/vapi",
    icon: Mic,
  },
];

const accountItems = [
  {
    title: "Plans & Billing",
    url: "/billing",
    icon: CreditCardIcon,
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(url);
  };

  return (
    <Sidebar className="group" collapsible="icon">
      {/* Organization */}
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <OrganizationSwitcher
              hidePersonal
              skipInvitationScreen
              appearance={{
                elements: {
                  rootBox: "w-full! h-8!",
                  avatarBox: "size-4! rounded-sm!",
                  organizationSwitcherTrigger:
                    "w-full! justify-start! group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! !rounded-xl !bg-secondary p-2!",
                  organizationPreview:
                    "group-data-[collapsible=icon]:justify-center! gap-2!",
                  organizationPreviewTextContainer:
                    "group-data-[collapsible=icon]:hidden! text-xs! font-medium! hover:text-primary!",
                  organizationSwitcherTriggerIcon:
                    "group-data-[collapsible=icon]:hidden! ml-auto! hover:text-primary! ",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Customer Support */}
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-primary">
            Customer Support
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {customerSupportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    isActive={isActive(item.url)}
                    className={cn(
                      isActive(item.url)
                        ? "bg-primary! text-sidebar-primary-foreground! duration-300! hover:bg-primary/90!"
                        : "text-sidebar-foreground/80! hover:bg-secondary! hover:text-primary!"
                    )}
                    tooltip={item.title}
                  >
                    <item.icon
                      className={`size-4 ${
                        isActive(item.url) ? "opacity-100" : "opacity-80"
                      }`}
                    />
                    <span className="text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Configuration */}
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-primary">
            Configuration
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {configurationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    isActive={isActive(item.url)}
                    className={cn(
                      isActive(item.url)
                        ? "bg-primary! text-sidebar-primary-foreground! duration-300! hover:bg-primary/90!"
                        : "text-sidebar-foreground/80! hover:bg-secondary! hover:text-primary!"
                    )}
                    tooltip={item.title}
                  >
                    <item.icon
                      className={`size-4 ${
                        isActive(item.url) ? "opacity-100" : "opacity-80"
                      }`}
                    />
                    <span className="text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account */}
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-primary">
            Account
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    isActive={isActive(item.url)}
                    className={cn(
                      isActive(item.url)
                        ? "bg-primary! text-sidebar-primary-foreground! duration-300! hover:bg-primary/90!"
                        : "text-sidebar-foreground/80! hover:bg-secondary! hover:text-primary!"
                    )}
                    tooltip={item.title}
                  >
                    <item.icon
                      className={`size-4 ${
                        isActive(item.url) ? "opacity-100" : "opacity-80"
                      }`}
                    />
                    <span className="text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User */}
      <SidebarFooter className="border">
        <SidebarHelpButton />
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton
              showName
              appearance={{
                elements: {
                  rootBox: "w-full! h-8!",
                  userButtonTrigger:
                    "w-full! p-2! bg-secondary! rounded-lg! hover:bg-sidebar-accent! hover:text-primary! group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!",
                  userButtonBox:
                    "w-full! flex-row-reverse! justify-end! gap-2! group-data-[collapsible=icon]:justify-center! hover:text-primary!",
                  userButtonOuterIdentifier:
                    "pl-0! group-data-[collapsible=icon]:hidden!",
                  avatarBox: "size-4!",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;
