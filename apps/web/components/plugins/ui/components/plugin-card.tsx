import { ArrowLeftRightIcon, type LucideIcon, PlugIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";

export interface Feature {
  icon: LucideIcon;
  label: string;
  description: string;
}

interface PluginCardProps {
  isDisabled?: boolean;
  serviceName: string;
  serviceImage: string;
  features: Feature[];
  onSubmit: () => void;
}

export const PluginCard = ({
  isDisabled,
  serviceName,
  serviceImage,
  features,
  onSubmit,
}: PluginCardProps) => {
  return (
    <div className="h-fit w-full rounded-xl border border-muted-foreground/10 bg-background p-8 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-6 flex items-center justify-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-xl border border-muted-foreground/10 bg-muted/40 p-2">
          <Image
            alt={serviceName}
            className="rounded object-contain"
            height={36}
            width={36}
            src={serviceImage}
          />
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="h-px w-6 bg-border" />
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
            <ArrowLeftRightIcon className="size-4 text-primary" />
          </div>
          <div className="h-px w-6 bg-border" />
        </div>

        <div className="flex size-16 items-center justify-center rounded-xl border border-muted-foreground/10 bg-muted/40 p-2">
          <Image
            alt="Platform"
            className="object-contain"
            height={36}
            width={36}
            src="/logo.svg"
          />
        </div>
      </div>

      <div className="mb-6 text-center">
        <p className="text-lg font-medium">
          Connect your {serviceName} account
        </p>
        {isDisabled && (
          <Badge variant="secondary" className="mt-2 font-normal">
            Coming soon
          </Badge>
        )}
      </div>

      <div className="mb-6 space-y-2">
        {features.map((feature) => (
          <div
            className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/40"
            key={feature.label}
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/10 bg-muted">
              <feature.icon className="size-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-sm font-medium">{feature.label}</div>
              <div className="text-xs text-muted-foreground">
                {feature.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        className="w-full gap-2 shadow-sm"
        disabled={isDisabled}
        onClick={onSubmit}
        variant="default"
      >
        Connect
        <PlugIcon className="size-4" />
      </Button>
    </div>
  );
};
