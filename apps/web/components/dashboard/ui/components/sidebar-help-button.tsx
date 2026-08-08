import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { useSidebar } from "@workspace/ui/components/sidebar";
import { MailIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const SidebarHelpButton = () => {
  const { state } = useSidebar();
  console.log(state);
  return (
    <Card
      className={`gap-2 bg-secondary py-4 shadow-none ${state === "collapsed" ? "hidden" : ""}`}
    >
      <CardHeader className="px-4">
        <CardTitle className="text-sm">Stuck somewhere?</CardTitle>
        <CardDescription>
          We&apos;re just a click away, ready to help.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full px-4">
        <Button
          render={<Link href={`mailto:hereamansingh@gmail.com`} />}
          nativeButton={false}
          className="w-full"
          size="lg"
        >
          <MailIcon />
          <span>Get help</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SidebarHelpButton;
