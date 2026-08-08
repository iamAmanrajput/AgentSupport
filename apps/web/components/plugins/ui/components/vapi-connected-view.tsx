"use client";

import { BotIcon, PhoneIcon, SettingsIcon, UnplugIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { VapiPhoneNumbersTab } from "./vapi-phone-numbers-tab";
import { VapiAssistantsTab } from "./vapi-assistants-tab";

interface VapiConnectedViewProps {
  onDisconnect: () => void;
}

export const VapiConnectedView = ({ onDisconnect }: VapiConnectedViewProps) => {
  const [activeTab, setActiveTab] = useState("phone-numbers");

  return (
    <div className="space-y-6">
      <Card className="border-muted-foreground/10 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  alt="Vapi"
                  className="rounded-lg object-contain ring-1 ring-muted-foreground/10"
                  height={48}
                  width={48}
                  src="/vapi.jpg"
                />
                <span className="absolute -right-1 -bottom-1 flex size-4 items-center justify-center rounded-full border-2 border-background bg-emerald-500">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-100" />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle>Vapi Integration</CardTitle>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Connected
                  </span>
                </div>
                <CardDescription>
                  Manage your phone numbers and AI assistants
                </CardDescription>
              </div>
            </div>

            <Button
              className="gap-2"
              onClick={onDisconnect}
              size="sm"
              variant="destructive"
            >
              <UnplugIcon className="size-4" />
              Disconnect
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Card className="border-muted-foreground/10 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <SettingsIcon className="size-6 text-primary" />
              </div>
              <div>
                <CardTitle>Widget Configuration</CardTitle>
                <CardDescription>
                  Set up voice calls for your chat widget
                </CardDescription>
              </div>
            </div>
            <Button
              className="gap-2"
              variant="outline"
              render={
                <Link href="/customization">
                  <SettingsIcon className="size-4" />
                  Configure
                </Link>
              }
            />
          </div>
        </CardHeader>
      </Card>

      <div className="overflow-hidden rounded-xl border border-muted-foreground/10 bg-background shadow-sm">
        <Tabs
          className="gap-0"
          defaultValue="phone-numbers"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList className="h-auto w-full grid-cols-2 gap-1 rounded-none border-b bg-muted/30 p-1.5">
            <TabsTrigger
              className="h-6 gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
              value="phone-numbers"
            >
              <PhoneIcon className="size-4" />
              Phone Numbers
            </TabsTrigger>
            <TabsTrigger
              className="h-6 gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
              value="assistants"
            >
              <BotIcon className="size-4" />
              AI Assistants
            </TabsTrigger>
          </TabsList>
          <TabsContent value="phone-numbers" className="p-1">
            <VapiPhoneNumbersTab />
          </TabsContent>
          <TabsContent value="assistants" className="p-1">
            <VapiAssistantsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
