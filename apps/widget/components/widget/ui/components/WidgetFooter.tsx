import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setScreen } from "@/redux/slices/widgetSlice";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { HomeIcon, InboxIcon } from "lucide-react";

export const WidgetFooter = () => {
  const dispatch = useAppDispatch();
  const screen = useAppSelector((state) => state.widget.screen);

  return (
    <footer className="flex w-full gap-2 bg-secondary px-3 pt-2 pb-2">
      <Button
        onClick={() => dispatch(setScreen("selection"))}
        size="icon"
        variant="ghost"
        className={cn(
          "h-11 flex-1 rounded-xl transition-all duration-200",
          "text-muted-foreground hover:bg-muted hover:text-foreground",
          screen === "selection" &&
            "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
        )}
      >
        <HomeIcon className="size-5" />
      </Button>

      <Button
        onClick={() => dispatch(setScreen("inbox"))}
        size="icon"
        variant="ghost"
        className={cn(
          "h-11 flex-1 rounded-xl transition-all duration-200",
          "text-muted-foreground hover:bg-muted hover:text-foreground",
          screen === "inbox" &&
            "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
        )}
      >
        <InboxIcon className="size-5" />
      </Button>
    </footer>
  );
};
