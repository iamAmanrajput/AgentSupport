import { cn } from "@workspace/ui/lib/utils";

export const WidgetHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <header
      className={cn(
        "bg-gradient-to-br from-primary via-primary/80 to-primary/50 p-4 text-primary-foreground",
        className
      )}
    >
      {children}
    </header>
  );
};
