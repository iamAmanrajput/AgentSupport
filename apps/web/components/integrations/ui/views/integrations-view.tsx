"use client";

import { useOrganization } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import { Badge } from "@workspace/ui/components/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card";
import { CopyIcon, CheckIcon, Code2, Building2 } from "lucide-react";
import { toast } from "@workspace/ui/components/toast";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { useState } from "react";
import { createScript } from "../../utils";
import { IntegrationId, INTEGRATIONS } from "../../constants";

export const IntegrationsView = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState("");
  const [copiedOrgId, setCopiedOrgId] = useState(false);
  const { organization } = useOrganization();

  const handleIntegrationClick = (integrationId: IntegrationId) => {
    if (!organization) {
      toast.add({
        type: "error",
        description: "Organization ID not found",
      });
      return;
    }

    const snippet = createScript(integrationId, organization.id);
    setSelectedSnippet(snippet);
    setDialogOpen(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(organization?.id ?? "");
      setCopiedOrgId(true);
      toast.add({
        type: "success",
        description: "Copied to clipboard",
      });
      setTimeout(() => setCopiedOrgId(false), 2000);
    } catch {
      toast.add({
        type: "error",
        description: "Failed to copy to clipboard",
      });
    }
  };

  return (
    <>
      <IntegrationsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        snippet={selectedSnippet}
      />
      <div className="flex min-h-screen flex-col bg-secondary/20 p-8">
        <div className="mx-auto w-full max-w-3xl">
          <div className="space-y-2">
            <h1 className="font-heading text-2xl text-primary md:text-4xl">
              Setup & Integrations
            </h1>
            <p className="text-xs font-bold text-muted-foreground md:text-base">
              Choose the integration that&apos;s right for you
            </p>
          </div>

          <Card className="mt-8 border-muted-foreground/10 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-4.5 w-4.5 text-primary" />
                </div>
                <div>
                  <CardTitle>Organization</CardTitle>
                  <CardDescription>
                    Your unique organization identifier
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Label className="sr-only" htmlFor="organization-id">
                  Organization ID
                </Label>
                <Input
                  disabled
                  id="organization-id"
                  readOnly
                  value={organization?.id ?? ""}
                  className="flex-1 bg-muted/40 font-mono text-sm"
                />
                <Button
                  className="min-w-24 gap-2"
                  onClick={handleCopy}
                  size="sm"
                  variant={copiedOrgId ? "secondary" : "default"}
                >
                  {copiedOrgId ? (
                    <>
                      <CheckIcon className="size-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <CopyIcon className="size-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-8" />

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-muted-foreground" />
              <Label className="text-lg font-medium">Integrations</Label>
              <Badge variant="secondary" className="ml-auto font-normal">
                {INTEGRATIONS.length} available
              </Badge>
            </div>
            <p className="-mt-4 text-sm text-muted-foreground">
              Add the following code to your website to enable the chatbox.
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {INTEGRATIONS.map((integration) => (
                <button
                  key={integration.id}
                  onClick={() => handleIntegrationClick(integration.id)}
                  type="button"
                  className="group flex flex-col items-center gap-3 rounded-xl border border-muted-foreground/10 bg-background p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:cursor-pointer hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted/50 transition-colors group-hover:bg-primary/10">
                    <Image
                      alt={integration.title}
                      height={28}
                      src={integration.icon}
                      width={28}
                    />
                  </div>
                  <p className="text-sm font-medium">{integration.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const IntegrationsDialog = ({
  open,
  onOpenChange,
  snippet,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  snippet: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      toast.add({
        type: "success",
        description: "Copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.add({
        type: "error",
        description: "Failed to copy to clipboard",
      });
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Integrate with your website</DialogTitle>
          <DialogDescription>
            Follow these steps to add the chatbox to your website
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-medium">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-medium text-primary">
                1
              </span>
              Copy the following code
            </div>
            <div className="group relative">
              <pre className="max-h-75 overflow-x-auto overflow-y-auto rounded-md bg-foreground p-3 font-mono text-sm break-all whitespace-pre-wrap text-secondary">
                {snippet}
              </pre>
              <Button
                className="absolute top-3 right-3 size-7 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={handleCopy}
                size="icon"
                variant="secondary"
              >
                {copied ? (
                  <CheckIcon className="size-3" />
                ) : (
                  <CopyIcon className="size-3" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-medium">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-medium text-primary">
                2
              </span>
              Add the code in your page
            </div>
            <p className="text-sm text-muted-foreground">
              Paste the chatbox code above in your page. You can add it in the
              HTML head section.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
